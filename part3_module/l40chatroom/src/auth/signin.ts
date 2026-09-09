import {Authorize} from "../Authorize";

// UI elements 
const signinform = document.getElementById("signinform");
const googleloginbtn = document.getElementById("googleloginbtn");

const authObj = new Authorize();

// email/password login 
signinform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const email = (document.getElementById("signinemail") as HTMLInputElement).value.trim();
    const password = (document.getElementById("signinpassword") as HTMLInputElement).value.trim();

    if(!email || !password){
        alert("Please enter both email and password");
        return;
    }

    authObj.loginUser(email,password);
});

// google login 
googleloginbtn.addEventListener("click",()=>{
    authObj.googleLogin();
})