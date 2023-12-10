const wishbtn = document.querySelector("#wishbtn");
const wishform = document.querySelector("#wish-form");
const inputPname = document.querySelector("#inputProduct");
const inputPrice = document.querySelector("#inputPrice");
const wishlist = document.querySelector("#wish-list");
const homebtn = document.querySelector("#gotohome"); // 돌아가기 버튼
const wishdiv = document.querySelector("#wishDiv");

let product=[]; 

function saveToDos() {
    localStorage.setItem("product", JSON.stringify(product));
}
function wishfunction(){ // 위시리스트 버튼 클릭시
    timerdiv.classList.add("hidden");
    wishbtn.classList.add("hidden");
    configbtn.classList.add("hidden");
    wishdiv.classList.remove("hidden");
    boardbtn.classList.add("hidden");
}

function onClickHome() { // 돌아가기 버튼 클릭시
    timerdiv.classList.remove("hidden");
    wishbtn.classList.remove("hidden");
    configbtn.classList.remove("hidden");
    boardbtn.classList.remove("hidden");
    wishdiv.classList.add("hidden");
}

function wishSubmit(event) {
    event.preventDefault();
    const newProductName = inputPname.value;
    const newProductPrice = inputPrice.value;
    inputPname.value = "";
    inputPrice.value = "";

    const newProductObj = {
        text: newProductName,
        price: newProductPrice,
        id: Date.now(),
    };

    product.push(newProductObj);
    paintWish(newProductObj);
    saveToDos();
}

function paintWish(newProductObj) {
    const span = document.createElement("div"); // <div id="Date.now()"></div>
    span.id = newProductObj.id;
    span.classList.add("wishdiv");
    span.classList.add("fadein_animation");

    const productName = document.createElement("span");
    productName.innerText = `${newProductObj.text}`;

    const productPrice = document.createElement("span");
    productPrice.innerText = ` ${newProductObj.price}원`;

    const progressbar = document.createElement("progress");
    progressbar.value = money2;
    progressbar.max = newProductObj.price;
    progressbar.classList.add("block");
    progressbar.classList.add("progressbar");
    
    const button = document.createElement("button");

    const progressNum = document.createElement("span");
    

    if(money2 === 0)
    {
        progressNum.innerText = `0%`;
    } else if (money2 >= newProductObj.price) {
        progressNum.innerText = `100%`;
    } else {
        progressNum.innerText = `${Math.floor((money2 * 100) / parseInt(newProductObj.price))}%`
    }
    button.innerText = "X";
    button.classList.add("cancelBtn");
    button.addEventListener("click", deleteToDo);

    span.appendChild(productName);
    span.appendChild(productPrice);
    span.appendChild(progressbar);
    span.appendChild(progressNum);
    span.appendChild(button);
    wishlist.appendChild(span);
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    product = product.filter(toDo => toDo.id !== parseInt(li.id))
    saveToDos();
}

const savedProduct = localStorage.getItem("product")

if(savedProduct !== null) {
    const parsedToDos = JSON.parse(savedProduct);
    product = parsedToDos;
    parsedToDos.forEach(paintWish);
}


wishbtn.addEventListener("click", wishfunction);
wishform.addEventListener("submit", wishSubmit);
homebtn.addEventListener("click",onClickHome)