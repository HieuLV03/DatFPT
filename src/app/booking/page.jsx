"use client";
import { useState } from "react";
import "./page.css";
import BackButton from "@/components/BackButton/BackButton";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
products: [],
      productType: "",

  });
  const [errorPopup, setErrorPopup] = useState("");
const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const showError = (msg) => {
  setErrorPopup(msg);
  setTimeout(() => setErrorPopup(""), 3000);
};
const handleCheckbox = (e) => {
  const { value, checked } = e.target;

  if (checked) {
    setForm({
      ...form,
      products: [...form.products, value],
    });
  } else {
    setForm({
      ...form,
      vs: form.products.filter(
        (item) => item !== value
      ),
    });
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

if (form.products.length === 0) {
  showError("Vui lòng chọn ít nhất 1 dịch vụ để được tư vấn.");
  return;
}

  setLoading(true);

  const formData = { ...form };

  setForm({
    name: "",
    phone: "",
    email: "",
    products: [],
    productType: "",
  });

  setLoading(false);

  // 👉 show popup
  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  }, 5000);

  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).catch(console.error);
};

  return (
    
    <div className="booking-container">
      {errorPopup && (
  <div className="successOverlay">
    <div className="successPopup errorPopup">
      <div className="successIcon">⚠️</div>

<h2>FPT Telecom</h2>
      <p>{errorPopup}</p>

      <button onClick={() => setErrorPopup("")}>
        Đóng
      </button>
    </div>
  </div>
)}
                    <BackButton />

      <div className="booking-box">
        
<h1>Đăng ký tư vấn dịch vụ <br></br>FPT Telecom</h1>
        <form onSubmit={handleSubmit} className="booking-form">
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

          <input
            name="email"
            placeholder="Email (không bắt buộc)"
            value={form.email}
            onChange={handleChange}
          />

<div className="checkboxGroup">
  <p className="checkboxTitle">
    Chọn dịch vụ bạn quan tâm
  </p>

  <label>
    <input
      type="checkbox"
      value="Internet cáp quang"
      checked={form.products.includes("Internet cáp quang")}
      onChange={handleCheckbox}
    />
    Internet cáp quang
  </label>

  <label>
    <input
      type="checkbox"
      value="Combo Internet + FPT Play"
      checked={form.products.includes("Combo Internet + FPT Play")}
      onChange={handleCheckbox}
    />
    Combo Internet + FPT Play
  </label>

  <label>
    <input
      type="checkbox"
      value="FPT Play"
      checked={form.products.includes("FPT Play")}
      onChange={handleCheckbox}
    />
    FPT Play
  </label>

  <label>
    <input
      type="checkbox"
      value="FPT Camera AI"
      checked={form.products.includes("FPT Camera AI")}
      onChange={handleCheckbox}
    />
    FPT Camera AI
  </label>

  <label>
    <input
      type="checkbox"
      value="Internet doanh nghiệp"
      checked={form.products.includes("Internet doanh nghiệp")}
      onChange={handleCheckbox}
    />
    Internet doanh nghiệp
  </label>

  <label>
    <input
      type="checkbox"
      value="WiFi Mesh"
      checked={form.products.includes("WiFi Mesh")}
      onChange={handleCheckbox}
    />
    WiFi Mesh
  </label>
</div>
<div className="submitBar">
  <button disabled={loading}>
    {loading ? "Đang gửi..." : "Đăng ký tư vấn"}
  </button>
</div>
          {showPopup && (
  <div className="successOverlay">
    <div className="successPopup">
      <div className="successIcon">🎉</div>

<h2>Đăng ký thành công!</h2>

<p>
Cảm ơn bạn đã đăng ký tư vấn dịch vụ FPT Telecom.
Chuyên viên sẽ liên hệ trong thời gian sớm nhất để tư vấn gói cước phù hợp.
</p>
      <button onClick={() => setShowPopup(false)}>
        Đóng
      </button>
    </div>
  </div>
)}
        </form>
      </div>
    </div>
  );
}