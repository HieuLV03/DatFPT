import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ListService from "../../components/ServiceList/ServiceList";
import "./page.css";
import BackButton from "@/components/BackButton/BackButton";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";


export const revalidate = 600;


export default async function HomePage() {


 const [serviceRes, postRes] = await Promise.all([

  supabase
    .from("services")
    .select("*")
    .eq("status","available")
    .order("created_at",{ascending:false}),


  supabase
    .from("posts")
    .select("*")
    .eq("status","published")
    .order("created_at",{ascending:false})
    .limit(5)

 ]);


const services = serviceRes.data || [];
const posts = postRes.data || [];


return (

<main className="home">



<ScrollReveal>

<section className="section">


<div className="sectionHeader">

<BackButton />

<h2>
Sản phẩm
</h2>

</div>


<ListService services={services}/>


</section>


</ScrollReveal>





{/* BLOG */}


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
delay={index*0.1}
>


<Link

href={`/posts/${p.slug}`}

className="blogCard"

>


<div className="blogImg">


<Image

src={p.image}

alt={p.title}

width={600}

height={400}

sizes="(max-width:768px) 100vw,33vw"

className="cardImage"

/>


<div className="imgOverlay">

<span className="imgBtn">

Xem bài viết

</span>

</div>


</div>



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
  <Link href="/posts" className="viewMoreBtn">
    Xem thêm bài viết
    <span>→</span>
  </Link>
</div>
</ScrollReveal>



</main>

);

}