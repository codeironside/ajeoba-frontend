import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AjInputBase from "../../../AjInputBase";
import { user_icon } from "../../../../Constant/AppConstant";
import { blogCSS } from "../blogStyles";
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";

const BlogBanner = ({ bannerInfo, filterBlog }) => {
  const getHtmlFromRaw = (data) => {
    const editorState = convertFromRaw(JSON.parse(data));
    const htmlContent = convertToHTML(editorState);
    return htmlContent.substring(0, 120) + "...";
  };

  const [searchValue, setSearchValue] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const handleTextChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length === 0) {
      setSearchClick((prev) => !prev);
    }
    searchBlog(searchValue);
  };

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
    searchBlog(searchValue);
  };

  const searchBlog = (key) => {
    filterBlog(key);
  };

  const handleSearch = () => {
    setSearchClick((prev) => !prev);
  };

  return (
    <Box sx={{ ...blogCSS.banner }}>
      <Box sx={{ ...blogCSS.bannerTop }}>
        <Box sx={{ ...blogCSS.bannerTopTitle }}>
          <Typography sx={{ ...blogCSS.title }}>Welcome To Our Blog</Typography>
          <Typography sx={{ ...blogCSS.general_para }}>
            A center for all our resources and insights
          </Typography>
        </Box>
        <Box>
          <AjInputBase
            name="search by name"
            value={searchValue}
            onKeyPress={onEnterKeyPress}
            onChange={handleTextChange}
            styleData={{
              ...blogCSS.searchBar,
            }}
            placeholder="Search for our blogs by topics or keywords..."
            endIcon={
              <Box
                sx={{
                  ...blogCSS.iconBox,
                }}
                onClick={handleSearch}
              >
                <SearchIcon sx={{ ...blogCSS.searchIcon }} />
              </Box>
            }
          />
        </Box>
      </Box>

      <Box sx={{ ...blogCSS.bannerBottom }}>
        <Box sx={{ ...blogCSS.dimension }}>
          <img
            style={{ ...blogCSS.bb_image }}
            src={`${process.env.REACT_APP_IMAGE_URL}/${bannerInfo?.url}`}
            alt="Blog Banner Image"
          />
        </Box>

        <Box sx={{ ...blogCSS.dimension, ...blogCSS.b_below }}>
          <Box sx={{ ...blogCSS.info, ...blogCSS.info_top }}>
            <img
              style={{ ...blogCSS.topmost_image_dim }}
              src={user_icon}
              alt="Post image"
            />
            <Typography>{bannerInfo?.author}</Typography>
            <ul style={{ ...blogCSS.info_min }}>
              <li>{bannerInfo?.created_at?.substring(0, 10)}</li>
              <li>
                {bannerInfo?.reading_minutes}{" "}
                {bannerInfo?.reading_minutes > 1 ? "mins" : "min"}
              </li>
            </ul>
          </Box>
          <Typography sx={{ ...blogCSS.title_b }}>
            {bannerInfo?.title}
          </Typography>
          <Typography sx={{ ...blogCSS.welcome_para }}>
            {bannerInfo && (
              <div
                dangerouslySetInnerHTML={{
                  __html: getHtmlFromRaw(bannerInfo?.blog_text),
                }}
              />
            )}
          </Typography>
          <Link
            to={`/blog/${bannerInfo?.id}`}
            style={{ ...blogCSS.read_more_top_btn, textDecoration: "none" }}
          >
            Read More
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogBanner;
