"use client";

import Link from "next/link";
import "./Footer.css";

import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* TOP */}
      <div className="footerTop">

        {/* COMPANY */}
        <div className="footerCompany">

          <div className="footerLogo">

            <img
              src="/logo.jpg"
              alt="DatFPT"
            />

            <div>

              <h2>Đạt FPT</h2>

              <span>
                Đối tác tư vấn dịch vụ Internet &
                Truyền hình
              </span>

            </div>

          </div>

          <p className="companyDesc">
            Chuyên tư vấn và hỗ trợ đăng ký
            Internet cáp quang, Truyền hình,
            Camera AI và các giải pháp dành cho
            cá nhân, gia đình và doanh nghiệp.
          </p>

          <div className="footerSocial">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTiktok />
            </a>

          </div>

        </div>

        {/* COLUMN */}
        <div className="footerColumn">

          <h3>Dịch vụ</h3>

          <Link href="#">
            Internet cáp quang
          </Link>

          <Link href="#">
            Combo Internet + TV
          </Link>

          <Link href="#">
            FPT Play
          </Link>

          <Link href="#">
            Camera AI
          </Link>

          <Link href="#">
            Internet doanh nghiệp
          </Link>

          <Link href="#">
            WiFi Mesh
          </Link>

        </div>

        {/* COLUMN */}
        <div className="footerColumn">

          <h3>Hỗ trợ khách hàng</h3>

          <Link href="/booking">
            Đăng ký tư vấn
          </Link>

          <Link href="#">
            Tra cứu gói cước
          </Link>

          <Link href="#">
            Hướng dẫn thanh toán
          </Link>

          <Link href="#">
            Câu hỏi thường gặp
          </Link>

          <Link href="#">
            Chính sách bảo mật
          </Link>

        </div>

        {/* COLUMN */}
        <div className="footerColumn">

          <h3>Về chúng tôi</h3>

          <Link href="/">
            Trang chủ
          </Link>

          <Link href="/products">
            Sản phẩm
          </Link>

          <Link href="/news">
            Tin tức
          </Link>

          <Link href="/contact">
            Liên hệ
          </Link>

          <Link href="#">
            Tuyển dụng
          </Link>

        </div>

        {/* CONTACT */}
        <div className="footerContact">

          <h3>Thông tin liên hệ</h3>

          <div className="contactItem">

            <FaPhoneAlt />

            <div>

              <span>Hotline</span>

              <strong>0375.202.500</strong>

            </div>

          </div>

          <div className="contactItem">

            <FaEnvelope />

            <div>

              <span>Email</span>

              <strong>
                contact@datfpt.vn
              </strong>

            </div>

          </div>

          <div className="contactItem">

            <FaMapMarkerAlt />

            <div>

              <span>Địa chỉ</span>

              <strong>
                TP. Hồ Chí Minh và khu vực lân cận
              </strong>

            </div>

          </div>

          <div className="contactItem">

            <FaClock />

            <div>

              <span>Thời gian</span>

              <strong>
                24/24
              </strong>

            </div>

          </div>

          <Link
            href="/booking"
            className="footerRegister"
          >
            Đăng ký tư vấn
          </Link>

        </div>

      </div>

      {/* MIDDLE */}

      <div className="footerMiddle">

        <div className="footerFeature">
          ✔ Hỗ trợ tận nơi
        </div>

        <div className="footerFeature">
          ✔ Đăng ký online
        </div>

        <div className="footerFeature">
          ✔ Lắp đặt nhanh
        </div>

        <div className="footerFeature">
          ✔ Hỗ trợ 24/7
        </div>

      </div>

      {/* BOTTOM */}

      <div className="footerBottom">

        <p>
          © {year} FPT.
          Tất cả quyền được bảo lưu.
        </p>

        <div className="footerBottomLinks">

          <Link href="#">
            Điều khoản sử dụng
          </Link>

          <Link href="#">
            Chính sách bảo mật
          </Link>

        </div>

      </div>

    </footer>
  );
}