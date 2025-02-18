import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { whoneedssoftware } from "./WhoNeedsSoftware";
import faicon from "../Images/faicon.png";
import qa from "../Images/qa.svg";
import lc from "../Images/lc.svg";
import is from "../Images/is.svg";
import cb from "../Images/cb.svg";
import fc from "../Images/fc.png";
import eo from "../Images/eo.svg";
import viewmorearrow from "../Images/arrow-right-02-round.png";
import { useNavigate } from "react-router";

import {
  greenbgwhoneedssoftwaredesktop,
  dashboardsoftwarewhoneedssoftware,
} from "../../../../Constant/AppConstant.js";

function WhoNeedsSoftware() {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  const navigate = useNavigate();

  return (
    <Box>
      {isSmallScreen ? (
        <Box sx={whoneedssoftware.pagecontainersm}>
          <Box sx={whoneedssoftware.bgcontainer}>
            <Box sx={whoneedssoftware.allcontent}>
              <Box sx={whoneedssoftware.topheadersm}>
                <Typography sx={whoneedssoftware.header}>
                  Who Needs Ajeoba’s Software ?
                </Typography>
                <Typography sx={whoneedssoftware.header2}>
                  The software links agricultural sellers and buyers, leveraging
                  technology to streamline transactions and boost supply chain
                  efficiency.
                </Typography>
              </Box>

              {/* <Box sx={whoneedssoftware.dashboardimgsm}> */}
              <img
                src={dashboardsoftwarewhoneedssoftware}
                alt="bggreen"
                style={whoneedssoftware.greenimagesm}
              />
              {/* </Box> */}

              <Box sx={whoneedssoftware.bottomContainersm}>
                {personas.map((item, index) => (
                  <Box
                    key={index}
                    onClick={() => navigate("/personas")}
                    sx={
                      item.name === "View More"
                        ? whoneedssoftware.valueppropoptions
                        : whoneedssoftware.leftContainerbottomParentcontent
                    }
                  >
                    <img
                      src={item.icon}
                      alt="icon"
                      style={
                        item.name === "View More"
                          ? whoneedssoftware.leftContainerbottomviewmoresm
                          : whoneedssoftware.leftContainerbottomcontenticon
                      }
                    />
                    <Typography
                      sx={whoneedssoftware.leftContainerbottomcontenttextsm}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={whoneedssoftware.pagecontainer}>
          <Box sx={whoneedssoftware.greenimaagecontainer}>
            <img
              src={greenbgwhoneedssoftwaredesktop}
              alt="bgdashboad"
              style={whoneedssoftware.bottomContainerLeftimage}
            />
          </Box>

          <>
            <Box sx={whoneedssoftware.topContainer}>
              <Box sx={whoneedssoftware.leftContainerTopcontent}>
                <Typography
                  sx={whoneedssoftware.leftContainerTopcontentTopText}
                >
                  Who Needs Ajeoba’s <br/> Software ?
                </Typography>
                <Typography
                  sx={whoneedssoftware.leftContainerTopcontentBottomText}
                >
                  The software links agricultural sellers and buyers, leveraging
                  technology to streamline transactions and boost supply chain
                  efficiency.{" "}
                </Typography>
              </Box>
            </Box>
            <Box sx={whoneedssoftware.bottomContainerLeft}>
              <img
                src={dashboardsoftwarewhoneedssoftware}
                alt="bgdashboad"
                style={whoneedssoftware.bottomContainerLeftimage}
              />
            </Box>

            <Box sx={whoneedssoftware.bottomContainerRight}>
              {personas.map((item, index) => (
                <Box
                  key={index}
                  onClick={() => navigate("/personas")}
                  sx={
                    item.name === "View More"
                      ? whoneedssoftware.leftContainerbottomParentcontentviewMo
                      : whoneedssoftware.leftContainerbottomParentcontentviewMoreBox
                  }
                >
                  <img
                    src={item.icon}
                    alt="icon"
                    style={
                      item.name === "View More"
                        ? whoneedssoftware.leftContainerbottomviewmore
                        : whoneedssoftware.leftContainerbottomcontenticon
                    }
                  />
                  <Typography
                    sx={whoneedssoftware.leftContainerbottomcontenttext}
                  >
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        </Box>
      )}
    </Box>
  );
}

export default WhoNeedsSoftware;

const personas = [
  {
    name: "Farming Associations",
    icon: faicon,
  },
  {
    name: "Quality Assurance",
    icon: qa,
  },
  {
    name: "Corporate Buyers",
    icon: cb,
  },
  {
    name: "Logistics Companies",
    icon: lc,
  },
  {
    name: "Input Suppliers",
    icon: is,
  },
  {
    name: "E-extension Officers",
    icon: eo,
  },
  {
    name: "Financial Companies",
    icon: fc,
  },
  {
    name: "View More",
    icon: viewmorearrow,
  },
];
