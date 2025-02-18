import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import AjTypography from "../AjTypography";
import AjDetailData from "../AjDetailData/AjDetailData";
import AjButton from "../AjButton";
import AjDialog from "../AjDialog/AjDialog";
import FeedbackModal from "../AjFeedbackForm/FeedbackModal";

import { commonStyles } from "../../Style/CommonStyle";
import { viewProfileStyles } from "../../Containers/Profile/ViewProfile/ViewProfileStyle";
import styles from "./AjDetailAndFeedbackStyles";
import { styles as ActiveCardStyles } from "../AjTradingActiveAdsCard/AjTradingActiveCardStyles";
import { styles as FeedbackFormStyles } from "../../Containers/CorporateBuyers/Feedback/FeedbackFormStyle";
import { AjRating } from "../AjRating";

const AjDetailsAndFeedback = (props) => {
  const {
    name,
    extraInformation,
    orderId,
    feedbackFor,
    feedbackExist,
    rating,
    id,
    userData,
  } = props;

  const [newEntries, setNewEntries] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    if (extraInformation) {
      setNewEntries(Object.entries(extraInformation));
    }
  }, [extraInformation]);

  useEffect(() => {
    if (feedbackExist) {
      setFeedback(feedbackExist);
    } else {
      setFeedback(false);
    }
  }, [feedbackExist]);

  const feedbackHandler = () => {
    setOpenModal(true);
  };
  const title = `Provide ${name[0].toLowerCase() + name.slice(1)} feedback`;

  return (
    <Box
      sx={{
        ...commonStyles.customWidth,
        ...styles.responsiveWidth,
        ...(feedback ? commonStyles.marginBottom0 : styles.boxMarginBottom),
      }}
    >
      <AjTypography
        displayText={`${name} details`}
        styleData={viewProfileStyles.addressMainHeading}
      />
      {extraInformation &&
        newEntries?.map(([key, value]) => (
          <AjDetailData
            metaData={key}
            data={value}
            styleData={{
              ...styles.responsiveMarginBot,
            }}
          />
        ))}
      {feedback && rating && (
        <AjDetailData
          metaData={`${name} rating`}
          data={<AjRating defaultValue={rating} readOnly={true} />}
        />
      )}
      {feedbackFor && !feedback && (
        <AjButton
          displayText={title}
          variant="contained"
          btnStyle={{
            ...commonStyles.marginTop0,
            ...styles.customBtnSize,
          }}
          onClick={feedbackHandler}
        />
      )}
      <AjDialog
        open={openModal}
        closeModal={setOpenModal}
        title={title}
        styleData={{ ...ActiveCardStyles.dialogContainer }}
      >
        <FeedbackModal
          userData={userData}
          id={id}
          orderId={orderId}
          feedbackFor={feedbackFor}
          setFeedback={setFeedback}
          closeModal={setOpenModal}
          sx={{ ...FeedbackFormStyles.marginTop0 }}
        />
      </AjDialog>
    </Box>
  );
};

export default AjDetailsAndFeedback;
