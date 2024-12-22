import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";


const Complainresponse = () => {
  const [title, setTitle] = useState("제목 없음")
  const [content, setContent] = useState("내용 없음");
  const [user, setUser] = useState("알 수 없음");
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState("default");
  const [responseContent, setResponseContent] = useState("");
  const [customResponse, setCustomResponse] = useState("");
  const navigate = useNavigate();

  const responses = {
    "login-issue": "로그인 문제에 대한 응답",
    "ad-registration": "광고 등록 문제에 대한 응답",
    "ad-expiry": "광고 마감 문제에 대한 응답",
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTitle(params.get("title") || "제목 없음")
    setContent(params.get("content") || "내용 없음");
    setUser(params.get("id") || "알 수 없음");
    setImage(params.get("image") || null);


    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/Complainresponse.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);

    if (responses[selected]) {
      setResponseContent(responses[selected]);
    } else if (selected === "custom-input") {
      setResponseContent("");
    } else {
      setResponseContent(""); // 기본값
    }
  };

  const handleCustomInputChange = (event) => {
    const value = event.target.value;
    setResponseContent(value);
    setCustomResponse(value);
  };

  const saveResponse = async () => {
  
    
    try {
      const response = await fetch("http://localhost:5000/api/admin/save-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inquiryTitle: title,
          inquiryContent: content,
          inquiryUser: user,
          responseContent: customResponse || responseContent,
        }),
      });

      if (!response.ok) {
        throw new Error("답변 등록 실패");
      }

      const data = await response.json();
      alert("답변이 성공적으로 등록되었습니다.");
      navigate("/admin/Complainmanage")
    } catch (error) {
      console.error("Error saving response:", error);
      alert("답변 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <Sidebar/>
      <main className="main-content">
        <div className="question-section">
          <h1 id="inquiry-title">[문의] {title}</h1>
          {/* <p id="inquiry-description">작성자: {user} |  */}
            {/* 작성일: {date} */}
            {/* </p> */}
        </div>
        <div className="question-container">
          
            <div className="question-image">
              {/* <img id="inquiry-image" className="placeholder" alt="문의 사진" style={{ width: "100%", maxWidth: "300px" }} /> */}
              <p>{content}</p>
            </div>
          
          <div className="response-options">
            {/* <label htmlFor="auto-response">응답 선택:</label> */}
            <select id="auto-response" value={selectedOption} onChange={handleOptionChange}>
              <option value="default">자동 응답 목록</option>
              <option value="login-issue">로그인 문제 해결</option>
              <option value="ad-registration">광고 등록 관련 문의</option>
              <option value="ad-expiry">광고 마감 및 업데이트 문의</option>
              <option value="custom-input">직접입력</option>
            </select>
          </div>
        </div>
        <div className="answer-editor">
          <div className="editor-toolbar">
            <select>
              <option value="normal">글꼴군</option>
              <option value="arial">Arial</option>
              <option value="times">Times New Roman</option>
            </select>
            <select>
              <option value="small">작게</option>
              <option value="medium" selected>
                보통
              </option>
              <option value="large">크게</option>
            </select>
          </div>
          <textarea className="answer-textarea"
            value={responseContent}
            onChange={selectedOption === "custom-input" ? handleCustomInputChange : undefined}
            disabled={selectedOption !== "custom-input"}
            placeholder={
              selectedOption === "custom-input"
                ? "직접 입력 내용을 작성하세요..."
                : "자동응답 내용이 표시됩니다."
            }
            style={{ width: "100%", height: "150px" }}
          />
          <div className="response-save">
          <button className="fixed-submit-button" onClick={saveResponse} style={{ marginTop: "10px" }}>
            답변 등록
          </button>
        </div>
        </div>
      </main>
    </div>
  );
};

export default Complainresponse;
