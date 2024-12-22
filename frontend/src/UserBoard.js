import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';
import Pagination from './Pagination';

function UserBoard() {
  const user_id = sessionStorage.getItem('user_id')
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        console.log(data)
        setPosts(data);
      } catch (error) {
        console.error('게시글 조회 중 오류:', error);
      }
    };
    fetchPosts();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './userboard.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleWriteClick = () => {
    navigate('/notice-post');
  };
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
          <h1>게시판</h1>
          <table>
            <thead>
              <tr>
                <th>분류</th>
                <th>제목</th>
                <th>작성일</th>
                <th>작성자</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((post) => (
                <tr key={post.board_num}>
                  <td>{post.category}</td>
                  <Link to={`../userboardDetail/${post.board_num}`}>
                    {post.title}
                  </Link>
                  <td>{post.creation_date}</td>
                  <td>{post.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="write-btn-container">
            {user_id?(<button className="write-btn" onClick={handleWriteClick}>작성하기</button>):null}
            
          </div>
        </section>
      </main>
      <div className="pagination">
        <Pagination
            totalItems={posts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
      </div>
      <Footer_compo />
    </div>
  );
}
export default UserBoard;