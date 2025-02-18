import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import LoaderImage from '../../Assets/Images/Loader.svg'
import { useSelector } from "react-redux";
import { styles } from "./LoaderStyles";
import { Typography } from "@mui/material";

const Loader = (props) => {
  const { loader } = useSelector((state) => state.loader);

  return (
    <>
      <Backdrop sx={styles.backDropStyles} open={loader || props.showLoader|| false}>
        <Typography component='img' src={LoaderImage}/>
      </Backdrop>
    </>
  );
};

export default Loader;
