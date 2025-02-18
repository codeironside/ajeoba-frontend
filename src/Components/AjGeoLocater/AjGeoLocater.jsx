import React, { useEffect } from "react";
import { ACTIVE_GREEN, PRIMARY_GREEN } from "../../Constant/ColorConstant";
import { LAND_NOT_ENCLOSED } from "../../Constant/ErrorConstant";
import { showToast } from "../../Services/toast";

const AjGeoLocater = (props) => {
  const defaultPosition = {
    latitude: 6.465422,
    longitude: 3.406448,
  };

  const { setGeoLocation, geoLocation, edit } = props;
  let paths, bounds, i;

  if (geoLocation) {
    paths = window.google.maps.geometry.encoding.decodePath(geoLocation);
    bounds = new window.google.maps.LatLngBounds();

    for (i = 0; i < paths.length; i++) {
      bounds.extend(
        new window.google.maps.LatLng(paths[i].lat(), paths[i].lng())
      );
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setMap(position.coords);
        },
        function (error) {
          setMap(defaultPosition);
        }
      );
    } else {
      setMap(defaultPosition);
    }
  }, []);

  const setMap = (position) => {
    setTimeout(function () {
      let map = new window.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: paths ? bounds.getCenter().lat() : position.latitude,
          lng: paths ? bounds.getCenter().lng() : position.longitude,
        },
        zoom: 15,
      });

      let selectedShape;
      let drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        },
        markerOptions: {
          icon: "images/beachflag.png",
        },

        polygonOptions: {
          clickable: true,
          draggable: true,
          ediatable: false,
          fillColor: ACTIVE_GREEN,
          fillOpacity: 0.6,
          strokeColor: PRIMARY_GREEN,
          strokeOpacity: 1,
          strokeWeight: 2,
        },
      });

      function clearSelection() {
        if (selectedShape) {
          deleteSelectedShape();
          selectedShape = null;
        }
      }

      function createLand() {
        const bermudaTriangle = new window.google.maps.Polygon({
          paths: window.google.maps.geometry.encoding.decodePath(geoLocation),
          fillColor: ACTIVE_GREEN,
          fillOpacity: 0.6,
          strokeColor: PRIMARY_GREEN,
          strokeOpacity: 1,
          strokeWeight: 2,
        });
        bermudaTriangle.setMap(map);
        map.fitBounds(bounds);
      }

      function showOptions() {
        drawingManager.setMap(map);

        let centerControlDiv = document.createElement("div");
        new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(
          centerControlDiv
        );
      }

      if (geoLocation) {
        createLand();
      }
      if (edit) showOptions();

      function setSelection(shape) {
        clearSelection();
        selectedShape = shape;
        window.google.maps.event.addListener(
          selectedShape.getPath(),
          "insert_at",
          getPolygonCoords(shape)
        );
      }

      function CenterControl(controlDiv) {
        // Set CSS for the control border.
        let controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.border = "0.125rem solid #fff";
        controlUI.style.borderRadius = "0.188rem";
        controlUI.style.boxShadow = "0 0.125rem 0.375rem rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "1.375rem";
        controlUI.style.textAlign = "center";
        controlUI.title = "Select to delete the shape";
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        let controlText = document.createElement("div");
        controlText.style.color = "rgb(25,25,25)";
        controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        controlText.style.fontSize = "0.75rem";
        controlText.style.lineHeight = "1.375rem";
        controlText.style.paddingLeft = "0.313rem";
        controlText.style.paddingRight = "0.313rem";
        controlText.innerHTML = "Delete Selected Land";
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener("click", function () {
          deleteSelectedShape();
        });
      }

      function deleteSelectedShape() {
        if (selectedShape) {
          selectedShape.setMap(null);
          setGeoLocation("");
        }
      }

      function getPolygonCoords(newShape) {
        if (newShape.getPath().getLength() <= 2) {
          showToast(LAND_NOT_ENCLOSED, "error");
          props.setError(true);
        } else {
          const encodeString = window.google.maps.geometry.encoding.encodePath(
            newShape.getPath()
          );
          setGeoLocation(encodeString);
          props.setError(false);
        }
        return null;
      }

      window.google.maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        function (event) {
          if (event.type !== window.google.maps.drawing.OverlayType.MARKER) {
            drawingManager.setDrawingMode(null);
            //Write code to select the newly selected object.
            let newShape = event.overlay;
            newShape.type = event.type;
            window.google.maps.event.addListener(
              newShape,
              "click",
              function () {
                setSelection(newShape);
              }
            );

            setSelection(newShape);
          }
        }
      );
    });
  };

  return (
    <>
      <div id="map" style={{ height: "calc(100vh - 22.5rem)" }}></div>
    </>
  );
};

export default AjGeoLocater;
