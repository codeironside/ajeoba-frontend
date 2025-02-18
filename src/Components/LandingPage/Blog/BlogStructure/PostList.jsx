import React from 'react'
import {Tooltip, Paper, Box} from '@mui/material';
import Post from './Post/Post';


const PostList = ({blogContents}) => {

    return (
        <>
            {
            blogContents?.map((blog, index) => (
                <Box key={index}>
                    <Tooltip title={`Read More about ${blog.title}`}>
                        <Post content={blog} />
                    </Tooltip>
                </Box>
            )) 
            }
        </>
    )
}

export default PostList