import React from "react";
import { Box } from "@mui/system";
import * as _ from 'lodash'
import { viewProfileStyles } from "../../Containers/Profile/ViewProfile/ViewProfileStyle";
import { styles } from "./AjAdsCertificateReqPostStyles.js";
import {
  formatDate,
  getPhoneCodeSymbol,
  textCapitalize,
} from "../../Services/commonService/commonService";
import { commonStyles } from "../../Style/CommonStyle";
import { productTypeOptions } from "../../Constant/AppConstant";

const AjAdsCertificateReqPost = (props) => {
  const { data } = props;

  return (
    <>
      <Box sx={styles.mainContainer}>
        <Box sx={styles.insideMainContainer}>
          <Box sx={styles.fieldContainer}>
            <Box sx={styles.firstRow}>
              <Box sx={[viewProfileStyles.addressHeading, styles.fieldGap]}>
                <Box sx={viewProfileStyles.addressLineHeading}>
                  Product Name&nbsp;-{" "}
                </Box>
                <Box
                  sx={[
                    viewProfileStyles.subHeadingColor,
                    viewProfileStyles.addressContent,
                    commonStyles.textCapitalize,
                  ]}
                >
                  {data?.product_name}
                </Box>
              </Box>
              <Box sx={[viewProfileStyles.addressHeading, styles.fieldGap]}>
                <Box sx={viewProfileStyles.addressLineHeading}>
                  Product Type&nbsp;-{" "}
                </Box>
                <Box
                  sx={[
                    viewProfileStyles.subHeadingColor,
                    viewProfileStyles.addressContent,
                  ]}
                >
                 {_.find(productTypeOptions, {
                      value: data?.product_type,
                    }).label}
                </Box>
              </Box>
              <Box sx={[viewProfileStyles.addressHeading, styles.fieldGap]}>
                <Box sx={viewProfileStyles.addressLineHeading}>
                  Quantity&nbsp;-{" "}
                </Box>
                <Box
                  sx={[
                    viewProfileStyles.subHeadingColor,
                    viewProfileStyles.addressContent,
                  ]}
                >
                  {`${data?.quantity} ${textCapitalize(data?.unit_of_measurement)}`}
                </Box>
              </Box>
            </Box>

            <Box sx={viewProfileStyles.addressHeading}>
              <Box sx={viewProfileStyles.addressLineHeading}>
                Posted On&nbsp;-{" "}
              </Box>
              <Box
                sx={[
                  viewProfileStyles.subHeadingColor,
                  viewProfileStyles.addressContent,
                ]}
              >
                {formatDate(data?.created_at)}
              </Box>
            </Box>
          </Box>

          <Box sx={viewProfileStyles.addressHeading}>
            <Box sx={viewProfileStyles.addressLineHeading}>
              Ad posted by&nbsp;-{" "}
            </Box>
            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              {data?.add_posted_by}
            </Box>
          </Box>

          <Box sx={viewProfileStyles.addressHeading}>
            <Box sx={viewProfileStyles.addressLineHeading}>Address&nbsp;- </Box>
            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              {data?.address_1}
            </Box>
          </Box>

          <Box sx={viewProfileStyles.addressHeading}>
            <Box sx={viewProfileStyles.addressLineHeading}>
              Contact number&nbsp;-{" "}
            </Box>
            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              {`${getPhoneCodeSymbol(data?.phone_code)} ${
                data?.contact_number
              }`}
            </Box>
          </Box>

          <Box
            sx={[
              viewProfileStyles.addressHeading,
              styles.requestedCertContainer,
            ]}
          >
            <Box sx={viewProfileStyles.addressLineHeading}>
              Requested certifications&nbsp;-{" "}
            </Box>

            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              {Object.keys(data?.certificates_name).map(
                (key, index) =>
                  `${data?.certificates_name[key]} ${
                    index < data?.certificates.length - 1 ? " , " : ""
                  }`
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AjAdsCertificateReqPost;
