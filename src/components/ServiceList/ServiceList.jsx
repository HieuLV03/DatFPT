"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import ButtonSearch from "../ButtonSearch/ButtonSearch";

import "./ServiceList.css";


export default function ServiceList({ services = [] }) {

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

      <ButtonSearch
        placeholder="Tìm dịch vụ..."
        textButton="Tìm"
        size="large"
        onSearch={setKeyword}
      />


      <div className="serviceSlider">


        {filteredServices.map((item,index)=>(


          <motion.div

            key={item.id}

            className="serviceCard"


            initial={{
              opacity:0,
              y:40
            }}


            whileInView={{
              opacity:1,
              y:0
            }}


            viewport={{
              once:true
            }}


            transition={{
              duration:.4,
              delay:index * .08
            }}

          >



            {
              item.featured &&

              <div className="serviceBadge">
                Khuyên dùng
              </div>

            }




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
                <span>⚡</span>
                Tốc độ xử lý nhanh
              </div>


              <div>
                <span>✓</span>
                Đội ngũ chuyên nghiệp
              </div>


              <div>
                <span>✓</span>
                Hỗ trợ khách hàng 24/7
              </div>


            </div>





            <Link

              href={`/services/${item.slug || item.id}`}

              className="serviceButton"

            >

              Xem chi tiết

            </Link>




          </motion.div>


        ))}


      </div>




      {
        filteredServices.length === 0 &&

        <div className="emptyPackage">
          Không tìm thấy dịch vụ
        </div>
      }


    </>
  );
}