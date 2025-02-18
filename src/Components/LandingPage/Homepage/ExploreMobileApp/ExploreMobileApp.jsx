import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import apple from "../Images/apple.png";
import playstore from "../Images/playstore.png";
import { exploremobileapp } from "./ExploreMobileApp.js";
import Carousel from "./Carousel.jsx";

import {
  exploremobileappbackground,
  exploremobileappactualmobileohonedeaktop,
  exploremobileappactualmobileohonesmallphone,
} from "../../../../Constant/AppConstant.js";

function ExploreMobileApp() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={exploremobileapp.background}>
      <img
        src={exploremobileappbackground}
        alt="Banner"
        style={exploremobileapp.bgImage}
      />
      <Box sx={exploremobileapp.container}>
        <Box sx={exploremobileapp.topcontemt}>
          <Box sx={exploremobileapp.topcontemttext}>
            <Typography sx={exploremobileapp.header}>
              Explore Mobile app
            </Typography>
            <Typography sx={exploremobileapp.header2}>
              Discover quality products & inputs on ajeoba
            </Typography>
            <Typography sx={exploremobileapp.commingsson}>
              Coming Soon!
            </Typography>
          </Box>

          <Box sx={exploremobileapp.downloadappcpntainer}>
            <Box sx={exploremobileapp.downloadapp}>
              <img
                src={playstore}
                alt="playstore"
                style={exploremobileapp.storeicon}
              />
              <Typography sx={exploremobileapp.download}>
                Download on Google Play
              </Typography>
            </Box>
            <Box sx={exploremobileapp.downloadapp}>
              <img
                src={apple}
                alt="appstore"
                style={exploremobileapp.storeicon}
              />
              <Typography sx={exploremobileapp.download}>
                Download on App store
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={
            !isSmallScreen
              ? exploremobileapp.bottomContent
              : exploremobileapp.bottomContentsm
          }
        >
          {!isSmallScreen ? (
            <img
              src={exploremobileappactualmobileohonedeaktop}
              alt="playstore"
              style={exploremobileapp.bottomimg}
            />
          ) : (
            <img
              src={exploremobileappactualmobileohonesmallphone}
              alt="playstore"
              style={exploremobileapp.bottomimg}
            />
          )}
        </Box>
      </Box>
      <Box sx={exploremobileapp.carouselbottom}>
        <Carousel />
      </Box>
    </Box>
  );
}

export default ExploreMobileApp;
