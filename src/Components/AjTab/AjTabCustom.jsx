import React from "react";
import { Box, Tab, Tabs, Typography, Grid } from "@mui/material";
import AjTypography from "../AjTypography";
import { commonStyles } from "../../Style/CommonStyle";
import { styles } from "./AjTabStyles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const AjTab = ({
  positionLeft,
  components,
  isTabPanelDisplay,
  displayProfileText,
  onChange,
  defaultIndex = 0,
  backgroundTabs = true,
  textEllipsis = false,
  noIconTabStyle = false,
}) => {
  const [value, setValue] = React.useState(defaultIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <Box
      sx={{
        ...commonStyles.relativePosition,
        ...(backgroundTabs && styles.mainContainer),
        maxWidth: "100%",
      }}
    >
      
        <Grid container item sx={{ ...(backgroundTabs && styles.content) }}>
            {displayProfileText && (
            <AjTypography
                styleData={{
                ...styles.title,
                ...(!isTabPanelDisplay && styles.superAdminProfile),
                }}
                align="center"
                displayText={displayProfileText}
            />
            )}
        </Grid>
        <Box
          // sx={{
          //       ...styles.activeTabPaddingCorp
          //   }}
        >
          <Tabs
              sx={{
              ...(backgroundTabs ? styles.activeTab : styles.listingActiveTabs),
              ...(backgroundTabs
                  ? isTabPanelDisplay
                  ? styles.tabPanelDisplay
                  : styles.noActiveTab
                  : styles.listingTabPanelDisplay),
                  ...(positionLeft && styles.activeTabAlignLeftCorp),
              }}
              value={value}
              onChange={handleChange}
          >
              {components.map((element, index) => (
              <Tab
                  key={index}
                  label={
                  <Typography sx={{ ...(textEllipsis && styles.textEllipsis) }}>
                      {element.label || ""}
                  </Typography>
                  }
                  icon={element.icon || ""}
                  {...a11yProps(element.index)}
                  sx={{
                  ...styles.tabStyling,
                  ...(noIconTabStyle && { padding: "none" }),
                  ...(!backgroundTabs && styles.listingInActiveTab),
                  }}
              />
              ))}
          </Tabs>
        </Box>
        <>
            {components.map(({ component }, index) => (
            <TabPanel value={value} index={index} key={index}>
                {React.cloneElement(component, { setActiveTab: setValue })}
            </TabPanel>
            ))}
        </>
      </Box>
  );
};

export default AjTab;
