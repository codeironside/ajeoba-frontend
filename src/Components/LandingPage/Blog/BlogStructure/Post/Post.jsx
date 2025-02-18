import React, { useEffect } from 'react'
import { blogCSS } from '../../blogStyles';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { read_more_btn, user_icon } from '../../../../../Constant/AppConstant';
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";


const Post = ({content}) => {

  const getHtmlFromRaw = (data) => {
    const editorState = convertFromRaw(JSON.parse(data));
    const htmlContent = convertToHTML(editorState);
    return htmlContent.substring(0, 120) + "...";
  };
  
  const {id, title, blog_text, author, created_at, reading_minutes, url} = {...content};


    return (
      <Box sx={{ ...blogCSS.card }}>
          <Box sx={{ ...blogCSS.blog_card }}>
              <img style={{ ...(blogCSS.blog_image) }} height={"193.008px"} src={`${process.env.REACT_APP_IMAGE_URL}/${url}`} alt="Post Image" />
              <Box sx={{ display: "flex", flexDirection: "column", gap: ".5rem", padding: "1rem" }}>
                <Typography sx={{ ...blogCSS.blog_title }}>{title}</Typography>
                <Typography sx={{ ...blogCSS.blog_para }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getHtmlFromRaw(blog_text),
                    }}
                  />
                </Typography>
                <Link to={`/blog/${id}`} style={{ ...(blogCSS.link) }}>
                  <img src={read_more_btn} style={{ ...(blogCSS.link_img) }} alt='Read more button' />
                </Link>
              </Box>
          </Box>
          <Box sx={{ ...blogCSS.info }}>
            <img 
                style={{ ...(blogCSS.topmost_image_dim) }} 
                src={user_icon} 
                alt="Post image" 
            />
            <Typography>{author}</Typography>
            <ul style={{ ...(blogCSS.info_min) }}>
                <li>{created_at.substring(0, 10)}</li>
                <li>{reading_minutes} {reading_minutes > 1 ?  "mins" : "min"}</li>
            </ul>
          </Box>
      </Box>
    )
}

export default Post