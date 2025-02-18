import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import Banner from "./Banner/Banner.jsx";
import ExploreSection from "./ExploreSection/ExploreSection.jsx";
import BrowseCategory from "./BrowseCategories/BrowseCategory.jsx";
import ValueProp from "./ValueProp/ValueProp.jsx";
import Testimonials from "./Testimonials/Testimonials.jsx";
import WhoNeedsSoftware from "./WhoNeedsSoftware/WhoNeedsSoftware.jsx";
import ExploreMobileApp from "./ExploreMobileApp/ExploreMobileApp.jsx";
import BlogSection from "./BlogSection/BlogSection.jsx";
import Patners from "./Patners/Patners.jsx";

function HomePage() {
  return (
    <Box>
      <Banner />
      <ExploreSection />
      <BrowseCategory />
      <ValueProp />
      <WhoNeedsSoftware />
      <ExploreMobileApp />
      <Testimonials />
      <BlogSection />
      <Patners />
    </Box>
  );
}

export default HomePage;
