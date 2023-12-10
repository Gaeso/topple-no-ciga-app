const configform = document.querySelector("#config-form");
const configdiv = document.querySelector("#configDiv");
const updatename = document.querySelector("#updateName");
const updatedambae =document.querySelector("#updateDambae");
const homebtn2 = document.querySelector("#gotohome2"); // 돌아가기 버튼

function onClickHome2 () {
    configdiv.classList.add("hidden");
    timerdiv.classList.remove("hidden");
    wishbtn.classList.remove("hidden");
    configbtn.classList.remove("hidden");
    boardbtn.classList.remove("hidden");
}

function configfunction () {
    configdiv.classList.remove("hidden");
    timerdiv.classList.add("hidden");
    wishbtn.classList.add("hidden");
    configbtn.classList.add("hidden");
    boardbtn.classList.add("hidden");
}

function configsubmit (event) {
    event.preventDefault();
    localStorage.setItem("username", updatename.value);
    localStorage.setItem("dambae", updatedambae.value);
    location.reload();
}

configbtn.addEventListener("click", configfunction);
configform.addEventListener("submit", configsubmit);
homebtn2.addEventListener("click", onClickHome2);