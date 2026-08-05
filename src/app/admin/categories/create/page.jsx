"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton/BackButton";
import "./page.css";

export default function CreateCategoryPage() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const [preview, setPreview] = useState("");

  // ======================
  // TẠO SLUG
  // ======================
  const sanitize = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // ======================
  // CHỌN ẢNH
  // ======================
  const handleImageChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  // ======================
  // CREATE CATEGORY
  // ======================
  const createCategory = async () => {

    if (!form.name.trim()) {
      return alert("Vui lòng nhập tên danh mục");
    }

    try {

      setLoading(true);

      let imageUrl = "";

      // Upload ảnh
      if (imageFile) {

        const fileName =
          `${Date.now()}-${imageFile.name}`;

        const { error: uploadError } =
          await supabase.storage
            .from("images_category")
            .upload(fileName, imageFile);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        const { data } =
          supabase.storage
            .from("images_category")
            .getPublicUrl(fileName);

        imageUrl = data.publicUrl;

      }

      const { error } =
        await supabase
          .from("categories")
          .insert([
            {
              name: form.name,
              slug: form.slug,
              image: imageUrl,
              status: true,
            },
          ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Thêm danh mục thành công!");

      setForm({
        name: "",
        slug: "",
      });

      setImageFile(null);

      setPreview("");

    } catch (err) {

      console.log(err);

      alert("Có lỗi xảy ra.");

    } finally {

      setLoading(false);

    }

  };
    return (
    <div className="createCategoryPage">
      <div className="createCategoryCard">

        <div className="headerRow">

          <BackButton />

          <div>
            <h1>Thêm danh mục</h1>
            <p>Tạo danh mục mới</p>
          </div>

        </div>

        {/* Tên danh mục */}
        <input
          type="text"
          placeholder="Tên danh mục"
          value={form.name}
          onChange={(e) => {

            const name = e.target.value;

            setForm({
              ...form,
              name,
              slug: sanitize(name),
            });

          }}
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm({
              ...form,
              slug: sanitize(e.target.value),
            })
          }
        />

        {/* Upload ảnh */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="previewImage"
          />
        )}

        <button
          onClick={createCategory}
          disabled={loading}
        >
          {loading
            ? "Đang tạo..."
            : "Tạo danh mục"}
        </button>

      </div>
    </div>
  );

}