"use client";

import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
<footer className="footer">
  <div className="footerContainer">

    <div className="footerBrand">
      <h2>Tiệm nhà Ngọc</h2>

      <p>
        Chuyên cung cấp thực phẩm, đặc sản và các sản phẩm chất lượng,
        mang đến sự tiện lợi và an tâm cho khách hàng.
      </p>
    </div>

    <div className="footerBox">
      <h3>Thông tin</h3>

      <p>📍 16 Ấp Tường Thắng B</p>
      <p>Xã Phước Long, tỉnh Cà Mau</p>
      <p>📞 0332 605 121</p>
      <p>📧 nguyentinhngoc@gmail.com</p>
    </div>

    <div className="footerBox">
      <h3>Liên kết</h3>

      <Link href="/">Trang chủ</Link>
      <Link href="/products">Sản phẩm</Link>
      <Link href="/posts">Bài viết</Link>
      <Link href="/contact">Liên hệ</Link>
    </div>

    <div className="footerBox">
      <h3>Kết nối</h3>

      <a href="#">Facebook</a>
      <a href="#">Zalo</a>
      <a href="#">TikTok</a>
    </div>

  </div>

  <div className="footerBottom">
    <div className="footerBottomContainer">

      <span>
        © {new Date().getFullYear()} Tiệm nhà Ngọc.
      </span>

      <div className="footerPolicy">
        <Link href="#">Điều khoản</Link>
        <Link href="#">Chính sách bảo mật</Link>
      </div>

    </div>
  </div>

</footer>
  );
}