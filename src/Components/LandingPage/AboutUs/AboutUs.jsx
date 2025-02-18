import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Typography, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { styles } from "./aboutUsStyle.js";
import ValueCard from "./ValueCard.jsx";
import BoardCard from "./BoardCard.jsx";
import { board, core_values, management } from "../../../Constant/AppConstant.js";
import { 
  mission_image, 
  grid, 
  vision_image, 
  bottom_flour, 
  top_flour, 
  use_frame, 
  value_bottom, 
  about_image, 
  about_section_1 } from "../../../Constant/AppConstant.js";

function AboutUs() {
  
  return (
    <Box>
      <NavBar />

      <Box sx={{ ...styles.aboutContainer }}>

        <Box sx={{ ...styles.section_0 }}>
            <img
                style={{ ...styles.about_banner_image }}
                src={about_image}
                alt="About Banner Image"
            />
        </Box>

        <Box sx={{ ...styles.section_1 }}>
          <img 
            style={{ ...(styles.top_flour) }}
            src={top_flour} 
            alt="top"
          />
          <img 
            style={{ ...(styles.bottom_flour) }}
            src={bottom_flour} 
            alt="top"
          />
          <Box sx={{ ...styles.inner_s1 }}>
            <Typography sx={{ ...styles.general_para }}>
                Ajeoba is an investment agriculture value-chain digital infrastructure provider focused on bridging various gaps identified in the agricultural value chain. In line with the Sustainable Development Goals, the company is working to develop an ecosystem for Agro-allied businesses, leveraging technology as an alternative to the current, inefficient physical infrastructure and serving as the integrator cum operator at the center of the Agri-ecosystem in Africa. Our platform is an innovative approach that we believe will change the landscape and improve the way agricultural products are grown, traded, financed, and delivered in Africa in a transparent and more efficient way.
            </Typography>
          </Box>
          <Box sx={{ ...styles.inner_s1 }}>
              <img
                  style={{ ...styles.section_1_banner_image }}
                  src={about_section_1}
                  alt="About Banner Image"
              />
          </Box>
        </Box>

        <Box sx={{ ...styles.section_2, ...styles.value_bottom }}>
            <img style={{ ...(styles.grid) }} src={grid} alt="grid" />
            <Box sx={{ ...styles.section_2_inner }}>
                <Box sx={{ ...styles.inner_s2_inner }}>
                  <Box sx={{ ...styles.s2_para }}>
                      <Typography sx={{ ...styles.title_001 }}>Our Mission</Typography>
                      <Typography sx={{...styles.mission_vision_text}}>To develop an eco-system for Agro-allied businesses, leveraging technology as an alternative to the current inefficient physical structure.</Typography>
                  </Box>
                  <Box>
                    <img
                        style={{ ...styles.section_2_image }}
                        src={mission_image}
                        alt="About Banner Image"
                    />
                </Box>
            </Box>
            <Box sx={{ ...styles.inner_s2_inner, ...styles.isi_reverse }}>
                <Box>
                    <img
                        style={{ ...styles.section_2_image }}
                        src={vision_image}
                        alt="About Banner Image"
                    />
                </Box>
                <Box sx={{ ...styles.s2_para }}>
                    <Typography sx={{ ...styles.title_001 }}>Our Vision</Typography>
                    <Typography sx={{...styles.mission_vision_text}}>To be the key digital infrastructure provider for the agriculture value chain leveraging technology to bridge efficiency gaps limiting access to market and finance for farmers and optimizing returns.</Typography>
                </Box>
            </Box>
            </Box>
            <img
                style={{ ...styles.vb_icon }}
                src={value_bottom}
                alt="Value"
            />
        </Box>

        <Box sx={{ ...styles.section_3, ...styles.value_bottom }}>
          <Typography sx={{ ...styles.title }}>Core Values</Typography>
          <Box sx={{ ...styles.value_container }}>
              <Grid sx={{ ...styles.group_value_card }}>
                  <ValueCard content={core_values} />
              </Grid>
          </Box>
              <img
                style={{ ...styles.vb_icon_left }}
                src={use_frame}
                alt="Value"
              />
        </Box>

        <Box sx={{ ...styles.section_4 }}>
          <Typography sx={{ ...styles.title }} >The Board</Typography>
          <Box sx={{ ...styles.section_4_box }}>
            <Box sx={{ ...styles.board_container }}>
                <Grid sx={{ ...styles.group_board_card }}>
                    <BoardCard content={board} />
                </Grid>
            </Box>
          </Box>
        </Box>

        <Box sx={{ ...styles.section_5 }}>
          <Typography sx={{ ...styles.title, marginBottom: "32px" }}>The Management Staff</Typography>
          <Box sx={{ ...styles.section_5_box }}>
            <Box sx={{ ...styles.board_container }}>
                <Grid sx={{ ...styles.group_board_card }}>
                    <BoardCard content={management} />
                </Grid>
            </Box>
          </Box>
        </Box>
        
        <Footer />
  
      </Box>

    </Box>
  );
}

export default AboutUs;
