import { Link } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


function Header_compo(){
  const userLogState = sessionStorage.getItem("user_log_state")
  const user_id = sessionStorage.getItem("user_id")
  const user_name = sessionStorage.getItem("user_name")
  const [isCounted, setIsCounted] = useState(false);
  const [conutUser, setConutUser] = useState("");
  useEffect(() => {
    console.log("useEffect진입")
    const fetchData = async () => {
      const today = new Date().toISOString().split("T")[0];
      const lastVisited = localStorage.getItem("lastVisited");
      try {
        const response = await fetch("http://localhost:5000/api/visit_user", {method: "GET"});
        console.log("Response Status:", response.status)
        console.log("요청 완료")
        const data = await response.json();
        setConutUser(data.data[0].visit_count)
        if (lastVisited !== today || !lastVisited) {
          await fetch("http://localhost:5000/api/visit_counter", { method: "POST" });
          localStorage.setItem("lastVisited", today);
          setIsCounted(true);
        } else {
          setIsCounted(true);
        }
      } catch (err) {
        console.error("Error occurred:", err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user_log_state")
    sessionStorage.removeItem("user_id")
    sessionStorage.removeItem("user_name")
    window.location.reload()
  };

  return(
    <header>
        <div className="top-bar">
          <div className="left-section">
            <div className="logo">
              <Link to='/'>
                <img src={`${process.env.PUBLIC_URL}/logo.png`} /></Link>
            </div>
            <div className="search-section">
              <div className="popular-posts">
                <p>▼(주)공고공고공고.</p>
              </div>
              <div className="search-bar">
                <input type="text" placeholder="🔍" />
              </div>
            </div>
          </div>
          <div className="user-actions">
            <span id="user-count" class="user-count">
              누적 접속자 수: {conutUser}명
            </span>
            {userLogState?(
              <div class="user-actions-buttons">
                <Link to='myUser'><img src={`${process.env.PUBLIC_URL}/Group 8.png`} alt='마이 페이지'/></Link>
                <p>{user_name}</p>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
              ):(
              <div class="user-actions-buttons">
                <button>🔔</button>
                <button>✉️</button>
                <button><Link to="../login">로그인하세요</Link></button>
              </div>
              )}
              
            
          </div>
        </div>
        <div class="littletitle">고객 맞춤형 공공정보 플랫폼
          <div class="search-record">최근 검색 기록｜</div>
        </div>
      </header>
  )
}
export default Header_compo;