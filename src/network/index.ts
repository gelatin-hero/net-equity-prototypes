import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://demo.openfx.dev",
  timeout: 10000,
});

export async function fetchExchangeRates({
  buyCurrency,
  sellCurrency,
  sellAmount,
  buyAmount,
}: {
  buyCurrency: string;
  sellCurrency: string;
  sellAmount?: number;
  buyAmount?: number;
}): Promise<number> {
  try {
    if (!sellAmount && !buyAmount) {
      return 0;
    }
    const response = await apiClient.post("/quote", {
      buyCurrency,
      sellCurrency,
      sellAmount,
      buyAmount,
    });
    if (buyAmount) {
      return response.data.sellAmount;
    }
    return response.data.buyAmount;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return 0;
  }
}
