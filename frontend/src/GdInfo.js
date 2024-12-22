import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';

function GdInfo() {
  const [submenuVisible, setSubmenuVisible] = useState(true);
  const [gdinfoData, setGdinfoData] = useState([])

  useEffect(() => {
    const fetchJsonFile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gdinfo');
        const data = await response.json();
        setGdinfoData(data)
      } catch (error) {
        console.error('Error fetching JSON file:', error);
      }
    };
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './Gdinfo.css';
    document.head.appendChild(link);
    fetchJsonFile()
    return () => {
      document.head.removeChild(link);
    };
  }, [])
  const toggleSubmenu = (event) => {
    event.preventDefault();
    setSubmenuVisible(!submenuVisible);
  };
  return (
    <div>
      <Header_compo />
      <main>
        <div className="sidebar">
          <h2>☰</h2>
          <ul>
            <li><Link to="../annlist">사업 공고</Link></li>
            <li><Link to="../newsfd">동향 뉴스</Link></li>
            <li><Link to="../commboard">커뮤니티</Link></li>
            <li><Link to="../favlist">찜 목록</Link></li>
            <li><Link href="../gdinfo" className="toggle-submenu" onClick={toggleSubmenu}>이용 안내</Link>
            {submenuVisible && (
              <ul className="submenu">
                <li><Link to="../privacypolicy">개인정보처리방침</Link></li>
                <li><Link to="../emailpolicy">이메일주소무단수집거부</Link></li>
                <li><Link to="../terms">이용약관</Link></li>
              </ul>
            )}
            </li>
          </ul>
        </div>
        <section className="content">
          {gdinfoData.message}
        </section>
      </main>
      <Footer_compo />
    </div>
  )
}
export default GdInfo;