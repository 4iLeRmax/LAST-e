// import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Slider = () => {
  return (
    <>
      <Swiper
        // install Swiper modules
        // modules={[Navigation]}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={true}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        breakpoints={{
          450: {
            slidesPerView: 1.2,
          },
          750: {
            slidesPerView: 2,
          },
        }}
      >
        <SwiperSlide>
          <img
            src='https://images.unsplash.com/photo-1630698262410-7a6ef389cbe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80'
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
            alt=''
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
