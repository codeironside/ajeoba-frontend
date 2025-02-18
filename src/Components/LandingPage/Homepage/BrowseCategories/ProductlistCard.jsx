import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import {
  textCapitalize,
  numberWithCommas,
} from "../../../../Services/commonService/commonService";
import { useNavigate, useLocation } from "react-router";

import { browseCategry } from "./BrowseCategory";
import { AjRating } from "../../../AjRating";
import { styles } from "../../ProductListing/ProductListingExpanded/ProductList";
import AjTypography from "../../../AjTypography";
import { commonStyles } from "../../../../Style/CommonStyle";
import { Link } from "react-router-dom";
import "../../css/style.css";

function ProductlistCard(props) {
  const navigate = useNavigate();
  const urlLink = (item) => {
    let linkTo;

    if (item?.product_name) {
      linkTo = `/details/farmproduce/${item?.id}`;
    } else if (item?.input_name) {
      linkTo = `/details/farminput/${item?.id}`;
    } else {
      linkTo = `/details/${item?.id}`;
    }
    return linkTo;
  };
  const categoryListings = (item) => {
    if (item?.input_id) {
      navigate(`view-marketplace/farminput/${item.id}`);
    } else {
      navigate(`view-marketplace/farmproduce/${item.name}`);
    }
  };

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
    <Box sx={browseCategry.categoryparentContainr}>
      <Box
        sx={{
          ...browseCategry.categoryOptionContainer,
        }}
      >
        {props?.filterList?.result?.map((item, index) => {
          return (
            <Typography
              onClick={() => categoryListings(item)}
              key={index}
              sx={browseCategry.categoryOption}
            >
              {item.name}
            </Typography>
          );
        })}
      </Box>
      {props?.landingPageList?.totalCount > 0 ? (
        <Box sx={browseCategry.activeadlistContainer}>
          {props?.landingPageList?.result?.map((item, index) => (
            <Card sx={browseCategry.activeadlistCard} key={index}>
              <Link to={urlLink(item)} style={{ textDecoration: "none" }}>
                <CardActionArea>
                  {props?.loading ? (
                    <Skeleton
                      sx={{
                        bgcolor: "rgba(245, 245, 245, 1)",
                        borderRadius: ".5rem",
                      }}
                      height={150}
                      variant="rectangular"
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="150"
                      // width="300"
                      image={generateImageUrl(item)}
                      alt="product"
                    />
                  )}

                  {props.loading ? (
                    <Box sx={{ ...styles.details, p: 1 }}>
                      <Skeleton
                        sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                        width="20%"
                      />
                      <Skeleton
                        sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                        width="40%"
                      />
                      <Skeleton
                        sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
                        width="60%"
                      />
                    </Box>
                  ) : (
                    <CardContent sx={{ ...styles.details }}>
                      <Typography
                        sx={{ ...styles.productname }}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {item?.input_name || item?.product_name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".4rem",
                        }}
                      >
                        <Typography
                          sx={{ ...styles.productname, marginTop: "3px" }}
                        >
                          {!item?.rating ? "0.00" : item?.rating}
                        </Typography>
                        <AjRating
                          defaultValue={item?.rating}
                          readOnly={true}
                          size="small"
                        />
                        <Typography
                          sx={{ ...styles.ratecount, marginTop: "3px" }}
                        >
                          ({item?.rating_count})
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <Typography
                          sx={{ ...styles.productname }}
                          variant="body2"
                          color="text.secondary"
                        >
                          {`${numberWithCommas(
                            item?.price_per_unit,
                            item?.currency
                          )}`}
                        </Typography>
                        <Typography
                          sx={{
                            ...styles.productunit,
                          }}
                        >
                          {`(per ${textCapitalize(item?.unit_of_measurement)})`}
                        </Typography>
                      </Box>
                    </CardContent>
                  )}
                </CardActionArea>{" "}
              </Link>
            </Card>
          ))}
        </Box>
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
  );
}

export default ProductlistCard;
