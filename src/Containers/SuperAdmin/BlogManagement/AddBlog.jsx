import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import BlogForm from "./BlogForm";
import { addBlogAction } from "../../../Redux/SuperAdmin/BlogManagement/blogActions";
import { BLOG_MANAGEMENT } from "../../../Routes/Routes";
import { styles as addWarehouseStyles } from "../../FarmingAssociation/WareHouses/AddWareHouse/AddWareHouseStyles";
import {
  commonStyles,
  commonAddProductStyles,
} from "../../../Style/CommonStyle";
import { styles as blogManagementStyle } from "./BlogManagementStyles";
import { showToast } from "../../../Services/toast";

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editorDataRef = useRef(null);

  const AddBlog = () => {
    editorDataRef.current.saveTextEditorDataHandler();
  };

  const onSaveHandler = (textEditorData, blogTitle, blogAuthor, blogImage, blogReadingMinutes) => {
    const parsedData = JSON.parse(textEditorData);

    if (
      parsedData.blocks.length === 1 &&
      parsedData.blocks[0].text.length === 0
    ) {
      showToast("Content is required", "error");
      return;
    }

    const parsedDataLength = parsedData.blocks.reduce((total, item) => {
      return total + item.text.length;
    }, 0);

    if (parsedDataLength < 2) {
      showToast("Blog should be 2 or more characters long", "error");
      return;
    }

    if (
      blogTitle === null ||
      blogTitle.length === 0 ||
      blogTitle.length < 2 ||
      blogTitle.length > 200
    ) {
      return;
    }

    const requiredData = {
      title: blogTitle,
      author: blogAuthor,
      blog_text: textEditorData,
      image_id: blogImage["id"],
      reading_minutes: parseInt(blogReadingMinutes),
    };

    dispatch(addBlogAction(requiredData, navigate));
  };

  const backHandler = () => {
    navigate(BLOG_MANAGEMENT);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          onClick={backHandler}
          sx={commonStyles.backButtonPosition}
          disableRipple
        >
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box
          sx={{
            ...commonStyles.blogContainer,
            ...blogManagementStyle.marginTop0Responsive,
          }}
        >
          <AjTypography
            displayText={"Add BLOG"}
            styleData={blogManagementStyle.blogFormTitle}
          />
          <Grid
            item
            sx={{
              ...commonAddProductStyles.gridBlogBox,
              ...commonAddProductStyles.gridData,
              ...blogManagementStyle.marginTop40,
            }}
          >
            <BlogForm onSaveHandler={onSaveHandler} ref={editorDataRef} />
            <Box sx={addWarehouseStyles.addWareHouseSaveBtnContainer}>
              <AjButton
                variant="contained"
                onClick={AddBlog}
                displayText={"Add"}
              />
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddBlog;
