import BackButton from "@/components/BackButton/BackButton";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import Link from "next/link";

import "./page.css";

export const metadata = {
  title: "Giới thiệu | Internet FPT",
  description:
    "Đơn vị tư vấn và đăng ký lắp đặt Internet FPT, FPT Play và Camera FPT. Hỗ trợ tư vấn tận nơi, lắp đặt nhanh, chăm sóc khách hàng chuyên nghiệp.",
};

export default function AboutPage() {
  return (
    <main className="aboutPage">

      <BackButton />

      <ScrollReveal>
        <section className="aboutHero">

          <span className="aboutTag">
            GIỚI THIỆU
          </span>

          <h1>
            Đơn vị tư vấn và đăng ký lắp đặt Internet FPT
          </h1>

          <p>
            Chúng tôi hỗ trợ khách hàng đăng ký Internet cáp quang FPT,
            FPT Play và Camera FPT với quy trình nhanh chóng, tư vấn tận tâm
            và đồng hành trong suốt quá trình sử dụng dịch vụ.
          </p>

        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>

        <section className="aboutSection">

          <h2>
            Chúng tôi mang đến điều gì?
          </h2>

          <p>
            Với nhiều năm kinh nghiệm tư vấn các giải pháp Internet,
            chúng tôi giúp khách hàng lựa chọn gói cước phù hợp theo nhu cầu
            sử dụng, từ hộ gia đình, cửa hàng đến doanh nghiệp.
          </p>

          <p>
            Mọi thông tin về gói cước, chương trình khuyến mãi và chính sách
            đều được cập nhật thường xuyên nhằm giúp khách hàng dễ dàng
            lựa chọn dịch vụ phù hợp.
          </p>

        </section>

      </ScrollReveal>

      <section className="featureGrid">

        <ScrollReveal delay={0.1}>

          <div className="featureCard">

            <h3>
              Lắp đặt nhanh
            </h3>

            <p>
              Tiếp nhận đăng ký nhanh, hỗ trợ khảo sát và sắp xếp kỹ thuật
              trong thời gian sớm nhất.
            </p>

          </div>

        </ScrollReveal>

        <ScrollReveal delay={0.15}>

          <div className="featureCard">

            <h3>
              Tư vấn đúng nhu cầu
            </h3>

            <p>
              Gợi ý gói Internet phù hợp theo số lượng thiết bị,
              diện tích sử dụng và ngân sách.
            </p>

          </div>

        </ScrollReveal>

        <ScrollReveal delay={0.2}>

          <div className="featureCard">

            <h3>
              Hỗ trợ tận tâm
            </h3>

            <p>
              Luôn đồng hành trong quá trình đăng ký, lắp đặt
              và sử dụng dịch vụ.
            </p>

          </div>

        </ScrollReveal>

      </section>

      <ScrollReveal delay={0.2}>

        <section className="aboutSection">

          <h2>
            Vì sao nhiều khách hàng lựa chọn?
          </h2>

          <ul className="aboutList">

            <li>Đăng ký trực tuyến nhanh chóng.</li>

            <li>Tư vấn miễn phí theo từng nhu cầu sử dụng.</li>

            <li>Cập nhật đầy đủ các chương trình ưu đãi.</li>

            <li>Hỗ trợ khách hàng trước và sau khi lắp đặt.</li>

            <li>Thông tin rõ ràng, minh bạch và dễ tiếp cận.</li>

          </ul>

        </section>

      </ScrollReveal>

      <ScrollReveal delay={0.25}>

        <section className="aboutCTA">

          <h2>
            Sẵn sàng đăng ký Internet FPT?
          </h2>

          <p>
            Khám phá các gói cước mới nhất và nhận tư vấn miễn phí ngay hôm nay.
          </p>

          <Link
            href="/services"
            className="ctaButton"
          >
            Xem gói cước
          </Link>

        </section>

      </ScrollReveal>

    </main>
  );
}