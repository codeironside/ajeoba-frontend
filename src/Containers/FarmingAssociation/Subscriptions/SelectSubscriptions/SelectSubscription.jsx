import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { subscriptionSchema } from "../subscription";
import { Box, Grid, Checkbox, makeStyles } from "@mui/material";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

import AjConfirmModal from "../../../../Components/AjConfirmModal/AjConfirmModal";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjTypography from "../../../../Components/AjTypography";
import AjButton from "../../../../Components/AjButton";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";

import { getFarmerListAction } from "../../../../Redux/FarmingAssociation/Farmers/farmersActions";
import {
  farmersSubscriptionAction,
  getAllSubscriptions,
} from "../../../../Redux/SuperAdmin/Subscription/subscriptionActions";

import * as moment from "moment";

const SelectSubscription = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subscriptionSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const farmerList = useSelector((state) => state.farmers.farmerList);
  const { farmerSubscriptionIndex, subscriptionCurrency, allSubscriptions } =
    useSelector((state) => state.subscription);

  useEffect(() => {
    let searchObject = {
      limit: null,
      skip: 0,
    };
    dispatch(getFarmerListAction(searchObject));
    dispatch(getAllSubscriptions());
  }, []);

  const [data, setData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedFarmers, setSelectedFarmers] = useState([]);
  const [subscriptionType, setSubscriptionType] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const tableHead = [
    { field: "", checkbox: true },
    { field: "First name" },
    { field: "Last name" },
    { field: "Status" },
    { field: "Phone Number" },
    { field: "Added On" },
    { field: "", cellRenderer: true },
  ];

  useEffect(() => {
    const dataSet = farmerList?.result?.map((item) => {
      const subData = {
        "": (
          <input
            type="checkbox"
            checked={item.Select}
            onChange={() => handleCheckboxChange(item.id)}
          />
        ),
        id: item.id,
        "First name": item.first_name,
        "Last name": item.last_name,
        "Phone Number": item.mobile_no,
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        Status: item.is_active === true ? "Active" : "Inactive",
      };
      return subData;
    });
    setData(dataSet);
  }, [farmerList]);

  const subscriptionOptions = allSubscriptions?.map((subscription) => ({
    duration: `${subscription.duration} months`,
    // duration: subscription.duration,
    cost: subscription.cost,
    subscriptionId: subscription.id,
  }));

  const handleSubscriptionTypeSelection = (selectedValue) => {
    const selectedSubscriptionType = subscriptionOptions?.find(
      (subscription) => subscription.duration === selectedValue.target.value
    );
    setSubscriptionType(selectedSubscriptionType);

    setValue("subDuration", toString(selectedSubscriptionType));
  };

  useEffect(() => {
    if (subscriptionType) {
      const totalAmount =
        selectedFarmers.length * (subscriptionType?.cost || 0);
      setTotalAmount(totalAmount);
    }
  }, [selectedFarmers, subscriptionType]);

  const handleSubscriptionButton = () => {
    const subscriptionId = subscriptionType?.subscriptionId;

    const reqBody = {
      farmerIds: selectedFarmers?.map((farmer) => farmer.id.toString()),
      farmer_subscription_type: "SELECTED_FARMER",
      farmerCount: selectedFarmers.length,
      subscription_type: "FARMER_ASSOCIATION",
    };
    dispatch(farmersSubscriptionAction(reqBody, subscriptionId, navigate));
  };

  const handleSubscriptionModal = () => {
    setOpenDialog(true);
  };

  const handleCheckboxChange = (id) => {
    setData((prevData) =>
      prevData?.map((row) =>
        row.id === id ? { ...row, Select: !row.Select } : row
      )
    );

    setSelectedFarmers((prevSelectedFarmers) => {
      const isFarmerSelected = prevSelectedFarmers.some(
        (farmer) => farmer.id === id
      );
      if (isFarmerSelected) {
        return prevSelectedFarmers.filter((farmer) => farmer.id !== id);
      } else {
        const selectedFarmer = farmerList?.result.find(
          (farmer) => farmer.id === id
        );
        return [...prevSelectedFarmers, selectedFarmer];
      }
    });

    setValue("noOfFarmers", selectedFarmers?.length);
  };

  return (
    <>
      {farmerList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <AjCustomTable
              columnDefs={tableHead}
              rowData={data}
              pagination={false}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Box>
          {farmerList?.result?.length > 0 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: "4rem auto",
                  width: "80%",
                  gap: "0",
                  paddingBottom: "2rem",
                  "@media (max-width: 600px)": {
                    width: "80%",
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <AjTypography
                      styleData={{
                        fontWeight: "bold",
                        textAlign: "left",
                        "@media (max-width: 600px)": {
                          fontSize: ".8rem",
                          fontWeight: "semi-bold",
                        },
                      }}
                      name="noOfFarmers"
                      displayText={`Total Farmers:`}
                    />
                    <AjTypography
                      styleData={{
                        fontWeight: "bold",
                        textAlign: "left",
                        "@media (max-width: 600px)": {
                          fontSize: ".8rem",
                          fontWeight: "semi-bold",
                        },
                      }}
                      displayText={selectedFarmers?.length}
                    />
                  </Box>
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.noOfFarmers?.message}
                  />
                </Box>
                <Box>
                  <Box
                    key={farmerSubscriptionIndex?.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "@media (max-width: 600px)": {
                        gap: "2rem",
                      },
                    }}
                  >
                    <AjTypography
                      styleData={{
                        fontWeight: "bold",
                        textAlign: "left",
                        "@media (max-width: 600px)": {
                          fontSize: ".8rem",
                          fontWeight: "semi-bold",
                        },
                      }}
                      displayText={`Duration:`}
                    />

                    <AjDropDown
                      options={subscriptionOptions}
                      value={subscriptionType?.duration || ""}
                      onChange={(selectedValue) =>
                        handleSubscriptionTypeSelection(selectedValue)
                      }
                      source="duration"
                      id="subscriptionId"
                      placeHolder="Select duration"
                      name="subDuration"
                      styleData={{
                        ...commonStyles.ajDropDownEllipsisSelectSub,
                      }}
                    />
                  </Box>
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.subDuration?.message}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <AjTypography
                    styleData={{
                      fontWeight: "bold",
                      textAlign: "left",
                      "@media (max-width: 600px)": {
                        fontSize: ".8rem",
                        fontWeight: "semi-bold",
                      },
                    }}
                    displayText={`Total Subscription Amount:`}
                  />

                  <AjTypography
                    styleData={{
                      fontWeight: "bold",
                      textAlign: "right",
                      "@media (max-width: 600px)": {
                        fontSize: ".8rem",
                        fontWeight: "semi-bold",
                      },
                    }}
                    displayText={`${subscriptionCurrency} ${totalAmount}`}
                  />
                </Box>
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <AjButton
                      variant="text"
                      styleData={customCommonStyles.addButtonStyleSubSelect}
                      displayText="Subscribe"
                      onClick={handleSubmit(handleSubscriptionModal)}
                    />
                  </Box>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      )}
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.dialogContainer}
      >
        <AjConfirmModal
          displayText={`Proceed to Subscribe selected farmers?`}
          closeModal={setOpenDialog}
          onConfirm={() => handleSubscriptionButton()}
        />
      </AjDialog>
    </>
  );
};

export default SelectSubscription;
