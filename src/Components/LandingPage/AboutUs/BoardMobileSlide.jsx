import { Typography, Box } from '@mui/material'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { styles } from './aboutUsStyle'
import { board } from '../../../Constant/AppConstant'

const BoardMobileSlide = ({
    onChange,
    onClickItem,
    onClickThumb
  }) => {
  return (
    <Carousel 
        showArrows={true} 
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
    >
            {
                board?.map((item, index) => <Box sx={{ ...styles.board_card }} key={index}>
                <Box sx={{ ...styles.board_image_box }}>
                    <img src={item.image} alt={item.name} />
                </Box>
                <Typography sx={{ ...styles.name_title }}>{item.name}</Typography>
                <Typography>{item.office}</Typography>
            </Box>)
            }
    </Carousel>
  )
}

export default BoardMobileSlide