import React from "react";
import { Grid, Typography, Checkbox } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "../../Routes/Routes";
import { ACTIVE_GREEN, PRIMARY_GREEN } from "../../Constant/ColorConstant";
import { Box } from "@mui/system";

const styles = {
  linkStyle: {
    color: PRIMARY_GREEN,
    cursor: "pointer",
  },
  contentBox: {
    display: "flex",
    "@media(max-width:600px)": {
      flexDirection: "column",
    },
  },
};

const AjTnCLink = (props) => {
  const { setIsChecked } = props;
  return (
    <Grid sx={styles.contentBox}>
      <Typography sx={commonStyles.disclamer}>
        <Checkbox
          sx={{
            "&.Mui-checked": {
              color: ACTIVE_GREEN,
            },
          }}
          disableRipple
          onChange={(event) => setIsChecked(event.target.checked)}
        />
        By proceeding in you are agreeing to our
        <Box
          sx={{
            display: "flex",
            "@media(max-width:600px)": {
              flexDirection: "column",
            },
          }}
        >
          <Typography
            sx={styles.linkStyle}
            onClick={() => window.open(TERMS_AND_CONDITIONS, "_blank")}
          >
            &nbsp;Terms & Conditions
          </Typography>
          <Typography>&nbsp;&</Typography>
          <Typography
            sx={styles.linkStyle}
            onClick={() => window.open(PRIVACY_POLICY, "_blank")}
          >
            &nbsp;Privacy Policy
          </Typography>
        </Box>
      </Typography>
    </Grid>
  );
};

export default AjTnCLink;
