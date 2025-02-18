import React from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";
import { styles } from "./AjNotificationStyles";
import { useDispatch } from "react-redux";
import * as moment from "moment";
import { updateMarkReadNotificationStatusAction } from "../../Redux/common/Notification/notificationActions";
import { commonStyles } from "../../Style/CommonStyle";
import { ROLES } from "../../Constant/RoleConstant";

const AjNotificationCard = (props) => {
  const { notificationData, key, id, isRead, payload, setCloseModal, time } =
    props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMarkReadNotification = (
    markReadId,
    payloadEvent,
    isNotifRead
  ) => {
    if (payloadEvent.event === "USER_ONBOARDED") {
      switch (payloadEvent.role) {
        case ROLES.FARMING_ASSOCIATION:
          navigate(
            `admin/user-management/farming-association/detail/${payloadEvent.user_id}`
          );
          break;
        case ROLES.PRODUCT_AGGREGATOR:
          navigate(
            `admin/user-management/aggregators/detail/${payloadEvent.user_id}`
          );
          break;
        case ROLES.QA_COMPANY:
          navigate(
            `admin/user-management/qa-companies/detail/${payloadEvent.user_id}`
          );
          break;
        case ROLES.CORPORATE_BUYER:
          navigate(
            `admin/user-management/corporate-buyer/detail/${payloadEvent.user_id}`
          );
          break;
        case ROLES.LOGISTICS_COMPANY:
          navigate(
            `admin/user-management/logistics/detail/${payloadEvent.user_id}`
          );
          break;
        case ROLES.SINGLE_BUYER:
          navigate(
            `admin/user-management/single-buyer/detail/${payloadEvent.user_id}`
          );
          break;
        default:
          return;
      }
    }
    if (payloadEvent.event === "LOGISTICS_SERVICE_REQUESTED") {
      if (
        payload.requested_by === ROLES.FARMING_ASSOCIATION ||
        payload.requested_by === ROLES.PRODUCT_AGGREGATOR
      ) {
        navigate("open-ads?activeTab=0");
      } else {
        navigate("open-ads?activeTab=1");
      }
    }
    if (payloadEvent.event === "QA_SERVICE_REQUESTED") {
      navigate("certificate/requests");
    }
    if (payloadEvent.event === "LOGISTICS_REQUEST_ACCESS") {
      navigate(`logistics/detail/logistic-ad/${payloadEvent.advertisementId}`);
    }
    if (payloadEvent.event === "FINANCE_REQUESTED") {
      // testing;
      navigate("finance-requests?activeTab=0");
    }
    if (payloadEvent.event === "FINANCE_ADDITIONAL_DETAILS") {
      navigate(`finance-requests/detail/${payloadEvent?.finance_request_id}`);
    }

    setCloseModal(null);
    if (isNotifRead === false) {
      dispatch(updateMarkReadNotificationStatusAction(markReadId));
    }
  };
  return (
    <Grid key={key} sx={styles.avatarDataStyles}>
      <Typography
        sx={{
          ...styles.notificationTitleStyles,
          ...(!isRead && { fontWeight: 600 }),
        }}
        onClick={() => handleMarkReadNotification(id, payload, isRead)}
      >
        {notificationData}&nbsp;
        {(payload.event === "USER_ONBOARDED" ||
          payload.event === "LOGISTICS_SERVICE_REQUESTED" ||
          payload.event === "QA_SERVICE_REQUESTED" ||
          payload.event === "LOGISTICS_REQUEST_ACCESS" ||
          payload.event === "FINANCE_REQUESTED" ||
          payload.event === "FINANCE_ADDITIONAL_DETAILS") && (
          <span>Click to review the request</span>
        )}
      </Typography>
      <Typography sx={styles.timeStyle}>
        {moment(time).format("lll")}
      </Typography>
      <Divider sx={{ ...commonStyles.dividerStyle, ...styles.dividerStyle }} />
    </Grid>
  );
};

export default AjNotificationCard;
