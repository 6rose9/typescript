import {Authorize} from "../Authorize";
import { UserData } from "../Authorize.js";

const authObj = new Authorize();

document.querySelector("#signupform").addEventListener("submit",(e)=>{
    e.preventDefault();

    const fullname = (e.target as HTMLFormElement).fullname.value.trim();
    const email = (e.target as HTMLFormElement).email.value.trim();
    const password = (e.target as HTMLFormElement).password.value.trim();

    // console.log(fullname,email,password);

    authObj.registerUser({fullname,email,password} as UserData);
});