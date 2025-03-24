import React, { useState, useRef, useEffect } from "react";
import currencyData from "../../api/Common-Currency.json";

interface Account {
  id: number;
  currency: string;
  investorId?: number;
  createdAt?: string;
}

interface CurrencyDropdownProps {
  currency: Account[] | undefined; // Accepts the `investor.accounts` array or undefined
  setSelectCurrency:any
}

type CurrencyData = {
  [key: string]: {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
  };
};

const typedCurrencyData: CurrencyData = currencyData;

// Utility function to map currency codes to details from JSON
const getCurrencyDetails = (currencyCode: string) => {
  return typedCurrencyData[currencyCode] || { symbol: currencyCode, name: currencyCode };
};


const CurrencyDropdown: React.FC<any> = ({ currency, setSelectCurrency }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<any>();
  useEffect(() => {

    setSelectedCurrency({
      id:currency?.[0]?.id,
      name: currency?.[0]?.name || null, // Default to first item or "USD"
      symbol: currency?.[0]?.symbol // Default symbol
    })
  }, [currency])

  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => setIsActive((prev) => !prev);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      buttonWrapperRef.current &&
      !buttonWrapperRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    setSelectCurrency(selectedCurrency)
    localStorage.setItem('currencyId', JSON.stringify(selectedCurrency))
  }, [selectedCurrency, setSelectCurrency])

  return (
    <>
    {
      selectedCurrency ?
        <div className="_buttons_section_items">
          <div
            data-select="currencyDropdownWrapper"
            className="_dropdown_button_menu_wrapper"
            ref={buttonWrapperRef}
          >
            {/* Button */}
            <div className="_dropdown_button_wrapper _dropdown_button_wrapper_modified">
              <button
                data-select="currencyDropdownButton"
                className="_dropdown_button _dropdown_button_modified"
                onClick={handleButtonClick}
                style={{whiteSpace:'nowrap'}}
              >
                <span>{selectedCurrency?.symbol}</span>{" "}
                {selectedCurrency.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            <div
              data-select="currencyDropdownMenu"
              className={`_dropdown_button_menu _dropdown_button_menu_modified ${
                isActive ? "_activeDropBtnMenu" : ""
              }`}
            >
              <div className="_dropdown_button_menu_options">
                {currency?.map((account:any) => (
                  <div
                    key={account.id}
                    className="_dropdown_button_menu_option"
                    onClick={() => {
                      setSelectedCurrency({
                        id:account.id,
                        name: account.name,
                        symbol: account.symbol,
                      });
                      setIsActive(false); // Close the menu
                    }}
                  >
                    {account.symbol} {account.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    :
    null
  }
  </>
  );
};

export default CurrencyDropdown;
