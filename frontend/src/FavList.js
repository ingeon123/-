import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';
import Pagination from './Pagination';


function FavList() {
  const [userLogState, setUserLogState] = useState(sessionStorage.getItem('user_log_state'))
  const [userID, setUserID] = useState(sessionStorage.getItem("user_id"))
  const [favPost, setFavPost] = useState([])

  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favPost.slice(indexOfFirstItem, indexOfLastItem);

  const navigator = useNavigate();
  
  useEffect(() => {
    if(!userLogState){
      alert("해당 페이지는 로그인 후 이용 가능한 페이지입니다")
      navigator("/login")
    }
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/favlist', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user_id:userID,
          }),
      });
      const data = await response.json();
      setFavPost(data)
      console.log(data)
      } catch (error) {
        console.error('게시글 조회 중 오류:', error);
      }
    };
    fetchPosts();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './FavList.css';
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
        <div className="notice">
          <h1>찜 목록</h1>
        </div>
        <div className="heart-list">
          <ul>{currentItems.map((post,index) => (
            <li key={index}><a href="#">{post.title}</a><span>❤️</span></li>
          ))}
          </ul>
        </div>
      </section>
    </main>
    <div className="pagination">
      <Pagination
          totalItems={favPost.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
    </div>
    <Footer_compo />
  </div>
  )
}
export default FavList;