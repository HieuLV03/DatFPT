"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import "./page.css";
import BackButton from "@/components/BackButton/BackButton";


export default function BookingPage() {

const [categories,setCategories] = useState([]);
  const [form,setForm] = useState({

    name:"",
    phone:"",
    services:[],
      message:""


  });


  const [errorPopup,setErrorPopup] = useState("");

  const [showPopup,setShowPopup] = useState(false);

  const [loading,setLoading] = useState(false);



  // ==========================
  // LOAD SERVICES
  // ==========================

useEffect(()=>{

const fetchCategories = async()=>{


const {
data,
error
}=await supabase

.from("categories")

.select(`
id,
name
`)

.eq(
"status",
true
)

.order("name");


if(error){

console.log(error);

return;

}


setCategories(data || []);


};


fetchCategories();


},[]);


  // ==========================
  // INPUT
  // ==========================


  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });


  };





  // ==========================
  // ERROR
  // ==========================

  const showError=(msg)=>{


    setErrorPopup(msg);


    setTimeout(()=>{

      setErrorPopup("");

    },3000);


  };





  // ==========================
  // CHECKBOX
  // ==========================

  const handleCheckbox=(e)=>{


    const {
      value,
      checked
    } = e.target;



    if(checked){


      setForm(prev=>({

        ...prev,

        services:[
          ...prev.services,
          value
        ]

      }));


    }
    else{


      setForm(prev=>({

        ...prev,

        services:
        prev.services.filter(
          item=>item!==value
        )

      }));


    }


  };





  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit=async(e)=>{


    e.preventDefault();



    if(form.services.length===0){

      showError(
        "Vui lòng chọn ít nhất 1 dịch vụ để được tư vấn."
      );

      return;

    }



    setLoading(true);



    const formData={
      ...form
    };


try{


// hiện thành công ngay
setForm({

name:"",
phone:"",
services:[],
  message:""

});


setShowPopup(true);


setTimeout(()=>{

setShowPopup(false);

},5000);


// gửi email chạy nền
fetch("/api",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(formData)

})
.then(res=>res.json())
.then(data=>{

console.log("Email:",data);

})
.catch(err=>{

console.log("Mail error:",err);

});


}
catch(err){

console.log(err);

showError(
"Gửi đăng ký thất bại"
);

}
    finally{

      setLoading(false);

    }


  };





return (

<div className="booking-container">



{
errorPopup && (

<div className="successOverlay">

<div className="successPopup errorPopup">


<div className="successIcon">
⚠️
</div>


<h2>
FPT Telecom
</h2>


<p>
{errorPopup}
</p>


<button
onClick={()=>setErrorPopup("")}
>
Đóng
</button>


</div>

</div>

)

}




<BackButton />



<div className="booking-box">
<div className="bookingIntro">

    <span className="bookingTag">
        FPT Telecom
    </span>

    <h1>
        Đăng ký tư vấn và lắp đặt Internet FPT
    </h1>

 <p>
    Điền thông tin để được tư vấn gói cước Internet FPT phù hợp và hỗ trợ lắp đặt nhanh tại khu vực của bạn.
</p>

</div>
<form
onSubmit={handleSubmit}
className="booking-form"
>



<input

name="name"

placeholder="Họ và tên"

value={form.name}

onChange={handleChange}

required

/>



<input

name="phone"

placeholder="Số điện thoại"

value={form.phone}

onChange={handleChange}

required

/>






<div className="checkboxGroup">


<p className="checkboxTitle">

Chọn dịch vụ bạn quan tâm

</p>


{
categories.map(category=>(


<label
key={category.id}
>


<input

type="checkbox"

value={category.name}

checked={
form.services.includes(
category.name
)
}

onChange={handleCheckbox}

/>


<span>
{category.name}
</span>


</label>


))
}



</div>



<div className="formGroup">

  <label>

    Ghi chú <span>(không bắt buộc)</span>

  </label>

  <textarea

    name="message"

    placeholder="Ví dụ: Muốn lắp vào cuối tuần, cần tư vấn gói cho gia đình..."

    value={form.message}

    onChange={handleChange}

    rows={4}

  />

</div>

<div className="submitBar">


<button
disabled={loading}
>

{
loading
?
"Đang gửi..."
:
"Đăng ký tư vấn"
}


</button>


</div>





{
showPopup && (


<div className="successOverlay">


<div className="successPopup">


<div className="successIcon">
🎉
</div>



<h2>
Đăng ký thành công!
</h2>



<p>

Cảm ơn bạn đã đăng ký tư vấn dịch vụ FPT Telecom.
Chuyên viên sẽ liên hệ trong thời gian sớm nhất để tư vấn gói cước phù hợp.

</p>



<button
onClick={()=>setShowPopup(false)}
>

Đóng

</button>


</div>


</div>


)

}



</form>



</div>



</div>


);


}