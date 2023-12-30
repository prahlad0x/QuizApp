let title = document.getElementById('title')

const toast = document.getElementById("snackbar")

const user = JSON.parse(localStorage.getItem("user"));
if (!user) location.replace("./index.html");
else if(user.expiresAt < Date.now()){
  showToast("#4f772d", "Session Expired !")
  setTimeout(() => {
    location.replace("./index.html");
  }, 600);

}


let params = new URLSearchParams(window.location.search);
let quizID = params.get("quiz");

function getdata() {
  fetch("https://quiz-server-27y4.onrender.com/Quiz/getleaderboard/" + quizID)
    .then((res) => res.json())
    .then((data) => {
      if (data.isOk || data.isOK) {
        title.innerText = data.title
        settable(data.leaderboard);
      } else {
        showToast("red","something went wrong");
        location.replace("./dashboard.html");
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      showToast("red","something went wrong");
      location.replace("./dashboard.html");
    });
}

function settable(data) {
  let body = document.querySelector("tbody");
  data = data.sort((a, b) => b.score - a.score);
  let html = `${data.map((el, i) => getcard(el, i)).join("")}`;
  body.innerHTML = html;
}

function getcard(el, i) {
  if (el.email == user.email) {
    document.querySelector("#rank").innerText = "Your Rank :- " + (i + 1);
  }

  return `
            <tr>
                <td>${i + 1}</td>
                <td>${el.email}</td>
                <td>${el.score}</td>
            </tr>
        `;
}

if (!quizID) {
  showToast("orange","something went wrong, please retry");
  location.replace("./dashboard.html");
} else {
  getdata();
}

document.getElementById('logo').addEventListener('click', ()=>{
    location.href = "./dashboard.html"
})

function showToast(color, text) {
  toast.className = "show";
  toast.style.background = color;
  toast.innerText = text
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 1500);
}