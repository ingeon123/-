import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';

const CommentSection = ({ boardNum }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const userID = sessionStorage.getItem("user_id")

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments?boardNum=${boardNum}`);
        const data = await response.json();
        console.log(data)
        setComments(data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/UserBoardDetail.css`;
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link);
    };


  }, [boardNum]);

  const submitComent = async () => {
    if(userID){
      const newCommentData = {
        newComment: newComment,
        userID: userID,
        boardNum: boardNum,
      }
      console.log(userID)
      try {
        const response = await fetch('http://localhost:5000/api/commentwrite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCommentData),
        });
        if (response.ok) {
          alert("댓글 작성 성공")
          window.location.reload()
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    }
    else{
      alert("로그인 후 이용해주세요")
    }
  }

  return (
    <div>
      <h2>Comments</h2>
        <div>
          <div className="comment-section">
            <form className="comment-form">
              <input type="text" className="comment-input" placeholder="댓글" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
              <button type="submit" className="comment-submit" onClick={submitComent}>등록</button>
            </form>
            <div className="divider">

            </div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentItem key={comment.comment_num} comment={comment} />
              ))
            ) : (
              <p>댓글이 없습니다</p>
            )}
              {/* <li className="comment-item">
                <p className="comment-id">익명 |</p>
                <p className="comment-text">정보 공유 감사합니다!</p>
              </li>
              <li className="comment-item">
                <p className="comment-id">아이디 |</p>
                <p className="comment-text">너무 좋은 정보!!</p>
              </li> */}
          </div>
        </div>
    </div>
  );
};

export default CommentSection;