import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import * as _ from "lodash";
import AjAddCoordinates from "../AjAddCoordinates/AjAddCoordinates";
import AjButton from "../AjButton";
import { showToast } from "../../Services/toast";
import { ACTIVE_GREEN, PRIMARY_GREEN } from "../../Constant/ColorConstant";
import { styles } from "./AjMultipleCoordinatesStyles";
import { commonStyles } from "../../Style/CommonStyle";

const AjAddMultipleCoordinates = (props) => {
  const { setGeoLocation, submit, setIsUpdated, setError } = props;
  const [coordinates, setCoordinates] = useState([{ lat: null, lng: null }]);

  const getData = (dataOfCoordinates, index) => {
    const newCoordinate = coordinates.slice();
    newCoordinate[index] = dataOfCoordinates;
    setCoordinates(newCoordinate);
  };

  const deleteItem = (deletedCoordinateData, deletedCoordinateIndex) => {
    if (coordinates?.length) {
      setCoordinates((prev) => {
        return prev.filter(
          (coordinateItem, coordinateIndex) =>
            coordinateIndex !== deletedCoordinateIndex
        );
      });
    }
  };
  const onAddMoreCoordinateHandler = () => {
    const newCoordinate = coordinates.slice();
    const lastItem = _.last(newCoordinate);
    if (lastItem.lat && lastItem.lng) {
      addCoordinatesButton();
    } else {
      showToast("Please Enter Coordinates", "error");
    }
  };

  const addCoordinatesButton = () => {
    setCoordinates([...coordinates, { lat: null, lng: null }]);
  };

  useEffect(() => {
    if (submit) {
      if (coordinates?.length <= 2) {
        setError(true);
      } else {
        setError(false);
        const validCoords = [];
        coordinates.map((item) => {
          validCoords.push({
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
          });
        });
        const farmerLandPath = new window.google.maps.Polyline({
          path: validCoords,
          geodesic: true,
          fillColor: ACTIVE_GREEN,
          fillOpacity: 0.6,
          strokeColor: PRIMARY_GREEN,
          strokeOpacity: 1,
          strokeWeight: 2,
        });
        const encodeString = window.google.maps.geometry.encoding.encodePath(
          farmerLandPath.getPath()
        );
        setGeoLocation(encodeString);
      }
      setIsUpdated(true);
    }
  }, [submit]);

  return (
    <>
      <Grid container sx={styles.mainContainer}>
        <Box sx={commonStyles.maxWidth}>
          {coordinates.map((item, index) => (
            <AjAddCoordinates
              index={index}
              key={index}
              onChange={(data) => getData(data, index)}
              onDelete={(data) => deleteItem(data, index)}
              length={coordinates?.length}
              defaultValue={item}
            />
          ))}

          <AjButton
            variant="text"
            displayText="add more Coordinate"
            styleData={styles.button}
            onClick={onAddMoreCoordinateHandler}
          />
        </Box>
      </Grid>
    </>
  );
};

export default AjAddMultipleCoordinates;
