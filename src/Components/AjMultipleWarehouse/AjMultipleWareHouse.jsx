import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../Services/toast";

import AjButton from "../AjButton";
import AjTypography from "../AjTypography";
import AjWareHouseQuantity from "../AjWareHouseQuantity/AjWareHouseQuantity";

import { ellipsisOnDropdownValues, textCapitalize } from "../../Services/commonService/commonService";
import {
  getInventoryWarehouseList,
  getInventoryWarehouseListAction,
} from "../../Redux/FarmingAssociation/Inventory/inventoryActions";
import { commonStyles } from "../../Style/CommonStyle";
import { styles as multipleWareHouseStyles } from "./AjMultipleWarehouseStyles";

export const AjMultipleWareHouse = (props) => {
  const {
    selectedProductDetails,
    selectedQualityType,
    selectedProductType,
    submit,
    defaultValue,
    data,
    selectedBatchType,
    selectedProductUnit,
  } = props;

  const dispatch = useDispatch();

  const [temporaryWareHouseData, setTemporaryWareHouseData] = useState();
  const [warehouse, setWarehouse] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [totalBatchSize, setTotalBatchSize] = useState(0);
  const [quantityValid, setQuantityValid] = useState();

  let inventoryWareHouseList = useSelector(
    (state) => state.inventory.inventoryWarehouseList
  );

  const formatData = (wareHouseData) => {
    return wareHouseData
      ?.filter((item) => item.available_quantity > 0)
      .map((item) => {
        return {
          wareHouseName: `${ellipsisOnDropdownValues(item.warehouse_name)} - (${
            item.available_quantity
          } ${textCapitalize(item.unit_of_measurement)} available)`,
          availableQuantity: item.available_quantity,
          id: item.warehouse_id,
        };
      });
  };

  const onChangeProductQuantity = (
    changeProductDetails,
    changeQualityType,
    changeProductType
  ) => {
    if (!changeProductDetails || !changeQualityType || !changeProductType)
      return;
    const searchObject = {
      productId: changeProductDetails?.id,
      quality: changeQualityType?.value,
      productType: changeProductType?.value,
    };
    dispatch(getInventoryWarehouseListAction(searchObject));
  };

  useEffect(() => {
    if (submit) {
      isDataValid();
    }
  }, [submit]);

  useEffect(() => {
    let temporaryWarehouseDataLength = temporaryWareHouseData?.length;
    if (
      temporaryWarehouseDataLength === 1 ||
      temporaryWarehouseDataLength === 0 ||
      inventoryWareHouseList?.result?.result.length === 1 ||
      temporaryWareHouseData === undefined
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [temporaryWareHouseData]);

  useEffect(() => {
    setWarehouse([{}]);
    setTemporaryWareHouseData(undefined);
    onChangeProductQuantity(
      selectedProductDetails,
      selectedQualityType,
      selectedProductType
    );
  }, [
    selectedProductDetails,
    selectedQualityType,
    selectedBatchType,
    selectedProductType,
  ]);

  useEffect(() => {
    if (!inventoryWareHouseList) return;
    if (inventoryWareHouseList?.result) {
      setTemporaryWareHouseData(
        formatData(inventoryWareHouseList?.result?.result)
      );
    }
  }, [inventoryWareHouseList]);

  useEffect(() => {
    return () => {
      dispatch(getInventoryWarehouseList({}));
    };
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setWarehouse(defaultValue);
    } else {
      addWareHouseDropDown();
    }
  }, [defaultValue]);

  const isDataValid = () => {
    const wareHouseValid = warehouse.slice();
    let isInvalid = null;
    _.forEach(wareHouseValid, function (item) {
      if (!item.quantity || !item.warehouseData) {
        isInvalid = true;
      }
      if (parseInt(item.quantity) < 0) {
        isInvalid = false;
      }
    });
    if (isInvalid) {
      data(null);
    } else {
      data(wareHouseValid, quantityValid);
    }
  };

  const addMoreWareHouseHandler = () => {
    const extractWarehouse = warehouse.slice();
    const lastItem = _.last(extractWarehouse);
    if (lastItem.quantity && lastItem.warehouseData) {
      addWareHouseDropDown();
    } else {
      showToast("Please select quantity", "error");
    }
  };

  const getData = (wareHouseData, index) => {
    const newWarehouse = warehouse.slice();
    newWarehouse[index] = wareHouseData;
    setWarehouse(newWarehouse);
    const lastItem = _.last(newWarehouse);
    if (lastItem.quantity <= 0 || lastItem.quantity > 1000000 || temporaryWareHouseData.length === 1) {
      setDisableButton(true);
    } else if (lastItem.quantity > 0) {
      setDisableButton(false);
    }
    const totalBatch = newWarehouse.reduce((prev, warehouseData) => {
      return prev + parseFloat(warehouseData.quantity || 0);
    }, 0);
    setTotalBatchSize(totalBatch);
  };

  const addWareHouseDropDown = () => {
    const extractWarehouse = warehouse.slice();
    const tempArr = extractWarehouse?.map(
      (document) => document?.warehouseData?.id
    );
    const defaultWarehouseData = inventoryWareHouseList?.result?.result.filter(
      (temp) => !tempArr.includes(temp.warehouse_id)
    );

    setTemporaryWareHouseData(formatData(defaultWarehouseData));
    extractWarehouse.push({});
    setWarehouse(extractWarehouse);
  };

  const deleteItem = (index) => {
    const extractWarehouse = warehouse.slice();
    const { warehouseData: deletedElement, quantity: currQuantity } =
      extractWarehouse.splice(index, 1)[0];
    const selected = new Set();

    for (let i = 0; i < warehouse.length - 1; ++i)
      selected.add(warehouse[i].warehouseData.id);

    selected.delete(deletedElement.id);

    if (index === warehouse.length - 1)
      selected.delete(warehouse[index - 1].warehouseData.id);

    const newTempData = formatData(
      inventoryWareHouseList?.result?.result.filter(
        (temp) => !selected.has(temp.warehouse_id)
      )
    );

    setWarehouse(() => {
      setTemporaryWareHouseData(newTempData);
      return extractWarehouse;
    });
    let batchSize = (totalBatchSize - parseFloat(currQuantity || 0)).toFixed(2);
    setTotalBatchSize(batchSize);
  };

  const quantityData = (quantityValidData) => {
    setQuantityValid(quantityValidData);
  };

  return (
    <>
      {warehouse?.map((item, index) => {
        return (
          <AjWareHouseQuantity
            wareHouseData={temporaryWareHouseData}
            onChange={(wareHouseChangeData) =>
              getData(wareHouseChangeData, index)
            }
            onDelete={() => deleteItem(index)}
            isLabel={index === 0 ? true : false}
            index={index}
            length={warehouse.length}
            defaultValue={item}
            selectedBatchType={selectedBatchType}
            selectedProductUnit={selectedProductUnit}
            selectedProductDetails={selectedProductDetails}
            selectedQualityType={selectedQualityType}
            selectedProductType={selectedProductType}
            disableInput={disableButton}
            submit={submit}
            quantityData={quantityData}
          />
        );
      })}
      {selectedBatchType === "WHOLESALE" && (
        <>
          <AjButton
            variant="text"
            displayText="Add more quantity from another warehouse"
            styleData={{
              ...commonStyles.underlineStyle,
              ...commonStyles.moreCertificateButton,
            }}
            textStyle={multipleWareHouseStyles.addMoreBtn}
            isDisable={disableButton}
            onClick={addMoreWareHouseHandler}
          />
          <AjTypography
            styleData={commonStyles.inputLabel}
            displayText={`Total Batch Size ${totalBatchSize}`}
          />
        </>
      )}
    </>
  );
};
