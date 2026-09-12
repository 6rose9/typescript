import {Authorize} from "../Authorize";
import { UserData } from "../Authorize.js";

const authObj = new Authorize();

document.querySelector("#signupform").addEventListener("submit",(e)=>{
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    // const fullnameinput = form.querySelector<HTMLInputElement>('input[name=fullname]');
    // const fullnameinput = form.fullname as HTMLInputElement;
    
    // const fullname = fullnameinput.value.trim();

    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // console.log(fullname,email,password);

    // const formData = new FormData(form);
    // cosnt fullname = String(formData.get("name") ?? "").trim();

    authObj.registerUser({fullname,email,password} as UserData);
});