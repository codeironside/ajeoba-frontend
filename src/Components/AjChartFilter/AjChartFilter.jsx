import { React, useState } from "react";
import { Typography, Box } from "@mui/material";
import AjChartExportButton from "../AjChartExportButton/AjChartExportButton";
import ImageIcon from "@mui/icons-material/Image";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { ACTIVE_GREEN } from "../../Constant/ColorConstant";

import AJSelect from "../AJSelect/AJSelect";
import { styles } from "./AjChartFilterStyles";
import { useEffect } from "react";

const AjChartFilter = (props) => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [year, setYear] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const currentYear = new Date().getFullYear();
  const [exportData, setExportData] = useState([]);
  const getArrayofArrays = (arr) => {
    // to set the data to be exported
    let arrayOfArrays = [];
    if (arr?.length) {
      const row1 = arr.map((data) => {
        return data.key;
      });
      const row2 = arr.map((data) => {
        return data.value;
      });
      arrayOfArrays.push(row1);
      arrayOfArrays.push(row2);
    }
    return arrayOfArrays;
  };
  useEffect(() => {
    // data from prop is coming in the format of response received from API
    if (props.id === "salesAndRevenue") {
      const data1 = props.data.productSold;
      const data2 = props.data.revenueEarned;
      let arr1 = getArrayofArrays(data1);
      let arr2 = getArrayofArrays(data2);
      setExportData([...arr1, ...arr2]);
    } else if (
      props.id === "productAggregate" ||
      props.id === "inputPurchased"
    ) {
      const id = props.id;
      const data = props.data[id];
      const arr = getArrayofArrays(data);
      setExportData(arr);
    }
  }, [props.data]);

  useEffect(() => {
    setProductsData(props.productsData);
  }, [props.productsData]);
  let yearsArray = [];
  for (let i = 0; i < 5; i++) {
    yearsArray.push(currentYear - i);
  }

  function changeTab(value) {
    setActiveTab(value);
    props.onMonthlyYearlyTabChange({ chartId: props.id, tabValue: value });
  }
  useEffect(() => {
    if (props.productId) {
      props.onIncreaseOrDecreaseYear({
        chartId: props.id,
        year: yearsArray[year],
      });
    }
  }, [year, props.productId]);

  function decreaseYearIndex() {
    if (year < 4) {
      setYear((prevYear) => prevYear + 1);
    }
  }
  function increaseYearIndex() {
    if (year > 0) {
      setYear((prevYear) => prevYear - 1);
    }
  }

  function onSelectChange(product) {
    props.onProductSelectChange({ chartId: props.id, product: product });
  }

  return (
    <Box sx={styles.filterContainer}>
      {props.id !== 2 ? (
        <>
          <Box sx={styles.leftFilterContainer}>
            <Box sx={styles.tabContainer}>
              <Typography
                onClick={() => changeTab("monthly")}
                sx={activeTab === "monthly" ? styles.activeTab : styles.tab}
              >
                Monthly
              </Typography>
              <Typography
                onClick={() => changeTab("yearly")}
                sx={activeTab === "yearly" ? styles.activeTab : styles.tab}
              >
                Yearly
              </Typography>
            </Box>

            {activeTab === "monthly" ? (
              <Box sx={styles.monthOrYearFilter}>
                <Typography sx={styles.arrow} onClick={decreaseYearIndex}>
                  &lt;
                </Typography>
                <Typography sx={styles.monthOrYearText}>
                  {yearsArray[year]}
                </Typography>
                <Typography sx={styles.arrow} onClick={increaseYearIndex}>
                  &gt;
                </Typography>
              </Box>
            ) : (
              <Box sx={{ width: "6rem" }}></Box>
            )}
          </Box>
          <Box sx={styles.rightFilterContainer}>
            {props.id !== 2 ? (
              <AJSelect
                onSelectChange={onSelectChange}
                data={productsData}
                selectedProductId={props.productId}
                source={props.source}
                metaSource={props.metaSource}
              />
            ) : (
              ""
            )}
            <AjChartExportButton
              heading="Export"
              id={props.id} // id of chart to download it in png
              data={exportData} // data in Array form to download it in csv or Excel
              options={[
                {
                  label: "Export Data table in CSV",
                  icon: <FileCopyIcon sx={{ color: ACTIVE_GREEN }} />,
                  exportIn: "csv",
                },
                {
                  label: "Export chart in PNG",
                  icon: <ImageIcon sx={{ color: ACTIVE_GREEN }} />,
                  exportIn: "png",
                },
              ]}
            ></AjChartExportButton>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default AjChartFilter;
