import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';

function CommBoard() {
  const [submenuVisible, setSubmenuVisible] = useState(true);
  const [posts, setPosts] = useState([]); // 게시물 목록 상태
  const [newPost, setNewPost] = useState(""); // 새 글 입력 상태
  const [selectCategory, setSelectCategory] = useState("전체")

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './CommBoard.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [])


  const toggleSubmenu = (event) => {
    event.preventDefault();
    setSubmenuVisible(!submenuVisible);
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
            <li><Link to="../commboard" className="toggle-submenu" onClick={toggleSubmenu}>커뮤니티</Link>
              {submenuVisible && (
                <ul className="submenu">
                  <li><Link to="../commboard">공지사항</Link></li>
                  <li><Link to="../userboard">정보공유</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="../favlist">찜 목록</Link></li>
            <li><Link to="../gdinfo">이용 안내</Link></li>
          </ul>
        </div>
        <section className="content">
          <div className="notice">
            <h1>공지사항</h1>
          </div>
          <div className="notice-list">
            <ul>
              {posts.length === 0 ? (
                <li>게시물이 없습니다.</li>
              ) : (
                posts.map((post) => (
                  <li key={post.id}>
                    {post.content}
                    {/* <button onClick={() => handleDeletePost(post.id)}>삭제</button> */}
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </main>
      <div className="pagination">
        <a href="#">&lt;</a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">&gt;</a>
      </div>
      <Footer_compo />
    </div>
  );
}

export default CommBoard;
