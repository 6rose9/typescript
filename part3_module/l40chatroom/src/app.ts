import { ChatRoom, ChatMessage } from "./ChatRoom";
import { MessageUI } from "./MessageUI";

// get UI
// const chatsidebar = document.querySelector(".chat-sidebars") as HTMLElement;
const chatsidebar = document.querySelector<HTMLElement>(".chat-sidebars");
const newnameform = document.querySelector<HTMLFormElement>(".new-nameform");
const newchatform = document.querySelector<HTMLFormElement>(".new-chatform");
const chatlistgroup = document.querySelector<HTMLElement>(".chat-lists");
const updatemsg = document.querySelector<HTMLElement>(".update-msg");
const profilename = document.querySelector<HTMLElement>("#profilename");

if(!chatsidebar || !newnameform || !newchatform || !chatlistgroup || !updatemsg || !profilename) {
    throw new Error("One or more required elements are missing from the DOM.");
}

// get username from local storage
const username = localStorage.username ? localStorage.username : "Guest";
console.log("username : ", username);
profilename.textContent = username;

// instance Chatroom obj & MesssageUI
const chatroomObj = new ChatRoom("general", username);
const messageuiObj = new MessageUI(chatlistgroup);

const callback = (chatDoc: ChatMessage) => {
    console.log("data : ", chatDoc);
    messageuiObj.renderli(chatDoc);
}

// get chat & render li 
chatroomObj.getChats(callback);

// add new message
newchatform.addEventListener('submit', e => {
    e.preventDefault();

    const message = newchatform.message.value.trim();
    // console.log(message);

    chatroomObj.addChat(message)
        .then(() => newchatform.reset())
        .catch(err => console.error(err));

});

// change chat room
chatsidebar.addEventListener('click', e => {

    if (e.target instanceof HTMLButtonElement) {
        // console.log("i am btn");
        // console.log(e.target.getAttribute('id'));

        messageuiObj.clearli();
        chatroomObj.updateRoom(e.target.getAttribute('id'));
        chatroomObj.getChats(data => messageuiObj.renderli(data));
    }

});


// get chat & render li 
// chatroomObj.getChats((data)=>{
//     messageuiObj.renderli(data);
// });

// update username
newnameform.addEventListener('submit', e => {
    e.preventDefault();

    console.log(e);

    const newname= document.querySelector<HTMLInputElement>('#name').value.trim();
    // console.log(newname);

    // method 1
    chatroomObj.updateName(newname);
    newnameform.reset();

    // method 2
    // chatroomObj.updateName(newname)
    //     .then(()=>newnameform.reset())
    //     .catch(err=>console.log(err));

    // updatemsg.innerText = `Your name was update to ${newname}`;
    // setTimeout(()=>updatemsg.innerText='',3000);

    // newnameform.name.placeholder = `username is ${newname}`;
    // profilename.textContent = newname;
});
