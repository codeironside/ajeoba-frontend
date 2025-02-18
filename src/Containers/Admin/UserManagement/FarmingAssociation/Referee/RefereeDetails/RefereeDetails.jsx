import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, InputBase } from "@mui/material";
import * as moment from "moment";

import AjButton from "../../../../../../Components/AjButton";
import AjDatePicker from "../../../../../../Components/AjDatePicker";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import AjRadioOptions from "../../../../../../Components/AjRadioOptions";
import AjTypography from "../../../../../../Components/AjTypography";
import TableActions from "../../../../../../Components/TableActions/TableActions";

import {
  editRefereeDetailByIdAction,
  getFarmerRefereeDetailsByIdAction,
} from "../../../../../../Redux/SuperAdmin/UserManagement/FarmingAssociationDetails/farmingAssociationDetailActions.";
import { toggleRefereeStatusAction } from "../../../../../../Redux/FarmingAssociation/Refrees/refereesActions";
import { getUserData } from "../../../../../../Services/localStorageService";
import {
  formatDate,
  getPhoneCodeSymbol,
} from "../../../../../../Services/commonService/commonService";
import {
  ADMIN_FARMING_ASSOCIATION,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../../Routes/Routes";
import { ROLES } from "../../../../../../Constant/RoleConstant";
import { refereeDetailsSchema } from "../../../../../../validationSchema/refereeDetailsSchema";
import { genderOptions } from "../../../../../../Constant/AppConstant";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { styles } from "./RefereeDetailsStyles";

const RefereeDetails = () => {
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [edit, setEdit] = useState(false);
  const [refereeDetail, setRefereeDetail] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const roleId = getUserData().role_id;
  const { id, associationId } = params;
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const navigate = useNavigate();

  const farmerRefereeDetailById = useSelector(
    (state) => state.userManagementAssociationDetails.farmerRefereeDetails
  );

  useEffect(() => {
    dispatch(getFarmerRefereeDetailsByIdAction(id));
    if (location.pathname.includes("edit")) {
      setEdit(true);
    }
  }, [id]);

  useEffect(() => {
    if (farmerRefereeDetailById) {
      setRefereeDetail(farmerRefereeDetailById?.farmerDetail[0]);
    }
  }, [farmerRefereeDetailById]);

  useEffect(() => {
    setValue("refereeDetailsFirstName", refereeDetail?.first_name);
    setValue("refereeDetailsLastName", refereeDetail?.last_name);
    if (refereeDetail) {
      updateGender();
      setDateOfBirth(moment(refereeDetail?.date_of_birth));
    }
  }, [refereeDetail]);

  useEffect(() => {
    if (dateOfBirth !== null) {
      setValue("refereeDetailsDateOfBirth", dateOfBirth, {
        shouldValidate: true,
      });
    }
    setValue("refereeDetailsGender", gender, { shouldValidate: false });
  }, [dateOfBirth, gender]);

  const updateGender = () => {
    setGender(refereeDetail.gender);
  };

  const genderSelectHandler = (option) => {
    setGender(option);
  };

  const dateSelectionHandler = (date) => {
    if (date === null) {
      setDateOfBirth("");
    } else {
      setDateOfBirth(date);
    }
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(refereeDetailsSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const edittedData = {
      firstName: data.refereeDetailsFirstName,
      lastName: data.refereeDetailsLastName,
      gender: data.refereeDetailsGender,
      dateOfBirth: moment(data.refereeDetailsDateOfBirth).toISOString(true),
    };
    dispatch(editRefereeDetailByIdAction(id, edittedData));
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    navigate(
      `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/referee/${associationId}/edit/${id}?activeTab=${activeTab}`
    );
  };

  const handleCancel = (e, value) => {
    setEdit(false);
    clearErrors();
    setValue("refereeDetailsFirstName", refereeDetail.first_name);
    setValue("refereeDetailsLastName", refereeDetail.last_name);
    setDateOfBirth(refereeDetail.date_of_birth);
    updateGender();
    navigate(
      `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/referee/${associationId}/detail/${id}?activeTab=${activeTab}`
    );
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(toggleRefereeStatusAction(userId, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(toggleRefereeStatusAction(userId, false)),
    },
  ];

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
      }}
    >
      <Box
        sx={[
          commonStyles.signupContentContainer,
          styles.refereeContainerMargin,
        ]}
      >
        <Grid sx={styles.refereeDetailUpperContainer}>
          {!edit && ROLES.SUPER_ADMIN === roleId && (
            <AjButton
              onClick={handleEdit}
              styleData={{
                ...commonStyles.editBtn,
                ...styles.handleEditRespnsive,
              }}
              variant="outlined"
              displayText="Edit Details"
            />
          )}
          <Box sx={styles.refereeDetailsBoxes}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Phone Number"
            />
            <AjTypography
              align="center"
              styleData={{
                ...commonStyles.subHeadingColor,
                ...commonStyles.textEllipsis,
              }}
              displayText={`${getPhoneCodeSymbol(refereeDetail?.phone_code)} ${
                refereeDetail?.mobile_no
              }`}
            />
          </Box>
          <Box sx={styles.refereeDetailsBoxes}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Added on"
            />
            <AjTypography
              align="center"
              styleData={commonStyles.subHeadingColor}
              displayText={formatDate(refereeDetail?.created_at)}
            />
          </Box>
        </Grid>

        <Box sx={commonStyles.marginTop20}>
          <AjTypography
            align="center"
            styleData={commonStyles.inputLabel}
            displayText="Status"
          />
          <TableActions
            isReadOnly={!edit}
            options={options}
            id={id}
            isActive={refereeDetail?.is_active ? "Active" : "Inactive"}
          />
        </Box>
        <Box
          component="form"
          sx={{
            ...commonStyles.signupFormContainer,
            ...(!edit && styles.formMarginTop),
          }}
        >
          <Box sx={styles.refereeFieldContainer}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="First name"
            />
            <InputBase
              required
              readOnly={!edit}
              id="refereeDetailsFirstName"
              name="refereeDetailsFirstName"
              placeholder="Enter your first name"
              sx={{
                ...commonStyles.inputStyle,
                ...(!edit && commonStyles.disableInput),
              }}
              {...register("refereeDetailsFirstName")}
              error={errors.refereeDetailsFirstName ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={edit && errors.refereeDetailsFirstName?.message}
            />
          </Box>
          <Box sx={styles.refereeFieldContainer}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Last name"
            />
            <InputBase
              readOnly={!edit}
              required
              id="refereeDetailsLastName"
              name="refereeDetailsLastName"
              placeholder="Enter your last name"
              sx={{
                ...commonStyles.inputStyle,
                ...(!edit && commonStyles.disableInput),
              }}
              {...register("refereeDetailsLastName")}
              error={errors.refereeDetailsLastName ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={edit && errors.refereeDetailsLastName?.message}
            />
          </Box>
          <Box sx={styles.refereeFieldContainer}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Gender"
            />
            <AjRadioOptions
              items={genderOptions}
              defaultValue={gender}
              onSelect={genderSelectHandler}
              readOnly={!edit}
              disableStyling={commonStyles.disableInput}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={edit && errors.refereeDetailsGender?.message}
            />
          </Box>
          <Box sx={styles.refereeFieldContainer}>
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Date of birth"
            />
            <AjDatePicker
              value={dateOfBirth ? dateOfBirth : null}
              dateSelectHandler={dateSelectionHandler}
              readOnly={!edit}
              agePicker
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={edit && errors.refereeDetailsDateOfBirth?.message}
            />
          </Box>
          <Grid sx={styles.btnContainer} container>
            {edit && (
              <>
                <AjButton
                  onClick={handleCancel}
                  styleData={commonStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                />
                <AjButton
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  displayText="Save Changes"
                />
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default RefereeDetails;
