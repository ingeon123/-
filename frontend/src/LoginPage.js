import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [userId, setUserId] = useState(localStorage.getItem("userID"));
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [idCheckBox, setIdCheckBox] = useState(localStorage.getItem("idCheckBox"))
  const navigator = useNavigate();

  useEffect(() => {
    const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './login_style.css';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
  },[])

  // 로그인 폼 제출
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {               
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId,password})
      });
      const data = await response.json();
      if(response.ok){
        setMessage(data.message)
        alert(data.message)
        if(idCheckBox){
          localStorage.setItem("userID",userId)
          localStorage.setItem("idCheckBox", true)
        }
        else{
          localStorage.removeItem("userID")
          localStorage.removeItem("idCheckBox")
        }
        sessionStorage.setItem("user_id", data.userId)
        sessionStorage.setItem("user_log_state",true)
        sessionStorage.setItem("user_name", data.userName)
        console.log(data)
        
        navigator("/")
      }
      else{
        setMessage(data.message)
        setUserId("")
        setPassword("")
        alert(data.message)
      }
    }
    catch(error){
      setMessage("로그인 백엔드 요청 오류")
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div>
        <header>
            <div className="top-bar">
                <div className="search-section">
                    <p>▼ (주) 트랙넷 | 현대기아/삼성 1차 협력사 구매 경력사원 모집</p>
                    <div className="search-bar">
                        <input type="text" placeholder="🔍"/>
                    </div>
                </div>
                <div className="user-actions">
                    <button>🔔</button>
                    <button>✉️</button>
                    <button>로그인하세요</button>
                </div>
            </div>
        </header>
        <main>
            <div className="login-container">
                <Link to="../">
                    <img src="./logo.png" alt="Venchs Logo" class="logo"/></Link>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="아이디" required
                    value={userId} onChange={(e) => setUserId(e.target.value)}/>
                    <input type="password" placeholder="비밀번호" required
                    value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <div className="options">
                        <label for="save-id"><input type="checkbox" id="save-id" checked={idCheckBox} onChange={(e)=> {setIdCheckBox(e.target.checked);}}/>아이디 저장</label>
                    </div>

                    <button type="submit" disabled={loading}>로그인</button>

                    <div className="login-options">
                        <Link to="../finduser">아이디/비밀번호 찾기</Link> | 
                        <Link to="../signup">회원가입</Link>
                    </div>

                    <div className="sns-login">
                        <p>SNS 간편 로그인</p>
                        <div className="sns-icons">
                            <img src="/naver_icon.png" alt="Naver"/>
                            <img src="/kakao_icon.png" alt="Kakao"/>
                            <img src="/google_icon.png" alt="Google"/>
                            <img src="/apple_icon.png" alt="Apple"/>
                        </div>
                    </div>
                </form>
            </div>
        </main>
        <footer>
            <p>&copy; 2024 Venchs. All rights reserved.</p>
        </footer>
    </div>
  );
}

export default LoginPage;