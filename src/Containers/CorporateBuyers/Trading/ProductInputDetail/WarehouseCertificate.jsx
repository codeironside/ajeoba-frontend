import React from "react";
import { Box, Typography } from "@mui/material";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjDocumentDownloader from "../../../../Components/AjDocumentDownloader";

const WarehouseCertificate = ({certificateDetail}) => {

    return (<>
    {certificateDetail?.length > 0 ? 
    certificateDetail?.map((item, index) => (
          <Box 
              key={index}
              sx={{
                ...commonStyles.certStyle
              }}
            >
               <Typography sx={[commonStyles.subText]}>{"Warehouse Certificate"}</Typography>
                <Box sx={{display: "flex", fontSize: ".5rem", gap: "4px"}}>
                  <Typography sx={{color: "#898B87", fontSize: "1rem"}}>{" "}</Typography>
                  <Typography sx={{color: "#000", fontSize: "1rem"}}>{" - " + " Ton"}</Typography>
                </Box>
                <AjDocumentDownloader
                            docName={item?.image_name}
                            // changeBtnStyle={viewProfileStyles.changeBtnStyle}
                            // downloadWrapper={{
                            // ...viewProfileStyles.downloadWrapper,
                            // ...styles.documentStyle,
                            // }}
                            docId={item?.file_id}
                            // docTextStyle={viewProfileStyles.docTextStyle}
                            showIcon={true}
                            iconGap={{ gap: "0.625rem" }}
                        />
            </Box>)) : 
            <Box 
              sx={{
                textAlign: "left",
                padding: "0",
                marginRight: "4rem",
                bgcolor: 'background.paper',
                width: "337px",
                color: 'text.secondary',
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                '& svg': {
                  m: 1,
                },
              }}
            >
                <Typography>{"No certificate is added"}</Typography>
            </Box>
    }
    </>)
}

export default WarehouseCertificate;