import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';
import CommScript from './CommScript';

function PrivacyPolicy() {
  const [submenuVisible, setSubmenuVisible] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './AnnListView.css';
    // CommScript()
    document.head.appendChild(link);

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
          <p>개인정보처리방침</p>
        </section>
      </main>
      <Footer_compo />
    </div>
  )
}
export default PrivacyPolicy;