import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import { getStates } from "../../Redux/common/States/getStateActions";

import { styles } from "./AjFilterStyles";
import { allProductOptions } from "../../Constant/AppConstant";
import AjCheckbox from "../AjCheckBox";
import AjState from "../AjState/AjState";
import AjCountry from "../AjCountry/AjCountry";
import AjNewRating from "../AjNewRating";

function AjnewFilter({
  countryFilter,
  countryFiltersm,
  stateFilter,
  stateFiltersm,
  allproductTypeFilter, //for open marketplace
  allproductTypeFiltersm,
  ratingFilter,
  ratingFiltersm,
  filterData,
  filterSelected,
  onCategorySelect,
  onCategorySelectsm,
  onCountrySelect,
  onCountrySelectsm,
  onStateSelect,
  onStateSelectsm,
  handleRatingSelect,
  handleRatingSelectsm,
}) {
  const dispatch = useDispatch();
  const stateMenuOptions = useSelector(
    (state) => state.states.stateMenuOptions || null
  );
  const [stateValue, setStateValue] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [selectedCodeOfCountry, setSelectedCodeOfCountry] = useState(null);

  const allproductTypeChangeHandler = (value) => {
    const newSelectedProductType = selectedProductType === value ? null : value;
    setSelectedProductType(newSelectedProductType);
    onCategorySelect(newSelectedProductType);
    filterSelected(newSelectedProductType);
  };

  const allproductTypeChangeHandlersm = (value) => {
    const newSelectedProductType = selectedProductType === value ? null : value;
    setSelectedProductType(newSelectedProductType);
    onCategorySelectsm(newSelectedProductType);
  };

  const countryChangeHandler = (selectedCountry) => {
    if (selectedCountry.countryId !== filterData?.country)
      filterSelected({ ...filterData, states: [] });

    setSelectedCodeOfCountry(selectedCountry.codeOfCountry);
    onCountrySelect(selectedCountry.countryId);
  };

  const countryChangeHandlersm = (selectedCountry) => {
    setSelectedCodeOfCountry(selectedCountry.codeOfCountry);
    onCountrySelectsm(selectedCountry.countryId);
  };

  const countryStateIdHandler = (selectedState) => {
    setStateValue(selectedState.stateId);
    onStateSelect(selectedState.stateId);
    filterSelected(selectedState.stateId);
  };
  const countryStateIdHandlersm = (selectedState) => {
    setStateValue(selectedState.stateId);
    onStateSelectsm(selectedState.stateId);
    // filterSelected(selectedState.stateId);
  };

  useEffect(() => {
    if (selectedCodeOfCountry) dispatch(getStates(selectedCodeOfCountry));
  }, [selectedCodeOfCountry]);

  return (
    <div>
      {allproductTypeFilter && (
        <Grid sx={{ marginTop: "-1.125rem" }}>
          {allProductOptions.map((option) => (
            <AjCheckbox
              key={option.value}
              label={option.label}
              id={option.id}
              name={option.name}
              value={option.value}
              checked={selectedProductType === option.value}
              onChange={() => allproductTypeChangeHandler(option.value)}
              headingLabel={option.headingLabel}
            />
          ))}
        </Grid>
      )}
      {allproductTypeFiltersm && (
        <Grid sx={{ marginTop: "-2.125rem" }}>
          {allProductOptions.map((option) => (
            <AjCheckbox
              key={option.value}
              label={option.label}
              id={option.id}
              name={option.name}
              value={option.value}
              checked={selectedProductType === option.value}
              onChange={() => allproductTypeChangeHandlersm(option.value)}
              headingLabel={option.headingLabel}
            />
          ))}
        </Grid>
      )}

      {countryFilter && (
        <Grid
          sx={{
            marginTop: "-1.125rem",
          }}
        >
          <AjCountry
            defaultValue={parseInt(filterData?.country)}
            required={false}
            onCountrySelect={countryChangeHandler}
            labelStyle={styles.headingLabel}
          />
        </Grid>
      )}

      {countryFiltersm && (
        <Grid
          sx={{
            marginTop: "-1.125rem",
          }}
        >
          <AjCountry
            defaultValue={parseInt(filterData?.country)}
            required={false}
            onCountrySelect={countryChangeHandlersm}
            labelStyle={styles.headingLabel}
          />
        </Grid>
      )}

      {stateFilter && (
        <Grid
          sx={{
            marginTop: "-1.125rem",
          }}
        >
          <AjState
            id="state"
            name="state"
            onStateSelect={countryStateIdHandler}
            fullWidth
            value={stateValue}
            options={stateMenuOptions}
            source="stateName"
          />
        </Grid>
      )}

      {stateFiltersm && (
        <Grid
          sx={{
            marginTop: "-1.125rem",
          }}
        >
          <AjState
            id="state"
            name="state"
            onStateSelect={countryStateIdHandlersm}
            fullWidth
            value={stateValue}
            options={stateMenuOptions}
            source="stateName"
          />
        </Grid>
      )}

      {ratingFilter && (
        <Grid sx={{ marginTop: "-.8rem" }}>
          <AjNewRating
            filterSelected={filterSelected}
            handleRatingSelect={handleRatingSelect}
            styleData={styles.ratingStar}
          />
        </Grid>
      )}

      {ratingFiltersm && (
        <Grid sx={{ marginTop: "-.8rem" }}>
          <AjNewRating
            handleRatingSelectsm={handleRatingSelectsm}
            styleData={styles.ratingStar}
          />
        </Grid>
      )}
    </div>
  );
}

export default AjnewFilter;
