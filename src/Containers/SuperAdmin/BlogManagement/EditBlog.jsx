import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import BlogForm from "./BlogForm";
import { editDataByIdAction } from "../../../Redux/SuperAdmin/BlogManagement/blogActions";
import { removeItemFromSessionStorage } from "../../../Services/localStorageService";
import { BLOG_MANAGEMENT } from "../../../Routes/Routes";
import { styles as refreeDetailStyles } from "../../Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import {
  commonStyles,
  commonAddProductStyles,
} from "../../../Style/CommonStyle";
import { styles as blogManagementStyle } from "./BlogManagementStyles";
import { showToast } from "../../../Services/toast";

function EditBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemToEdit = useSelector((state) => state.blog.toBeEditedData);

  const editorDataRef = useRef(null);

  const saveChanges = () => {
    editorDataRef.current.saveTextEditorDataHandler();
  };

  const onSaveHandler = (richTextEditorData, blogTitleData, blogImage) => {
    const parsedRteData = JSON.parse(richTextEditorData);

    if (!blogImage?.id) {
      showToast("Please upload blog image", "error");
      return;
    }

    if (
      parsedRteData.blocks.length === 1 &&
      parsedRteData.blocks[0].text.length === 0
    ) {
      showToast("Content is required", "error");
      return;
    }

    const parsedRteDataLength = parsedRteData.blocks.reduce((sum, item) => {
      return sum + item.text.length;
    }, 0);

    if (parsedRteDataLength < 2 || parsedRteDataLength > 500) {
      showToast("Content should be 2 to 500 characters long", "error");
      return;
    }

    if (
      blogTitleData === null ||
      blogTitleData.length === 0 ||
      blogTitleData.length < 2 ||
      blogTitleData.length > 200
    ) {
      return;
    }

    let requiredData = {
      title: blogTitleData,
      content: richTextEditorData,
      image: blogImage,
    };

    dispatch(editDataByIdAction(itemToEdit.id, requiredData, navigate));
  };

  const handleCancel = (e, value) => {
    removeItemFromSessionStorage("forEditBlogData");
    navigate(BLOG_MANAGEMENT);
  };

  const backHandler = () => {
    removeItemFromSessionStorage("forEditBlogData");
    navigate(BLOG_MANAGEMENT);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          sx={{
            ...commonStyles.backButtonPosition,
            ...blogManagementStyle.backButtonAddEdit,
          }}
          onClick={backHandler}
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
          ...blogManagementStyle.blogAddEditWhiteBoxContainer,
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
            styleData={blogManagementStyle.blogFormTitle}
            displayText={"Edit Blog"}
          />
          <Grid
            item
            sx={{
              ...commonAddProductStyles.gridBlogBox,
              ...commonAddProductStyles.gridData,
              ...blogManagementStyle.marginTop40,
            }}
          >
            <BlogForm
              defaultTitle={itemToEdit?.title}
              defaultContent={itemToEdit?.content}
              defaultImage={itemToEdit?.image}
              ref={editorDataRef}
              onSaveHandler={onSaveHandler}
            />
            <Grid sx={refreeDetailStyles.btnContainer} container>
              <>
                <AjButton
                  onClick={handleCancel}
                  styleData={commonStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                />
                <AjButton
                  onClick={saveChanges}
                  variant="contained"
                  displayText="Save Changes"
                />
              </>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditBlog;
