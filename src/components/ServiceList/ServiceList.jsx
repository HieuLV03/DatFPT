"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

import ButtonSearch from "../ButtonSearch/ButtonSearch";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import "./ServiceList.css";

export default function ServiceList({
  services = [],
}) {

  const [keyword, setKeyword] = useState("");

  const removeVietnameseTones = (str = "") =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");

  const filteredServices = services.filter((item) =>
    removeVietnameseTones(item.name || "")
      .toLowerCase()
      .includes(
        removeVietnameseTones(keyword)
          .toLowerCase()
      )
  );

  return (
    <>

  
      {
        filteredServices.length > 0 && (

          <Swiper

            modules={[
              Navigation,
              Scrollbar,
            ]}

            className="serviceSwiper"

            slidesPerView={"auto"}

            centeredSlides

            centeredSlidesBounds={false}

            slideToClickedSlide

            grabCursor

            watchSlidesProgress

            resistanceRatio={0.6}

            speed={600}

            spaceBetween={20}

            scrollbar={{
              draggable: true,
              hide: false,
            }}

            breakpoints={{

              0:{

                spaceBetween:16,

              },

              768:{

                spaceBetween:24,

              },

              1200:{

                spaceBetween:30,

              },

            }}

          >

            {

              filteredServices.map((item,index)=>(

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

                    {

                      item.featured && (

                        <div className="serviceBadge">
                          Khuyên dùng
                        </div>

                      )

                    }

                    <div className="serviceImage">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="serviceImg"
                      />

                    </div>

                    <div className="serviceTitle">

                      <h2>

                        {item.name}

                      </h2>

                      <p>

                        {

                          item.description ||

                          "Dịch vụ chất lượng cao, hỗ trợ tận nơi"

                        }

                      </p>

                    </div>

                    <div className="servicePrice">

                      <strong>

                        {

                          Number(item.price || 0)
                            .toLocaleString("vi-VN")

                        }

                        đ

                      </strong>

                      <span>

                        / dịch vụ

                      </span>

                    </div>

                    <div className="serviceInfo">

                      <div>

                        ⚡ Tốc độ xử lý nhanh

                      </div>

                      <div>

                        ✓ Đội ngũ chuyên nghiệp

                      </div>

                      <div>

                        ✓ Hỗ trợ khách hàng 24/7

                      </div>

                    </div>
                                        <Link

                      href={`/services/${item.slug || item.id}`}

                      className="serviceButton"

                    >

                      Xem chi tiết

                    </Link>

                  </motion.div>

                </SwiperSlide>

              ))

            }

          </Swiper>

        )

      }

      {

        filteredServices.length === 0 && (

          <div className="emptyPackage">

            Không tìm thấy dịch vụ

          </div>

        )

      }

    </>

  );

}