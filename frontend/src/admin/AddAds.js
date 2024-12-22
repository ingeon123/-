import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const AddAds = () => {
  const location = useLocation();  
  const { ad, mode } = location.state || {};  
  const navigate = useNavigate();


  const [formData, setFormData] = useState(ad || {  
    ad_id: "",
    ad_subject: "",
    ad_file: "",
    ad_content: "",
    ad_use: 0,
    ad_start_date: "",
    ad_end_date: "",
  });

  useEffect(() => {
    if (ad && ad.ad_start_date) {
      const formattedStartDate = new Date(ad.ad_start_date).toISOString().split('T')[0];
      const formattedEndDate = new Date(ad.ad_end_date).toISOString().split('T')[0];
      setFormData((prevData) => ({
        ...prevData,
        ad_start_date: formattedStartDate,
        ad_end_date: formattedEndDate,
      }));
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/addads.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { ad_id, ad_subject, ad_file, ad_content, ad_use, ad_start_date, ad_end_date } = formData; 
    const method = mode === "edit" ? "PUT" : "POST"; 
    const url = mode === "edit" 
      ? `http://localhost:5000/api/admin/editAd` 
      : `http://localhost:5000/api/admin/addAd`;
  
    if (ad_start_date>ad_end_date) {
      alert("시작 날짜가 종료 날자보다 늦습니다");
      return;
    }
    const body = JSON.stringify({ ad_id, ad_subject, ad_file, ad_content, ad_use, ad_start_date, ad_end_date });
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: body,
      });
  
      if (response.ok) {
        alert(mode === "edit" ? "광고가 수정되었습니다." : "광고가 추가되었습니다.");
        navigate("/admin/adsList"); 
      } else {
        alert("요청 실패");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <main id="main-content">
        <h2>{mode === 'edit' ? '광고 수정' : '광고 추가'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>광고 제목</label>
            <input
              type="text"
              name="ad_subject"
              value={formData.ad_subject}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>광고 이미지</label>
            <input
              type="text"
              name="ad_file"
              value={formData.ad_file}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>광고 내용</label>
            <textarea
              name="ad_content"
              value={formData.ad_content}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>활성화 여부</label>
            <select
              name="ad_use"
              value={formData.ad_use}
              onChange={handleChange}
            >
              <option value={0}>비활성</option>
              <option value={1}>활성</option>
            </select>
          </div>
          <div>
            <label>광고 시작 날짜</label>
            <input
              type="date"
              name="ad_start_date"
              value={formData.ad_start_date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>광고 시작 날짜</label>
            <input
              type="date"
              name="ad_end_date"
              value={formData.ad_end_date}
              onChange={handleChange}
            />
          </div>
          <button type="submit">저장</button>
        </form>
      </main>
    </div>
  );
};

export default AddAds;
