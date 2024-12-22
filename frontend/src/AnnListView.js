import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';
import Pagination from './Pagination';

function AnnListView(data) {
  const [searchCategory,setSearchCategory] = useState('전체')
  const [projectData,setProjectData] = useState(null)
  const [loading,setLoading] = useState(false)
  const today = new Date()

  // 페이지 처리 데이터 정재
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const getItemsFromData = (data) => {
    if (!data || typeof data !== 'object') return [];
    return data || [];
  };
  const items = getItemsFromData(projectData);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './AnnListView.css';
    document.head.appendChild(link);
    setProjectData(data.data)
    return () => {
      document.head.removeChild(link);
    };
  }, [data])
  
  // 카테고리 전체
  const allCategory_func = (e) => {
    setProjectData(data.data)
    setSearchCategory(e)
    setCurrentPage(1);
  }

  // 카테고리 필터
  const category_func = async (e) => {
    setCurrentPage(1)
    const categoryData = data.data.filter((item) => item.category == e)
    console.log(categoryData)
    setSearchCategory(e)
    setProjectData(categoryData)
  };
  return (
    <div>
      <Header_compo/>
      <main >
        <div className="sidebar">
          <h2>☰</h2>
          <ul>
            <li><Link to="../annlist">사업 공고</Link></li>
            <li><Link to="../newsfd">동향 뉴스</Link></li>
            <li><Link to="../commboard">커뮤니티</Link></li>
            <li><Link to="../favlist">찜 목록</Link></li>
            <li><Link to="../gdinfo">이용 안내</Link></li>
          </ul>
        </div>
        <section className="content">
          <div className="filter-section">
            <div className="dropdown-container">
              <div className="dropdown">
                <button className="dropbtn">{searchCategory} ▼</button>
                <div className="dropdown-content">
                  <a href="?category=" onClick={(e) => {e.preventDefault(); allCategory_func("전체")}}>전체</a>
                  <a href="?category=" onClick={(e) => {e.preventDefault(); category_func("금융")}}>금융</a>
                  <a href="?category=" onClick={(e) => {e.preventDefault(); category_func("기술")}}>기술</a>
                  <a href="?category=" onClick={(e) => {e.preventDefault(); category_func("인력")}}>인력</a>
                  <a href="?category=" onClick={(e) => {e.preventDefault(); category_func("수출")}}>수출</a>
                  <a href="?category=" onClick={(e) => {e.preventDefault(); category_func("내수")}}>내수</a>
                  <a href="?category=" onClick={(e) => {e.preventDefault(); category_func("창업")}}>창업</a>
                  <a href="?category=" onClick={(e) => {e.preventDefault(); category_func("경영")}}>경영</a>
                  <a href="?category=" onClick={(e) => {e.preventDefault(); category_func("기타")}}>기타</a>
                </div>
              </div> 
              <div className="dropdown">
                <button className="dropbtn">주관 ▼</button>
                <div className="dropdown-content">
                  <a href="#">중앙부처</a>
                  <a href="#">지자체</a>
                  <a href="#">교육기관</a>
                  <a href="#">민간</a>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">지역 ▼</button>
                <div className="dropdown-content">
                  <a href="#">서울</a>
                  <a href="#">부산</a>
                  <a href="#">대구</a>
                  <a href="#">경기</a>
                  <a href="#">경북</a>
                  <a href="#">제주</a>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">대상 ▼</button>
                <div className="dropdown-content">
                  <a href="#">청소년</a>
                  <a href="#">대학생</a>
                  <a href="#">일반인</a>
                  <a href="#">학셍</a>
                </div>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table >
              <thead>
                <tr className="trtitle">
                  <th></th>
                  <th>제목</th>
                  <th>신청기한</th>
                  <th>주관</th>
                  <th>조회</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((item, index) => {
                  let deadLine = null
                  let applicationPeriod = null
                  if(!item.start_date&&!item.end_date){
                    deadLine = ""
                    applicationPeriod = ""
                  }
                  else{
                    const endDate = new Date(item.end_date)
                    const startDate = new Date(item.start_date)                    
                    deadLine = "D-"+Math.ceil((endDate.getTime() - today.getTime())/(1000*60*60*24));
                    applicationPeriod = endDate.toISOString().split("T")[0]+" ~ "+startDate.toISOString().split("T")[0]
                  }                  
                  return (
                    <tr key={index}>
                      <td>{deadLine}</td>
                      <td>{item.title}</td>
                      <td>{applicationPeriod}</td>
                      <td>{item.department}</td>
                      <td>{item.project_id}</td>
                    </tr>
                  )
                })
              ) : (
                Array.isArray(projectData) && projectData.length > 0 ? (
                  projectData.map((item, index) => {
                    const endDate = new Date(item.end_date)
                    const startDate = new Date(item.start_date)
                    const deadLine = Math.ceil((endDate.getTime() - today.getTime())/(1000*60*60*24));
                    const applicationPeriod = endDate.toISOString().split("T")[0]+" ~ "+startDate.toISOString().split("T")[0]
                    return (
                      <tr key={index}>
                        <td>D-{deadLine}</td>
                        <td>{item.title}</td>
                        <td>{applicationPeriod}</td>
                        <td>{item.department}</td>
                        <td>{item.project_id}</td>
                      </tr>
                    )})
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )
              )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <div className="pagination">
        <Pagination
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}/>
      </div>
      <script src="active.js"></script>
      <Footer_compo/>
    </div>
  )
}
export default AnnListView;