import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './commentCompoenets/CommentSection';
import { useNavigate, Link } from "react-router-dom";
import Header_compo from './Header_page';
import Footer_compo from './Footer_page';

const PostDetail = () => {
  const navigate = useNavigate()

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [postState, setPostState] = useState(false)
  const [postEditTitle, setPostEditTitle] = useState('')
  const [postEditContent, setPostEditContent] = useState('')
  const user_id = sessionStorage.getItem('user_id')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/postdetail/${id}`);
        const data = await response.json();
        console.log(data[0])
        setPost(data[0]);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/UserBoardDetail.css`;
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link);
    };
  }, [id]);

  const postEditBTN = async () => {
    const postData = {
      board_num: post.board_num,
      title: postEditTitle,
      content: postEditContent,
    }
    try {
      const response = await fetch('http://localhost:5000/api/postEdit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("게시글 수정 성공")
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  const postDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/postDelete?no=${post.board_num}`)
      if (response.ok) {
        alert("게시글 삭제 완료")
        navigate('../userboard')
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  if (!post) {
    return <div>Loading...</div>;
  }

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
        
          <div>
            <div>
              <section className="content">
                <h1 className="post-title">게시판</h1>
                <h2 className="post-subtitle">제목 | {post.title}</h2>
                <div className="divider"></div>

                <div className="post-metadata">
                  <p><span>작성자 ｜ </span> {post.user_id}</p>
                  <p><span>작성일 ｜ </span> {post.creation_date}</p>
                  <p><span>분류 ｜ </span> {post.category}</p>
                  <p><span>내용 ｜ </span> {post.content}</p>
                </div>

                <CommentSection boardNum={post.board_num} />
                {/* <div className="comment-section">
                  <form className="comment-form">
                    <input type="text" className="comment-input" placeholder="댓글" />
                    <button type="submit" className="comment-submit">등록</button>
                  </form>
                  <div className="divider">
                    
                  </div>

                  <ul className="comment-list">
                    <li className="comment-item">
                      <p className="comment-id">익명 |</p>
                      <p className="comment-text">정보 공유 감사합니다!</p>
                    </li>
                    <li className="comment-item">
                      <p className="comment-id">아이디 |</p>
                      <p className="comment-text">너무 좋은 정보!!</p>
                    </li>
                  </ul>
                </div> */}
              </section>
            </div>

            {/* <button onClick={() => {
              setPostState(true);
              setPostEditTitle(post.title)
              setPostEditContent(post.content)
            }}>수정</button>
            <button onClick={postDelete}>삭제</button> */}
          </div>
        {/* ) : ( */}
          {/* <div> */}
            {/* <input type='text' value={postEditTitle} onChange={(e) => setPostEditTitle(e.target.value)} />
            <textarea value={postEditContent} onChange={(e) => setPostEditContent(e.target.value)} />
            <button onClick={postEditBTN}>수정</button>
            <button onClick={() => { setPostState(false) }}>취소</button>
          </div>
        )} */}
        {/* 댓글 작성 컴포넌트 */}
      </main>
      <Footer_compo />
    </div>
  );
};

export default PostDetail;