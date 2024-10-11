import { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";

const CurrencyConvert = () => {
  const [currencies, setCurriencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [convertedAmount, setConvertedAmount] = useState(null);

  // Fetch the API:
  // https://api.frankfurter.app/currencies
  useEffect(() => {
    const fetch_currency = async () => {
      try {
        const res = await fetch(`https://api.frankfurter.app/currencies`);
        const data = await res.json();

        setCurriencies(Object.keys(data));
      } catch (error) {
        console.log("Error Fetching: ", error.msg);
      }
    };
    fetch_currency();
  }, []);

  console.log(currencies);

  // Conversion:
  // https://api.frankfurter.app/latest?base=${from}&symbols=${to}
  useEffect(() => {
    const conversion = async () => {
      if (!amount) return;
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?base=${fromCurrency}&symbols=${toCurrency}`
        );
        const data = await res.json();

        const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
        setConvertedAmount(convertedAmount + " " + toCurrency);
      } catch (error) {
        console.log("Error Fetching: ", error.msg);
      }
    };
    conversion();
  }, [fromCurrency, toCurrency, amount]);

  // Swap Currency:
  const SwapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // --------------------------
  return (
    <div className="w-full bg-white shadow-sm rounded-lg p-5">
      <h2 className="text-2xl mb-5 font-semibold text-gray-700">
        Currency Convertor
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CurrencyDropdown
          currencies={currencies}
          title="From:"
          setCurrency={setFromCurrency}
          currency={fromCurrency}
        />

        <div className="flex justify-center -mb-5">
          <button
            className="text-3xl rounded-full cursor-pointer active:scale-90"
            onClick={SwapCurrency}
          >
            🔄
          </button>
        </div>

        <CurrencyDropdown
          currencies={currencies}
          title="To:"
          setCurrency={setToCurrency}
          currency={toCurrency}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block font-medium text-sm text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 mt-1 shadow-sm"
        />
      </div>

      {convertedAmount && (
        <div className="text-right text-green-600 text-xl mt-4 font-medium">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConvert;
