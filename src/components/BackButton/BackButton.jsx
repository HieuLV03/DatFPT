"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "./BackButton.css";


export default function BackButton() {

  const router = useRouter();

  const [show, setShow] = useState(true);


  useEffect(()=>{

    let lastScrollY = window.scrollY;


    const handleScroll = ()=>{

      const currentY = window.scrollY;


      // tránh rung khi scroll rất nhỏ
      if(Math.abs(currentY - lastScrollY) < 10)
        return;


      if(currentY > lastScrollY && currentY > 80){

        // kéo xuống
        setShow(false);

      }else{

        // kéo lên
        setShow(true);

      }


      lastScrollY = currentY;

    };



    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive:true
      }
    );


    return ()=>{

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };


  },[]);



  return (

    <button

      className={`backBtn ${show ? "show" : "hide"}`}

      onClick={()=>router.back()}

    >

      <span>
        ←
      </span>

      Trở về


    </button>

  );

}