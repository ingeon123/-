import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';
import Pagination from './Pagination';


function NewsFd() {
  const [newsData, setNewsData] = useState([])

  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
  
    const year = date.getFullYear().toString().slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/news`);
        const data = await response.json();
        console.log(data)
        setNewsData(data); 
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchComments();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/NewsFd.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [])
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <li><Link to="../gdinfo">이용 안내</Link></li>
          </ul>
        </div>
        <section className="content">
          <div className="category-menu">
            <a>분야</a>
            <button>창업</button>
            <button>경영</button>
            <button>교육</button>
            <button>산업</button>
            <button>건설</button>
          </div>

          <div className="news-list">
            <ul>
            {currentItems.map((newsContent) => (
              <li>
                <a href={newsContent.news_origin}>{newsContent.news_subject}</a>
                <span>{formatDateTime(newsContent.news_datetime)}</span>
              </li>
              ))
              }
            </ul>
          </div>
        </section>
      </main>
      <div className="pagination">
        <Pagination
            totalItems={newsData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
      </div>
      <Footer_compo />
      {/* useEffect를 이용해서 js추가 예정 */}
      <script src="active.js"></script> 
    </div>
  )
}
export default NewsFd;