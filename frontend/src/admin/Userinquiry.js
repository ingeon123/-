import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Userinquiry = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/Userinquiry.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
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
          <div
            className="web-site"
            onClick={() => navigateTo("/website")}
            style={{ cursor: "pointer" }}
          >
            웹사이트 바로가기
            <img src="/icon/Vector 23.png" alt="아이콘" className="link-icon" />
          </div>
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
              {/* <li>
                <div
                  className={`menu-item ${activeMenu === "대시보드" ? "active" : ""}`}
                  onClick={() => {
                    handleMenuClick("대시보드");
                    navigateTo("/dashboard");
                  }}
                >
                  <img src="/icon/Group 23.png" alt="대시보드 아이콘" /> 대시보드
                </div>
              </li> */}
              <li>
                <div
                  className={`menu-item ${activeMenu === "사용자관리" ? "active" : ""}`}
                  onClick={() => {
                    handleMenuClick("사용자관리");
                    navigateTo("/admin/usermanage");
                  }}
                >
                  <img src="/icon/Group 24.png" alt="사용자 관리 아이콘" className="menu-icon" /> 사용자 관리
                </div>
              </li>
              {/* <li>
                <div
                  className={`menu-item ${activeMenu === "보안설정" ? "active" : ""}`}
                  onClick={() => {
                    handleMenuClick("보안설정");
                    navigateTo("/admin/securitysettings");
                  }}
                >
                  <img src="/icon/Group 25.png" alt="보안 설정 아이콘" className="menu-icon" /> 보안 설정
                </div>
              </li> */}
              <li>
                <div
                  className={`menu-item ${activeMenu === "회원문의" ? "active" : ""}`}
                  onClick={() => handleMenuClick("회원문의")}
                >
                  <img src="/icon/Group 26.png" alt="회원 문의 아이콘" className="menu-icon" /> 회원 문의
                </div>
                {activeMenu === "회원문의" && (
                  <ul className="submenu">
                    <li
                      className={`submenu-item ${activeSubmenu === "문의 관리" ? "active" : ""}`}
                      onClick={() => {
                        handleSubmenuClick("문의 관리");
                        navigateTo("/admin/complainmanage");
                      }}
                    >
                      문의 관리
                    </li>
                    <li
                      className={`submenu-item ${activeSubmenu === "응답 템플릿 관리" ? "active" : ""}`}
                      onClick={() => {
                        handleSubmenuClick("응답 템플릿 관리");
                        navigateTo("/admin/complainresponse");
                      }}
                    >
                      응답 템플릿 관리
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <div
                  className={`menu-item special ${activeMenu === "광고캠페인" ? "active" : ""}`}
                  onClick={() => {
                    handleMenuClick("광고캠페인");
                    navigateTo("/admin/adsandcampaigns");
                  }}
                >
                  <img src="/icon/Group 27.png" alt="광고 아이콘" className="menu-icon" /> 광고 & 캠페인
                </div>
              </li>
              <li>
                <div
                  className={`menu-item ${activeMenu === "환경설정" ? "active" : ""}`}
                  onClick={() => {
                    handleMenuClick("환경설정");
                    navigateTo("/admin/settings");
                  }}
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
      <main id="main-content"></main>
    </div>
  );
};

export default Userinquiry;
