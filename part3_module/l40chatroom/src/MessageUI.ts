import { ChatMessage } from "./ChatRoom";
import { formatDistance } from "date-fns";
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
    userInfo() {

    }

}