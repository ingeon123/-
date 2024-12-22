import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activeMenu, setActiveMenu] = useState("사용자 목록 및 검색");
  
  const navigate = useNavigate()

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "/UserList.css";
    document.head.appendChild(link1);

    return () => {
      document.head.removeChild(link1);
    };
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/userSelect`);
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
    console.log(users)

  }, []);

  const delUser = async(num,user_id) => {
    console.log(user_id)
    try {
      const response = await fetch('http://localhost:5000/api/admin/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id}),
      });

      if (response.ok) {
        alert("회원 삭제 완료")
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    // 페이지 데이터 로드 로직 추가 가능
  };

  const MIN_ROWS = 8;
  const tableData = [...users];

  // 부족한 행을 빈 데이터로 채움
  while (tableData.length < MIN_ROWS) {
    tableData.push({});
  }

  const editUser = (index,user) => {
    console.log("test")
    navigate('/admin/userAdd', {
      state: { user, mode: 'edit' } // user 데이터와 상태(mode) 전달
    });
  }
  const addUser = () => {
    console.log("테스트")
    navigate('/admin/userAdd',{
      state:{mode:'add'}
    })
  }
  

  return (
    <div className="container">
      <Sidebar/>
      <main id="main-content">
        <div className="controls">
          <div className="search-bar">
            <input type="text" placeholder="검색어를 입력하세요" />
            <button>
              <img src="/icon/Group 1.png" alt="검색" />
            </button>
          </div>
          <div className="date-filter">
            <input type="date" id="startDate" />
            <span>~</span>
            <input type="date" id="endDate" />
          </div>
          <button id="loadData">조회</button>
          <button id="addUser" onClick={() => addUser()}>추가</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>등급</th>
              <th>이메일 주소</th>
              <th>활성 상태</th>
              <th>마지막 비밀번호 변경일</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((user, index) => (
              <tr key={index}>
                <td>{user.user_id || ""}</td>
                <td>{user.name || ""}</td>
                <td>{user.rank || ""}</td>
                <td>{user.email || ""}</td>
                <td className="active-status">
                  {user.active !== undefined && (
                    <div className={user.active ? "green" : "red"}></div>
                  )}
                </td>
                <td>{user.passwordChange || ""}</td>
                <td>{user.user_id && (
                <button className="userList-button" onClick={() => editUser(index,user)}>
                    수정
                  </button>
                )}</td>
                <td>{user.user_id && (
                <button className="userList-button" onClick={() => delUser(index,user.user_id)}>
                    삭제
                  </button>
                )}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button className="prev">◀</button>
          <div className="page-numbers">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`page ${activePage === page ? "active" : ""}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="next">▶</button>
        </div>
      </main>
    </div>
  );
};

export default UserList;
