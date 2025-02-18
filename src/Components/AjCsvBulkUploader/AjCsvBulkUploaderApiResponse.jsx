import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import * as _ from "lodash";
import { styles } from "./AjCsvBulkUploaderApiResponseStyles";
import { commonStyles } from "../../Style/CommonStyle";

const AjCsvBulkUploaderApiResponse = (props) => {
  const [groupedResponse, setGroupedResponse] = useState(null);

  useEffect(() => {
    if (props.bulkCsvUploadApiResponse) {
      if (props.bulkCsvUploadApiResponse.data.errors) {
        setGroupedResponse(
          _.groupBy(props.bulkCsvUploadApiResponse.data.errors, "message")
        );
      }
    } else {
      setGroupedResponse(null);
    }
  }, [props.bulkCsvUploadApiResponse]);

  const displayProductListOfErrors = (field) => {
    return field.map((item, errorIndex) => {
      if (errorIndex === field.length - 1) {
        return item.name;
      } else {
        return item.name + ", ";
      }
    });
  };

  return (
    <Box sx={styles.apiResponseBox}>
      {props.bulkCsvUploadApiResponse &&
      props.bulkCsvUploadApiResponse.data.insertedDataCount > 0 ? (
        <Typography
          sx={[
            commonStyles.inputLabel,
            styles.apiResponseMessage,
            styles.colorActiveGreen,
          ]}
        >
          {props.bulkCsvUploadApiResponse.message}
        </Typography>
      ) : (
        ""
      )}

      {groupedResponse &&
        _.map(groupedResponse, (value, key) => (
          <Typography sx={[commonStyles.inputLabel, styles.apiResponseError]}>
            {`${key} : ${value.length}`}
            <Typography
              sx={[
                commonStyles.inputLabel,
                styles.apiResponseError,
                styles.colorDarkGrey,
                styles.wordBreakAll,
              ]}
            >
              {displayProductListOfErrors(value)}
            </Typography>
          </Typography>
        ))}
    </Box>
  );
};

export default AjCsvBulkUploaderApiResponse;
