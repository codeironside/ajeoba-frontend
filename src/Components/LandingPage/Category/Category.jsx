import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import MenuIcon from "@mui/icons-material/Menu";

import "../css/style.css";
import {
  List,
  ListItemText,
  Typography,
  Divider,
  Box,
  ListItemButton,
  Paper,
} from "@mui/material";

import { bannerStyles } from "../NavBar/NavBar";
import { styles } from "../../../Containers/Layout/LayoutStyle";

export function Categoryls({ productListLandingPage, inputListLandingPage }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const onCategoryClick = (name) => {
    setSelectedCategory(name);
    const queryParams = name === "All" ? "" : `?q=${name}`;
    if (
      productListLandingPage?.result?.some((option) => option.name === name)
    ) {
      navigate(`/products${queryParams}`);
    } else if (
      inputListLandingPage?.result?.some((option) => option.name === name)
    ) {
      navigate(`/products${queryParams}`);
    }
  };

  const getCategoryClassName = (categoryName) => {
    return selectedCategory === categoryName ? "selectedCategoryItem" : "";
  };

  return (
    <div>
      <Box sx={{ ...bannerStyles.categoryStyle }}>
        <Typography
          variant="h5"
          sx={{
            ...bannerStyles.categoryHeader,
          }}
        >
          Categories
        </Typography>
        <Divider sx={{ color: "#006d33", width: "100%" }} />
        <List
          sx={{
            ...bannerStyles.categoryListBigScreen,
          }}
        >
          {productListLandingPage?.result?.map((option, index) => (
            <ListItemButton
              key={index}
              button
              onClick={() => onCategoryClick(option.name)}
              className={getCategoryClassName(option.name)}
              sx={{
                ...styles.buttonText,
                textTransform: "capitalize",
              }}
            >
              <ListItemText
                sx={{
                  ...styles.buttonText,
                  textTransform: "capitalize",
                }}
                primary={option.name}
              />
            </ListItemButton>
          ))}
          {inputListLandingPage?.result?.map((option, index) => (
            <ListItemButton
              key={index}
              button
              onClick={() => onCategoryClick(option.name)}
              className={getCategoryClassName(option.name)}
              sx={{ ...styles.buttonText, textTransform: "capitalize" }}
            >
              <ListItemText
                sx={{ ...styles.buttonText, textTransform: "capitalize" }}
                primary={option.name}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );
}

export function Categorysm({ productListLandingPage, inputListLandingPage }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const onCategoryClick = (name) => {
    setSelectedCategory(name);
    const queryParams = name === "All" ? "" : `?q=${name}`;
    if (
      productListLandingPage?.result?.some((option) => option.name === name)
    ) {
      navigate(`/products${queryParams}`);
    } else if (
      inputListLandingPage?.result?.some((option) => option.name === name)
    ) {
      navigate(`/products${queryParams}`);
    }
  };

  const getCategoryClassName = (categoryName) => {
    return selectedCategory === categoryName ? "selectedCategoryItem" : "";
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        overflowX: "auto",
        margin: "10px 0",
        "& > :not(style)": {
          m: 1,
          width: 65,
          height: 60,
        },
      }}
    >
      {productListLandingPage?.result?.map((option, index) => (
        <Paper
          key={index}
          elevation={3}
          onClick={() => onCategoryClick(option.name)}
          className={getCategoryClassName(option.name)}
          sx={{
            flex: "0 0 auto",
            minWidth: 70,
            maxWidth: 70,
            height: 70,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // marginRight: 10,
            // margin: " 0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuIcon
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#6D9E3F",
              }}
            />
          </Box>
          <Divider style={{ minWidth: "100%", margin: ".3rem " }} />
          <Typography
            sx={{
              fontSize: ".7rem",
              textTransform: "capitalize",
              textAlign: "center",
              padding: "0",
            }}
            variant="subtitle1"
          >
            {option.name}
          </Typography>
        </Paper>
      ))}
      {inputListLandingPage?.result?.map((option, index) => (
        <Paper
          key={index}
          elevation={3}
          onClick={() => onCategoryClick(option.name)}
          className={getCategoryClassName(option.name)}
          sx={{
            flex: "0 0 auto",
            minWidth: 70,
            maxWidth: 70,
            height: 70,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuIcon
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#6D9E3F",
              }}
            />
          </Box>
          <Divider style={{ minWidth: "100%", margin: ".3rem " }} />
          <Typography
            sx={{
              fontSize: ".7rem",
              textTransform: "capitalize",
              textAlign: "center",
            }}
            variant="subtitle1"
          >
            {option.name}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
