import React, { useState, useEffect } from "react";
import { Box, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AjTypography from "../../Components/AjTypography";
import { logisticDecision } from "../../Constant/AppConstant";
import { decisionSchema } from "../../validationSchema/decisionSchema";
import { commonStyles } from "../../Style/CommonStyle";
import AjDecision from "./AjDecision";

const AjBuyerLogisticDecision = (props) => {

  const [data, setData] = useState(null);

    useEffect(() => {
        let options = logisticDecision?.map((decision) => {
            return {
                label: decision.label,
                value: decision.value,
            };
        });
        setData(options);
      }, [logisticDecision]);

    const {
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "onChange",
      resolver: yupResolver(decisionSchema())
    });

  const [stateReset, setStateReset] = useState(false);

  const [cancel, setCancel] = useState(false);

  // useEffect(() => {
  //   setValues();
  // }, []);

  useEffect(() => {
    // if (props.reset) {
    //   setValues();
    // }
    setCancel(props.reset);
  }, [props.reset]);

  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  // const setValues = () => {
  //     setValue("decision", {
  //       shouldValidate: true,
  //     });
  // };

  const onSubmit = (data) => {
    props.data(data);
  };

  const onError = (err) => {
    props.data(null);
  };

  const logisticDecisionHandler = (selectedLogisticDecision) => {
    setValue("decision", selectedLogisticDecision.value, { shouldValidate: true });
    setStateReset(false);
  };

  return (
    <>
      <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...props.customStyle,
        }}
      >
        <AjDecision
          reset={stateReset}
          data={data}
          readOnly={props.isDisable}
          onDecisionSelect={logisticDecisionHandler}
          register={register}
          cancel={cancel}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.state?.message}
        />
      </Box>
    </>
  );
};

export default AjBuyerLogisticDecision;

