import React, { useState } from 'react';

const ReplyItem = ({ reply }) => {
  const user_id = sessionStorage.getItem("user_id")
  const [replyState, setReplyState] = useState(false)
  const [editReplyDate, setEidtReplyData] = useState("")

  const submitReplyEdot = async () => {
    const replyData = {
      reply_num: reply.reply_num,
      content: editReplyDate,
    }
    try {
      const response = await fetch('http://localhost:5000/api/replyEdit',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData),});
        
      if(response.ok){
        alert("댓글 수정 성공")
        setReplyState(false)
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }
  const deleteReply = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/replyDelete?no=${reply.reply_num}`)
      if(response.ok){
        alert("댓글 삭제 완료")
        window.location.reload()
      }
    } catch (error){
      console.error('Failed to fetch comments:', error);
    }
  }
  return (
    <ul class="comment-list">
          <li class="comment-item">
            <p class="comment-id"> {reply.user_id} |</p>
            <p class="comment-text">{reply.content}</p>
          </li>
    </ul>
      // <p>
      //   <strong>{reply.user_id}:</strong> {reply.content}
      // </p>
      // {/* {(replyState==true)?(
      //   <div>
      //     <input type='text' value={editReplyDate} onChange={(e) => setEidtReplyData(e.target.value)} />
      //     <button onClick={submitReplyEdot}>댓글 수정</button>
      //     <button onClick={() => setReplyState(false)}>취소</button>
      //   </div>
        
      // ):null}
      // {(user_id==reply.user_id && replyState==false)?(
      //   <div>
      //     <button onClick={() => {
      //       setReplyState(true)
      //       setEidtReplyData(reply.content)
      //     }}>댓글 수정</button>
      //     <button onClick={deleteReply}>댓글 삭제</button>
      //   </div>
      // ):null} */}
  );
};

export default ReplyItem;