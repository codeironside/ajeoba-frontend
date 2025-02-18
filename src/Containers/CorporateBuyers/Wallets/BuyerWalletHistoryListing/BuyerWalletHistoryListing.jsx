import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import arrowDown from "../../../../Assets/Images/icons8-arrow-16 (2).png";
import arrowUp from "../../../../Assets/Images/icons8-arrow-16 (3).png";
import { getTransactionHistoryAction } from "../../../../Redux/FarmingAssociation/Dashboard/dashboardActions";
import {
  getCurrencySymbol,
  removeUnderScore,
} from "../../../../Services/commonService/commonService";
import { getUserData } from "../../../../Services/localStorageService";

function BuyerWalletHistoryListing() {
  const dispatch = useDispatch();
  const userData = getUserData();

  const transactionHistory = useSelector((state) => state.dashboard.history);

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const tableHead = [
    { field: "Transaction Amount" },
    { field: "Transaction Type" },
    { field: "Transaction Created On" },
    { field: "Transaction Reason" },
    { field: "Transaction Status" },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    dispatch(getTransactionHistoryAction(searchObject));
  }, [query]);

  useEffect(() => {
    const dataSet = transactionHistory?.result?.map((transaction) => {
      const transactionData = {
        "Transaction Amount":
          transaction.amount !== null ? (
            <>
              {transaction.type === "CREDIT" ? (
                <img src={arrowUp} alt="arrowup" />
              ) : (
                <img src={arrowDown} alt="arrowdown" />
              )}
              <span>{getCurrencySymbol(userData?.currency)}</span>
              <span>{transaction.amount}</span>
            </>
          ) : (
            "-"
          ),
        "Transaction Type": transaction.type !== null ? transaction.type : "-",
        "Transaction Created On":
          transaction.created_at !== null ? transaction.created_at : "-",
        "Transaction Reason":
          transaction.reason !== null
            ? removeUnderScore(transaction.reason)
            : "-",
        "Transaction Status":
          transaction.status !== null ? transaction.status : "-",
      };
      return transactionData;
    });
    setData(dataSet);
  }, [transactionHistory]);

  return (
    <>
      <AjCustomTable
        columnDefs={tableHead}
        rowData={data}
        pagination={true}
        query={query}
        setQuery={setQuery}
        totalCount={transactionHistory?.totalCount}
      />
    </>
  );
}

export default BuyerWalletHistoryListing;
