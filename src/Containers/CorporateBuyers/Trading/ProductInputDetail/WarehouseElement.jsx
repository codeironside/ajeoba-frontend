import React from "react";
import { Box, Typography } from "@mui/material";
import { commonStyles } from "../../../../Style/CommonStyle";

const WarehouseElement = ({warehouseDetail, product_type}) => {
    
    return (<>
    { product_type === "input-details" ?
        <Box 
          // sx={
          //   [commonStyles.warehouse_detail]
          // }
        >
        <Typography sx={[commonStyles.subText]}>{"Warehouse distribution"}</Typography>
              <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                <Typography sx={{color: "#898B87", fontSize: "1rem"}}>{ " "}</Typography>
                <Typography sx={{color: "#000", fontSize: "1rem"}}>{" - " + " Ton"}</Typography>
              </Box>
      </Box> : 
        warehouseDetail?.map((item, index) => (
          <Box 
              key={index}
              sx={
                [commonStyles.warehouse_detail]
              }
            >
              <Typography sx={[commonStyles.subText]}>{"Warehouse distribution"}</Typography>
              <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                <Typography sx={{color: "#898B87", fontSize: "1rem"}}>{item?.warehouse_name + " "}</Typography>
                <Typography sx={{color: "#000", fontSize: "1rem"}}>{" - " + item?.available_quantity + " Ton"}</Typography>
              </Box>
            </Box>))
    }
    </>)
}

export default WarehouseElement;