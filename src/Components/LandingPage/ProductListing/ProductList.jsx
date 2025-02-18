import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Skeleton,
} from "@mui/material";
import {
  textCapitalize,
  numberWithCommas,
} from "../../../Services/commonService/commonService";
import { AjRating } from "../../AjRating";
import { styles } from "../ProductListing/ProductListingExpanded/ProductList";
import AjTypography from "../../AjTypography";
import { commonStyles } from "../../../Style/CommonStyle";
import Loader from "../../Loader/Loader";

function ProductList({ products, loading, fromCorporate }) {
  
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

  const generateImageUrl = (item) => {
    if (item?.url) {
      return `${process.env.REACT_APP_IMAGE_URL}/${item.url}`;
    }
    return (
      <Skeleton
        sx={{ bgcolor: "rgba(245, 245, 245, 1)" }}
        variant="rectangular"
        height={200}
      />
    );
  };

  // if (loading) return <Loader showLoader={true} />;

  return (
    <div>
      <div>
        {products?.totalCount > 0 ? (
          <Box sx={{ ...styles.listcontainer }}>
            {products?.result.map((item, index) => (
              <Card sx={{ ...styles.card }} key={index}>
                <Link to={urlLink(item)} style={{ textDecoration: "none" }}>
                  <CardActionArea>
                    {loading ? (
                      <Skeleton
                        sx={{
                          bgcolor: "rgba(245, 245, 245, 1)",
                          borderRadius: ".5rem",
                        }}
                        height={250}
                        background="red"
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

                    {loading ? (
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
                              ...styles.productname,
                              fontStyle: "italic",
                              marginLeft: 1,
                            }}
                            variant="body2"
                            color="text.secondary"
                          >
                            {`(per ${textCapitalize(
                              item?.unit_of_measurement
                            )})`}
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
              ...commonStyles.noContentBox,
            }}
          >
            <AjTypography
              styleData={commonStyles.noDataText}
              displayText="No data found"
            />
          </Box>
        )}
      </div>
    </div>
  );
}

export default ProductList;
