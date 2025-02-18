import React from 'react'
import { Box, Typography } from '@mui/material'
import { styles } from './aboutUsStyle'

const ValueCard = ({content}) => {
  return (
    content.map((item, index) => <Box key={index} sx={{ ...styles.value_card }}>
        <Box sx={{ ...styles.about_icons }} >
            <img style={{ ...styles.bi_img }} src={item.icon} alt={item.persona} />
        </Box>
        <Typography sx={{ ...styles.name_title }}>{item.persona}</Typography>
        <Typography sx={{ ...styles.paragraph }}>{item.value}</Typography>
    </Box>
  ))
}

export default ValueCard
 