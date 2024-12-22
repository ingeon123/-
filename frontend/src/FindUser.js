import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function FindUser() {

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [])
  
  return (
    <div>
      <main>
        <Link to="../findid">아이디 찾기</Link>
        <br/>
        <Link to="../findpassword">비밀번호 찾기</Link>
      </main>
    </div>
  );
}

export default FindUser;