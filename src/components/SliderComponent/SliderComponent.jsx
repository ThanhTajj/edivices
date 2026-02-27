import { Image } from 'antd'
import React from 'react'
import { WrapperSliderStyle } from './style'

const SliderComponent = ({ arrImages, onClickItem }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  }

  return (
    <WrapperSliderStyle {...settings}>
      {arrImages.map((item) => (
        <div key={item.productId}>
          <Image
            src={item.image}
            alt="slider"
            preview={false}
            width="100%"
            height={400}
            style={{
              cursor: 'pointer',
              objectFit: 'contain',
              backgroundColor: 'transparent',
              display: 'block'
            }}
            onClick={() => onClickItem && onClickItem(item.productId)}
          />
        </div>
      ))}
    </WrapperSliderStyle>
  )
}

export default SliderComponent