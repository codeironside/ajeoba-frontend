import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { styles } from "./ProductList.js";

function ProductListBanner() {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          ...styles.productListcontainer,
        }}
      >
        <Box sx={{ ...styles.textContainer }}>
          <Typography sx={{ ...styles.header }}>
            Explore high quality farm products and inputs
          </Typography>
          <Typography sx={{ ...styles.texts }}>
            At our marketplace, we're not just selling farm products and inputs;
            we're offering you a pathway to seamless transactions within the
            value chain.<br></br>
            <br></br>
            We connect buyers and sellers to a robust and interactive B2B/B2C
            digital storefront for quality agricultural produce and inputs. A
            virtual space to showcase and transact seamlessly, offering you top
            notch payment settlement services and real time order/delivery
            tracking.
          </Typography>
        </Box>
      </Box>
      <img
        src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1700038297/Rectangle_70_m7wsui.png"
        alt="digital"
        style={styles.rect}
      />
      <img
        src="https://res.cloudinary.com/dpnyywwjb/image/upload/v1699980709/Frame_1000001902_f46dkz.png"
        alt="digital"
        style={styles.topcrop}
      />
    </Box>
  );
}

export default ProductListBanner;
