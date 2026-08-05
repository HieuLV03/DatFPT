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

const [oldImage,setOldImage]=useState("");


const [form,setForm]=useState({

name:"",
slug:"",
image:"",
speed:"",
category_ids:[]

});



// ==========================
// LOAD CATEGORY
// ==========================

useEffect(()=>{


const loadCategories=async()=>{


const {data,error}=await supabase

.from("categories")

.select("id,name")

.order("name");


if(error){

console.log(error);
return;

}


setCategories(data || []);


};


loadCategories();


},[]);



// ==========================
// SLUG
// ==========================

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



// ==========================
// LOAD SERVICE
// ==========================


useEffect(()=>{


const fetchData=async()=>{


if(!id)return;



const {
data,
error
}=await supabase

.from("services")

.select("*")

.eq("id",id)

.single();



if(error){

console.log(error);
return;

}




const {
data:cats
}=await supabase

.from("service_categories")

.select("category_id")

.eq(
"service_id",
id
);



setOldImage(
data.image || ""
);



setForm({

name:data.name || "",

slug:data.slug || "",

image:data.image || "",

speed:data.speed || "",


category_ids:

cats

?

cats.map(
item=>item.category_id
)

:

[]


});



};


fetchData();


},[id]);





// ==========================
// UPLOAD IMAGE
// ==========================


const randomString=()=>{

return Math.random()

.toString(36)

.substring(2,8);

};



const handleUploadImage=async(e)=>{


const file=e.target.files?.[0];


if(!file)return;



try{


setUploading(true);



const ext=file.name.split(".").pop();


const fileName=

`${form.slug}-${Date.now()}-${randomString()}.${ext}`;



const {
error
}=await supabase.storage

.from("images_service")

.upload(
fileName,
file
);



if(error)
throw error;



const {
data
}=supabase.storage

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

alert(
"Upload ảnh lỗi"
);


}
finally{

setUploading(false);

}


};



// ==========================
// UPDATE
// ==========================


const update=async()=>{


try{


setLoading(true);



// update service


const {
error
}=await supabase

.from("services")

.update({

name:form.name,

slug:form.slug,

image:form.image,

speed:form.speed


})

.eq(
"id",
id
);



if(error)
throw error;





// xóa category cũ


await supabase

.from("service_categories")

.delete()

.eq(
"service_id",
id
);





// thêm category mới


if(form.category_ids.length){



const rows=

form.category_ids.map(
category_id=>({

service_id:id,

category_id

})

);



const {
error:catError
}=await supabase

.from("service_categories")

.insert(rows);



if(catError)
throw catError;



}



alert(
"Cập nhật dịch vụ thành công"
);



router.refresh();



}
catch(err){

console.log(err);

alert(
err.message
);


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

slug:sanitize(
e.target.value
)

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