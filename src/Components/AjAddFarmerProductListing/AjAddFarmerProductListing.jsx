import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customCommonStyles } from "../../Style/CommonStyle";
import AjCustomTable from "../AjCustomTable/AjCustomTable";
import { updateProductAction } from "../../Redux/FarmingAssociation/Farmers/farmersActions";
import { textCapitalize } from "../../Services/commonService/commonService";

const AjAddFarmerProductListing = (props) => {
  const productData = useSelector((state) => state.farmers.productData);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const tableHeader = [
    { field: "Product Name", width: "30%" },
    { field: "Yield", width: "30%" },
    { field: "Unit of Yield", width: "30%" },
    { field: "", cellRenderer: true },
  ];

  const deleteLand = (index) => {
    const newProductData = productData?.productListing?.filter((item, idx) => {
      if (idx !== index) {
        return item;
      }
    });
    dispatch(
      updateProductAction({
        singleProduct: null,
        productListing: newProductData,
      })
    );
    props.onDelete();
  };

  const actionsArray = [
    {
      name: "Delete",
      type: "error",
      actionClickHandler: deleteLand,
      disableDelete: props.disableDelete,
    },
  ];

  useEffect(() => {
    const dataSet = productData?.productListing?.map((item, index) => {
      const productListData = {
        "Product Name": item.productName,
        Yield: item.yield,
        "Unit of Yield": textCapitalize(item.unit_of_measurement),
        id: index,
      };
      return productListData;
    });
    setData(dataSet);
  }, [productData]);

  return (
    <>
      {productData?.productListing?.length ? (
        <AjCustomTable
          columnDefs={tableHeader}
          rowData={data}
          pagination={false}
          actions={actionsArray}
          tableWrapperStyles={customCommonStyles.tableWrapperStyles}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AjAddFarmerProductListing;
