import {Authorize} from "../Authorize";
import { UserData } from "../Authorize.js";

const authObj = new Authorize();

document.querySelector("#signupform").addEventListener("submit",(e)=>{
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // console.log(fullname,email,password);

    authObj.registerUser({fullname,email,password} as UserData);
});