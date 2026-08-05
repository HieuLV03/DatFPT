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


return (

<>


{
services.length > 0 && (


<Swiper

modules={[
Navigation,
Scrollbar,
]}


className="serviceSwiper"


slidesPerView="auto"

centeredSlides

slideToClickedSlide

grabCursor

speed={600}

spaceBetween={20}


scrollbar={{
draggable:true,
hide:false,
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
}

}}


>



{

services.map((item,index)=>(


<SwiperSlide

key={item.id}

className="serviceSlide"

>


<motion.div

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
duration:.45,
delay:index*.08
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


{
item.image && (

<img

src={item.image}

alt={item.name || "Dịch vụ FPT"}

className="serviceImg"

/>

)

}



</div>





<div className="serviceTitle">


<h2>

{item.name}

</h2>


<p>

{
item.description


}

</p>
<div className="servicePrice">
  {item.old_price && (
    <span className="oldPrice">
      {Number(item.old_price).toLocaleString("vi-VN")}đ
    </span>
  )}

  <span className="newPrice">
    {Number(item.price).toLocaleString("vi-VN")}đ/tháng
  </span>
</div>

</div>





<div className="serviceFeatures">


{

Array.isArray(item.features) &&

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


{

item.button_text ||

"Xem chi tiết"

}



</Link>



</motion.div>


</SwiperSlide>



))


}



</Swiper>


)

}



</>


);


}