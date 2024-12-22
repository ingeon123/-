import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const Rolemanage = () => {
  const ITEMS_PER_PAGE = 10; // 한 페이지에 표시할 행 수
  const [users, setUsers] = useState([]); // 사용자 데이터
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // CSS 파일 동적 로드
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "/Rolemanage.css";
    document.head.appendChild(link1);

    // 컴포넌트 언마운트 시 CSS 제거
    return () => {
      document.head.removeChild(link1);
    };
  }, []);

  useEffect(() => {
    // 사용자 데이터 로드
    fetch("/api/get-users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("사용자 데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      });
  }, []);

  // 현재 페이지의 데이터 계산
  const currentPageData = users.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // 페이지 개수 계산
  const pageCount = Math.ceil(users.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleRoleChange = (userId, newRole) => {
    // 상태 업데이트
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );

    // 서버에 변경 사항 저장
    fetch("/api/update-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, role: newRole }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(`${userId}의 권한이 ${newRole}로 변경되었습니다.`);
        } else {
          console.error("권한 변경 실패:", data.message || "오류 발생");
        }
      })
      .catch((error) => {
        console.error("저장 중 오류 발생:", error);
      });
  };

  const renderTableRows = () => {
    // 부족한 행을 빈 데이터로 채움
    const paddedData = [
      ...currentPageData,
      ...Array(Math.max(ITEMS_PER_PAGE - currentPageData.length, 0)).fill({
        id: "",
        email: "",
        role: "",
      }),
    ];

    return paddedData.map((user, index) => (
      <tr key={index}>
        <td>
          <a href="#">{user.id || "-"}</a>
        </td>
        <td>{user.email || "-"}</td>
        <td>
          <select
            value={user.role || "비회원"}
            onChange={(e) => handleRoleChange(user.id, e.target.value)}
          >
            <option value="비회원">비회원</option>
            <option value="회원">회원</option>
            <option value="구독자">구독자</option>
            <option value="매니저">매니저</option>
          </select>
        </td>
      </tr>
    ));
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="container">
      <Sidebar/>
      <main id="main-content">
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>이메일</th>
              <th>권한</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <div className="pagination">
          <button className="prev" onClick={() => handlePageChange(Math.max(0, currentPage - 1))}>
            ◀
          </button>
          <div className="page-numbers">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                className={`page ${index === currentPage ? "active" : ""}`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="next"
            onClick={() => handlePageChange(Math.min(pageCount - 1, currentPage + 1))}
          >
            ▶
          </button>
        </div>
      </main>
    </div>
  );
};

export default Rolemanage;
