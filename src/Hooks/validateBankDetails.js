import call from "../API";
import React, { useState } from "react";
import ngBanks from "ng-banks";

export const useValidateBankDetails = () => {
  const [bankPayload, setBankPayload] = useState(null);
  //const [loading, setLoading] = useState(false);
  const validateBankReqm = (bankDetails) => {
    return async (dispatch) => {
      try {
        const response = await call({
          method: "post",
          endpoint: "api/payment/validation/bank-details",
          payload: {
            bankCode: bankDetails.bankCode,
            accountNumber: bankDetails.accountNumber,
          },
          dispatch,
        });
        setBankPayload(response.body);
      } catch (error) {
        setBankPayload({ isError: true, message: "Bank Validation failed." });
      }
    };
  };

  const getBanklist = () => {
    return ngBanks
      .getBanks()
      .map((bank) => ({ label: bank.name, bankCode: bank.code }));
  };

  const getBank = (bankName) => {
    return getBanklist().filter((item) => item.label === bankName);
  };
  return [validateBankReqm, bankPayload, getBanklist, getBank];
};
