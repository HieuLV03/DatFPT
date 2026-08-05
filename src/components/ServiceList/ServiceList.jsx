"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import "./ServiceList.css";


export default function ServiceList({
  services = [],
}) {

  if (!services.length) return null;


  return (

    <div className="serviceSwiperWrapper">
<div className="serviceSwiperWrapper">

      <Swiper

        modules={[
          Navigation,
          Scrollbar,
        ]}

        className="serviceSwiper"


        /* QUAN TRỌNG */
        slidesPerView="auto"

        spaceBetween={20}


        centeredSlides={true}

        centeredSlidesBounds={true}


        grabCursor={true}

        watchOverflow={true}


        speed={600}


        scrollbar={{
          draggable:true,
          hide:false,
        }}

      >

        {services.map((item,index)=>(

          <SwiperSlide

            key={item.id}

            className="serviceSlide"

          >


            <motion.div

              className="serviceCard"


              initial={{
                opacity:0,
                y:40,
              }}


              whileInView={{
                opacity:1,
                y:0,
              }}


              viewport={{
                once:true,
              }}


              transition={{
                duration:.45,
                delay:index*.08,
              }}

            >


              {item.badge && (

                <div className="serviceBadge">
                  {item.badge}
                </div>

              )}



              <div className="serviceImage">

                {item.image && (

                  <img

                    src={item.image}

                    alt={item.name || "Dịch vụ"}

                    className="serviceImg"

                  />

                )}

              </div>




              <div className="serviceTitle">


                <h2>
                  {item.name}
                </h2>


                <p>
                  {item.description}
                </p>



                {item.speed && (

                  <div className="serviceSpeed">

                    🚀 {item.speed}

                  </div>

                )}



                <div className="servicePrice">


                  {item.old_price && (

                    <span className="oldPrice">

                      {Number(item.old_price)
                        .toLocaleString("vi-VN")}đ

                    </span>

                  )}



                  <span className="newPrice">

                    {Number(item.price)
                    .toLocaleString("vi-VN")}đ/tháng

                  </span>


                </div>


              </div>





              <div className="serviceFeatures">


                {Array.isArray(item.features) &&

                  item.features.map((feature,i)=>(

                    <div key={i}>

                      ✓ {feature}

                    </div>

                  ))

                }


              </div>





              <Link

                href={`/services/${item.slug || item.id}`}

                className="serviceButton"

              >

                {item.button_text || "Xem chi tiết"}

              </Link>



            </motion.div>


          </SwiperSlide>


        ))}


      </Swiper>

</div>
    </div>

  );

}