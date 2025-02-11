import React, { useState, useRef, useEffect } from "react";

interface Account {
  id: number;
  countryName: string;
  investorId?: number;
  createdAt?: string;
}

interface ProjectsDropdownProps {
  projects: Account[] | undefined; // Accepts the `investor.accounts` array or undefined
  setSelectCountry?:any;
  selectedProjectName?:any;
}


const CountryDropdown: React.FC<ProjectsDropdownProps> = ({ projects, setSelectCountry, selectedProjectName }) => {

  const [isActive, setIsActive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    id:projects?.[0]?.id,
    countryName: projects?.[0]?.countryName || null, // Default to first item or "USD"
  });

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

  // Sync with selectedProjectName
  useEffect(() => {
    if (selectedProjectName) {
      setSelectedCountry({
        id: selectedProjectName.id,
        countryName: selectedProjectName.countryName,
      });
    }
  }, [selectedProjectName]);

  useEffect(() => {
    setSelectCountry(selectedCountry.countryName);
  }, [selectedCountry, setSelectCountry]);

  return (
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
          >
            {selectedCountry.countryName}
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
          {Array.from(new Set(projects?.map((account) => account.countryName ?? null))).map((countryName, index) => (
              <div
                key={index}
                className="_dropdown_button_menu_option"
                onClick={() => {
                  const selectedAccount = projects?.find((account) => account.countryName === countryName);
                  setSelectedCountry({
                    id: selectedAccount?.id, // Ensure id is handled properly
                    countryName: selectedAccount?.countryName || null, // Ensure countryName is either string or null
                  });
                  setIsActive(false); // Close the menu
                }}
              >
                {countryName}
              </div>
            ))}


          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDropdown;
