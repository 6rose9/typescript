import { ChatRoom, ChatMessage } from "./ChatRoom";
import { MessageUI } from "./MessageUI";

// get UI
const chatsidebar = document.querySelector(".chat-sidebars") as HTMLElement;
const newnameform = document.querySelector(".new-nameform") as HTMLFormElement;
const newchatform = document.querySelector(".new-chatform") as HTMLFormElement;
const chatlistgroup = document.querySelector(".chat-lists") as HTMLElement;
const updatemsg = document.querySelector(".update-msg") as HTMLElement;
const profilename = document.querySelector("#profilename") as HTMLElement;

const username = localStorage.username ? localStorage.username : "Guest";

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
chatsidebar.addEventListener('click',e=>{

    if(e.target instanceof HTMLButtonElement){
        // console.log("i am btn");
        // console.log(e.target.getAttribute('id'));

        messageuiObj.clearli();
        chatroomObj.updateRoom(e.target.getAttribute('id'));
        chatroomObj.getChats(data=>messageuiObj.renderli(data));
    }

}); 


// get chat & render li 
// chatroomObj.getChats((data)=>{
//     messageuiObj.renderli(data);
// });

// update username
newnameform.addEventListener('submit', e => {
    e.preventDefault();

    //const newname = newnameform.name.value.trim();
    // console.log(newname);

    // method 1
    // chatroomObj.updateName(newname);
    // newnameform.reset();

    // method 2
    // chatroomObj.updateName(newname)
    //     .then(()=>newnameform.reset())
    //     .catch(err=>console.log(err));

    // updatemsg.innerText = `Your name was update to ${newname}`;
    // setTimeout(()=>updatemsg.innerText='',3000);

    // newnameform.name.placeholder = `username is ${newname}`;
    // profilename.textContent = newname;
});
