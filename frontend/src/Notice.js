import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';

function Notice() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/Notice.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [])
  return (
    <div>
      <Header_compo/>
      <main>
        <div className="sidebar">
          <h2>☰</h2>
          <ul>
            <li><Link to="../annlist">사업 공고</Link></li>
            <li><Link to="../newsfd">동향 뉴스</Link></li>
            <li>
              <a href="../commboard" className="toggle-submenu">커뮤니티</a>
              <ul className="submenu">
                <li><Link to="../notice"/></li>
                <li><a href="sub3_1.html">게시판</a></li>
              </ul>
            </li>
            <li><Link to="../favlist">찜 목록</Link></li>
            <li><Link to="../gdinfo">이용 안내</Link></li>
          </ul>
        </div>
        <section className="content">
          <h1>게시판</h1>
          <div className="filter">
            <select>
              <option value="전체">전체</option>
              <option value="정보공유">정보공유</option>
              <option value="소통">소통</option>
            </select>
            <input type="text" placeholder="" />
            <button>🔍</button>
          </div>
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
              <tr>
                <td>정보공유</td>
                <td>[창업진흥원] 창업 정책 아이디어 공모전</td>
                <td>2024-08-09</td>
                <td>익명</td>
              </tr>
            </tbody>
          </table>
          <div className="write-btn-container">
            <button className="write-btn">작성하기</button>
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
      <Footer_compo/>
    </div>
  )
}
export default Notice;