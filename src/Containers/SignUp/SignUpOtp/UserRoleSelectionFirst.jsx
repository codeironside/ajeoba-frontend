import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Grid } from "@mui/material";
import { styles } from "./UserRoleSelectionFirstStyle";
import AjTypography from "../../../Components/AjTypography";
import AjButton from "../../../Components/AjButton";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserRoles,
  settingUserRoleId,
} from "../../../Redux/UserRoleSelection/userRoleSelectionActions";
import { useNavigate } from "react-router-dom";
import { logoRedirection } from "../../../Services/commonService/commonService";
import {
  SIGNUPOTP,
  SIGNUP_BUYER_PAGE,
  SIGNUPOTPINPUTSUPPLIER,
} from "../../../Routes/Routes";
import { getRoleName } from "../../../Services/localStorageService";

const UserRoleSelectionFirst = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOnlyFarmingAssociate, isShowOnlyFarmingAssociate] =
    useState(false);

  const [userRoleSelectedId, setUserRoleSelectedId] = useState(0);
  // const [userRoleForInputSupply, setUserRoleForInputSupply] = useState("");
  const userRoleChoices = useSelector(
    (state) => state.userRoleSelection.userRoleMenuOptions
  );

  const inputSupplier = [{ id: 9, name: "Input Supplier" }];

  const userRoleChoicesNew = userRoleChoices && [
    ...userRoleChoices,
    ...inputSupplier,
  ];

  const userChoiceSelectionHandler = (choice) => {
    setUserRoleSelectedId(choice.id);
    // setUserRoleForInputSupply(choice.name);
  };

  useEffect(() => {
    dispatch(getUserRoles());
  }, []);

  const next = () => {
    if (userRoleSelectedId === 0) {
      return;
    }
    localStorage.setItem("userRoleSelectedId", userRoleSelectedId);
    if (userRoleSelectedId === 6) {
      navigate(SIGNUP_BUYER_PAGE);
    } else if (userRoleSelectedId === 9) {
      navigate(SIGNUPOTPINPUTSUPPLIER);
    } else {
      navigate(SIGNUPOTP);
    }
  };

  const userRoleElements =
    userRoleChoicesNew &&
    userRoleChoicesNew.map((choice) => {
      return (
        <AjButton
          key={choice.id}
          id={choice.id}
          variant="contained"
          styleData={
            userRoleSelectedId === choice.id
              ? styles.bgColor
              : styles.roleButton
          }
          displayText={getRoleName(choice.name)}
          onClick={() => {
            userChoiceSelectionHandler(choice);
          }}
        />
      );
    });

  useEffect(() => {
    if (localStorage.getItem("unregistered") === "input_buyer") {
      isShowOnlyFarmingAssociate(true);
    }
  }, [localStorage.getItem("unregistered")]);

  return (
    <Grid container sx={styles.mainGridContainer}>
      <CssBaseline />
      <Grid
        item
        sx={styles.mainImageContainer}
        onClick={() => logoRedirection()}
      >
        <Grid item sx={styles.logoImageContainer}></Grid>
      </Grid>
      <Grid container item sx={styles.mainContentTopContainer}>
        <Box sx={styles.differentBackgroundcontainer}>
          {" "}
          <Box sx={styles.actualContentContainer}>
            <Box sx={styles.headingsContainer}>
              <AjTypography
                displayText="Registration Process"
                styleData={styles.heading1}
              />
              <AjTypography
                // displayText="Select user type"
                displayText="Join Ajeoba as"
                styleData={styles.heading2}
              />
            </Box>
            <Box sx={styles.buttonsContainer}>
              {!showOnlyFarmingAssociate ? (
                userRoleElements
              ) : (
                <AjButton
                  key={1}
                  id={1}
                  variant="contained"
                  styleData={
                    userRoleSelectedId === 1
                      ? styles.bgColor
                      : styles.roleButton
                  }
                  displayText={"Farming Association"}
                  onClick={() => {
                    userChoiceSelectionHandler(1);
                  }}
                />
              )}
            </Box>

            <AjButton
              variant="contained"
              displayText=" Next"
              onClick={() => {
                // dispatch(settingUserRoleId(userRoleSelectedId, navigate));
                // userRoleSelectedId
                next();
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserRoleSelectionFirst;
