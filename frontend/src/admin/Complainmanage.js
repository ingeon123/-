import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const Complainmanage = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "/Complainmanage.css";
    document.head.appendChild(link1);

    return () => {
      document.head.removeChild(link1);
    };
  }, []);

  useEffect(() => {
    // 문의 데이터 조회
    const fetchInquiries = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/inquiries", { method: "GET" });
        if (!response.ok) throw new Error("문의 목록 조회 실패");
        const data = await response.json();
        setInquiries(data.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };
    fetchInquiries();
  }, []);

  const toggleStatus = (index) => {
    setInquiries((prevInquiries) =>
      prevInquiries.map((inquiry, idx) =>
        idx === index
          ? {
              ...inquiry,
              status: inquiry.status === "미처리" ? "처리 완료" : "미처리",
            }
          : inquiry
      )
    );
  };

  const answerInquiry = (index) => {
    console.log(index)
    const selectedInquiry = inquiries[index];
    console.log(selectedInquiry)
    const queryParams = new URLSearchParams({
      id: selectedInquiry.qa_,
      content: selectedInquiry.qa_content,
      title: selectedInquiry.qa_subject,
    });

    // 답변 페이지로 이동
    window.location.href = `/admin/complainresponse?${queryParams.toString()}`;
  };

  return (
    <div className="container">
      <Sidebar/>
      <main id="main-content">
        <div className="controls">
          <div className="search-bar">
            <input type="text" placeholder="아이디, 문의 내용, 날짜 등을 입력하세요" />
            <button>
              <img src="/icon/Group 1.png" alt="검색" />
            </button>
          </div>
        </div>
        <div className="container">
          <table className="inquiry-table">
            <thead>
              <tr>
                <th>문의 제목</th>
                <th>문의 내용</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>처리 상태</th>
                <th>답변</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, index) => (
                <tr key={index}>
                  <td>{inquiry.qa_subject}</td>
                  <td>{inquiry.qa_content}</td>
                  <td>{inquiry.user}</td>
                  <td>{inquiry.date}</td>
                  {/* <td>{inquiry.qa_id}</td> */}
                  <td>
                    <button
                      className={`status-button ${
                        inquiry.qa_answer ? "processed" : ""
                      }`}
                    >
                      {inquiry.qa_answer?"처리 완료":"미처리"}
                    </button>
                  </td>
                  <td>
                    <button className="answer-button" onClick={() => answerInquiry(index)}>
                      답변하기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Complainmanage;
