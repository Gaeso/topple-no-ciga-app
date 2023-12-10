// server.js 파일

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const mysql = require('mysql');  // mysql 모듈 로드
const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'mysql'
};

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

function connectDB(query, func) {
  var connection = mysql.createConnection(conn); // DB 커넥션 생성

  connection.connect();   // DB 접속
  connection.query(query, func);

  connection.end(); // DB 접속 종료
}

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));

// 루트 URL에 대한 HTML 파일 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/board', (req, res) => {
  res.sendFile(path.join(__dirname,'board.html'));
});

app.get('/boardlist', (req, res) => {
  connectDB('select * from board order by BOARD_NO desc;', function(error,results,fileds){
    if(error){
      res.json(error);
    }
    res.json(results);
  });
});

app.get('/boardinfo', (req,res) => {
  connectDB(`select * from board where BOARD_NO = ${req.query.boardnoname};`, function(error,results,fileds){
    if(error){
      res.json(error);
    }
    res.json(results);
  });
});

app.post('/boardwrite', (req, res) => {
  connectDB(`insert into board(TITLE, CONTENTS) values ('${req.body.titlename}','${req.body.contentname}')`, function(error,results,fileds){
    if(error){
      res.sendFile(path.join(__dirname,'board.html'));
    }
    res.sendFile(path.join(__dirname,'board.html'));
  });
});

app.post('/boardedit', (req,res) => {
  connectDB(`update board set TITLE = '${req.body.titlename}', CONTENTS = '${req.body.contentname}' where BOARD_NO = '${req.body.boardnoname}'`, function(error,results,fileds){
    if(error){
      res.sendFile(path.join(__dirname,'board.html'));
    }
    res.sendFile(path.join(__dirname,'board.html'));
  });
});

app.get('/deleteboard', (req, res) => {
  connectDB(`delete from board where BOARD_NO = ${req.query.boardnoname}`, function(error,results,fileds){
    if(error){
      res.json(error);
    }
    res.json(results);
  });
})

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
