import {Authorize} from "../Authorize";
import {MessageUI} from "../MessageUI";

// ui 
const ulele = document.getElementById("userinfo");
const logoutbtn = document.getElementById("logoutbtn");


const authObj = new Authorize();
const msguiObj = new MessageUI(ulele);

authObj.getUser((data)=>{
    if(data){
        console.log(data);
        msguiObj.userInfo(data);
    }
})

// logout 
logoutbtn.addEventListener("click",()=>{
    authObj.logoutUser();
});
