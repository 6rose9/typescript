import {Authorize} from "../Authorize";

// UI elements 
const resetform = document.getElementById("passwordresetform");
const msgElement = document.getElementById("msg");
const googleloginbtn = document.getElementById("googleloginbtn");

const authObj = new Authorize();

// reset
resetform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const email = (document.getElementById("signinemail") as HTMLInputElement).value.trim();
    authObj.resetPassword(email,msgElement);
});

// google login 
googleloginbtn.addEventListener("click",()=>{
    authObj.googleLogin();
})