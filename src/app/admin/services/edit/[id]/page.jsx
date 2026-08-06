"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import "./page.css";
import BackButton from "@/components/BackButton/BackButton";


export default function EditServicePage(){


const params = useParams();
const router = useRouter();

const id = params?.id;


const [loading,setLoading]=useState(false);
const [uploading,setUploading]=useState(false);

const [categories,setCategories]=useState([]);

const [featureInput,setFeatureInput]=useState("");



const [form,setForm]=useState({

name:"",
slug:"",
image:"",

category_ids:[],

speed:"",

price:"",
old_price:"",

badge:"",

description:"",

features:[],

button_text:"Đăng ký ngay",

status:true

});





// =========================
// LOAD CATEGORY
// =========================

useEffect(()=>{


const loadCategories=async()=>{


const {data,error}=await supabase

.from("categories")

.select("id,name")

.eq("status",true)

.order("name");



if(error){

console.log(error);
return;

}


setCategories(data || []);


};


loadCategories();


},[]);







// =========================
// LOAD SERVICE
// =========================


useEffect(()=>{


const fetchData=async()=>{


if(!id)
return;



const {data,error}=await supabase

.from("services")

.select(`

*,

service_categories(

category_id

)

`)

.eq("id",id)

.single();




if(error){

console.log(error);
return;

}





setForm({

name:data.name || "",


slug:data.slug || "",


image:data.image || "",



category_ids:

data.service_categories

?.map(
item=>item.category_id
)

|| [],




speed:data.speed || "",



price:data.price || "",



old_price:data.old_price || "",



badge:data.badge || "",



description:data.description || "",



features:data.features || [],



button_text:data.button_text || "Đăng ký ngay",



status:data.status ?? true


});



};



fetchData();



},[id]);







// =========================
// SLUG
// =========================


const sanitize=(text)=>{


return text

.toLowerCase()

.normalize("NFD")

.replace(/[\u0300-\u036f]/g,"")

.replace(/đ/g,"d")

.replace(/[^a-z0-9\s-]/g,"")

.trim()

.replace(/\s+/g,"-")

.replace(/-+/g,"-");


};







// =========================
// UPLOAD IMAGE
// =========================


const randomString=()=>{


return Math.random()

.toString(36)

.substring(2,8);


};





const handleUploadImage=async(e)=>{


const file=e.target.files?.[0];


if(!file)
return;



try{


setUploading(true);



const ext=file.name.split(".").pop();



const fileName=

`${form.slug}-${Date.now()}-${randomString()}.${ext}`;




const {error}=await supabase.storage

.from("images_service")

.upload(
fileName,
file
);



if(error)
throw error;




const {data}=supabase.storage

.from("images_service")

.getPublicUrl(
fileName
);



setForm(prev=>({

...prev,

image:data.publicUrl

}));



}
catch(err){


console.log(err);

alert(err.message);


}
finally{


setUploading(false);


}


};







// =========================
// FEATURE
// =========================


const addFeature=()=>{


if(!featureInput.trim())
return;



setForm(prev=>({

...prev,

features:[

...prev.features,

featureInput.trim()

]


}));



setFeatureInput("");



};





const removeFeature=(index)=>{


setForm(prev=>({


...prev,


features:

prev.features.filter(

(_,i)=>i!==index

)



}));


};









// =========================
// UPDATE
// =========================


const update=async()=>{


try{


setLoading(true);



const {error}=await supabase

.from("services")

.update({


name:form.name,


slug:form.slug,


image:form.image,


speed:form.speed,



price:

form.price

?

Number(form.price)

:

null,



old_price:

form.old_price

?

Number(form.old_price)

:

null,



badge:form.badge,



description:form.description,



features:form.features,



button_text:form.button_text,



status:form.status



})

.eq(
"id",
id
);



if(error)
throw error;







// XÓA CATEGORY CŨ


await supabase

.from("service_categories")

.delete()

.eq(
"service_id",
id
);






// THÊM CATEGORY MỚI


if(form.category_ids.length){



const rows=form.category_ids.map(
category_id=>({

service_id:id,

category_id

})

);



const {error:catError}=await supabase

.from("service_categories")

.insert(rows);



if(catError)
throw catError;



}





alert(
"Cập nhật thành công!"
);



router.push("/admin/services");



}
catch(err){


console.log(err);

alert(err.message);


}
finally{


setLoading(false);


}


};







return (

<div className="editServicePage">


<div className="editServiceCard">



<div className="headerLeft">

<BackButton/>

<h1>
Sửa dịch vụ
</h1>


</div>






<h3>
Danh mục
</h3>


<div className="categoryBox">


{
categories.map(item=>(


<label

key={item.id}

className="categoryItem"

>


<input

type="checkbox"

checked={
form.category_ids.includes(item.id)
}


onChange={(e)=>{


setForm(prev=>({


...prev,


category_ids:

e.target.checked

?

[

...prev.category_ids,

item.id

]

:

prev.category_ids.filter(

id=>id!==item.id

)



}));


}}


/>


{item.name}


</label>


))

}



</div>









<input

placeholder="Tên dịch vụ"

value={form.name}

onChange={(e)=>{


const name=e.target.value;


setForm({

...form,

name,

slug:sanitize(name)

});


}}


/>







<input

placeholder="Slug"

value={form.slug}

onChange={(e)=>

setForm({

...form,

slug:e.target.value

})

}


/>








<input

placeholder="Tốc độ"

value={form.speed}

onChange={(e)=>

setForm({

...form,

speed:e.target.value

})

}


/>








<div className="grid2">


<input

type="number"

placeholder="Giá"

value={form.price}

onChange={(e)=>

setForm({

...form,

price:e.target.value

})

}


/>



<input

type="number"

placeholder="Giá cũ"

value={form.old_price}

onChange={(e)=>

setForm({

...form,

old_price:e.target.value

})

}

/>



</div>







<input

placeholder="Badge"

value={form.badge}

onChange={(e)=>

setForm({

...form,

badge:e.target.value

})

}


/>







<textarea

rows={5}

placeholder="Mô tả"

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}


/>








<div className="featureInput">


<input

placeholder="Nhập tính năng"

value={featureInput}

onChange={(e)=>

setFeatureInput(e.target.value)

}


/>


<button

type="button"

onClick={addFeature}

>

+

</button>


</div>






<div className="featureList">


{

form.features.map(

(item,index)=>(


<div

key={index}

className="featureItem"

>


<span>

✓ {item}

</span>


<button

type="button"

onClick={()=>removeFeature(index)}

>

×

</button>


</div>


)


)

}


</div>









<input

placeholder="Nút đăng ký"

value={form.button_text}

onChange={(e)=>

setForm({

...form,

button_text:e.target.value

})

}


/>








<label className="checkbox">


<input

type="checkbox"

checked={form.status}

onChange={(e)=>

setForm({

...form,

status:e.target.checked

})

}


/>


Hiển thị dịch vụ


</label>








<div className="uploadBox">


<input

type="file"

accept="image/*"

onChange={handleUploadImage}

/>


{

uploading &&

<p>
Đang upload...
</p>

}




{

form.image &&

<img

src={form.image}

className="previewImage"

/>

}



</div>








<button

className="saveBtn"

onClick={update}

disabled={loading}


>

{

loading

?

"Đang lưu..."

:

"Cập nhật"

}


</button>







</div>


</div>


);

}