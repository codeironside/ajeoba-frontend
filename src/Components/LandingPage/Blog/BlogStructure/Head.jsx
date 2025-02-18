import * as React from 'react';
import NavBar from '../../NavBar/NavBar.jsx'
import { Box } from '@mui/material';


const Head = ({prevPage}) => {

  return (
    <>
      <NavBar isBlog={true} prevPage={prevPage} />
    </>
  );
}

export default Head;
