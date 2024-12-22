const mysql = require('mysql');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost', // MySQL 호스트
  user: 'root',   // MySQL 사용자명
  password: '1755', // MySQL 비밀번호
  database: 'business_list', // 사용할 데이터베이스 이름
  charset: 'utf8mb4'
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    throw err;
  }
  console.log('MySQL에 연결되었습니다.');
});

module.exports = connection;