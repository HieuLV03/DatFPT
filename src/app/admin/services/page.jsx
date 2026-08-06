"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import "./page.css";
import BackButton from "../components/BackButton/BackButton";


export default function ServicesPage(){

const [services,setServices]=useState([]);
const [loading,setLoading]=useState(true);


// =======================
// LOAD SERVICES
// =======================

const fetchServices=async()=>{

setLoading(true);


const {data,error}=await supabase

.from("services")

.select(`

id,

name,

slug,

image,

speed,

price,

old_price,

badge,

description,

features,

button_text,

status,

created_at,


service_categories(

category_id,

categories(

id,

name

)

)

`)

.order(
"created_at",
{
ascending:false
}
);



if(error){

console.log(error);

alert(error.message);

setLoading(false);

return;

}



const result=(data || []).map(service=>({

...service,


categories:

service.service_categories

?.map(item=>item.categories)

.filter(Boolean)

|| []

}));



setServices(result);


setLoading(false);

};



useEffect(()=>{

fetchServices();

},[]);





// =======================
// DELETE
// =======================

const deleteService=async(service)=>{


if(!service?.id)
return;



const ok=confirm(
`Bạn có chắc muốn xóa "${service.name}"?`
);



if(!ok)
return;



try{



// DELETE CATEGORY LINK

const {error:catError}=await supabase

.from("service_categories")

.delete()

.eq(
"service_id",
service.id
);



if(catError)
throw catError;





// DELETE IMAGE

if(service.image){


const path=

service.image.split(
"/images_service/"
)[1];


if(path){


const {error:imageError}=await supabase.storage

.from("images_service")

.remove([
path
]);


if(imageError)
console.log(imageError);


}

}





// DELETE SERVICE


const {error}=await supabase

.from("services")

.delete()

.eq(
"id",
service.id
);



if(error)
throw error;



setServices(prev=>

prev.filter(

item=>item.id!==service.id

)

);



alert(
"Đã xóa dịch vụ!"
);



}
catch(err){

console.log(err);

alert(err.message);

}


};





return (

<div className="adminPage">


<div className="adminCard">



<div className="headerRow">


<div className="headerLeft">

<BackButton/>

<h1>
Danh sách dịch vụ
</h1>

</div>



<Link

href="/admin/services/create"

className="addBtn"

>

+ Thêm dịch vụ

</Link>



</div>





{
loading ? (

<p>
Đang tải...
</p>


)

:

services.length===0 ? (

<p>
Chưa có dịch vụ nào.
</p>


)

:


(



<div className="productGrid">


{
services.map(service=>(


<div

key={service.id}

className="productCard"

style={{

background:

service.image

?

`url(${service.image}) center/cover`

:

"linear-gradient(135deg,#d4a373,#8d6e63)"

}}


>



<div className="productOverlay"/>



<div className="productContent">





{
service.image &&

<img

src={service.image}

className="serviceImage"

/>

}






{
service.badge &&

<div className="badge">

{service.badge}

</div>

}






<h2>

{service.name}

</h2>






<p>

<strong>
Danh mục:
</strong>{" "}


{

service.categories

?.map(cat=>cat.name)

.join(", ")

|| "-"

}

</p>





<p>

<strong>
Slug:
</strong>{" "}

{service.slug || "-"}

</p>






<p>

<strong>
Tốc độ:
</strong>{" "}

{service.speed || "-"}

</p>






<p>

<strong>
Giá:
</strong>{" "}


{

service.price

?

Number(service.price)

.toLocaleString("vi-VN")

+"đ"

:

"-"

}

</p>






<p>

<strong>
Giá cũ:
</strong>{" "}


{

service.old_price

?

Number(service.old_price)

.toLocaleString("vi-VN")

+"đ"

:

"-"

}

</p>








<p>

<strong>
Mô tả:
</strong>{" "}


{

service.description || "-"

}

</p>







{

service.features?.length > 0 &&


<div className="featurePreview">


{

service.features.map(

(item,index)=>(


<span

key={`${service.id}-feature-${index}`}

>

✓ {item}

</span>


)

)


}


</div>


}








<p>

<strong>
Nút đăng ký:
</strong>{" "}


{

service.button_text || "-"

}


</p>








<p>

<strong>
Trạng thái:
</strong>{" "}


{

service.status

?

"Hiển thị"

:

"Ẩn"

}


</p>







<p>

<strong>
Ngày tạo:
</strong>{" "}


{

service.created_at

?

new Date(service.created_at)

.toLocaleDateString("vi-VN")

:

"-"

}


</p>








<div className="productActions">


<Link

href={`/admin/services/edit/${service.id}`}

className="cardEditBtn"

>

Sửa

</Link>




<button

className="deleteBtn"

onClick={()=>deleteService(service)}

>

Xóa

</button>


</div>






</div>


</div>


))


}



</div>


)


}



</div>


</div>


);


}