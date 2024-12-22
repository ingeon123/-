import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ads, setAds] = useState([]); // 광고 데이터를 저장
  const navigate = useNavigate();

  useEffect(() => {
    fetchAds();
    // 광고 데이터 로드 함수
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "/adsList.css";
    document.head.appendChild(link1);

    return () => {
      document.head.removeChild(link1);
    };

  }, [searchTerm, startDate, endDate]);

  const fetchAds = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/getAdList", { method: "GET" });
      if (!response.ok) throw new Error("광고 목록 조회 실패");
      const data = await response.json();
      setAds(data.data);
      console.log(ads)
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }

  };

  const delAds = async (ad) => {
    const adId = ad.ad_id
    try {
      const response = await fetch('http://localhost:5000/api/admin/deleteAds', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adId }),
      });

      if (response.ok) {
        alert("광고 삭제 완료")
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);

  const handleAddAd = () => {
    navigate('/admin/addAds')
  };

  const handleEditClick = (ad) => {
    navigate('/admin/addAds', {
      state: { ad, mode: 'edit' }  // ad 데이터와 mode 전달
    });
  }

  return (
    <div className="container">
      <Sidebar />
      <main id="main-content">
        <div className="controls">
          {/* 검색 바 */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={fetchAds}>
              <img src="/icon/Group 1.png" alt="검색" />
            </button>
          </div>

          {/* 날짜 필터 */}
          <div className="date-filter">
            <input type="date" value={startDate} onChange={handleStartDate} />
            <span>~</span>
            <input type="date" value={endDate} onChange={handleEndDate} />
          </div>
        </div>

        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <th>광고 제목</th>
              <th>상세 정보</th>
              <th>상태</th>
              <th>게시 날짜</th>
              <th>종료 날짜</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td>{ad.ad_subject}</td>
                <td>{ad.ad_content}</td>
                <td>{ad.ad_use == 0 ? "비활성화" : "활성화"}</td>
                <td>{ad.ad_start_date.split('T')[0]}</td>
                <td>{ad.ad_end_date.split('T')[0]}</td>
                <td className="btn-td">
                  <button className="edit-ad-button" onClick={() => handleEditClick(ad)}>수정</button>
                  <button className="del-ad-button" onClick={() => delAds(ad)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <div className="pagination">
            {/* 페이지네이션 버튼만 남김 */}
            <button className="prev">◀</button>
            <div className="page-numbers">
              {/* 동적 페이지 버튼 생성 */}
              <button className="page">1</button>
              <button className="page">2</button>
              <button className="page">3</button>
            </div>
            <button className="next">▶</button>
          </div>
          <button className="add-ad-button" onClick={handleAddAd}>새 광고 추가</button>
        </div>
      </main>
    </div>
  );
}

export default AdsList;