"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./BookingPopup.css";

export default function BookingPopup() {
  const [show, setShow] = useState(false);
  const [animating, setAnimating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const flyToButtonAndClose = (callback) => {
    const popup = document.querySelector(".popupBox");
const btn = document.querySelector(".bookingFloat");
    if (!popup || !btn) {
      setShow(false);
      return;
    }

    const popupRect = popup.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const deltaX =
      btnRect.left +
      btnRect.width / 2 -
      (popupRect.left + popupRect.width / 2);

    const deltaY =
      btnRect.top +
      btnRect.height / 2 -
      (popupRect.top + popupRect.height / 2);

    setAnimating(true);

    popup.style.transition =
      "0.65s cubic-bezier(.2,.8,.2,1)";
    popup.style.transform = `
      translate(${deltaX}px, ${deltaY}px)
      scale(0.1)
    `;
    popup.style.opacity = "0";

    setTimeout(() => {
      setShow(false);
      setAnimating(false);

      if (callback) callback();

      // 🔥 bùng nổ button
 if (window.triggerBookingBurst) {
    window.triggerBookingBurst();
}
    }, 650);
  };

  const closePopup = () => {
    flyToButtonAndClose();
  };

  const handleBooking = () => {
    flyToButtonAndClose(() => {
      router.push("/booking");
    });
  };

  if (!show) return null;

  return (
    <div className="popupOverlay">
      <div className="popupBox">
        <button className="popupClose" onClick={closePopup}>
          ×
        </button>

 <div className="popupBadge">
  ƯU ĐÃI ĐỘC QUYỀN
</div>

<h2>Lắp Internet FPT ngay hôm nay</h2>

<p>
  Đăng ký nhanh để nhận ưu đãi mới nhất cùng hỗ trợ lắp đặt tận nơi.
</p>

<div className="popupBenefit">
  ⚡ Lắp đặt nhanh trong 24 giờ
</div>

<div className="popupBenefit">
  🎁 Nhiều ưu đãi hấp dẫn
</div>

<div className="popupBenefit">
  📞 Tư vấn miễn phí 24/7
</div>

<button
  className="popupBtn"
  onClick={handleBooking}
>
  Đăng ký ngay
</button>

<span className="popupSmall">
  Miễn phí tư vấn • Hỗ trợ tận nơi
</span>
      </div>
    </div>
  );
}