import { ChatMessage } from "./ChatRoom";
import { formatDistance } from "date-fns";
import { User } from "firebase/auth";
export class MessageUI {
    constructor(public ul: HTMLElement) {

    }

    // clear ui
    clearli(): void {
        this.ul.innerHTML = "";
    }

    // render li
    renderli(data: ChatMessage): void {
        // cdn
        // const when = (window as any).dateFns.formatDistance(data.createdAt.toDate(), new Date(), { addSuffix: true }); // {addSuffix:true} = ago

        // npm
        const when = formatDistance(data.createdAt.toDate(), new Date(), { addSuffix: true });
        const htmllitag = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;

        this.ul.innerHTML += htmllitag;
    }

    // user profile
    userInfo(data: User) {

        console.log(data);

        const uid = data.uid;
        const email = data.email;
        const fullname = data.displayName;
        const photourl = data.photoURL;
        const createdtime = data.metadata.creationTime;

        const formatteddate = formatDistance(new Date(createdtime), "dd MMM yyyy");

        const html = `
            <li class="list-group-item"><img src="${photourl}" width="50" alt="Profile Picture" /></li>
            <li class="list-group-item">UID : ${uid}</li>
            <li class="list-group-item">Display Name : ${fullname}</li>
            <li class="list-group-item">Email : ${email}</li>
            <li class="list-group-item">Created At : ${formatteddate}</li>
        `;

        this.ul.innerHTML = html;
    }

}