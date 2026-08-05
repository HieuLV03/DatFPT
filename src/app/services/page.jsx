import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

import ListService from "../../components/ServiceList/ServiceList";
import "./page.css";

import BackButton from "@/components/BackButton/BackButton";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";


export const revalidate = 600;



export default async function HomePage() {


  const [
    serviceRes,
    postRes
  ] = await Promise.all([



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
      .order("created_at",{
        ascending:false
      }),





    // ==========================
    // POSTS
    // ==========================

    supabase
      .from("posts")
      .select("*")
      .eq("status","published")
      .order("created_at",{
        ascending:false
      })
      .limit(5)


  ]);





  console.log(
    "SERVICES:",
    JSON.stringify(serviceRes.data,null,2)
  );


  console.log(
    "SERVICE ERROR:",
    serviceRes.error
  );





  console.log(
    "POSTS:",
    JSON.stringify(postRes.data,null,2)
  );


  console.log(
    "POST ERROR:",
    postRes.error
  );







  const services =
    serviceRes.data || [];



  const posts =
    postRes.data || [];







  return (

    <main className="home">





      {/* ==========================
          SERVICES
      ========================== */}


      <ScrollReveal>


        <section className="section">



          <div className="sectionHeader">


            <BackButton />


            <h2>
              Sản phẩm
            </h2>


          </div>






          {
            services.length ? (

              <ListService
                services={services}
              >

              </ListService>

            ) : (

              <p>
                Chưa có dịch vụ
              </p>

            )
          }





        </section>


      </ScrollReveal>









      {/* ==========================
          BLOG
      ========================== */}



      <ScrollReveal delay={0.2}>


        <section className="section">


          <div className="sectionHeader">


            <h2>
              Bài viết mới
            </h2>


          </div>





          <div className="blogGrid">


          {
            posts.map((p,index)=>(


              <ScrollReveal

                key={p.id}

                delay={index * 0.1}

              >


                <Link

                  href={`/posts/${p.slug}`}

                  className="blogCard"

                >



                  {
                    p.image && (

                      <div className="blogImg">


                        <Image

                          src={p.image}

                          alt={p.title}

                          width={600}

                          height={400}

                          className="cardImage"

                        />



                        <div className="imgOverlay">


                          <span className="imgBtn">

                            Xem bài viết

                          </span>


                        </div>



                      </div>

                    )
                  }






                  <div className="blogBody">


                    <h3>
                      {p.title}
                    </h3>



                    <p>
                      {p.description}
                    </p>



                  </div>




                </Link>



              </ScrollReveal>


            ))
          }



          </div>





        </section>





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



      </ScrollReveal>





    </main>

  );


}