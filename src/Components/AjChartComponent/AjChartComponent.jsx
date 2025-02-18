import { React, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AjLineChart from "../AjLineChart/AjLineChart.jsx";
import loaderDotsImage from "../../Assets/Images/loaderDotsImage.svg";
import { ACTIVE_GREEN } from "../../Constant/ColorConstant";
import { styles } from "./AjChartComponentStyles";

export default function AjChartComponent({ chartId, chartData }) {
  const chartOptions = {
    responsive: true,
    elements: {},
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        backgroundColor: ACTIVE_GREEN,
        yAlign: "bottom",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        beginAtZero: true,
      },
    },
  };

  let chartDefaultData = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: ACTIVE_GREEN,
        fill: "start",
        pointRadius: 0,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(109, 158, 63, 0.12)");
          gradient.addColorStop(1, "rgba(109, 158, 63, 0.01)");
          return gradient;
        },
        tension: 0.39,
      },
    ],
  };

  const [data, setData] = useState(chartDefaultData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (chartData?.length) {
      let xAxisData = chartData?.map((xData) => {
        return xData.key;
      });
      let yAxisData = chartData?.map((yData) => {
        return yData.value;
      });
      chartDefaultData.labels = xAxisData;
      chartDefaultData.datasets[0].data = yAxisData;

      let label = "";
      if (chartId === "sales") {
        label = "Product sold";
      } else if (chartId === "revenue") {
        label = "Revenue generated";
      } else if (chartId === "productAggregate") {
        label = "Product aggregated";
      } else if (chartId === "inputPurchased") {
        label = "Input purchased";
      }
      chartDefaultData.datasets[0].label = label;
    }
    setData(chartDefaultData);
    setLoading(false);
  }, [chartData]);

  return (
    <>
      <Box sx={styles.chartContainer}>
        {loading ? (
          <>
            <Typography
              sx={styles.chartLoaderDotsImage}
              component="img"
              src={loaderDotsImage}
            />
            <AjLineChart data={data} options={chartOptions} id={chartId} />
          </>
        ) : (
          <AjLineChart data={data} options={chartOptions} id={chartId} />
        )}
      </Box>
    </>
  );
}
