import React, { useState, useEffect } from "react";
import { Box, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AjTypography from "../../Components/AjTypography";
import AjCountry from "../AjCountry/AjCountry";
import AjState from "../AjState/AjState";
import { styles as detailsstyle } from "../LandingPage/ProductListing/ProductListingExpanded/ProductList";

import { addressSchema } from "../../validationSchema/addressSchema";
import { commonStyles } from "../../Style/CommonStyle";

function AjAddressNew(props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema(props.zipCodeRequired)),
    mode: "onChange",
  });

  const [selectedCodeOfCountry, setSelectedCodeOfCountry] = useState(null);
  const [stateReset, setStateReset] = useState(false);

  const [cancel, setCancel] = useState(false);
  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    if (props.reset) {
      setValues();
    }
    setCancel(props.reset);
  }, [props.reset]);

  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  const setValues = () => {
    if (props.defaultAddressLine1) {
      setValue("addressLine1", props.defaultAddressLine1, {
        shouldValidate: true,
      });
    }
    if (props.defaultAddressLine2) {
      setValue("addressLine2", props.defaultAddressLine2, {
        shouldValidate: true,
      });
    }
    if (props.defaultCity) {
      setValue("city", props.defaultCity, { shouldValidate: true });
    }
    if (props.defaultZipCode) {
      setValue("zipCode", props.defaultZipCode ? props.defaultZipCode : "", {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data) => {
    props.data(data);
  };

  const onError = (err) => {
    props.data(null);
  };

  const countryCodeChangeHandler = (selectedCountry, fromDefault) => {
    setValue("country", selectedCountry.countryId, { shouldValidate: true });
    setValue("countryName", selectedCountry.countryName, {
      shouldValidate: false,
    });
    setSelectedCodeOfCountry(selectedCountry.codeOfCountry);
    if (!fromDefault || props.isStateReset) {
      setValue("state", null);
      setValue("stateName", null);
      setStateReset(true);
    }
  };

  const countryStateIdHandler = (selectedState) => {
    setValue("state", selectedState.stateId, { shouldValidate: true });
    setValue("stateName", selectedState.stateName, { shouldValidate: false });
    setStateReset(false);
  };

  return (
    <Box
      sx={{
        ...detailsstyle.farmerdetailsheadetablecontainer,
      }}
    >
      <Box
        sx={{
          ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
        }}
      >
        <Box
          sx={{
            ...detailsstyle.farmerdetailsheadetabledetailpairedit,
          }}
        >
          <InputBase
            required
            readOnly={props.isDisable}
            id="addressLine1"
            name="addressLine1"
            placeholder="Enter address line 1 "
            {...register("addressLine1")}
            sx={{
              ...commonStyles.inputStyleproductyield,
            }}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.addressLine1?.message}
          />
        </Box>
        <Box
          sx={{
            ...detailsstyle.farmerdetailsheadetabledetailpairedit,
          }}
        >
          <InputBase
            readOnly={props.isDisable}
            id="addressLine2"
            name="addressLine2"
            placeholder={
              props.isDisable ? "" : "Enter address line 2 (optional)"
            }
            {...register("addressLine2")}
            sx={{
              ...commonStyles.inputStyleproductyield,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
        }}
      >
        <Box
          sx={{
            ...detailsstyle.farmerdetailsheadetabledetailpairedit,
          }}
        >
          <AjCountry
            defaultValue={props.defaultCountry ? props.defaultCountry : null}
            onCountrySelect={countryCodeChangeHandler}
            // readOnly={props.isDisable}
            required={false}
            cancel={cancel}
            styleData={{
              ...commonStyles.inputStyleproductyield,
              height: "5rem",
            }}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.country?.message}
          />
        </Box>
        <Box
          sx={{
            ...detailsstyle.farmerdetailsheadetabledetailpairedit,
          }}
        >
          <AjState
            defaultValue={props.defaultState ? props.defaultState : null}
            onStateSelect={countryStateIdHandler}
            codeOfCountry={selectedCodeOfCountry}
            reset={stateReset}
            // readOnly={props.isDisable}
            cancel={cancel}
            styleData={{
              ...commonStyles.inputStyleproductyield,
              height: "5rem",
            }}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.state?.message}
          />
        </Box>
      </Box>

      <Box
        sx={{
          ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
        }}
      >
        <Box
          sx={{
            ...detailsstyle.farmerdetailsheadetabledetailpairedit,
          }}
        >
          <InputBase
            required
            readOnly={props.isDisable}
            id="city"
            name="city"
            placeholder="Enter city"
            {...register("city")}
            sx={{
              ...commonStyles.inputStyleproductyield,
            }}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.city?.message}
          />
        </Box>
        <Box
          sx={{
            ...detailsstyle.farmerdetailsheadetabledetailpairedit,
          }}
        >
          <InputBase
            required
            readOnly={props.isDisable}
            id="zipCode"
            name="zipCode"
            placeholder={props.isDisable ? "" : "Enter zipcode"}
            {...register("zipCode")}
            sx={{
              ...commonStyles.inputStyleproductyield,
            }}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.state?.message}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default AjAddressNew;
