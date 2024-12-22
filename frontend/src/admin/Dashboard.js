import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "./대시보드.css";
    document.head.appendChild(link1);

    return () => {
      document.head.removeChild(link1);
    };
  }, []);

  useEffect(() => {
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "./대시보드미리보기.css";
    document.head.appendChild(link2);

    return () => {
      document.head.removeChild(link2);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "방문자 수",
              data: [1000, 5000, 15000, 20000, 35000, 50000, 60000, 55000, 45000, 40000, 30000, 35000],
              borderColor: "red",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              type: "logarithmic",
              beginAtZero: true,
              title: {
                display: true,
                text: "방문자 수",
              },
            },
            x: {
              title: {
                display: true,
                text: "월별",
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
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
              <li>
                <a onClick={() => handleNavigation("/dashboard")} className="menu-item" data-show-submenu="true">
                  <img src="/icon/Group 23.png" alt="대시보드 아이콘" /> 대시보드
                </a>
                <ul className="submenu">
                  <li>
                    <a onClick={() => handleNavigation("/sitetraffic")} className="submenu-item">
                      사이트 트래픽
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a onClick={() => handleNavigation("/usermanage")} className="menu-item">
                  <img src="/icon/Group 24.png" alt="사용자 관리 아이콘" className="menu-icon" /> 사용자 관리
                </a>
              </li>
              <li>
                <a onClick={() => handleNavigation("/securitysettings")} className="menu-item">
                  <img src="/icon/Group 25.png" alt="보안 설정 아이콘" className="menu-icon" /> 보안 설정
                </a>
              </li>
              <li>
                <a onClick={() => handleNavigation("/userinquiry")} className="menu-item">
                  <img src="/icon/Group 26.png" alt="회원 문의 아이콘" className="menu-icon" /> 회원 문의
                </a>
              </li>
              <li>
                <a onClick={() => handleNavigation("/adsandcampaigns")} className="menu-item special">
                  <img src="/icon/Group 27.png" alt="광고 아이콘" className="menu-icon" /> 광고 & 캠페인
                </a>
              </li>
              <li>
                <a onClick={() => handleNavigation("/settings")} className="menu-item">
                  <img src="/icon/Group 22.png" alt="환경 설정 아이콘" className="menu-icon" /> 환경 설정
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="resources">
          <a>리소스</a>
          <ul>
            <li>
              <a onClick={() => handleNavigation("/support")} className="menu-item">
                <img src="/icon/Group 60.png" alt="고객 지원 아이콘" className="menu-icon" /> 고객 지원
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main>
        <div className="site-traffic">
          <a>[사이트 트래픽]</a>
        </div>
        <div className="preview-box">
          <iframe src="" class="preview-frame" onload="loadMainContent()"></iframe>
          <canvas ref={chartRef} id="myChart" width="400" height="200"></canvas>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
