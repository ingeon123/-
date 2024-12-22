import React, { useState } from 'react';
import ReplyItem from './ReplyItem';

const CommentItem = ({ comment }) => {
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false)
  const [newReply, setNewReply] = useState("")
  const [userID, setUserID] = useState(sessionStorage.getItem("user_id"))
  const [commentState, setCommentState] = useState(false)
  const [commentEditData, setCommentEditData] = useState("")

  const fetchReplies = async (commentNum) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reply?commentNum=${commentNum}`);
      const data = await response.json();
      console.log(data)
      setReplies(data); 
    } catch (error) {
      console.error('Failed to fetch replies:', error);
    }
  };

  const submitReply = async() => {
    const newReplyData = {
      newReply: newReply,
      userID: userID,
      commentNum: comment.comment_num,
    }
    console.log(newReplyData)
    try {
      const response = await fetch('http://localhost:5000/api/replywrite',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReplyData),});
      console.log(response)
        
      if(response.ok){
        alert("댓글 작성 성공")
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  const editComment = async () => {
    const commentData = {
      comment_num:comment.comment_num,
      content: commentEditData,
    }
    try {
      const response = await fetch('http://localhost:5000/api/commentEdit',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),});
        
      if(response.ok){
        alert("댓글 수정 성공")
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  const deleteComment = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/commentDelete?no=${comment.comment_num}`)
      if(response.ok){
        alert("댓글 삭제 완료")
        window.location.reload()
      }
    } catch (error){
      console.error('Failed to fetch comments:', error);
    }
  } 

  const handleShowReplies = () => {
    if (!showReplies) {
      fetchReplies(comment.comment_num);
    }
    setShowReplies(!showReplies);
  };

  return (
    <ul class="comment-list">
      <li class="comment-item">
        <p class="comment-id">{comment.user_id} |</p>
        <p class="comment-text">{comment.content}</p>
      </li>
    </ul>
        // // <strong>{comment.user_id}:</strong> {comment.content}
        // {/* {(commentState==true)?(
        //   <div>
        //     <input type='text' value={commentEditData} onChange={(e) => setCommentEditData(e.target.value)}/>
        //     <button onClick={editComment}>수정</button>
        //     <button onClick={() => setCommentState(false)}>취소</button>
        //   </div>
          
        // ):null}
        // {(userID==comment.user_id && commentState==false)?(
        //   <div>
        //     <button onClick={() => {
        //       setCommentState(true)
        //       setCommentEditData(comment.content)
        //     }}>수정</button>
        //     <button onClick={deleteComment}>삭제</button>
        //   </div>
        // ): null} */}





      // <button onClick={handleShowReplies}>
      //   {showReplies ? '대댓글 숨기기' : '대댓글 보기'}
      // </button>
      // {showReplies && (
      //   <ul style={{ marginLeft: '20px' }}>
      //     {replies.map((reply) => (
      //       <ReplyItem key={reply.reply_num} reply={reply} />
      //     ))}
      //     {userID && (
      //       <>
      //         <input
      //           type="text"
      //           value={newReply}
      //           onChange={(e) => setNewReply(e.target.value)}
      //         />
      //         <button onClick={submitReply}>댓글 작성</button>
      //       </>
      //     )}
      //   </ul>
      // )}
      
  );
};

export default CommentItem;