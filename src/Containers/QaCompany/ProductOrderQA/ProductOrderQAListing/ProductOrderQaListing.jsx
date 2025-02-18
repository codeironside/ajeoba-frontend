import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { textCapitalize } from "../../../../Services/commonService/commonService";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../Components/AjTypography";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

import { styles as customTableStyles } from "../../../../Components/AjCustomTable/AjCustomTableStyles";
import { getProdOrderQaActions } from "../../../../Redux/common/Products/productsActions";
import AjProductOrderQaPreview from "../../../../Components/AjProductOrderQaUpload/AjProductOrderQaPreview";

function ProductOrderQaListing({ 
  setIsPreview, 
  searchClick, 
  searchText 
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const [previewData, setPreviewData] = useState({
    preview: false,
    image_name: '',
    product_id: '',
    file_id: '',
    status: '',
    description: ''
  });

  const productOrderQa = useSelector((state) => state.products.productOrders);
  const resetPreview = () => {
    setPreviewData({
      ...previewData, 
      preview: false, 
      image_name: '', 
      product_id: '', 
      status: '', 
      description: '', 
      file_id: ''
  })
  }
  useEffect(() => {
    resetPreview();
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    dispatch(getProdOrderQaActions(searchObject));
  }, [query, searchClick]);

  let tableHead = [
    { field: "Product Name", ellipsisClass: true },
    { field: "Product ID" },
    { field: "Product Type" },
    { field: "Quantity" },
    { field: "Status" },
    { field: "Ware House" },
    { field: "City" },
    { field: "Address" },
    {
      renderColumn: (row) => {
        return (
          <Button
            sx={{
              ...customTableStyles.btnStyle,
            }}
            key={row["Product ID"]}
            onClick={row["Status"] === 'PENDING' ? () => {navigate(`report/${row["Product ID"]}`)} :  
              () => {
                setPreviewData({
                  ...previewData, 
                  preview: true, 
                  image_name: row.file_name, 
                  product_id: row["Product ID"],
                  status: row["Status"],
                  description: row.description,
                  file_id: row.file_id
                })
                setIsPreview(true)
              }
            }
          >
            <Typography sx={{ width: "7rem", ...customTableStyles.colorText }}>
              {row["Status"] === 'PENDING' ? "Upload Report" : "View Report"}
            </Typography>
          </Button>
        );
      },
    },
  ];


  useEffect(() => {
    resetPreview();
    const dataSet = productOrderQa?.result.map((item) => {
      
      return {
        "Product Name": item.name,
        "Product ID": item.pod_id,
        "Product Type": textCapitalize(item.product_type),
        Quantity: `${item.quantity} ${item.unit_of_measurement}`,
        Status: item.status,
        "Ware House": item.warehouse_name,
        City: item.city,
        Address: item.address_1,
        file_name: item.file_name,
        description: item.description,
        file_id: item.certification_document_id
      };
    });
    setData(dataSet);
  }, [productOrderQa]);

  return (
    <>{ !previewData.preview ?
      <>
        {productOrderQa?.result?.length > 0 ? (
          <AjCustomTable
            columnDefs={tableHead}
            rowData={data}
            pagination={true}
            query={query}
            setQuery={setQuery}
            totalCount={productOrderQa?.totalCount}
          />
        ) : (
          <Box
            sx={{
              ...commonStyles.noContentBox,
              ...customCommonStyles.noDataPagination,
            }}
          >
            <AjTypography
              styleData={commonStyles.noDataText}
              displayText="No data found"
            />
          </Box>
        )}
      </>
       :
        <AjProductOrderQaPreview 
          previewData={previewData}
          setIsPreview={setIsPreview}
          resetPreview={resetPreview}
         />
      }
    </>
  );
}

export default ProductOrderQaListing;
