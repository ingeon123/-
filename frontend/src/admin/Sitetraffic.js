import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";

const Sitetraffic = () => {
  const chartRef = useRef(null); // Chart.js 캔버스 참조
  const chartInstanceRef = useRef(null); // Chart.js 인스턴스 참조
  const [activeSubmenu, setActiveSubmenu] = useState(false); // 서브메뉴 활성화 상태
  const navigate = useNavigate();

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "./사이트트래픽.css";
    document.head.appendChild(link1);

    return () => {
      document.head.removeChild(link1);
    };
  }, []);

  useEffect(() => {
    // Chart.js 초기화
    const ctx = chartRef.current.getContext("2d");
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
          x: {
            title: {
              display: true,
              text: "월별",
            },
          },
        },
      },
    });

    return () => {
      // 컴포넌트 언마운트 시 차트 인스턴스 정리
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  const handleSubmenuToggle = () => {
    setActiveSubmenu(!activeSubmenu);
  };

  const handleLoadData = () => {
    // 조회 버튼 클릭 시 데이터 업데이트
    const newData = [1200, 6000, 17000, 22000, 36000, 51000, 62000, 56000, 46000, 41000, 31000, 36000];
    chartInstanceRef.current.data.datasets[0].data = newData;
    chartInstanceRef.current.update();
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="site-icon"></div>
          <div className="web-site" onClick={() => navigateTo("/website")} style={{ cursor: "pointer" }}>
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
              <li>
                <div className="menu-item" onClick={() => handleSubmenuToggle()}>
                  <img src="/icon/Group 23.png" alt="대시보드 아이콘" /> 대시보드
                </div>
                {activeSubmenu && (
                  <ul className="submenu">
                    <li onClick={() => navigateTo("/sitetraffic")}>
                      <div className="submenu-item">사이트 트래픽</div>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <div className="menu-item" onClick={() => navigateTo("/usermanage")}>
                  <img src="/icon/Group 24.png" alt="사용자 관리 아이콘" className="menu-icon" /> 사용자 관리
                </div>
              </li>
              <li>
                <div className="menu-item" onClick={() => navigateTo("/securitysettings")}>
                  <img src="/icon/Group 25.png" alt="보안 설정 아이콘" className="menu-icon" /> 보안 설정
                </div>
              </li>
              <li>
                <div className="menu-item" onClick={() => navigateTo("/userinquiry")}>
                  <img src="/icon/Group 26.png" alt="회원 문의 아이콘" className="menu-icon" /> 회원 문의
                </div>
              </li>
              <li>
                <div className="menu-item special" onClick={() => navigateTo("/adsandcampaigns")}>
                  <img src="/icon/Group 27.png" alt="광고 아이콘" className="menu-icon" /> 광고 & 캠페인
                </div>
              </li>
              <li>
                <div className="menu-item" onClick={() => navigateTo("/settings")}>
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
              <div className="menu-item" onClick={() => navigateTo("/support")}>
                <img src="/icon/Group 60.png" alt="고객 지원 아이콘" className="menu-icon" /> 고객 지원
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <main id="main-content">
        <div className="controls">
          <select id="dataType">
            <option value="visitors">방문자 수</option>
            <option value="sales">매출</option>
          </select>
          <input type="date" id="startDate" placeholder="시작 날짜" />
          <span>~</span>
          <input type="date" id="endDate" placeholder="종료 날짜" />
          <button id="loadData" onClick={handleLoadData}>
            조회
          </button>
        </div>
        <div className="chart-container">
          <canvas ref={chartRef} id="myChart" width="1182" height="607"></canvas>
        </div>
      </main>
    </div>
  );
};

export default Sitetraffic;
