import React, { useState } from 'react'
import { commonStyles } from '../../../../Style/CommonStyle'
import { Box, Skeleton } from '@mui/material'
import defaultPhoto from "../../../../Assets/Images/defaultPhoto.png"

const ListingImages = ({
    images, 
    image_length, 
    changeImage, 
    loading, 
    setChange, 
    setOpenProductImagesModal, 
    modalImage}) => {


    const [show, setShow] = useState(false)
    const [ind, setInd] = useState(0)

    const handleClick = (index, image) => {
        setShow(true)
        setInd(index)
        changeImage(image)
        setChange(true)
    }

    const generateImageUrl = (item) => {
        if (item) {
          return `${process.env.REACT_APP_IMAGE_URL}/${item}`;
        }
        return ''
      };

    return (<>
        { loading ? 
            <Skeleton 
            sx={{
            bgcolor: "rgba(245, 245, 245, 1)",
            borderRadius: ".5rem",
            }}
            width={60} 
            height={54} /> :
            !modalImage ?
            images?.map((image, index) => 
                index < 4  && 
                <Box 
                sx={
                    commonStyles.imageListing} 
                    key={index + "->" + image.file_name}
                    onClick={() => handleClick(index, image.file_path)}
                >
                    <Box sx={{ "width": "100%", "height": "85%", "marginBottom": "6px", "cursor":"pointer", "display": "flex", "flex-wrap": "wrap"}}>
                        <img  
                            src={generateImageUrl(image.file_path)}
                            alt={"p"}
                            style={{ "width": "100%", "height": "100%", "border-radius": "4.65px" }}
                        />
                        {!modalImage && index === 3 && images.length < 4 && 
                        <Box sx={{
                            "position":"absolute",  
                            "top":"0%", 
                            "color":"white", 
                            "z-index":"100",
                            "right":"20%",
                            "left":"0%",
                            "fontFamily": "Arial",
                            "fontWeight": "plain",
                            "height": "1rem",
                            "padding": "1rem",
                            "width": "1.7rem",
                            "backgroundColor": "#0008",
                        }}
                        onClick={() => setOpenProductImagesModal(true)}
                        >
                            {`+${images.length - (index + 1)}`}
                        </Box>}
                    </Box>
                {show && ind === index && 
                <Box sx={!modalImage ? commonStyles.smallBar : commonStyles.smallTopBar}>
                </Box>}
                
            </Box> ) :
            images?.map((image, index) => 
            <Box 
            sx={
                commonStyles.imageListing} 
                key={index + "->" + image.file_name}
                onClick={() => handleClick(index, image.file_path)}
            >
                <Box sx={{ "width": "100%", "height": "85%", "marginBottom": "6px", "cursor":"pointer", "display": "flex", "overflowX": "scroll"}}>
                    <img  
                        src={generateImageUrl(image.file_path)}
                        alt={"p"}
                        style={{ "width": "100%", "height": "100%", "border-radius": "4.65px" }}
                    />
                    {!modalImage && index === 3 && 
                    <Box sx={{
                        "position":"absolute",  
                        "top":"23%", 
                        "color":"white", 
                        "z-index":"100",
                        "right":"20%",
                        "left":"30%",
                        "fontFamily": "Arial",
                        "fontWeight": "plain",
                        "height": "100%",
                        "width": "100%",
                    }}
                    onClick={() => setOpenProductImagesModal(true)}
                    >
                        {`+${images.length - (index + 1)}`}
                    </Box>}
                </Box>
            {show && ind === index && 
            <Box sx={!modalImage ? commonStyles.smallBar : commonStyles.smallTopBar}>
            </Box>}
            
        </Box> )}  
        {!show && ind === 0 && image_length > 0 && 
            <Box sx={!modalImage ? commonStyles.smallBarSpecial : commonStyles.smallTopBarSpecial}>
            </Box>}
    </>
    )
}
  

export default ListingImages