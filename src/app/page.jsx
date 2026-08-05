import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

import ListService from "../components/ServiceList/ServiceList";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import Slider from "@/components/Slider/Slider";

import "./page.css";


export const revalidate = 600;



export default async function HomePage() {


  const [
    sliderRes,
    serviceRes,
    postRes
  ] = await Promise.all([



    // ==========================
    // SLIDER
    // ==========================

    supabase
      .from("sliders")
      .select("*")
      .order("created_at", {
        ascending:false,
      })
      .limit(5),





    // ==========================
    // SERVICES + CATEGORY
    // ==========================

    supabase
      .from("services")
      .select(`
        *,
        service_categories!inner(
          categories(
            id,
            name,
            slug
          )
        )
      `)
      .order("created_at", {
        ascending:false,
      }),





    // ==========================
    // POSTS
    // ==========================

    supabase
      .from("posts")
      .select("*")
      .eq("status","published")
      .eq("featured",true)
      .order("created_at", {
        ascending:false,
      })
      .limit(5),


  ]);




  console.log(
    "SERVICES:",
    JSON.stringify(serviceRes.data,null,2)
  );



  console.log(
    "SERVICE ERROR:",
    serviceRes.error
  );




  const sliders =
    sliderRes.data || [];



  const services =
    serviceRes.data || [];



  const posts =
    postRes.data || [];





  return (


    <main className="homePage">





      {/* ==========================
          HERO
      ========================== */}


      <Slider 
        sliders={sliders}
      />







      {/* ==========================
          INTRO
      ========================== */}


      <section className="section introSection">


        <div className="introContent">


          <span className="sectionTag">
            FPT TELECOM
          </span>



          <h1>

            Internet FPT tốc độ cao –
            Kết nối ổn định cho mọi gia đình
            và doanh nghiệp

          </h1>




          <p>

            FPT Telecom là đơn vị cung cấp
            dịch vụ Internet cáp quang,
            truyền hình FPT Play, Camera AI
            và các giải pháp công nghệ hàng đầu.

          </p>



          <p>

            Khám phá các gói cước Internet FPT
            mới nhất, nhiều chương trình ưu đãi
            hấp dẫn và đăng ký lắp đặt nhanh.

          </p>



        </div>


      </section>








      {/* ==========================
          SERVICES
      ========================== */}



      <ScrollReveal>


        <section className="section">



          <div className="sectionHeader">


            <h2>
              Dịch vụ nổi bật
            </h2>


          </div>





          <ListService

            services={services}

          />






          <div className="viewMoreWrap">


            <Link

              href="/services"

              className="viewMoreBtn"

            >

              Xem thêm dịch vụ

              <span>
                →
              </span>


            </Link>


          </div>




        </section>


      </ScrollReveal>









      {/* ==========================
          BLOG
      ========================== */}



      <section className="section">



        <div className="sectionHeader">


          <span className="sectionTag">
            BLOG
          </span>



          <h2>
            Bài viết mới
          </h2>



        </div>








        <div className="blogGrid">



        {
          posts.map((post)=>(



            <Link


              prefetch={true}


              key={post.id}


              href={`/posts/${post.slug}`}


              className="blogCard"


            >





              {
                post.image && (


                <div className="blogImg">



                  <Image


                    src={post.image}


                    alt={post.title}


                    width={0}


                    height={0}


                    sizes="100vw"


                    className="cardImage"


                  />




                  <div className="imgOverlay">


                    <div className="imgCta">


                      <span>
                        Xem bài viết
                      </span>


                    </div>


                  </div>



                </div>


                )

              }





              <div className="blogBody">



                <h3>
                  {post.title}
                </h3>




                <p>
                  {post.description}
                </p>




              </div>




            </Link>



          ))
        }



        </div>








        <div className="viewMoreWrap">


          <Link

            href="/posts"

            className="viewMoreBtn"

          >

            Xem thêm bài viết

            <span>
              →
            </span>


          </Link>



        </div>





      </section>





    </main>


  );

}