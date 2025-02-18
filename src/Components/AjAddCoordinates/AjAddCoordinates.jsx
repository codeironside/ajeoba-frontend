import React, { useEffect, useState } from "react";
import { Grid, IconButton, InputBase } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import AjInputLabel from "../AjInputLabel";
import AjTypography from "../AjTypography";
import { styles } from "../AjAddMultipleCoordinates/AjMultipleCoordinatesStyles";
import { commonStyles } from "../../Style/CommonStyle";

const coordinateSchema = Yup.object().shape({
  latitude: Yup.string().required("Latitude is required"),
  longitude: Yup.string().required("Longitude is required"),
});
const AjAddCoordinates = (props) => {
  const [particularLatitude, setParticularLatitude] = useState(null);
  const [particularLongitude, setParticularLongitude] = useState(null);

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(coordinateSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (props.defaultValue) {
      setParticularLatitude(props.defaultValue?.lat);
      setParticularLongitude(props.defaultValue?.lng);
      setValue("latitude", props.defaultValue?.lat);
      setValue("longitude", props.defaultValue?.lng);
    }
  }, [props.defaultValue]);

  const latitudeChangeHandler = (data) => {
    setParticularLatitude(data.target.value);
    setValue("latitude", data.target.value, { shouldValidate: true });
    props.onChange({
      lat: data.target.value,
      lng: particularLongitude,
    });
  };
  const longitudeChangeHandler = (data) => {
    setParticularLongitude(data.target.value);
    setValue("longitude", data.target.value, { shouldValidate: true });
    props.onChange({
      lat: particularLatitude,
      lng: data.target.value,
    });
  };
  const deleteHandler = () => {
    clearErrors();
    if (props.index === 0 && props.length === 1) {
      setParticularLatitude(null);
      setParticularLongitude(null);
      props.onChange({
        lat: null,
        lng: null,
      });
      setValue("latitude", "");
      setValue("longitude", "");
    } else {
      props.onDelete({
        lat: particularLatitude,
        lng: particularLongitude,
      });
    }
  };

  return (
    <>
      <Grid sx={styles.coordsContainer}>
        <Grid item xs={12} sm={6} sx={{ marginRight: "1rem" }}>
          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Enter Latitude"
          />
          <InputBase
            required
            fullWidth
            id="Latitude"
            name="Latitude"
            placeholder="Enter Latitude"
            sx={{
              ...commonStyles.inputStyle,
            }}
            value={particularLatitude}
            onChange={(e) => setParticularLatitude(e.target.value)}
            error={errors.latitude ? true : false}
            {...register("latitude", {
              onChange: latitudeChangeHandler,
            })}
          />
          <AjTypography
            styleData={{
              ...commonStyles.errorText,
              ...commonStyles.customErrorText,
            }}
            displayText={errors.latitude?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AjInputLabel
            displayText="Enter Longitude"
            required
            styleData={commonStyles.inputLabel}
          />
          <InputBase
            required
            fullWidth
            id="Longitude"
            name="Longitude"
            placeholder="Enter Longitude"
            value={particularLongitude}
            sx={{
              ...commonStyles.inputStyle,
            }}
            error={errors.longitude ? true : false}
            {...register("longitude", {
              onChange: longitudeChangeHandler,
            })}
          />

          <AjTypography
            styleData={{
              ...commonStyles.errorText,
              ...commonStyles.customErrorText,
            }}
            displayText={errors.longitude?.message}
          />
        </Grid>
        {!!particularLatitude && !!particularLongitude && (
          <IconButton disableRipple onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </>
  );
};

export default AjAddCoordinates;
