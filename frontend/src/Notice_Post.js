import React, { useEffect,useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';

const Notice_Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('정보공유');
  const user_id = sessionStorage.getItem('user_id')
  const navigate = useNavigate();

  useEffect(() => {
  const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './Notice_Post.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleSubmit = async (e) => {
    console.log("버튼 클릭")
    e.preventDefault();
    
    const newPost = {
      category,
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      author: user_id,
    };

    try {
      console.log("트라이 진입")
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        alert('게시글이 저장되었습니다.');
        navigate('/userboard');
      } else {
        alert('게시글 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('서버 오류:', error);
      alert('서버와 통신 중 문제가 발생했습니다.');
    }
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
        <h1 className="post-title">게시판</h1>
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="post-title" className="form-label">제목 |</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                id="post-title" 
                className="form-input"/>
            
            {/* 드롭다운 메뉴 추가 */}
            <div className="dropdown">
              <select id="category-select" className="dropdown-select"
              value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="정보공유" selected>정보공유</option>
                <option value="소통">소통</option>
              </select>
            </div>
          </div>

          <div className="divider"></div>
          <div className="form-group1">
            <textarea
                id="post-content" 
                className="form-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required/>
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">작성하기</button>
          </div>
        </form>
      </section>
    </main>
    <Footer_compo />
    </div>
  );
};

export default Notice_Post;
