const damTime = document.querySelector("#timer");
const resetBtn = document.querySelector("#resetBtn");

let day, hour, min, sec;

function damTimer() { 
    const time = Date.now() - parseInt(localStorage.getItem("time"));

    day = String(Math.floor(time / (24 * 60 * 60 * 1000))).padStart(2,"0");
    hour = String(Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))).padStart(2,"0");
    min = String(Math.floor((time % (60 * 60 * 1000)) / (60 * 1000))).padStart(2,"0");
    sec = String(Math.floor((time % (60 * 1000)) / 1000)).padStart(2,"0");
    
    report.innerText = `${localStorage.getItem("username")}`;
    damTime.innerText = `${day}:${hour}:${min}:${sec}`;
}

function onReset() {
    localStorage.setItem("time", Date.now());
}

resetBtn.addEventListener("click", onReset)

damTimer();
setInterval(damTimer,1000);


