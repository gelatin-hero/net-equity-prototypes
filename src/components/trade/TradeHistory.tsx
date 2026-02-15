import { Card, CardContent, CardHeader, CardTitle } from "../ui-tw/card";
import { Badge } from "../ui-tw/badge";

export interface Trade {
  id: string;
  purchasedCurrency: string;
  purchasedAmount: number;
  soldCurrency: string;
  soldAmount: number;
  exchangeRate: number;
  timestamp: Date;
  placedBy: string;
}

interface TradeHistoryProps {
  trades: Trade[];
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  const getCurrencyFlag = (code: string) => {
    const flags: Record<string, string> = {
      USD: "🇺🇸",
      EUR: "🇪🇺", 
      GBP: "🇬🇧",
      JPY: "🇯🇵",
      CAD: "🇨🇦",
      AUD: "🇦🇺",
      CHF: "🇨🇭",
      USDC: "💰"
    };
    return flags[code] || "💱";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (trades.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trade history</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No trades executed yet. Execute your first trade above to see it here.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade history</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-3 px-2">Purchased</th>
                <th className="text-left py-3 px-2">Sold</th>
                <th className="text-left py-3 px-2">Trade price</th>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Placed by</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-b border-border/50">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{getCurrencyFlag(trade.purchasedCurrency)}</span>
                      <div>
                        <Badge variant="outline" className="text-xs">
                          {trade.purchasedCurrency}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatAmount(trade.purchasedAmount)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{getCurrencyFlag(trade.soldCurrency)}</span>
                      <div>
                        <Badge variant="outline" className="text-xs">
                          {trade.soldCurrency}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatAmount(trade.soldAmount)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-xs">
                    1 {trade.soldCurrency} = {trade.exchangeRate.toFixed(4)} {trade.purchasedCurrency}
                  </td>
                  <td className="py-3 px-2 text-xs">
                    {formatDate(trade.timestamp)}
                  </td>
                  <td className="py-3 px-2">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}