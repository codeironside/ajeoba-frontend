import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { AjRating } from "../../../AjRating.jsx";
import { styles } from "../ProductListingExpanded/ProductList.js";
import {
  textCapitalize,
  numberWithCommas,
} from "../../../../Services/commonService/commonService.js";

function ProdDetailsviewmore({ allOpenMarketPlaceProducts, alladsloading }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const newScrollPosition =
      direction === "next"
        ? scrollPosition + container.clientWidth
        : scrollPosition - container.clientWidth;

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });

    setScrollPosition(newScrollPosition);
    updateArrowVisibility(newScrollPosition);
  };

  const updateArrowVisibility = (scrollPos) => {
    const container = containerRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (scrollPos >= maxScrollLeft) {
      document.getElementById("arrowscrollnext").style.display = "none";
    } else {
      document.getElementById("arrowscrollnext").style.display = "block";
    }

    if (scrollPos <= 0) {
      document.getElementById("arrowscrollprev").style.display = "none";
    } else {
      document.getElementById("arrowscrollprev").style.display = "block";
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
        height={118}
      />
    );
  };
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

  return (
    <div>
      <Box sx={{ marginTop: "1.5rem" }}>
        <Box sx={{ ...styles.viewMoreContainer }}>
          <Typography sx={{ ...styles.viewMoreheader }}>
            You may also like
          </Typography>
          <Typography
            onClick={() => navigate("/view-marketplace")}
            sx={{ ...styles.viewMorelink }}
          >
            SEE ALL
          </Typography>
        </Box>
        <Box sx={{ position: "relative" }}>
          <Box
            ref={containerRef}
            sx={{
              ...styles.listcontainerdetailspage,
            }}
          >
            {allOpenMarketPlaceProducts?.result.map((item, index) => (
              <Card sx={{ ...styles.cardDetailspage }} key={index}>
                <Link to={urlLink(item)} style={{ textDecoration: "none" }}>
                  <CardActionArea>
                    {alladsloading ? (
                      <Skeleton
                        sx={{
                          bgcolor: "rgba(245, 245, 245, 1)",
                          borderRadius: ".5rem",
                        }}
                        height={200}
                        variant="rectangular"
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        height="200"
                        // width="300"
                        image={generateImageUrl(item)}
                        alt="product"
                      />
                    )}
                    {alladsloading ? (
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
          <Button
            id="arrowscrollnext"
            sx={{ ...styles.arrowscrollnext }}
            onClick={() => handleScroll("next")}
          >
            <img
              src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700802353/ajeoba%20landingpage%20images/Frame_1000002024_h7wdjr.png"
              alt="arrow left button"
            />
          </Button>
          <Button
            id="arrowscrollprev"
            sx={{ ...styles.arrowscrollprev }}
            onClick={() => handleScroll("prev")}
          >
            <img
              src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700802353/ajeoba%20landingpage%20images/Frame_1000002024_h7wdjr.png"
              alt="arrow left button"
            />
          </Button>{" "}
        </Box>
      </Box>
    </div>
  );
}

export default ProdDetailsviewmore;
