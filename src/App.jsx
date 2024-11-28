import React, { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import image from "./images/bgimage.jpg";

export default function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="w-full max-w-6xl flex bg-white/30 backdrop-blur-sm rounded-lg p-5 shadow-2xl">
        {/* Left Section: Heading */}
        <div className="w-1/3 flex items-center justify-center p-5">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 drop-shadow-lg shadow-indigo-600/50 ml-5">
            Currency Calculator
          </h1>
        </div>

        {/* Right Section: Currency Converter Form */}
        <div className="w-2/3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
            className="p-5"
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(newAmount) => setAmount(newAmount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                readOnly
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>

            {/* Anchor Tag at the Bottom */}
            <div className="mt-4 text-center">
              <a
                href="https://aryan-singh-portfolio-latest.netlify.app/"
                className="text-blue-700 hover:text-blue-900 font-semibold underline sm:pr-0 sm:pt-4 lg:pr-96 lg:pt-16"
                target="_blank"
              >
                Created by Aryan Singh
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
