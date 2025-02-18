import React, { useState, useEffect } from "react";
import AjTruckQuantity from "../AjTruckQuantity/AjTruckQuantity";
import { useSelector, useDispatch } from "react-redux";
import {
  getMasterData,
  getMasterDataAction,
} from "../../Redux/common/GetMasterData/getMasterDataActions";
import { commonStyles } from "../../Style/CommonStyle";
import AjButton from "../AjButton";
import * as _ from "lodash";
import { showToast } from "../../Services/toast";
import { Box } from "@mui/material";

export const styles = {
  multipleTruck: {
    "@media(max-width:600px)": {
      minWidth: "15rem",
      display: "flex",
      flexDirection: "column",
    },
  },
};

const AjMultipleTruck = (props) => {
  const { submit, data, disableReq } = props;
  const [trucks, setTrucks] = useState([]);
  const [temporaryTrucksData, setTemporaryTrucksData] = useState();
  const [disableButton, setDisableButton] = useState(false);

  const [truckCountValid, setTruckCountValid] = useState();

  const dispatch = useDispatch();
  const masterData = useSelector((state) => state.masterData.masterData);
  useEffect(() => {
    dispatch(getMasterDataAction({ itemType: "TYPE_OF_TRUCK" }));
    return () => dispatch(getMasterData(null));
  }, []);

  useEffect(() => {
    if (masterData) {
      setTemporaryTrucksData(masterData);
    }
  }, [masterData]);

  useEffect(() => {
    if (submit) {
      isDataValid();
    }
  }, [submit]);

  useEffect(() => {
    if (temporaryTrucksData?.length === 1 || masterData?.length === 1) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [temporaryTrucksData]);

  useEffect(() => {
    if (props.defaultValue) {
      if (props.defaultValue.length > 0) {
        setTrucks(props.defaultValue);
      }
    } else {
      addTruckDropDown();
    }
  }, [props.defaultValue]);

  const isDataValid = () => {
    const truckValid = trucks.slice();
    let isInvalid = null;
    _.forEach(truckValid, function (item) {
      if (!item.truckCount || !item.truckData) {
        isInvalid = true;
      }
      if (parseInt(item.truckCount) < 0) {
        isInvalid = false;
      }
    });
    if (isInvalid) {
      data(null);
    } else {
      data(truckValid, truckCountValid);
    }
  };

  const addMoreTruckHandler = () => {
    const newTrucks = trucks.slice();
    const lastItem = _.last(newTrucks);
    if (lastItem.truckCount && lastItem.truckData) {
      addTruckDropDown();
    } else {
      showToast("Please enter quantity", "error");
    }
  };

  const addTruckDropDown = () => {
    const newTrucks = [...trucks];

    const tempArr = newTrucks?.map((document) => document?.truckData?.id);
    const defaultMasterData = masterData?.filter(
      (temp) => !tempArr.includes(temp.id)
    );
    setTemporaryTrucksData(defaultMasterData);
    newTrucks.push({});
    setTrucks(newTrucks);
  };

  const getData = (dataOfTruck, index) => {
    const newTrucks = trucks.slice();
    newTrucks[index] = dataOfTruck;
    setTrucks(newTrucks);
    const lastItem = _.last(newTrucks);
    if (
      lastItem.truckCount <= 0 ||
      temporaryTrucksData.length === 1 ||
      lastItem.truckCount > 1000
    ) {
      setDisableButton(true);
    } else if (lastItem.truckCount > 0) {
      setDisableButton(false);
    }
  };

  const deleteItem = (deletedTruckData, deletedTruckIndex) => {
    if (trucks.length) {
      setTrucks((newTrucks) => {
        return newTrucks.filter(
          (truck, truckIndex) => truckIndex !== deletedTruckIndex
        );
      });
      const deletedTruck = _.find(masterData, {
        id: deletedTruckData?.truckData.id,
      });
      setTemporaryTrucksData((previousTrucks) => [
        ...previousTrucks,
        deletedTruck,
      ]);
    }
  };

  const truckCountData = (dataValid) => {
    setTruckCountValid(dataValid);
  };
  return (
    <>
      <Box sx={styles.multipleTruck}>
        {trucks?.map((truck, index) => {
          return (
            <AjTruckQuantity
              masterData={temporaryTrucksData}
              isLabel={true}
              onChange={(truckData) => getData(truckData, index)}
              onDelete={(truckData) => deleteItem(truckData, index)}
              defaultValue={truck}
              truckCountData={truckCountData}
              index={index}
              key={index}
              length={trucks?.length}
              disableReq={disableReq}
            />
          );
        })}
        <AjButton
          variant="text"
          displayText="Add more trucks"
          styleData={{
            ...commonStyles.underlineStyle,
            ...commonStyles.moreCertificateButton,
            ...(disableReq && { display: "none" }),
          }}
          isDisable={disableButton}
          onClick={addMoreTruckHandler}
        />
      </Box>
    </>
  );
};
export default AjMultipleTruck;
