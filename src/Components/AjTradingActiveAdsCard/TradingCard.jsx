import React from 'react'
import { useNavigate } from "react-router-dom";
import { 
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Skeleton
 } from '@mui/material';
  import {
    numberWithCommas,
  } from "../../Services/commonService/commonService";
  import { styles } from "./styles"
  import { AjRating } from '../AjRating';

const TradingCard = (props) => {

  const {product, index, loading} = props;

    const navigate = useNavigate();

    const handleViewDetail = (item) => {
        if (item?.product_name) {
          navigate(`trade-product-details/${item?.id}?product_type=product-details`)
        } else if (item?.input_name) {
          navigate(`trade-input-details/${item?.id}?product_type=input-details`)
        }
      };
    
      const generateImageUrl = (item) => {
        if (item?.url) {
          return `${process.env.REACT_APP_IMAGE_URL}/${item.url}`;
        }
        return "data:image/jpeg;base64,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";
    
      };

      return (<>
        <Card key={index} sx={styles.cardMainContainer2}>
        {loading? 
            <Skeleton variant="rectangular" width={'100%'} height={150} /> : 
            <Box onClick={() => handleViewDetail(product)}>
              <CardActionArea>
                  <CardMedia
                      component="img"
                      height="150"
                      // width="300"
                      image={generateImageUrl(product)}
                      alt="product"
                    />
              </CardActionArea>
              <Box sx={styles.cardDetailStyle}>
                    <Typography
                        sx={{ ...styles.productname }}
                        level="title-md"
                        gutterBottom
                        variant="div"
                    >
                        {product?.input_name || product?.product_name}
                    </Typography>
                    <Box sx={ styles.ratingBlock }>
                      <Typography
                          gutterBottom
                          variant="div"
                      >
                          {product?.rating}
                      </Typography>
                      <Typography
                          gutterBottom
                          variant="div"
                      >
                          <AjRating
                            defaultValue={product?.rating}
                            readOnly={true}
                            size="small"
                          />
                      </Typography>
                      <Typography
                          sx={ styles.unit }
                          gutterBottom
                          variant="div"
                      >
                          ({product?.totalcount})
                      </Typography>
                    </Box>
                    <Typography>
                      <Typography
                        sx={{ ...styles.productPrice }}
                        gutterBottom
                        variant="p"
                    >
                        {`${numberWithCommas(
                          product?.price_per_unit,
                          product?.currency
                        )}`} </Typography>
                        <Typography variant="span" sx={{ fontStyle: 'italic', fontSize: "11px" }}>(Per Kg)</Typography>
                    </Typography>
              </Box>
            </Box>}
        </Card>
      </>);
}

export default TradingCard