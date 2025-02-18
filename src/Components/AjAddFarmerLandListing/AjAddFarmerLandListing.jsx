import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import AjTypography from "../AjTypography";
import { useDispatch, useSelector } from "react-redux";
import { customCommonStyles, commonStyles } from "../../Style/CommonStyle";
import AjCustomTable from "../AjCustomTable/AjCustomTable";
import { updateLandAction } from "../../Redux/FarmingAssociation/Farmers/farmersActions";

const AjAddFarmerLandListing = (props) => {
  const { openDialog, forView } = props;

  const landData = useSelector((state) => state.farmers.landData);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const tableHeader = [
    { field: "Type of Soil", width: "30%" },
    { field: "Land Size (Hectare)", width: "50%" },
    { field: "", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  const deleteLand = (index) => {
    const newLandData = landData?.landListing?.filter((item, idx) => {
      if (idx !== index) {
        return item;
      }
    });
    dispatch(updateLandAction({ landDetails: null, landListing: newLandData }));
  };

  const viewLand = (index) => {
    const viewLandDetails = landData?.landListing?.find((item, idx) => {
      if (idx === index) {
        return item;
      }
    });

    dispatch(
      updateLandAction({
        landDetail: viewLandDetails,
        landListing: landData?.landListing,
      })
    );
    openDialog(true);
  };

  const actionsArray = [
    {
      name: "Delete",
      type: "error",
      actionClickHandler: deleteLand,
      disableDelete: props.disableDelete,
    },
    {
      name: "View",
      type: "anchor",
      actionClickHandler: viewLand,
    },
  ];

  useEffect(() => {
    const dataSet = landData?.landListing?.map((item, index) => {
      const landListData = {
        "Type of Soil": item.typeOfSoil,
        "Land Size (Hectare)": item.landSize,
        id: index,
      };
      return landListData;
    });
    setData(dataSet);
  }, [landData]);

  return (
    <>
      {!!landData?.landListing?.length ? (
        <AjCustomTable
          columnDefs={tableHeader}
          rowData={data}
          pagination={false}
          actions={actionsArray}
          tableWrapperStyles={customCommonStyles.tableWrapperStyles}
        />
      ) : (
        typeof forView !== "undefined" &&
        !props.forView && (
          <Box
            sx={{
              ...commonStyles.noContentBox,
              ...commonStyles.heightStyle,
            }}
          >
            <AjTypography
              styleData={commonStyles.noDataText}
              displayText="No land has been added. Please add land"
            />
          </Box>
        )
      )}
    </>
  );
};

export default AjAddFarmerLandListing;
