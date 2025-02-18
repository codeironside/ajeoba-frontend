import React from 'react'
import Head from './BlogStructure/Head'
import Body from './BlogStructure/Body'
import Box from '@mui/material/Box';
import Footer from '../Footer/Footer';
import { blogCSS } from './blogStyles';

const Blog = () => {

  return (
    <>
        <Head />
        <Box sx={{...blogCSS.section_1}}>
            <Body />
        </Box>
        <Footer />
    </>
  )
}

export default Blog;