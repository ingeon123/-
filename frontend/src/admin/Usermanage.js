import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Usermanage = () => {
    const [activeMenu, setActiveMenu] = useState("사용자 관리");
    const iframesRef = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.href = "/Usermanage.css";
        document.head.appendChild(link1);

        return () => {
            document.head.removeChild(link1);
        };
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const adjustIframeContent = (iframe) => {
        if (iframe && iframe.contentDocument) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

            const header = iframeDoc.querySelector("header");
            const sidebar = iframeDoc.querySelector(".sidebar");
            const mainContent = iframeDoc.querySelector("main");

            if (header) header.style.display = "none";
            if (sidebar) sidebar.style.display = "none";

            if (mainContent) {
                mainContent.style.margin = "0";
                mainContent.style.padding = "5px";
                iframe.style.height = `${mainContent.scrollHeight}px`;
            }

            iframeDoc.body.style.zoom = "0.55";
            iframeDoc.body.style["-moz-transform"] = "scale(0.55)";
            iframeDoc.body.style["-moz-transform-origin"] = "center top";
        }
    };

    useEffect(() => {
        iframesRef.current.forEach((iframe) => {
            if (iframe) {
                iframe.onload = () => adjustIframeContent(iframe);
            }
        });
    }, []);

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
                            {/* <li>
                                <div
                                    className={`menu-item ${activeMenu === "대시보드" ? "active" : ""}`}
                                    onClick={() => handleNavigation("/admin/dashboard")}
                                >
                                    <img src="/icon/Group 23.png" alt="대시보드 아이콘" /> 대시보드
                                </div>
                            </li> */}
                            <li>
                                <div
                                    className={`menu-item ${activeMenu === "사용자 관리" ? "active" : ""}`}
                                    onClick={() => handleMenuClick("사용자 관리")}
                                >
                                    <img src="/icon/Group 24.png" alt="사용자 관리 아이콘" className="menu-icon" />
                                    사용자 관리
                                </div>
                                {activeMenu === "사용자 관리" && (
                                    <ul className="submenu">
                                        <li
                                            className="submenu-item"
                                            onClick={() => handleNavigation("/admin/userlist")}
                                        >
                                            사용자 목록 및 검색
                                        </li>
                                        <li
                                            className="submenu-item"
                                            onClick={() => handleNavigation("/admin/rolemanage")}
                                        >
                                            권한 관리
                                        </li>
                                    </ul>
                                )}
                            </li>
                            {/* <li>
                                <div
                                    className="menu-item"
                                    onClick={() => handleNavigation("/admin/securitysettings")}
                                >
                                    <img src="/icon/Group 25.png" alt="보안 설정 아이콘" className="menu-icon" /> 보안 설정
                                </div>
                            </li> */}
                            <li>
                                <div
                                    className="menu-item"
                                    onClick={() => handleNavigation("/admin/userinquiry")}
                                >
                                    <img src="/icon/Group 26.png" alt="회원 문의 아이콘" className="menu-icon" /> 회원 문의
                                </div>
                            </li>
                            <li>
                                <div
                                    className="menu-item special"
                                    onClick={() => handleNavigation("/admin/adsandcampaigns")}
                                >
                                    <img src="/icon/Group 27.png" alt="광고 아이콘" className="menu-icon" /> 광고 & 캠페인
                                </div>
                            </li>
                            <li>
                                <div
                                    className="menu-item"
                                    onClick={() => handleNavigation("/admin/settings")}
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
                                onClick={() => handleNavigation("/support")}
                            >
                                <img src="/icon/Group 60.png" alt="고객 지원 아이콘" className="menu-icon" /> 고객 지원
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
            <main>
                <div className="preview-container">
                    <div className="preview-title">[사용자 목록 및 검색]</div>
                    <div className="preview-box">
                        <iframe
                            src="/userlist"
                            className="preview-frame"
                            ref={(el) => (iframesRef.current[0] = el)}
                        ></iframe>
                    </div>
                    <div className="preview-title">[권한 관리]</div>
                    <div className="preview-box">
                        <iframe
                            src="/rolemanage"
                            className="preview-frame"
                            ref={(el) => (iframesRef.current[1] = el)}
                        ></iframe>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Usermanage;
