import React, { useState } from "react";
import { Loader } from "./Loader";

const TransactionList: React.FC<any> = ({ data, currency }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4; // Display 5 rows per page

  // Calculate paginated data
  const startIndex = currentPage * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  // Change page
  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const formatDateTime = (inputDate: string): string => {
    const date = new Date(inputDate); // Convert ISO string to Date object
  
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // 12-hour format
    };
  
    // Format the date and time
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    // Replace the comma with "I" and return the formatted string
    return formattedDate.replace(',', ' I');
  };

  return (
    <div style={{ padding: "20px" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {paginatedData.map((transaction: any, index: number) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            {/* Status Icon */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: transaction.credited ? "#4CAF50" : "#F44336",
                  color: "#fff",
                }}
              >
                {transaction.credited ? "+" : "-"}
              </div>
              {/* Transaction Details */}
              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "4px",
                  }}
                >
                  {
                    transaction?.details && Object.keys(JSON.parse(transaction?.details))
                  }
                </div>
                <div style={{ color: "#999", fontSize: "14px" }}>
                  
                  {formatDateTime(transaction.createdDate)}
                </div>
              </div>
            </div>
            {/* Amount */}
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              {currency.currencySymbol}{transaction.amount}
            </div>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        {Array.from({ length: Math.ceil(data.length / rowsPerPage) }).map(
          (_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handleChangePage(pageIndex)}
              style={{
                border: "none",
                backgroundColor:
                  pageIndex === currentPage ? "#01276C" : "transparent",
                color: pageIndex === currentPage ? "#fff" : "#01276C",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {pageIndex + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

// Example usage
const TransactionTable: React.FC<any> = ({data, currency}) => {

  if(!data || data.length > 1) {
    <Loader/>
  }
  return (
    <div>
      <h2>Transaction List</h2>
      <TransactionList data={data} currency={currency} />
    </div>
  );
};

export default TransactionTable;
