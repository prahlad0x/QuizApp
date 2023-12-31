localStorage.clear();

let isregister = false;
let form = document.querySelector("form");
let rb = document.getElementById("rb");
let lb = document.getElementById("lb");
let h1 = document.querySelector("form h1");
let submitbtn = document.querySelector('input[type="submit"]');
let showpass = document.getElementById("hh");
let password = document.querySelector("#pass")
let email = document.querySelector("#email")
const toast = document.querySelector("#snackbar")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isregister) {
    fetch("https://quiz-server-27y4.onrender.com/Quiz/user/register", {
      method: "POST",
      body: JSON.stringify({ email : email.value, password : password.value}),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isOk) {
          data.user.expiresAt = Date.now() + 1000*60*60*24*3
          localStorage.setItem("user", JSON.stringify(data.user));
          showToast("#386641",data.msg);
          setTimeout(()=> {
            location.href = "./dashboard.html";
          }, 600)
        } else {
          showToast("#fb8b24",data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        showToast("#fb8b24","something went wrong!");
      });
  }
  else {
    fetch("https://quiz-server-27y4.onrender.com/Quiz/user/login", {
      method: "POST",
      body: JSON.stringify({email : email.value, password : password.value}),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isOk) {
          data.user.expiresAt = Date.now() + 1000*60*60*24*3
          localStorage.setItem("user", JSON.stringify(data.user));
          showToast("#386641", data.msg);
          setTimeout(()=> {
            location.href = "./dashboard.html";
          }, 600)
        } else {
          showToast("#fb8b24", data.msg)
        }
      })
      .catch((err) => {
        console.log(err);
        showToast("#fb8b24","something went wrong!");
      });
  }
});



lb.addEventListener("click", (e) => {
  e.preventDefault();
  isregister = false;
  lb.setAttribute("style", "background-color: blue;color: white;");
  rb.setAttribute("style", "background-color: white;color: black;");
  h1.innerText = " - Wel-come Back -   ";
  submitbtn.value = "Login";
});

rb.addEventListener("click", (e) => {
  e.preventDefault();
  isregister = true;
  rb.setAttribute("style", "background-color: blue;color: white;");
  lb.setAttribute("style", "background-color: white;color: black;");
  h1.innerText = "Welcome To Quick Quiz";
  submitbtn.value = "Register";
});

showpass.addEventListener('click',(e)=>{
  if(e.target.checked){
    password.setAttribute("type", "text")
  }
  else password.setAttribute("type", "password")
})


function showToast(color, text) {
  toast.className = "show";
  toast.style.background = color;
  toast.innerText = text.toUpperCase();
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 1500);
}
