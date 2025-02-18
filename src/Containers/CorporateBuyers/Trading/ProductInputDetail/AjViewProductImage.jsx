import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, Box, Skeleton} from '@mui/material';

import { viewStyles } from "./view";
import ListingImages from "./ListingImages";

const AjDialogProductImages = ({ 
    images, 
    image_length, 
    changeImage, 
    setChange, 
    setOpenProductImagesModal, 
    loading 
}) => {
    const [image, setImage] = useState(images[0]?.file_path)
  

    const generateImageUrl = (item) => {
        if (item) {
          return `${process.env.REACT_APP_IMAGE_URL}/${item}`;
        }
        return <Skeleton 
                  sx={{
                    bgcolor: "rgba(245, 245, 245, 1)",
                    borderRadius: ".5rem",
                    display: "block",
                  }}
                  width={351} 
                  height={223} 
                /> 
              };

              
    return (
            <Card sx={{ ...viewStyles.vHeight }}>
                {loading ? 
                <Skeleton 
                    sx={{
                    bgcolor: "rgba(245, 245, 245, 1)",
                    borderRadius: ".5rem",
                    display: "block",
                    }}
                    width={"100%"} 
                    height={"100%"} 
                />
                 :
                <CardActionArea sx={{ ...viewStyles.body }}>
                    <CardMedia
                        component="img"
                        height="100%"
                        image={generateImageUrl(image)}
                        alt="i_product"
                    />
                </CardActionArea>}
                <Box sx={{ ...viewStyles.footer }}>
                    {loading ? 
                    <Skeleton 
                        sx={{
                        bgcolor: "rgba(245, 245, 245, 1)",
                        borderRadius: ".5rem",
                        display: "block",
                        }}
                        width={"100%"} 
                        height={"100%"} 
                    />
                     : 
                    <ListingImages 
                        images={images} 
                        image_length={image_length} 
                        changeImage={setImage} 
                        setChange={setChange}
                        setOpenProductImagesModal={setOpenProductImagesModal}
                        loading={loading}
                        modalImage={true}
                    />}
                </Box>
            </Card>
    );
};

export default AjDialogProductImages;