import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Securitysettings = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState("");

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "./기본.css";
    document.head.appendChild(link1);

    return () => {
      document.head.removeChild(link1);
    };
  }, []);

  const handleMenuClick = (menu) => {
    setActiveMenu((prev) => (prev === menu ? "" : menu));
    setActiveSubmenu(""); // 서브메뉴 비활성화
  };

  const handleSubmenuClick = (submenu) => {
    setActiveSubmenu(submenu);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="site-icon"></div>
          <a className="web-site" href="">
            웹사이트 바로가기
            <img src="/icon/Vector 23.png" alt="아이콘" className="link-icon" />
          </a>
          <div className="mode-container">
            <label>모드 변경</label>
            <div className="mode-buttons">
              <button>일반</button>
              <button>디자인</button>
              <button>실시간 모니터링</button>
            </div>
          </div>
          <a className="sa">사이트 관리</a>
        </div>

        <div className="sidebar-menu">
          <nav>
            <ul>
              <li>
                <div
                  className={`menu-item ${activeMenu === "대시보드" ? "active" : ""}`}
                  onClick={() => handleMenuClick("대시보드")}
                >
                  <img src="/icon/Group 23.png" alt="대시보드 아이콘" /> 대시보드
                </div>
                {activeMenu === "대시보드" && (
                  <ul className="submenu">
                    <li
                      className={`submenu-item ${activeSubmenu === "사이트 트래픽" ? "active" : ""}`}
                      onClick={() => {
                        handleSubmenuClick("사이트 트래픽");
                        navigateTo("/sitetraffic");
                      }}
                    >
                      사이트 트래픽
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <div
                  className={`menu-item ${activeMenu === "사용자관리" ? "active" : ""}`}
                  onClick={() => navigateTo("/usermanagement")}
                >
                  <img src="/icon/Group 24.png" alt="사용자 관리 아이콘" className="menu-icon" /> 사용자 관리
                </div>
              </li>
              <li>
                <div
                  className={`menu-item ${activeMenu === "보안설정" ? "active" : ""}`}
                  onClick={() => handleMenuClick("보안설정")}
                >
                  <img src="/icon/Group 25.png" alt="보안 설정 아이콘" className="menu-icon" /> 보안 설정
                </div>
                {activeMenu === "보안설정" && (
                  <ul className="submenu">
                    <li
                      className={`submenu-item ${activeSubmenu === "비밀번호 정책" ? "active" : ""}`}
                      onClick={() => handleSubmenuClick("비밀번호 정책")}
                    >
                      비밀번호 정책
                    </li>
                    <li
                      className={`submenu-item ${activeSubmenu === "보안 로그 및 경고" ? "active" : ""}`}
                      onClick={() => handleSubmenuClick("보안 로그 및 경고")}
                    >
                      보안 로그 및 경고
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <div
                  className={`menu-item ${activeMenu === "회원문의" ? "active" : ""}`}
                  onClick={() => navigateTo("/userinquiry")}
                >
                  <img src="/icon/Group 26.png" alt="회원 문의 아이콘" className="menu-icon" /> 회원 문의
                </div>
              </li>
              <li>
                <div
                  className={`menu-item special ${activeMenu === "광고캠페인" ? "active" : ""}`}
                  onClick={() => navigateTo("/adsandcampaigns")}
                >
                  <img src="/icon/Group 27.png" alt="광고 아이콘" className="menu-icon" /> 광고 & 캠페인
                </div>
              </li>
              <li>
                <div
                  className={`menu-item ${activeMenu === "환경설정" ? "active" : ""}`}
                  onClick={() => navigateTo("/settings")}
                >
                  <img src="/icon/Group 22.png" alt="환경 설정 아이콘" className="menu-icon" /> 환경 설정
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <div className="resources">
          <a>리소스</a>
          <ul>
            <li>
              <div
                className="menu-item"
                onClick={() => navigateTo("/support")}
              >
                <img src="/icon/Group 60.png" alt="고객 지원 아이콘" className="menu-icon" /> 고객 지원
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Securitysettings;
