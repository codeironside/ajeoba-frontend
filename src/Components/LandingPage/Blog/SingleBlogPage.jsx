import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Head from './BlogStructure/Head'
import Footer from '../Footer/Footer'
import { Box, CssBaseline, Typography } from '@mui/material'
import { blogCSS } from './blogStyles'
import { user_icon } from '../../../Constant/AppConstant'
import { getBlogDetailByIdAction } from '../../../Redux/SuperAdmin/BlogManagement/blogActions';
import { useSelector, useDispatch } from 'react-redux';
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";


const SingleBlogPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const blogDetail = useSelector(
        (state) => state.blog.blogDetail
      );

    useEffect(() => {       
    dispatch(getBlogDetailByIdAction(id)); 
    }, [id]);

    const getHtmlFromRaw = (data) => {
        const editorState = convertFromRaw(JSON.parse(data));
        const htmlContent = convertToHTML(editorState);
        return htmlContent;
      };

    return (
        <>
            <CssBaseline />
            <Head/>
            <Box sx={{ ...blogCSS.single_wrapper }}>
                <Box sx={{ ...blogCSS.inner_wrapper }}>
                    <Box sx={{ ...blogCSS.bannerTopTitle }}>
                        <Typography sx={{ ...blogCSS.title }}>{blogDetail?.title}</Typography>
                        <Box sx={{ ...blogCSS.info }}>
                            <img 
                                style={{ ...(blogCSS.topmost_image_dim) }} 
                                src={user_icon} 
                                alt="Post image" 
                            />
                            <Typography>{blogDetail?.author}</Typography>
                            <ul style={{ ...(blogCSS.info_min) }}>
                                <li>{blogDetail?.created_at.substring(0, 10)}</li>
                                <li>{blogDetail?.reading_minutes} {
                                blogDetail?.reading_minutes > 1 ?  
                                    "mins" : "min"
                                }</li>
                            </ul>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ ...blogCSS.inner_wrapper, ...blogCSS.inner_wrapper_last }}>
                    
                    <Box>
                        <img 
                            src={`${process.env.REACT_APP_IMAGE_URL}/${blogDetail?.url}`}
                            alt={blogDetail?.title} 
                            style={{...(blogCSS.blog_image_single_blog)}}
                        /> 
                    </Box>
                    <Box>
                        <Typography 
                            sx={{ 
                                    ...blogCSS.general_para, textAlign: "justify", 
                                }}>
                            { blogDetail && <div
                                dangerouslySetInnerHTML={{
                                    __html: getHtmlFromRaw(blogDetail?.blog_text),
                                }}
                            />}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default SingleBlogPage