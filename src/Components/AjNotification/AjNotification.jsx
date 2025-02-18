import React, { useEffect, useState } from "react";
import { Badge, Divider, Grid } from "@mui/material";
import bellIcon from "../../Assets/Images/bell.svg";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationAction } from "../../Redux/common/Notification/notificationActions";
import { commonStyles } from "../../Style/CommonStyle";
import AjNotificationCard from "./AjNotificationCard";
import { styles } from "./AjNotificationStyles";

const AjNotification = ({ unreadCount }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const notificationList = useSelector(
    (state) => state.notification.notificationList
  );

  useEffect(() => {
    if (anchorEl) dispatch(getNotificationAction());
  }, [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const changeFontStyle = (data) => {
    let notification = data;
    return <span style={styles.notificationDataStyles}>{notification}</span>;
  };

  return (
    <Box>
      <Box sx={styles.notificationIconStyles}>
        <Badge
          badgeContent={unreadCount}
          color="error"
          onClick={handleClick}
          invisible={unreadCount === "0"}
        >
          <Typography component="img" src={bellIcon} />
        </Badge>
      </Box>
      <Popover
        PaperProps={{ sx: styles.popOverPaperStyles }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={styles.anchorOriginStyles}
        transformOrigin={styles.transformOriginStyles}
      >
        <Grid sx={styles.notificationHeaderStyles}>
          <Typography sx={styles.headerHeadingStyles}>Notifications</Typography>
          <Divider
            sx={{
              ...commonStyles.dividerStyle,
              ...styles.dividerStyle,
            }}
          />
        </Grid>
        <Grid sx={styles.scrollNotificationStyles}>
          {notificationList?.listQuery?.length > 0 ? (
            notificationList?.listQuery.map((item, index) => {
              return (
                <AjNotificationCard
                  id={item.id}
                  payload={item.payload}
                  notificationData={changeFontStyle(item.title)}
                  key={index}
                  isRead={item.isRead}
                  setCloseModal={setAnchorEl}
                  time={item.createdAt}
                />
              );
            })
          ) : (
            <Grid sx={styles.noDataFoundStyles}>
              <Typography sx={styles.notificationDataStyles}>
                No Notifications found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Popover>
    </Box>
  );
};

export default AjNotification;
