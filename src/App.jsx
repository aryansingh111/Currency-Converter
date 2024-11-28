import React, { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import image from "./images/bgimage.jpg";
import { MdOutlineSwapVert } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";


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
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white/30 backdrop-blur-sm rounded-lg p-5 shadow-2xl">
        {/* Left Section: Heading (Visible only on larger screens) */}
        <div className="w-full lg:w-1/3 flex items-center justify-center p-5">
          {/* Top Heading: Hidden on Desktop */}
          <h1 className="block lg:hidden text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 drop-shadow-lg shadow-indigo-600/50 ml-5">
            Currency Calculator
          </h1>

          {/* Side Logo: Visible on Desktop */}
          <BsCurrencyExchange className="text-9xl logo-curr text-blue-500"/>
        </div>

        {/* Right Section: Currency Converter Form (Responsive layout for mobile and large screens) */}
        <div className="w-full lg:w-2/3">
          <div className="w-full mb-5 lg:mb-0 flex justify-center lg:justify-start">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 drop-shadow-lg shadow-indigo-600/50">
              Currency Calculator
            </h1>
          </div>

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
                Swap <MdOutlineSwapVert className="text-2xl ml-1.5" />
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
