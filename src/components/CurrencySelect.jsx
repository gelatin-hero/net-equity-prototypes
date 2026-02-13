import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select';
import { CurrencyFlag } from './CurrencyFlag';
import { CURRENCIES } from '../constants/currencies';

const FLAG_SIZE_TRIGGER = 20;
const FLAG_SIZE_OPTION = 24;

export function CurrencySelect({ value, onValueChange, id, disabled, excludeValue, disabledCurrencies = {}, 'aria-label': ariaLabel }) {
  const options = Object.entries(CURRENCIES).filter(
    ([code]) => !disabledCurrencies[code] && (!excludeValue || code !== excludeValue)
  );
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger id={id} className="currency-select-trigger" aria-label={ariaLabel}>
        <SelectValue>
          {value ? (
            <span className="currency-select-value">
              <CurrencyFlag
                code={value}
                fallback={CURRENCIES[value]?.flag}
                size={FLAG_SIZE_TRIGGER}
              />
              <span>{value}</span>
              <span className="currency-select-name">{CURRENCIES[value]?.name}</span>
            </span>
          ) : (
            'Select currency'
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map(([code, info]) => (
          <SelectItem key={code} value={code}>
            <span className="currency-select-option">
              <CurrencyFlag
                code={code}
                fallback={info.flag}
                size={FLAG_SIZE_OPTION}
              />
              <span className="currency-select-option-code">{code}</span>
              <span className="currency-select-option-name">{info.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
