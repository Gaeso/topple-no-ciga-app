const boardbtn = document.querySelector("#boardbtn");
const board_list = document.querySelector("#boardlist");
const gotohome = document.querySelector("#gotohome3");
const writebtn = document.querySelector("#writebtn");
const wishlist = document.querySelector("#wish-form");
const wishlist2 = document.querySelector("#wish-form2");
const boardno2 = document.querySelector("#boardno");
const editcontent = document.querySelector("#editContent");
const edittitle = document.querySelector("#editTitle");
const editcontentbtn = document.querySelector("#editcontentbtn");
const editconfirm = document.querySelector("#editconfirm");
const deletecontentbtn = document.querySelector("#deletecontentbtn");

function onBoardClick() {
    location.href="/";
}

function boardlist() {
    wishlist.classList.add("hidden");
    wishlist2.classList.add("hidden");
    editcontentbtn.classList.add("hidden");
    deletecontentbtn.classList.add("hidden");
    board_list.classList.remove("hidden");
    
    axios({
        method:'get', 
        url:'http://localhost:3000/boardlist'}).then((res)=>{
        board_list.innerText = '';
        res.data.forEach(element => {
            paintWish(element);
        });
    });
}

function writecontent() {
    board_list.classList.add("hidden");
    wishlist.classList.remove("hidden");
}
// BOARD_NO, TITLE, CONTENTS

function onTitleClick() {
    board_list.classList.add("hidden");
    wishlist2.classList.remove("hidden");
    editcontentbtn.classList.remove("hidden");
    deletecontentbtn.classList.remove("hidden");

    axios({
        method:'get',
        url:`http://localhost:3000/boardinfo?boardnoname=${this.previousSibling.innerText}`
    }).then((res)=>{
        res.data.forEach(element => {
            boardno2.value = element['BOARD_NO'];
            editcontent.innerText = element['CONTENTS'];
            editcontent.value = element['CONTENTS'];
            edittitle.value = element['TITLE'];
        });
    });
}

function onEditBtn() {
    editcontentbtn.classList.add("hidden");
    editconfirm.classList.remove("hidden");
    deletecontentbtn.classList.add("hidden");
    editconfirm.disabled = false;
    edittitle.readOnly = false;
    editcontent.readOnly = false;
}

function onDeleteBtn() {
    axios({
        method:'get',
        url:`http://localhost:3000/deleteboard?boardnoname=${boardno2.value}`
    }).then((res)=>{
        location.href="/board";
    });
}

boardbtn.addEventListener("click", boardlist);
window.addEventListener('DOMContentLoaded',boardlist);

function paintWish(newProductObj) {
    const span = document.createElement("div"); // <div></div>
    span.id = newProductObj['BOARD_NO'];
    span.classList.add("wishdiv");
    span.classList.add("fadein_animation");

    const boardno = document.createElement("span");
    boardno.innerText = `${newProductObj['BOARD_NO']}`;
    boardno.classList.add("block");
    boardno.classList.add("boardno");
    boardno.classList.add("subColor");

    const title = document.createElement("span");
    title.innerText = `${newProductObj['TITLE']}`;
    title.classList.add("mainColor");
    title.onclick = onTitleClick;

    span.appendChild(boardno);
    span.appendChild(title);
    board_list.appendChild(span);
}

gotohome.addEventListener("click", onBoardClick);
writebtn.addEventListener("click", writecontent);
editcontentbtn.addEventListener("click", onEditBtn);
deletecontentbtn.addEventListener("click", onDeleteBtn);