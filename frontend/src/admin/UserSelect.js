import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserSelect = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // react-router-dom을 사용하여 페이지 이동

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
  }, []);

  // 수정 버튼 클릭 시
  const handleEdit = (user) => {
    navigate('/admin/userAdd', {
      state: { user, mode: 'edit' } // user 데이터와 상태(mode) 전달
    });
  };

  // 유저 추가 버튼 클릭 시
  const handleAddUser = () => {
    navigate('/admin/userAdd', { state: { mode: 'add' } }); // add 상태 전달
  };

  // 유저 삭제 함수
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }) // 삭제할 유저 ID 전송
      });
      
      if (response.ok) {
        // 삭제 성공 시, 유저 목록에서 해당 유저를 삭제
        setUsers((prevUsers) => prevUsers.filter(user => user.user_id !== userId));
        alert("유저가 삭제되었습니다.");
      } else {
        alert("삭제 실패했습니다.");
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>유저 정보</h1>
      <button
        onClick={handleAddUser}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        유저 추가
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={styles.th}>User ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Rank</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={styles.td}>{user.user_id}</td>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.rank}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleEdit(user)}
                  style={styles.button}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(user.user_id)}  
                  style={styles.button}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: {
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #000",
  },
  td: {
    padding: "10px",
    textAlign: "left",
  },
  button: {
    padding: "5px 10px",
    marginRight: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default UserSelect;
