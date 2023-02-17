import React, { useState } from 'react';
import { FreeMode, Pagination,Scrollbar, Thumbs} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; 

import bookPlaceholder from '../img/books/bookPlaceholder.svg'
import { Image } from '../models/models';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

interface SliderProps { 
  data: Image[],
}


function getSlides(data:Image[], styleName:string, dataTestId:string){
  return data.map((item, i) => {
    const stylePicture = {backgroundImage: `url('https://strapi.cleverland.by${item.url}')`, backgroundSize: 'cover'};

    return (
    <SwiperSlide key={item.url} data-test-id={dataTestId} > 
      <div role="presentation" style={stylePicture} className={styleName}> </div> 
    </SwiperSlide>
  )
})
}

const bookPlaceholderStyles = {
		backgroundImage: `url('${bookPlaceholder}')`,
    backgroundRepeat: 'no-repeat',
	}
const bookPlaceholderJSX = <SwiperSlide><div role="presentation" style={bookPlaceholderStyles} className="book__cover"> </div></SwiperSlide>

export const Slider = ({data}: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <React.Fragment>
      <Swiper
        data-test-id='slide-big'
        modules={[FreeMode, Thumbs, Pagination]}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="slide__wrapper"
      >
        {data?.length ? getSlides(data, 'book__cover', '') : bookPlaceholderJSX}
      </Swiper>
      
      
      {data?.length > 1 ?
        <Swiper
          modules={[FreeMode, Thumbs, Scrollbar]}
          onSwiper={setThumbsSwiper}
          spaceBetween={30}
          slidesPerView={5}
          scrollbar={{
            hide: true,
            draggable: true,
          }}
          className="slider__wrapper"
        >
          {getSlides(data, 'slider__picture', 'slide-mini')}
        </Swiper> : null
      }
      
    </React.Fragment>
  );
}