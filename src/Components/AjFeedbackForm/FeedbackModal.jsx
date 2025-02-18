import React, { useState } from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { AjRating } from "../AjRating";
import { commonStyles } from "../../Style/CommonStyle";
import AjTypography from "../AjTypography";
import { styles as FeedbackFormStyles } from "../../Containers/CorporateBuyers/Feedback/FeedbackFormStyle";
import { FeedbackSchema } from "../../validationSchema/FeedbackSchema";
import AjInputLabel from "../AjInputLabel";
import AjButton from "../AjButton";
import { styles as viewSupportStyles } from "../../Containers/Profile/ViewSupport/ViewSupportStyles";
import { getFeedbackDetails } from "../../Redux/LogisticsAndSellerFeedback/LogisticsAndSellerFeedbackAction";

const FeedbackModal = (props) => {
  const { orderId, feedbackFor, setFeedback, id, userData } = props;
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FeedbackSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    let formData = {
      message: data.feedback,
      rating: parseInt(data.rating),
      orderId: orderId,
      feedbackFor: feedbackFor,
    };

    dispatch(
      getFeedbackDetails(formData, props.closeModal, setFeedback, id, userData)
    );
  };
  const ratingChangeHandler = (e, selectedRating) => {
    setRating(selectedRating);
    setValue("rating", selectedRating || "", { shouldValidate: true });
  };

  return (
    <Grid
      container
      item
      sx={{
        ...viewSupportStyles.gridRadius,
        ...FeedbackFormStyles.GridPadding,
      }}
    >
      <Box
        component="form"
        xs={12}
        sm={6}
        sx={{ ...FeedbackFormStyles.FeedBackInnerLayout }}
      >
        <AjInputLabel
          required={true}
          styleData={{
            ...commonStyles.inputLabel,
            ...FeedbackFormStyles.feedbackRating,
          }}
          displayText="Give your rating"
        />
        <Box
          sx={{
            ...viewSupportStyles.boxFullWidth,
          }}
        >
          <AjRating
            value={rating}
            sx={{ ...FeedbackFormStyles.RatingStyling }}
            {...register("rating")}
            error={errors.rating ? true : false}
            onChange={ratingChangeHandler}
            precision={1}
          />
          <AjTypography
            styleData={{
              ...commonStyles.errorText,
              ...commonStyles.marginTop0,
            }}
            displayText={errors.rating?.message}
          />
        </Box>
        <AjInputLabel
          required={true}
          styleData={{
            ...commonStyles.inputLabel,
            ...FeedbackFormStyles.feedbackRating,
          }}
          displayText="Type your feedback"
        />
        <InputBase
          required
          id="feedback"
          multiline
          rows={6}
          name="feedback"
          sx={{
            ...viewSupportStyles.textAreaStyle,
            ...FeedbackFormStyles.feedbackTextArea,
          }}
          placeholder="Enter Feedback"
          {...register("feedback")}
          error={errors.feedback ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.feedback?.message}
        />

        <Box
          sx={{
            ...FeedbackFormStyles.submitBtnBox,
          }}
        >
          <AjButton
            type="submit"
            variant="contained"
            displayText="Submit"
            onClick={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default FeedbackModal;
