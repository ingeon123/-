import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateCalendar } from './script';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';

function MainPage({ data, loading }) {
  const [imageData, setImageData] = useState('')
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/image`);
        const data = await response.json();
        setImageData(`data:image/jpeg;base64,${data.image}`);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchImage();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './mainPage.css';
    document.head.appendChild(link);

    if (!loading) {
      generateCalendar(data);
    }

    return () => {
      document.head.removeChild(link);
    };
  }, [data, loading, generateCalendar]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <Header_compo/>
      <main >
        <div className="sidebar">
          <h2>☰</h2>
          <ul>
            <li><Link to="annlist">사업 공고</Link></li>
            <li><Link to="newsfd">동향 뉴스</Link></li>
            <li><Link to="commboard">커뮤니티</Link></li>
            <li><Link to="favlist">찜 목록</Link></li>
            <li><Link to="gdinfo">이용 안내</Link></li>
          </ul>
          <aside className="advertisement">
            <div className="ad-placeholder"><img src={imageData} alt="Loaded from server" /></div>
          </aside>
        </div>
        <section className="content">
          <div className="calendar">
            <div className="month" id='month'>7월</div>
            <div className="days-of-week">
              <div>일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
            </div>
            <div className="days" id='days'>
              {/* 날짜를 JavaScript로 동적으로 생성 */}
            </div>
          </div>
        </section>
        <div className='popular-post'>
          <h3>이달의 인기 공고</h3>
          <div className='popular-post-list'>
            <ul>
              <li>공고1</li>
              <li>공고2</li>
              <li>공고3</li>
              <li>공고4</li>
              <li>공고5</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer_compo/>
    </div>
  );
}

export default MainPage;