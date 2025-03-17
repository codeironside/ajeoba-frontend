import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Grid } from "@mui/material";
import { styles } from "./UserRoleSelectionStyle";
import AjTypography from "../../../Components/AjTypography";
import AjButton from "../../../Components/AjButton";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserRoles,
  settingUserRoleId,
} from "../../../Redux/UserRoleSelection/userRoleSelectionActions";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../../Services/localStorageService";
import { logoRedirection } from "../../../Services/commonService/commonService";

const UserRoleSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unregisteredCorperateBuyer, setRegisteredCorperateBuyer] =
    useState(false);

  const [userRoleSelectedId, setUserRoleSelectedId] = useState(1);
  const userRoleChoices = useSelector(
    (state) => state.userRoleSelection.userRoleMenuOptions
  );

  useEffect(() => {
    dispatch(getUserRoles());
    const userData = getUserData();
    console.log('user data ',userData)
    if (userData?.role_id === 109) { // SUPER_ADMIN
      navigate('/admin/admin-management');
      return;
    }
    unregisteredCorperateBuyer
      ? setUserRoleSelectedId(6)
      : setUserRoleSelectedId(userData?.role_id || 1);
  }, []);

  const userChoiceSelectionHandler = (id) => {
    setUserRoleSelectedId(id);
  };

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
                displayText="Select your user type"
                styleData={styles.heading2}
              />
            </Box>
            <Box sx={styles.buttonsContainer}>
              {
                userRoleChoices &&
                  userRoleChoices.map((choice) => (
                    <AjButton
                      key={choice.id}
                      id={choice.id}
                      variant="contained"
                      styleData={
                        userRoleSelectedId === choice.id
                          ? styles.bgColor
                          : styles.roleButton
                      }
                      displayText={choice.name}
                      onClick={() => {
                        userChoiceSelectionHandler(choice.id);
                      }}
                    />
                  ))
                // :
                // <AjButton
                //     id={6}
                //     variant="contained"
                //     styleData={
                //       userRoleSelectedId === 6
                //         ? styles.bgColor
                //         : styles.roleButton
                //     }
                //     displayText={"Corperate Buyer"}
                //     onClick={userChoiceSelectionHandler(6)}
                // />
              }
            </Box>

            <AjButton
              variant="contained"
              displayText=" Next"
              onClick={() => {
                dispatch(settingUserRoleId(userRoleSelectedId, navigate));
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserRoleSelection;
