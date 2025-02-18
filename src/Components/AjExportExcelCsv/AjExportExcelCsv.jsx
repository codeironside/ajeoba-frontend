import React, { useRef } from "react";
import * as moment from "moment";
import { Button, Grid } from "@mui/material";
import { exportExcelCsvDoc } from "../../Redux/common/Document/documentActions";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";

const AjExportExcelCsv = (props) => {
  const {
    url,
    isCsv = true,
    isExcel = true,
    searchData,
    dataInfo,
    totalCount,
    reqBody,
  } = props;
  const isCsvDoc = useRef();

  const downloadDoc = (e) => {
    e.preventDefault();
    if (!url) return;
    let filteredDoc = {
      isCsv: isCsvDoc.current,
    };
    if (reqBody) {
      filteredDoc = {
        ...filteredDoc,
        ...reqBody,
      };
    }
    if (searchData?.length) {
      filteredDoc = {
        ...filteredDoc,
        filterText: searchData,
      };
    }
    if (dataInfo?.products?.length) {
      filteredDoc = {
        ...filteredDoc,
        products: JSON.stringify(dataInfo.products),
      };
    }
    if (dataInfo?.startDate) {
      filteredDoc = {
        ...filteredDoc,
        from: moment(dataInfo?.startDate).format("L"),
        to: moment(dataInfo?.endDate).format("L"),
      };
    }
    if (dataInfo?.inputs?.length) {
      filteredDoc = {
        ...filteredDoc,
        inputs: JSON.stringify(dataInfo?.inputs),
      };
    }
    exportExcelCsvDoc(url, filteredDoc, { isCsv: isCsvDoc.current });
  };

  const exportCsvHandler = (e) => {
    isCsvDoc.current = "true";
    downloadDoc(e);
  };
  const exportExcelHandler = (e) => {
    isCsvDoc.current = "false";
    downloadDoc(e);
  };

  return (
    <Grid sx={customCommonStyles.subHeaderStyle}>
      {isCsv && (
        <Button
          disabled={totalCount === 0 ? true : false}
          sx={{
            ...commonStyles.exportBtn,
            ...(totalCount === 0 && commonStyles.disableColor),
          }}
          onClick={exportCsvHandler}
        >
          Export CSV
        </Button>
      )}
      {isExcel && (
        <Button
          disabled={totalCount === 0 ? true : false}
          sx={{
            ...commonStyles.exportBtn,
            ...(totalCount === 0 && commonStyles.disableColor),
          }}
          onClick={exportExcelHandler}
        >
          Export EXCEL
        </Button>
      )}
    </Grid>
  );
};

export default AjExportExcelCsv;
