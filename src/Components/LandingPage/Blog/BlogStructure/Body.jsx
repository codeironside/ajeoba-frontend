import React, { useState, useEffect } from "react";
import { LIMIT, CARD_LIMIT, SKIP } from "../../../../Constant/AppConstant";
import { Box, Button } from "@mui/material";
import AjTypography from "../../../AjTypography";
import Grid from "@mui/material/Unstable_Grid2";
import PostList from "./PostList";
import { getBlogPostsListAction } from "../../../../Redux/SuperAdmin/BlogManagement/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from "../../../../Style/CommonStyle.js";
import { blogCSS } from "../blogStyles.js";
import BlogBanner from "./BlogBanner.jsx";

const Body = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ limit: CARD_LIMIT, skip: SKIP });
  const [searchBlog, setSearchBlog] = useState("");
  let limit = LIMIT;

  const blogList = useSelector((state) => state?.blog?.blogList);
  
  const spottedBlog = useSelector((state) => state?.blog?.spottedBlog);

  const handlePagination = () => {
    setQuery((prev) => ({
      ...prev,
      skip: prev.skip + limit,
    }));
  };

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };

    dispatch(getBlogPostsListAction(searchObject));
  }, [query]);

  const filterBlog = (key) => {
    setSearchBlog(key);
  };

  const search = (data) => {
    return data?.blogs?.filter((blog) =>
      blog.title.toLowerCase().includes(searchBlog.toLowerCase())
    );
  };

  return (
    <>
      <BlogBanner bannerInfo={spottedBlog} filterBlog={filterBlog} />

      <Grid container>
        {blogList?.totalCount !== 0 ? (
          <Box sx={{ ...blogCSS.orientation }}>
            <Box sx={{ ...blogCSS.blog_cards }}>
              <PostList blogContents={search(blogList)} />
            </Box>

            {blogList?.totalCount > 10 && (
              <Box sx={{ ...blogCSS.more_btn_container }}>
                <Button
                  sx={{ ...blogCSS.load_more_btn }}
                  onClick={handlePagination}
                >
                  Load More
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              ...commonStyles.noContentBox,
            }}
          >
            <AjTypography
              styleData={commonStyles.noDataText}
              displayText="No data found"
            />
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Body;
