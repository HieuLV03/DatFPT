"use client";

import {useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BackButton from "../../components/BackButton/BackButton";
import "./page.css";

export default function CreateServicePage() {
const [categories, setCategories] = useState([]);
  const [loading,setLoading]=useState(false);
const [showCategory, setShowCategory] = useState(false);
  const [file,setFile]=useState(null);

  const [featureInput,setFeatureInput]=useState("");

  const [form,setForm]=useState({

    name:"",
    slug:"",
    image:"",
  category_ids: [],
    speed:"",
    price:"",
    old_price:"",
    badge:"",
    description:"",
    features:[],
    button_text:"Đăng ký ngay",
    status:true,

  });
//==========================
// LOAD CATEGORIES
//==========================

const fetchCategories = async () => {

  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .eq("status", true)
    .order("name");

  if (error) {
    console.log(error);
    return;
  }

  setCategories(data || []);

};

useEffect(() => {
  fetchCategories();
}, []);
  //==========================
  // SLUG
  //==========================

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


  const randomString=()=>{

    return Math.random()

      .toString(36)

      .substring(2,8);

  };


  //==========================
  // UPLOAD IMAGE
  //==========================

const uploadImage = async (file, slug) => {

  const ext = file.name.split(".").pop();

  const fileName = `${slug}-${Date.now()}-${randomString()}.${ext}`;

  const { error } = await supabase.storage
    .from("images_service")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("images_service")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

  //==========================
  // FEATURE
  //==========================

  const addFeature=()=>{

    if(!featureInput.trim()) return;

    setForm({

      ...form,

      features:[

        ...form.features,

        featureInput.trim(),

      ],

    });

    setFeatureInput("");

  };


  const removeFeature=(index)=>{

    setForm({

      ...form,

      features:form.features.filter(

        (_,i)=>i!==index

      ),

    });

  };


  //==========================
  // CREATE
  //==========================

  const createService=async()=>{

    if(!form.name.trim()){

      return alert("Nhập tên dịch vụ.");

    }

    setLoading(true);

    try{
let image = null;

if (file) {
  image = await uploadImage(file, form.slug);
}

const { data: service, error } = await supabase

.from("services")

.insert([{

    name: form.name,

    slug: form.slug,

    image,

    speed: form.speed,

    price: form.price
        ? Number(form.price)
        : null,

    old_price: form.old_price
        ? Number(form.old_price)
        : null,

    badge: form.badge,

    description: form.description,

    features: form.features,

    button_text: form.button_text,

    status: form.status,

}])

.select()

.single(); 
if (error) {

    throw error;

}

if (form.category_ids.length > 0) {

    const rows = form.category_ids.map(categoryId => ({

        service_id: service.id,

        category_id: categoryId,

    }));

    const { error: categoryError } = await supabase

        .from("service_categories")

        .insert(rows);

    if (categoryError) {

        throw categoryError;

    }

}

      if(error){

        throw error;

      }

      alert("Tạo dịch vụ thành công!");

      setForm({

        name:"",
        slug:"",
        image:"",
    category_ids: [],
            speed:"",
        price:"",
        old_price:"",
        badge:"",
        description:"",
        features:[],
        button_text:"Đăng ký ngay",
        status:true,
      });

      setFile(null);

    }catch(err){

      console.log(err);

      alert(err.message);

    }finally{

      setLoading(false);

    }

  };
return (

<div className="createPage">

  <div className="createCard">

    <div className="headerRow">

      <BackButton />

      <h1>Tạo dịch vụ</h1>

    </div>

    {/* IMAGE */}

<div className="formGroup">

    <label>Danh mục</label>

<button
    type="button"
    className="chooseCategoryBtn"
    onClick={() => setShowCategory(true)}
>

{
    form.category_ids.length === 0

    ? "Chọn danh mục"

    : categories

        .filter(category =>

            form.category_ids.includes(category.id)

        )

        .map(category => category.name)

        .join(", ")

}

</button>
<label>Ảnh dịch vụ</label>

<input
  type="file"
  accept="image/*"
  onChange={(e)=>{
    setFile(e.target.files[0]);
  }}
/>

{
file && (
<p>
Đã chọn: {file.name}
</p>
)
}

</div>
    {/* NAME */}

    <div className="formGroup">

      <label>Tên dịch vụ</label>

      <input

        placeholder="Ví dụ: Internet GIGA"

        value={form.name}

        onChange={(e)=>{

          const name=e.target.value;

          setForm({

            ...form,

            name,

            slug:sanitize(name),

          });

        }}

      />

    </div>

    {/* SLUG */}

    <div className="formGroup">

      <label>Slug</label>

      <input

        value={form.slug}

        onChange={(e)=>

          setForm({

            ...form,

            slug:e.target.value,

          })

        }

      />

    </div>

    {/* PRICE */}

    <div className="grid2">
<label>Tốc độ</label>

<input

placeholder="Ví dụ: 1Gbps"

value={form.speed}

onChange={(e)=>

setForm({

...form,

speed:e.target.value

})

}

/>
      <div className="formGroup">

        <label>Giá</label>

        <input

          type="number"

          value={form.price}

          onChange={(e)=>

            setForm({

              ...form,

              price:e.target.value,

            })

          }

        />

      </div>

      <div className="formGroup">

        <label>Giá cũ</label>

        <input

          type="number"

          value={form.old_price}

          onChange={(e)=>

            setForm({

              ...form,

              old_price:e.target.value,

            })

          }

        />

      </div>

    </div>

    {/* BADGE */}

    <div className="formGroup">

      <label>Badge</label>

      <input

        placeholder="HOT"

        value={form.badge}

        onChange={(e)=>

          setForm({

            ...form,

            badge:e.target.value,

          })

        }

      />

    </div>

    {/* DESCRIPTION */}

    <div className="formGroup">

      <label>Mô tả</label>

      <textarea

        rows={4}

        value={form.description}

        onChange={(e)=>

          setForm({

            ...form,

            description:e.target.value,

          })

        }

      />

    </div>

    {/* FEATURES */}

    <div className="formGroup">

      <label>Tính năng</label>

      <div className="featureInput">

        <input

          placeholder="Nhập tính năng..."

          value={featureInput}

          onChange={(e)=>

            setFeatureInput(

              e.target.value

            )

          }

          onKeyDown={(e)=>{

            if(e.key==="Enter"){

              e.preventDefault();

              addFeature();

            }

          }}

        />

        <button

          type="button"

          className="addFeatureBtn"

          onClick={addFeature}

        >

          +

        </button>

      </div>

      <div className="featureList">

        {form.features.map(

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

                onClick={()=>

                  removeFeature(index)

                }

              >

                ×

              </button>

            </div>

          )

        )}

      </div>

    </div>

    {/* BUTTON */}

    <div className="grid2">

      <div className="formGroup">

        <label>Nút đăng ký</label>

        <input

          value={form.button_text}

          onChange={(e)=>

            setForm({

              ...form,

              button_text:e.target.value,

            })

          }

        />

      </div>


    </div>

    {/* STATUS */}

    <label className="statusCheck">

      <input

        type="checkbox"

        checked={form.status}

        onChange={(e)=>

          setForm({

            ...form,

            status:e.target.checked,

          })

        }

      />

      Hiển thị dịch vụ

    </label>

    <button

      className="submitBtn"

      onClick={createService}

      disabled={loading}

    >

      {loading

        ? "Đang lưu..."

        : "Lưu dịch vụ"}

    </button>

  </div>
{
showCategory && (

<div
    className="popupOverlay"
    onClick={() => setShowCategory(false)}
>

<div
    className="popupBox"
    onClick={(e) => e.stopPropagation()}
>

    <h2>Chọn danh mục</h2>

  <div className="categoryList">
  {categories.map((category) => (
    <label
      key={category.id}
      className="categoryItem"
    >
      <input
        type="checkbox"
        checked={form.category_ids.includes(category.id)}
        onChange={(e) => {
          if (e.target.checked) {
            setForm((prev) => ({
              ...prev,
              category_ids: [
                ...prev.category_ids,
                category.id,
              ],
            }));
          } else {
            setForm((prev) => ({
              ...prev,
              category_ids: prev.category_ids.filter(
                (id) => id !== category.id
              ),
            }));
          }
        }}
      />

      <span>{category.name}</span>
    </label>
  ))}
</div>
    <button
        className="closePopup"
        onClick={() => setShowCategory(false)}
    >
        Đóng
    </button>

</div>
</div>

)
}
</div>

);

  };