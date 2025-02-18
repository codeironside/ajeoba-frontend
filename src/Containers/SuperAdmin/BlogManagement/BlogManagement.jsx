import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import {
  getBlogPostsListAction,
  updateToBeEditedValueFromSessionStorge,
} from "../../../Redux/SuperAdmin/BlogManagement/blogActions";
import { encrypt, getUserData } from "../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { ROLES } from "../../../Constant/RoleConstant";
import { BLOG_MANAGEMENT_ADD } from "../../../Routes/Routes";
import { styles as blogManagementStyles } from "./BlogManagementStyles";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import SearchIcon from "@mui/icons-material/Search";
import AjInputBase from "../../../Components/AjInputBase";
import BlogManagerListing from "./BlogManagerListing";

export default function BlogManager() {

  const blogData = useSelector((state) => state.blog?.blogList);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [searchClick, setSearchClick] = useState(true);
  const [searchName, setsearchName] = useState("");

  useEffect(() => {
    dispatch(getBlogPostsListAction());
  }, []);

  const enterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };

  const handleClickOnSearch = () => {
    setSearchClick((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setsearchName(e.target.value);
    if (e.target.value.length === 0) {
      setSearchClick((prev) => !prev);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography sx={commonStyles.tableText}>
              Blog Posts ({blogData?.totalCount})
            </Typography>
          </Box>
          <Box sx={blogManagementStyles.addButtonAlternativeBox}>
              <AjButton
                variant="text"
                styleData={customCommonStyles.addButtonStyle}
                displayText="Add BLOG"
                onClick={() => navigate(BLOG_MANAGEMENT_ADD)}
              />
          </Box>
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid
            item
            sx={{ ...customCommonStyles.subHeaderStyle, ...blogManagementStyles.gridWrapper }}
          >
            <AjInputBase
              value={searchName}
              onKeyPress={enterKeyPress}
              onChange={handleSearchChange}
              styleData={{
                ...customCommonStyles.filterInputBaseStyle,
                ...blogManagementStyles.customHeight,
                ...blogManagementStyles.customWidth,
              }}
              placeholder="Search by name"
              name="search by name"
              endIcon={
                <Box
                  sx={{ ...customCommonStyles.iconBox, ...blogManagementStyles.customHeight }}
                  onClick={handleClickOnSearch}
                >
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <BlogManagerListing
            searchText={searchName}
            searchClick={searchClick}
          />
        </Box>
      </Grid>
    </>
  );
}