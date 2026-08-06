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
{/* ==========================
    INTRO SEO
========================== */}

<section className="heroIntro section">

    <span className="sectionTag">
        FPT Telecom
    </span>

    <h1>
        Lắp đặt nhanh <br></br> Internet FPT tốc độ cao<br></br> WiFi mạnh và ổn định
    </h1>

    <p>

        Đăng ký Internet cáp quang FPT với nhiều gói cước dành cho
        cá nhân, gia đình và doanh nghiệp. Hỗ trợ tư vấn, khảo sát,
        lắp đặt nhanh và chăm sóc kỹ thuật trong suốt quá trình sử dụng.

    </p>

    <div className="heroButtons">

        <Link
            href="/services"
            className="primaryBtn"
        >
            Xem gói cước
        </Link>

        <Link
            href="/contact"
            className="outlineBtn"
        >
            Đăng ký lắp đặt
        </Link>

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

<section className="section faqSection">

    <div className="sectionHeader center">

        <span className="sectionTag">
            Câu hỏi thường gặp
        </span>

        <h2>
            Giải đáp về dịch vụ Internet FPT
        </h2>

    </div>

    <div className="faqList">

        <details>

            <summary>
                Internet FPT có hỗ trợ lắp đặt tận nơi không?
            </summary>

            <p>
                Có. Đội ngũ kỹ thuật sẽ khảo sát hạ tầng và hỗ trợ lắp đặt tại nhà hoặc doanh nghiệp theo khu vực có hạ tầng FPT.
            </p>

        </details>

        <details>

            <summary>
                Thời gian lắp đặt Internet FPT mất bao lâu?
            </summary>

            <p>
                Sau khi hoàn tất đăng ký và xác nhận thông tin, kỹ thuật viên sẽ sắp xếp lịch lắp đặt trong thời gian sớm nhất tùy khu vực.
            </p>

        </details>

        <details>

            <summary>
                Có thể nâng cấp gói cước sau khi sử dụng không?
            </summary>

            <p>
                Có. Khách hàng có thể nâng cấp hoặc thay đổi gói cước khi nhu cầu sử dụng thay đổi.
            </p>

        </details>

        <details>

            <summary>
                Internet FPT có phù hợp chơi game và livestream?
            </summary>

            <p>
                Các gói cước tốc độ cao của FPT đáp ứng tốt nhu cầu chơi game, học online, làm việc từ xa và livestream.
            </p>

        </details>

        <details>

            <summary>
                FPT có hỗ trợ doanh nghiệp không?
            </summary>

            <p>
                Có. FPT Telecom cung cấp nhiều giải pháp Internet và hạ tầng mạng dành riêng cho doanh nghiệp.
            </p>

        </details>

    </div>

</section>



    </main>


  );

}