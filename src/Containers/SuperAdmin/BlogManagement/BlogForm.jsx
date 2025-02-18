import React, { useEffect, useState } from "react";
import { Box, InputBase } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import AjInputLabel from "../../../Components/AjInputLabel";
import AjTypography from "../../../Components/AjTypography";
import { styles as viewSupportStyles } from "../../Profile/ViewSupport/ViewSupportStyles";
import { commonStyles } from "../../../Style/CommonStyle";
import { styles as blogManagementStyles } from "./BlogManagementStyles";
import { PLACEHOLDER_COLOR } from "../../../Constant/ColorConstant";
import AjDocumentUploader from "../../../Components/AjDocumentUploader";
import AjDocumentDownloader from "../../../Components/AjDocumentDownloader";
import { showToast } from "../../../Services/toast";

const options = [
  "title",
  "bold",
  "italic",
  "underline",
  "numberList",
  "bulletList",
  "media",
  "quote",
  "code",
  "clear",
];

const defaultTheme = createTheme();
Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        ...viewSupportStyles.textAreaStyle,
        width: "100%",
        overflowY: "auto",
        height: "15.625rem",
        ...commonStyles.customSrollBar,
      },
      editor: {
        fontFamily: "Poppins",
      },
      placeHolder: {
        fontFamily: "Poppins",
        color: PLACEHOLDER_COLOR,
        fontSize: "1rem",
      },
    },
  },
});

const { forwardRef, useRef, useImperativeHandle } = React;

const BlogForm = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    saveTextEditorDataHandler() {
      if (editRef?.current) {
        editRef.current.save();
      }
    },
  }));

  const editRef = useRef(null);

  const [blogTitle, setBlogTitle] = useState(props.defaulttitle || []);
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogReadingMinutes, setBlogReadingMinutes] = useState(0);
  const [blogTitleError, setBlogTitleError] = useState(null);
  const [blogAuthorError, setBlogAuthorError] = useState(null);
  const [blogReadingMinutesError, setBlogReadingMinutesError] = useState(null);
  const [blogImageError, setBlogImageError] = useState(null);
  const [isTitleModified, setIsTitleModified] = useState(false);
  const [blogImage, setBlogImage] = useState("");

  useEffect(() => {
    if (isTitleModified) {
      vaidateTitle();
    }
  }, [blogTitle]);

  const vaidateTitle = () => {
    if (blogTitle.length === 0) {
      setBlogTitleError("title is required");
    } else {
      if (blogTitle.length < 2) {
        setBlogTitleError("This should be 2 to 200 characters long");
      } else if (blogTitle.length > 200) {
        setBlogTitleError("This should be 2 to 200 characters long");
      } else if (blogTitle.length >= 2 && blogTitle.length <= 200) {
        setBlogTitleError(null);
      }
    }
  };

  const changeImageData = (e) => {
    e.preventDefault();
    setBlogImage("");
  };

  const onBlogPhotoUpload = (data) => {
    setBlogImage({
      file_name: data?.file_name,
      id: data?.id,
      file_path: `${data?.url}`,
    });
  };

  const onSubmit = (data) => {
    vaidateTitle();
    if (blogAuthor === '') {
      showToast("Please enter author name", "error");
      return;
    }

    if (!blogImage?.id) {
      showToast("Please upload blog image", "error");
      return;
    }
    if (blogReadingMinutes === 0 || blogReadingMinutes === '') {
      showToast("Please reading minutes cannot be zero", "error");
      return;
    }
    if (blogTitle.length >= 2 && blogTitle.length <= 200) {
      props.onSaveHandler(data, blogTitle, blogAuthor, blogImage, blogReadingMinutes);
    }
  };

  return (
    
    <Box sx={blogManagementStyles.blogFormBox}>
     <Box>
        <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Title"
          />
          <InputBase
            required
            multiline
            rows={2.9}
            sx={{
              ...viewSupportStyles.textAreaStyle,
              ...blogManagementStyles.titleHeight,
            }}
            placeholder="Enter the title"
            id="title"  
            name="title"
            value={blogTitle}
            onChange={(e) => {
              setIsTitleModified(true);
              setBlogTitle(e.target.value);
            }}
            defaultValue={props.defaultTitle}
          />

          <AjTypography
            styleData={commonStyles.errorText}
            displayText={blogTitleError ? blogTitleError : ""}
          />
     </Box>

     <Box>
        <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Author"
          />
          <InputBase
            required
            rows={2.9}
            sx={{
              ...viewSupportStyles.textAreaStyle,
              ...blogManagementStyles.titleHeight,
            }}
            placeholder="Enter the author name"
            id="author"  
            name="author"
            value={blogAuthor}
            onChange={(e) => {
              setBlogAuthor(e.target.value);
            }}
            defaultValue={props.defaultAuthor}
          />

          <AjTypography
            styleData={commonStyles.errorText}
            displayText={blogAuthorError ? blogAuthorError : ""}
          />
     </Box>

     <Box>
          <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Image"
          />
          
          {/* image here */}
          {blogImage ? (
              <AjDocumentDownloader
                docId={blogImage?.id}
                docName={blogImage?.file_name}
                changeDocument={changeImageData}
                showIcon={true}
              />
            ) : (
              <AjDocumentUploader
                  type="image"
                  docType="PRODUCT_PHOTO"
                  onUpload={onBlogPhotoUpload}
              />
            )}

          <AjTypography
            styleData={commonStyles.errorText}
            displayText={blogImageError ? blogImageError : ""}
          />
     </Box>

      <AjInputLabel
        required={true}
        styleData={{
          ...commonStyles.inputLabel,
          ...blogManagementStyles.marginTopForAnswer,
        }}
        displayText="Content"
      />
      {
        <ThemeProvider theme={defaultTheme}>
          <MUIRichTextEditor
            defaultValue={props.defaultAnswer}
            label="Enter the blog content"
            controls={options}
            onSave={(_data) => {
              onSubmit(_data);
            }}
            ref={editRef}
          />
        </ThemeProvider>
      }
      <Box sx={{marginTop: "2rem"}}>
        <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Reading Minutes"
          />
          <InputBase
            required
            type="number"
            rows={1}
            sx={{
              ...viewSupportStyles.textAreaStyle,
              ...blogManagementStyles.titleHeight,
            }}
            placeholder="Enter the Reading Minutes"
            id="blogReadingMinutes"  
            name="blogReadingMinutes"
            value={blogReadingMinutes}
            onChange={(e) => {
              setBlogReadingMinutes(e.target.value);
            }}
            defaultValue={props.defaultReadingMinutes}
          />

          <AjTypography
            styleData={commonStyles.errorText}
            displayText={blogReadingMinutesError ? blogReadingMinutesError : ""}
          />
     </Box>
    </Box>
  );
});

export default BlogForm;
