"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton/BackButton";

import "./page.css";

export default function ContactPage() {

    // ==========================
    // STATE
    // ==========================

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({

        name: "",
        phone: "",
        services: [],
        message: "",

    });

    const [loading, setLoading] = useState(false);

    const [showPopup, setShowPopup] = useState(false);

    const [errorPopup, setErrorPopup] = useState("");


    // ==========================
    // LOAD CATEGORIES
    // ==========================

    useEffect(() => {

        const fetchCategories = async () => {

            const {
                data,
                error
            } = await supabase

                .from("categories")

                .select(`
                    id,
                    name
                `)

                .eq(
                    "status",
                    true
                )

                .order("name");


            if (error) {

                console.log(error);

                return;

            }

            setCategories(data || []);

        };

        fetchCategories();

    }, []);


    // ==========================
    // INPUT
    // ==========================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value,

        });

    };


    // ==========================
    // CHECKBOX
    // ==========================

    const handleCheckbox = (e) => {

        const {

            value,

            checked

        } = e.target;


        if (checked) {

            setForm(prev => ({

                ...prev,

                services: [

                    ...prev.services,

                    value

                ]

            }));

        }

        else {

            setForm(prev => ({

                ...prev,

                services:
                    prev.services.filter(
                        item => item !== value
                    )

            }));

        }

    };


    // ==========================
    // ERROR
    // ==========================

    const showError = (msg) => {

        setErrorPopup(msg);

        setTimeout(() => {

            setErrorPopup("");

        }, 3000);

    };


    // ==========================
    // SUBMIT
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!form.name.trim()) {

            showError(
                "Vui lòng nhập họ và tên."
            );

            return;

        }


        if (!form.phone.trim()) {

            showError(
                "Vui lòng nhập số điện thoại."
            );

            return;

        }


        if (form.services.length === 0) {

            showError(
                "Vui lòng chọn ít nhất một dịch vụ."
            );

            return;

        }


        setLoading(true);


        const formData = {

            ...form

        };


        try {

            // reset form

            setForm({

                name: "",

                phone: "",

                services: [],

                message: "",

            });


            // hiện popup

            setShowPopup(true);


            setTimeout(() => {

                setShowPopup(false);

            }, 3000);


            // gửi API nền

            fetch("/api", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(formData)

            })
                .then(res => res.json())
                .then(data => {

                    console.log("Email:", data);

                })
                .catch(err => {

                    console.log(err);

                });

        }

        catch (err) {

            console.log(err);

            showError(
                "Không thể gửi yêu cầu."
            );

        }

        finally {

            setLoading(false);

        }

    };
    return (

    <main className="contactPage">

        <BackButton />


        {/* ==========================
            ERROR POPUP
        ========================== */}

        {

            errorPopup && (

                <div className="popupOverlay">

                    <div className="popup error">

                        <div className="popupIcon">

                            ⚠️

                        </div>

                        <h2>

                            FPT Telecom

                        </h2>

                        <p>

                            {errorPopup}

                        </p>

                        <button

                            onClick={() => setErrorPopup("")}

                        >

                            Đóng

                        </button>

                    </div>

                </div>

            )

        }


        {/* ==========================
            SUCCESS POPUP
        ========================== */}

        {

            showPopup && (

                <div className="popupOverlay">

                    <div className="popup">

                        <div className="popupIcon">

                            🎉

                        </div>

                        <h2>

                            Gửi thành công!

                        </h2>

                        <p>

                            Cảm ơn bạn đã đăng ký tư vấn.
                            Chúng tôi sẽ liên hệ trong thời gian sớm nhất.

                        </p>

                        <button

                            onClick={() => setShowPopup(false)}

                        >

                            Đóng

                        </button>

                    </div>

                </div>

            )

        }


        {/* ==========================
            HERO
        ========================== */}

        <section className="contactHero">

            <span className="contactTag">

                FPT Telecom

            </span>

            <h1>

                Liên hệ tư vấn lắp đặt Internet FPT

            </h1>

            <p>

                Điền thông tin để được tư vấn miễn phí,
                lựa chọn gói cước phù hợp và hỗ trợ
                lắp đặt Internet FPT nhanh chóng.

            </p>

        </section>


        {/* ==========================
            CONTENT
        ========================== */}

        <section className="contactWrapper">


            {/* ==========================
                FORM
            ========================== */}

            <div className="contactForm">

                <h2>

                    Gửi yêu cầu tư vấn

                </h2>

                <p>

                    Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.

                </p>


                <form

                    onSubmit={handleSubmit}

                    className="booking-form"

                >

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


                    <div className="checkboxGroup">

                        <p className="checkboxTitle">

                            Chọn dịch vụ bạn quan tâm

                        </p>


                        {

                            categories.map(category => (

                                <label

                                    key={category.id}

                                >

                                    <input

                                        type="checkbox"

                                        value={category.name}

                                        checked={
                                            form.services.includes(
                                                category.name
                                            )
                                        }

                                        onChange={handleCheckbox}

                                    />

                                    <span>

                                        {category.name}

                                    </span>

                                </label>

                            ))

                        }

                    </div>


                    <textarea

                        name="message"

                        placeholder="Ghi chú (không bắt buộc)"

                        value={form.message}

                        onChange={handleChange}

                    />


                    <button

                        disabled={loading}

                    >

                        {

                            loading

                                ?

                                "Đang gửi..."

                                :

                                "Gửi yêu cầu"

                        }

                    </button>


                    <p className="bookingNote">

                        ✓ Tư vấn miễn phí &nbsp;&nbsp;

                        ✓ Hỗ trợ khảo sát &nbsp;&nbsp;

                        ✓ Lắp đặt nhanh

                    </p>

                </form>

            </div>


            {/* ==========================
                INFO
            ========================== */}

            <aside className="contactInfo">

                <h2>

                    Thông tin liên hệ

                </h2>


                <div className="infoItem">

                    📞 Hotline: 1900 xxxx

                </div>


                <div className="infoItem">

                    📍 Địa chỉ: ...

                </div>


                <div className="infoItem">

                    ⏰ Thời gian hỗ trợ:
                    07:30 - 21:00

                </div>


                <div className="contactNote">

                    Sau khi nhận được thông tin,
                    chuyên viên FPT Telecom sẽ liên hệ
                    để tư vấn gói cước và lịch lắp đặt
                    phù hợp trong thời gian sớm nhất.

                </div>

            </aside>

        </section>

    </main>

);
}