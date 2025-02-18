import React from "react";
import AjDocumentDownloader from "../AjDocumentDownloader";
import { viewProfileStyles } from "../../Containers/Profile/ViewProfile/ViewProfileStyle";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";
import { styles } from './AjProductOrderQaUploadStyle';
import { Box, Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTypography from "../AjTypography";

const stylesGroup = {
    documentStyle : {
        marginTop: 0,
        marginBottom: "0 !important",
        textDecoration: "none",
      },
    
    detailsGroup : {
        padding: '16px 0',
        display: "flex", 
        flexDirection: "column", 
        gap: "16px",
      },
    
    mainGroup : {
        display: "flex", 
        flexDirection: "row-reverse", 
        gap: "32px", 
        borderTop: "2px solid green", 
        padding: "1.35rem"
    }
    
}

const AjProductOrderQaPreview = (props) => {
    const {
        product_id, 
        image_name, 
        status, 
        file_id,
        description
    } = props.previewData

    const backArrowHandler = () => {
        props.setIsPreview(false)
        props.resetPreview()
      };

    return (<>
            <Box 
                sx={[
                    styles.productOrderContainer,
                    styles.qaContainer,
                    styles.qaMarginTop
                ]}
            >
                <IconButton
                    disableRipple
                    sx={commonStyles.backButtonWhiteFont}
                    onClick={backArrowHandler}
                >
                    {" "}
                    <ArrowBackRoundedIcon sx={commonStyles.backButtonWhiteFont} />
                </IconButton>
            </Box>
            <Grid
                container
                item
                sx={[
                    customCommonStyles.productOrderQaContainer,
                    commonStyles.productOrderQaReportContentContainer,
                    commonStyles.qaMarginTop
                ]}
            >
                <AjTypography
                    displayText={'QA Report'}
                    sx={[
                        commonStyles.heading,
                        commonStyles.marginBottom32Bold,
                    ]}
                />
               <Grid style={stylesGroup.mainGroup}>
                <Box
                        sx={[
                            viewProfileStyles.subHeadingColor,
                            viewProfileStyles.addressContent,
                        ]}
                    >
                        <AjDocumentDownloader
                            docName={image_name}
                            changeBtnStyle={viewProfileStyles.changeBtnStyle}
                            downloadWrapper={{
                            ...viewProfileStyles.downloadWrapper,
                            ...styles.documentStyle,
                            }}
                            docId={file_id}
                            docTextStyle={viewProfileStyles.docTextStyle}
                            showIcon={true}
                            iconGap={{ gap: "0.625rem" }}
                        />
                    </Box>
                    
                    <Box style={stylesGroup.detailsGroup}>
                        <AjTypography
                            displayText={`Product ID: ${product_id}`}
                        />
                        <AjTypography
                            displayText={`Status: ${status}`}
                        />
                        {(description !== 'description') && <AjTypography displayText={`Description: ${description}`} />}
                    </Box>
               </Grid>
            </Grid>
    </>)
}

export default AjProductOrderQaPreview;

 