import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { flushSync } from 'react-dom';
import { Agentation } from 'agentation';
import { BASE_RATES, CURRENCY_CODES, getDefaultRateRangeBips } from './constants/currencies';
import { fetchRatesFromAPI, invalidateRatesCache } from './network/ratesFetcher';
import { calculateTotals } from './utils/calculations';
import { ModelTabs } from './components/ModelTabs';
import { MetricsSection } from './components/MetricsSection';
import { ButtonGroup } from './components/ButtonGroup';
import { CurrencyTable } from './components/CurrencyTable';
import { FabGroup } from './components/FabGroup';
import { RateBar } from './components/RateBar';
import { DepositModal } from './components/DepositModal';
import { WithdrawalModal } from './components/trade/WithdrawalModal';
import { EditModal } from './components/EditModal';
import { LogsDrawer } from './components/LogsDrawer';
import { TradingWidget } from './components/trade/CurrencyConverter';
import { MATRIX_LOADER_ONE_CYCLE_MS } from './components/MatrixLoader';

const REFRESH_DELAY_MS = MATRIX_LOADER_ONE_CYCLE_MS;
const AUTO_REFRESH_HOLD_MS = 5000;

const initialBalances = Object.fromEntries(CURRENCY_CODES.map((c) => [c, 0]));

function refreshRatesFromBase(baseRates, rateRangeBips) {
  const next = { ...baseRates };
  Object.keys(next).forEach((c) => {
    if (c === 'USD' || c === 'USDC' || c === 'USDT') return;
    const { minBips, maxBips } = rateRangeBips[c] ?? { minBips: -5000, maxBips: 5000 };
    if (minBips === 0 && maxBips === 0) return;
    const t = Math.random();
    const pctBips = minBips + t * (maxBips - minBips);
    next[c] = baseRates[c] * (1 + pctBips / 10000);
  });
  return next;
}

function simulateRatesFromCurrent(currentRates, baseRates, rateRangeBips) {
  const next = { ...currentRates };
  Object.keys(next).forEach((c) => {
    if (c === 'USD' || c === 'USDC' || c === 'USDT') return;
    const { minBips, maxBips } = rateRangeBips[c] ?? { minBips: -5000, maxBips: 5000 };
    if (minBips === 0 && maxBips === 0) return;
    const pct = 0.0025 + Math.random() * 0.0125;
    const sign = Math.random() < 0.5 ? -1 : 1;
    next[c] = next[c] * (1 + sign * pct);
    const minRate = baseRates[c] * (1 + minBips / 10000);
    const maxRate = baseRates[c] * (1 + maxBips / 10000);
    next[c] = Math.max(minRate, Math.min(maxRate, next[c]));
  });
  return next;
}

const initialRateRangeBips = getDefaultRateRangeBips();

export default function App() {
  const [model, setModel] = useState('A');
  const [balances, setBalances] = useState(initialBalances);
  const [baseRates, setBaseRates] = useState(() => ({ ...BASE_RATES }));
  const [rates, setRates] = useState(() => refreshRatesFromBase(BASE_RATES, initialRateRangeBips));
  const [creditLimit, setCreditLimit] = useState(10_000_000);
  const [rateRangeBips, setRateRangeBips] = useState(initialRateRangeBips);
  const [lastRefresh, setLastRefresh] = useState(() => new Date().toLocaleTimeString());
  const [ratesLoading, setRatesLoading] = useState(false);
  const pendingRatesRef = useRef(null);
  const refreshTimeoutRef = useRef(null);
  const [autoRefreshOn, setAutoRefreshOn] = useState(false);

  const [modalDeposit, setModalDeposit] = useState(false);
  const [modalWithdraw, setModalWithdraw] = useState(false);
  const [activeTab, setActiveTab] = useState('trade');
  const [modalEdit, setModalEdit] = useState(false);
  const [disabledCurrencies, setDisabledCurrencies] = useState({
    AED: true,
    AUD: true,
    CHF: true,
    DKK: true,
    EUR: true,
    EURC: true,
    HKD: true,
    IDR: true,
    NOK: true,
    PLN: true,
    SEK: true,
    SGD: true,
  });

  const [logs, setLogs] = useState([]);
  const [logsOpen, setLogsOpen] = useState(false);
  const balancesRef = useRef(balances);
  balancesRef.current = balances;
  const ratesRef = useRef(rates);
  ratesRef.current = rates;
  const logIdRef = useRef(1);
  const tradingWidgetRef = useRef(null);

  // Cmd+Arrow key navigation between tabs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!e.metaKey) return;

      if (e.key === 'ArrowRight' && activeTab !== 'balances') {
        e.preventDefault();
        setActiveTab('balances');
      } else if (e.key === 'ArrowLeft' && activeTab !== 'trade') {
        e.preventDefault();
        setActiveTab('trade');
        setTimeout(() => tradingWidgetRef.current?.focusBuy(), 100);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  const totals = useMemo(
    () => calculateTotals(balances, rates, creditLimit),
    [balances, rates, creditLimit]
  );

  const handleRefreshRates = useCallback(() => {
    // If there's an existing timeout, cancel it (user clicked refresh again)
    if (refreshTimeoutRef.current != null) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }

    // Set loading state synchronously so loaders start animating immediately
    flushSync(() => setRatesLoading(true));

    // Try API first, fall back to local simulation
    invalidateRatesCache();
    fetchRatesFromAPI()
      .then((apiRates) => {
        pendingRatesRef.current = apiRates;
      })
      .catch(() => {
        // Fallback to local simulation
        pendingRatesRef.current = refreshRatesFromBase(baseRates, rateRangeBips);
      })
      .finally(() => {
        // Apply rates after the loader animation completes
        refreshTimeoutRef.current = setTimeout(() => {
          if (pendingRatesRef.current != null) {
            setRates(pendingRatesRef.current);
            setLastRefresh(new Date().toLocaleTimeString());
            pendingRatesRef.current = null;
          }
          setRatesLoading(false);
          refreshTimeoutRef.current = null;
        }, REFRESH_DELAY_MS);
      });
  }, [baseRates, rateRangeBips]);

  const handleSimulateFx = useCallback(() => {
    setRates((prev) => simulateRatesFromCurrent(prev, baseRates, rateRangeBips));
    setLastRefresh(new Date().toLocaleTimeString());
  }, [baseRates, rateRangeBips]);

  const handleToggleAutoRefresh = useCallback(() => {
    setAutoRefreshOn((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!autoRefreshOn) return undefined;

    // Kick off an immediate refresh, then continue refreshing after each hold period.
    handleRefreshRates();

    const intervalMs = REFRESH_DELAY_MS + AUTO_REFRESH_HOLD_MS;
    const id = setInterval(() => {
      handleRefreshRates();
    }, intervalMs);

    return () => {
      clearInterval(id);
    };
  }, [autoRefreshOn, handleRefreshRates]);

  const handleDeposit = useCallback((currency, amount) => {
    const closingBalance = (balancesRef.current[currency] ?? 0) + amount;
    setBalances((prev) => ({ ...prev, [currency]: closingBalance }));
    setLogs((prev) => [...prev, {
      id: logIdRef.current++,
      type: 'deposit',
      currency,
      amount,
      closingBalance,
      timestamp: new Date(),
    }]);
  }, []);

  const handleWithdraw = useCallback((currency, amount) => {
    const closingBalance = (balancesRef.current[currency] ?? 0) - amount;
    setBalances((prev) => ({ ...prev, [currency]: closingBalance }));
    setLogs((prev) => [...prev, {
      id: logIdRef.current++,
      type: 'withdrawal',
      currency,
      amount,
      closingBalance,
      timestamp: new Date(),
    }]);
  }, []);

  const handleTrade = useCallback((sellCurrency, buyCurrency, sellAmount) => {
    const sellRate = ratesRef.current[sellCurrency] ?? 0;
    const buyRate = ratesRef.current[buyCurrency] ?? 0;
    const sellUsd = sellAmount * sellRate;
    const buyAmount = buyRate > 0 ? sellUsd / buyRate : 0;

    const sellClosing = (balancesRef.current[sellCurrency] ?? 0) - sellAmount;
    const buyClosing = (balancesRef.current[buyCurrency] ?? 0) + buyAmount;

    setBalances((prev) => ({
      ...prev,
      [sellCurrency]: sellClosing,
      [buyCurrency]: buyClosing,
    }));

    const now = new Date();
    const id = logIdRef.current;
    logIdRef.current += 2;
    setLogs((prev) => [...prev,
      { id, type: 'sold', currency: sellCurrency, amount: sellAmount, closingBalance: sellClosing, timestamp: now },
      { id: id + 1, type: 'bought', currency: buyCurrency, amount: buyAmount, closingBalance: buyClosing, timestamp: now },
    ]);
  }, []);

  // Bridge: Trade Widget provides { soldCurrency, soldAmount, purchasedCurrency, purchasedAmount }
  const handleTradeFromWidget = useCallback((trade) => {
    handleTrade(trade.soldCurrency, trade.purchasedCurrency, trade.soldAmount);
  }, [handleTrade]);

  const handleSaveEdit = useCallback((newBalances, newCreditLimit, newRateRangeBips, newDisabledCurrencies, newBaseRates) => {
    setBalances(newBalances);
    setCreditLimit(newCreditLimit);
    if (newRateRangeBips != null) setRateRangeBips(newRateRangeBips);
    if (newDisabledCurrencies != null) setDisabledCurrencies(newDisabledCurrencies);
    if (newBaseRates != null) setBaseRates(newBaseRates);
  }, []);

  const handleRequestPayment = useCallback(() => {
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('Request payment flow coming soon.');
    }
  }, []);

  return (
    <>
      <ModelTabs model={model} onModelChange={setModel} />
      <div className={`app-layout${logsOpen ? ' app-layout--drawer-open' : ''}`}>
        <div className="app-main">
          <div className="app-container">
            <div className="tab-nav">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'trade' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
                onClick={() => setActiveTab('trade')}
              >
                Trade
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'balances' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
                onClick={() => setActiveTab('balances')}
              >
                Balances
              </button>
            </div>
            <div>
              <motion.div
                className="flex"
                animate={{ transform: activeTab === 'trade' ? 'translateX(0%)' : 'translateX(-80%)' }}
                transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
                style={{ willChange: 'transform' }}
              >
                <motion.div
                  className="min-w-0 shrink-0"
                  style={{ width: '80%', cursor: activeTab !== 'trade' ? 'pointer' : 'auto' }}
                  animate={{ opacity: activeTab === 'trade' ? 1 : 0.15 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={activeTab !== 'trade' ? () => {
                    setActiveTab('trade');
                    setTimeout(() => tradingWidgetRef.current?.focusBuy(), 100);
                  } : undefined}
                >
                  <div style={{ pointerEvents: activeTab !== 'trade' ? 'none' : 'auto' }}>
                    <TradingWidget
                      ref={tradingWidgetRef}
                      onTradeExecuted={handleTradeFromWidget}
                      balances={balances}
                      rates={rates}
                      creditLimit={creditLimit}
                      totals={totals}
                      disabledCurrencies={disabledCurrencies}
                      model={model}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="min-w-0 shrink-0"
                  style={{ width: '100%', cursor: activeTab !== 'balances' ? 'pointer' : 'auto' }}
                  animate={{ opacity: activeTab === 'balances' ? 1 : 0.15 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={activeTab !== 'balances' ? () => setActiveTab('balances') : undefined}
                >
                  <div style={{ pointerEvents: activeTab !== 'balances' ? 'none' : 'auto' }}>

                  <MetricsSection totals={totals} model={model} ratesLoading={ratesLoading} />
                  <ButtonGroup
                    onDeposit={() => setModalDeposit(true)}
                    onWithdraw={() => setModalWithdraw(true)}
                    onRequestPayment={handleRequestPayment}
                  />
                  <CurrencyTable
                    balances={balances}
                    rates={rates}
                    ratesLoading={ratesLoading}
                    disabledCurrencies={disabledCurrencies}
                  />
                  <RateBar lastRefresh={lastRefresh} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <LogsDrawer
          open={logsOpen}
          logs={logs}
          onClose={() => setLogsOpen(false)}
        />
      </div>

      <FabGroup
        onSimulateFx={handleSimulateFx}
        onEdit={() => setModalEdit(true)}
        onRefresh={handleRefreshRates}
        onToggleLogs={() => setLogsOpen((prev) => !prev)}
        onToggleAutoRefresh={handleToggleAutoRefresh}
        autoRefreshing={autoRefreshOn}
        ratesLoading={ratesLoading}
        logsOpen={logsOpen}
      />

      <DepositModal
        open={modalDeposit}
        onClose={() => setModalDeposit(false)}
        balances={balances}
        rates={rates}
        onDeposit={handleDeposit}
        disabledCurrencies={disabledCurrencies}
      />
      <WithdrawalModal
        isOpen={modalWithdraw}
        onClose={() => setModalWithdraw(false)}
        balances={balances}
        rates={rates}
        totals={totals}
        onWithdraw={handleWithdraw}
        model={model}
        disabledCurrencies={disabledCurrencies}
      />
      <EditModal
        open={modalEdit}
        onClose={() => setModalEdit(false)}
        balances={balances}
        rates={rates}
        creditLimit={creditLimit}
        rateRangeBips={rateRangeBips}
        baseRates={baseRates}
        disabledCurrencies={disabledCurrencies}
        onSave={handleSaveEdit}
      />
      {process.env.NODE_ENV === 'development' && <Agentation />}
    </>
  );
}
