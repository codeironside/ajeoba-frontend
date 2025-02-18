import React from 'react'
import { Box, Typography } from '@mui/material'
import { styles } from './aboutUsStyle'

const BoardCard = ({content}) => {
  
  return (
    content?.map((item, index) => <Box sx={{ ...styles.board_card }} key={index}>
          <Box sx={{ ...styles.board_image_box }}>
              <img src={item.image} alt={item.name} />
          </Box>
          <Typography sx={{ ...styles.name_title }}>{item.name}</Typography>
          <Typography>{item.office}</Typography>
      </Box>
  ))
}

export default BoardCard