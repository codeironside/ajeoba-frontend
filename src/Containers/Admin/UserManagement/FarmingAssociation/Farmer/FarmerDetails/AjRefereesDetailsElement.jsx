import React from "react";
import { Grid, Box } from "@mui/material";
import AjDetailTypography from "../../../../../../Components/AjDetailTypography/AjDetailTypography";

const AjRefereesDetailsElement = ({ referees }) => {
  const styles = {
    elementsStyle: {
      display: "flex",
      gap: "30px",
      padding: "30px 8px",
      width: "50%",
      justifyContent: "center",
    },
  };

  const elements = referees.map((referee, index) => {
    return (
      <Grid item key={referee.id} sm={3} xs={12}>
        <AjDetailTypography
          displayText1={`Referee ${index + 1}`}
          displayText2={referee.first_name}
        />
      </Grid>
    );
  });

  return <Box style={styles.elementsStyle}>{elements}</Box>;
};

export default AjRefereesDetailsElement;
