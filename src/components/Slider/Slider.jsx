"use client";

import "./Slider.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

export default function Slider({
  sliders = [],
}) {
  if (sliders.length === 0) return null;

  return (
    <section className="heroSlider">

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={sliders.length > 1}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="heroSwiper"
      >
        {sliders.map((item, index) => (
          <SwiperSlide key={item.id}>

            <div className="heroSlide">

              <Image
                src={item.image}
                alt={item.title || "Banner"}
                fill
                priority={index === 0}
                sizes="100vw"
                className="heroImg"
              />

              <div className="heroOverlay" />

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}