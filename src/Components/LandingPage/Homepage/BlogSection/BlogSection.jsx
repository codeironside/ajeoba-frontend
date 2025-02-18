import React, { useState, useEffect } from "react";
import { blogsection } from "./BlogSection";
import { useNavigate } from "react-router";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  Skeleton,
} from "@mui/material";
import { formatDate } from "../../../../Services/commonService/commonService";
import usericon from "../Images/user.png";
import readmorearrow from "../Images/arrow-right.svg";
import { getBlogPostsListAction } from "../../../../Redux/SuperAdmin/BlogManagement/blogActions";
import "../../css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AjTypography from "../../../AjTypography";
import { commonStyles } from "../../../../Style/CommonStyle";

function BlogSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query] = useState({ limit: 3, skip: 0 });

  const blogList = useSelector((state) => state?.blog?.blogList);

  const blogExcerpt = (text) => {
    return `${JSON.parse(text).blocks[0].text.slice(0, 100)}...`;
  };

  useEffect(() => {
    let searchObject = {
      limit: 3,
      skip: 0,
    };

    dispatch(getBlogPostsListAction(searchObject));
  }, [query]);

  const generateImageUrl = (item) => {
    if (item?.url) {
      return `${process.env.REACT_APP_IMAGE_URL}/${item.url}`;
    }
    return (
      <Skeleton
        sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
        variant="rectangular"
        height={150}
      />
    );
  };

  return (
    <>
      <>
        <Box sx={blogsection.container}>
          <Box sx={blogsection.topcontemttext}>
            <Typography sx={blogsection.header}>Recent Blogs</Typography>
            <Typography sx={blogsection.header2}>Our latest news</Typography>
          </Box>

          {blogList?.totalCount > 0 ? (
            <>
              <Box sx={blogsection.listContainerblog}>
                {blogList?.blogs?.map((item, index) => (
                  <Card key={index} sx={blogsection.cardblog}>
                    <Link
                      to={`/blog/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="150"
                          // width="200"
                          image={generateImageUrl(item)}
                          alt="product"
                        />
                        <CardContent sx={blogsection.carddetailsBlog}>
                          <Box sx={blogsection.details}>
                            <img
                              src={usericon}
                              alt="usericon"
                              style={blogsection.usericon}
                            />
                            <Typography sx={blogsection.topicuserdets}>
                              {item.author}
                            </Typography>
                            <Typography sx={blogsection.topicuserdets}>
                              .
                            </Typography>
                            <Typography sx={blogsection.topicuserdets}>
                              {formatDate(item?.created_at)}
                            </Typography>
                          </Box>
                          <Typography sx={blogsection.topic}>
                            {item.title}
                          </Typography>
                          <Typography sx={blogsection.excerpt}>
                            {blogExcerpt(item.blog_text)}
                          </Typography>
                          <Typography
                            // onClick={readBlogDetails(item.id)}
                            sx={blogsection.readmore}
                          >
                            Read More{" "}
                            <span>
                              <img
                                src={readmorearrow}
                                alt="readmore"
                                style={blogsection.readmorearrow}
                              />{" "}
                            </span>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                ))}
              </Box>
              <Button
                sx={blogsection.viewmoreButton}
                // className="slide-bannerTextButton"
              >
                <Link
                  to={`/blog`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {" "}
                  view more post
                </Link>{" "}
              </Button>
            </>
          ) : (
            <Box
              sx={{
                ...commonStyles.noContentBoxLanifnpage,
              }}
            >
              <AjTypography
                styleData={commonStyles.noDataTextcategories}
                displayText="No data found"
              />
            </Box>
          )}
        </Box>
      </>
    </>
  );
}

export default BlogSection;
