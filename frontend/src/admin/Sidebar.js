import React from 'react';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="site-icon"></div>
        <Link className="web-site" to="/">
          웹사이트 바로가기
          <img src="/icon/Vector 23.png" alt="아이콘" className="link-icon" />
        </Link>
        <div className="mode-container">
          <label>모드 변경</label>
          <div className="mode-buttons">
            <button>일반</button>
            <button>디자인</button>
            <button>실시간 모니터링</button>
          </div>
        </div>
        <Link className="sa" to="#">사이트 관리</Link>
      </div>
      <div className="sidebar-menu">
        <nav>
          <ul>
            {/* <li>
              <Link to="/대시보드(메인).html" className="menu-item">
                <img src="/icon/Group 23.png" alt="대시보드 아이콘" /> 대시보드
              </Link>
              <ul className="submenu">
                <li>
                  <Link to="/사이트트래픽.html" className="submenu-item">
                    사이트 트래픽
                  </Link>
                </li>
              </ul>
            </li> */}
            <li>
              <Link to="/admin/usermanage" className="menu-item">
                <img src="/icon/Group 24.png" alt="사용자 관리 아이콘" className="menu-icon" /> 사용자 관리
              </Link>
            </li>
            {/* <li>
              <Link to="#" className="menu-item">
                <img src="/icon/Group 25.png" alt="보안 설정 아이콘" className="menu-icon" /> 보안 설정
              </Link>
            </li> */}
            <li>
                <Link to="/admin/userinquiry" className="menu-item">
                  <img src="/icon/Group 26.png" alt="회원 문의 아이콘" className="menu-icon" /> 회원 문의
                </Link>
            </li>
            <li>
              <Link to="/admin/adsandcampaigns" className="menu-item special">
                <img src="/icon/Group 27.png" alt="광고 아이콘" className="menu-icon" /> 광고 & 캠페인
              </Link>
            </li>
            <li>
              <Link to="/admin/setting" className="menu-item">
                <img src="/icon/Group 22.png" alt="환경 설정 아이콘" className="menu-icon" /> 환경 설정
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="resources">
        <Link to="#">리소스</Link>
        <ul>
          <li>
            <Link to="#" className="menu-item">
              <img src="/icon/Group 60.png" alt="고객 지원 아이콘" className="menu-icon" /> 고객 지원
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
