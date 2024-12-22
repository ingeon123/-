import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { user, mode } = state || {};

  // 상태 초기화 (수정일 경우 데이터를 미리 입력)
  const [formData, setFormData] = useState({
    userId: user ? user.user_id : "", // userId로 변경
    oldUserId: user ? user.user_id : "",
    password: "",
    name: user ? user.name : "",
    email: user ? user.email : "",
    rank: user ? user.rank : "회원", // 기본값을 '회원'으로 설정
  });
  
  // 중복 확인 결과 상태
  const [isIdAvailable, setIsIdAvailable] = useState(true);

  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        userId: user.user_id, // userId로 변경
        oldUserId: user.user_id,
        password: "", // 비밀번호는 수정하지 않음
        name: user.name,
        email: user.email,
        rank: user.rank,
      });
    }
  }, [mode, user]);

  // 폼 데이터 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ID 중복 확인 처리 (POST 방식)
  const handleCheckId = async () => {
    const { userId } = formData; // userId로 변경

    if (!userId) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/check-userid", {
        method: "POST", // POST 방식으로 요청
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // userId로 변경하여 body에 전달
      });

      const data = await response.json();
      console.log(data)

      if (data.isAvailable) {
        setIsIdAvailable(true);
        alert("사용 가능한 아이디입니다.");
      } else {
        setIsIdAvailable(false);
        alert("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error("중복 확인 오류:", error);
      alert("중복 확인에 실패했습니다.");
    }
  };

  // 유저 추가 또는 수정 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, oldUserId, password, name, email, rank } = formData; // userId로 변경
    const method = mode === "edit" ? "PUT" : "POST";
    const url = mode === "edit" ? `http://localhost:5000/api/admin/editUser` : `http://localhost:5000/api/admin/addUser`;

    if (!isIdAvailable) {
      alert("아이디 중복 확인을 먼저 해주세요.");
      return;
    }

    const body = JSON.stringify({ userId, oldUserId, password, name, email, rank }); // userId로 변경

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (response.ok) {
        alert(mode === "edit" ? "수정되었습니다." : "추가되었습니다.");
        navigate("/admin/userselect"); // 유저 목록 페이지로 리다이렉트
      } else {
        alert("요청 실패");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{mode === "edit" ? "유저 수정" : "유저 추가"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              name="userId" // userId로 변경
              value={formData.userId} // userId로 변경
              onChange={handleChange}
              style={styles.input}
            />
            <button
              type="button"
              onClick={handleCheckId}
              style={styles.checkButton}
            >
              중복 확인
            </button>
          </div>
          {!isIdAvailable && (
            <span style={{ color: "red", fontSize: "12px" }}>아이디가 중복되었습니다.</span>
          )}
        </div>
        {mode === "add" && (
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        )}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div>
          <label>Rank:</label>
          <select
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="회원">회원</option>
            <option value="구독자">구독자</option>
            <option value="관리자">관리자</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          {mode === "edit" ? "수정" : "추가"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  input: {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  select: {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  checkButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ccc",
    cursor: "pointer",
  }
};

export default UserAdd;
