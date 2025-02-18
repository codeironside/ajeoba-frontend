import React, { useRef, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css";

import testavatar from "../Images/testav.png";
import testquote from "../Images/testquote.png";
import testlefttarrow from "../Images/testleft.png";
import testrightarrow from "../Images/testright.png";
import { testimonials } from "./Testimonials.js";

import {
  testimonialsdesktopbackground,
  testimonialsbackgroundmobile,
} from "../../../../Constant/AppConstant.js";

function Testimonials() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [hidePrevArrow, setHidePrevArrow] = useState(false);
  const [hideNextArrow, setHideNextArrow] = useState(false);

  const splideRef = useRef(null);

  function getFirstLetter(name) {
    return name.charAt(0);
  }

  const onMoved = (splide, newIndex) => {
    setHidePrevArrow(newIndex === 0);
    setHideNextArrow(newIndex === splide.length - 1);
  };

  return (
    <>
      {!isSmallScreen ? (
        <Box sx={testimonials.parentbg}>
          <Box sx={testimonials.leftcontent}>
            <Box sx={testimonials.topcontemttext}>
              <Typography sx={testimonials.header}>TESTIMONIALS</Typography>
              <Typography sx={testimonials.header2}>
                What Others Say About Ajeoba
              </Typography>
            </Box>
            <img src={testquote} alt="alt" style={testimonials.quote} />
            <Splide
              options={{
                type: "slide",
                drag: "free",
                arrows: false,
                pagination: false,
                perPage: 1,
              }}
              ref={splideRef}
              onMoved={onMoved}
            >
              {whatothersay.map((item, index) => (
                <SplideSlide key={index}>
                  <Typography sx={testimonials.testtext}>
                    {item.text}
                  </Typography>
                  <Box sx={testimonials.usercontent}>
                    <Typography sx={testimonials.usernameAv}>
                      {getFirstLetter(item.name)}
                    </Typography>
                    <Box>
                      <Typography sx={testimonials.username}>
                        {item.name}
                      </Typography>
                      <Typography sx={testimonials.userrole}>
                        {item.role}
                      </Typography>
                    </Box>
                  </Box>
                </SplideSlide>
              ))}
            </Splide>

            <Box sx={testimonials.usercontrol}>
              {!hidePrevArrow && (
                <img
                  src={testlefttarrow}
                  alt="alt"
                  style={testimonials.arrows}
                  onClick={() => splideRef.current?.go("<")}
                />
              )}
              {!hideNextArrow && (
                <img
                  src={testrightarrow}
                  alt="alt"
                  style={testimonials.arrows}
                  onClick={() => splideRef.current?.go(">")}
                />
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={testimonials.testimonialpg}>
          <Box sx={testimonials.bgimage}>
            <img
              src={testimonialsbackgroundmobile}
              alt="imgtop"
              style={testimonials.bgimage}
            />
          </Box>
          <Box sx={testimonials.paremntlowercontent}>
            <Box sx={testimonials.lowercontent}>
              <Box sx={testimonials.topcontemttext}>
                <Typography sx={testimonials.header}>TESTIMONIALS</Typography>
                <Typography sx={testimonials.header2}>
                  What Others Say About Ajeoba
                </Typography>
              </Box>
              <img src={testquote} alt="alt" style={testimonials.quote} />
              <Splide
                options={{
                  type: "slide",
                  drag: "free",
                  arrows: false,
                  pagination: false,
                  perPage: 1,
                }}
                ref={splideRef}
                onMoved={onMoved}
              >
                {whatothersay.map((item, index) => (
                  <SplideSlide
                    key={index}
                    style={testimonials.testuserparentcontentsm}
                  >
                    <Typography sx={testimonials.testtextsm}>
                      {item.text}
                    </Typography>
                    <Box sx={testimonials.usercontent}>
                      <Typography sx={testimonials.usernameAv}>
                        {getFirstLetter(item.name)}
                      </Typography>
                      <Box>
                        <Typography sx={testimonials.usernamesm}>
                          {item.name}
                        </Typography>
                        <Typography sx={testimonials.userrolesm}>
                          {item.role}
                        </Typography>
                      </Box>
                    </Box>
                  </SplideSlide>
                ))}
              </Splide>
              <Box sx={testimonials.usercontrol}>
                {!hidePrevArrow && (
                  <img
                    src={testlefttarrow}
                    alt="alt"
                    style={testimonials.arrowssm}
                    onClick={() => splideRef.current?.go("<")}
                  />
                )}
                {!hideNextArrow && (
                  <img
                    src={testrightarrow}
                    alt="alt"
                    style={testimonials.arrowssm}
                    onClick={() => splideRef.current?.go(">")}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Testimonials;

const whatothersay = [
  {
    avatar: testavatar,
    name: "Silas Adedeji",
    role: "Corporate Director, Martimer Enterprises",
    text: "Ajeoba's exceptional service revolutionized our agriculture. Their commitment to top-quality inputs and innovative Aggrotech solutions transformed our farm, enhancing yields and operational efficiency. Ajeoba is our go-to partner for agricultural excellence.",
  },
  {
    avatar: testavatar,
    name: "Farouq Bolare",
    role: "CEO, Gtext Holdings",
    text: "Seamless excellence! Ajeoba's integrated platform has simplified our farm's operations, offering a seamless experience for both buying and selling farm produce and inputs. Their user-friendly interface and efficient processes have made transactions a breeze.",
  },
  {
    avatar: testavatar,
    name: "Silas Adedeji",
    role: "Corporate Director, Martimer Enterprises",
    text: "Ajeoba's exceptional service revolutionized our agriculture. Their commitment to top-quality inputs and innovative Aggrotech solutions transformed our farm, enhancing yields and operational efficiency. Ajeoba is our go-to partner for agricultural excellence.",
  },
];
