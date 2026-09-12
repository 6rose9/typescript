import { db } from "./firebaseConfig";
import { addDoc, collection, onSnapshot, query, Timestamp, Unsubscribe, where } from "firebase/firestore";

export interface ChatMessage {
    message: string;
    username: string;
    room: string;
    createdAt: Timestamp
}

export class ChatRoom {

    private chats = collection(db, "chats");
    // private unsubscribe: null | (() => void) = null;
    private unsubscribe: null | Unsubscribe = null;

    constructor(private room: string, private username: string) { }

    private getErrorMessage(error:unknown):string{
       return error instanceof Error ? error.message : "Unknown Error";  
    }

    // create chat message
    async addChat(message: string): Promise<void> {
        const now = new Date();
        const chatdata: ChatMessage = {
            message,
            username: this.username,
            room: this.room,
            createdAt: Timestamp.fromDate(now)
        }

        try {
            await addDoc(this.chats, chatdata);
        } catch (error:unknown) {
            // console.error("Error adding chat:", error);
            // const message = error instanceof Error ? error.message : "Unknown error";
            // throw error;

            // throw this.getErrorMessage(error);
            alert(this.getErrorMessage(error));
        }
    }

    // get chat messages
    getChats(callback: (chatDoc: ChatMessage) => void) {
        // const qry = query(this.chats, where('room', '==', this.room), orderBy('createdAt'));
        const qry = query(this.chats, where('room', '==', this.room));
        this.unsubscribe = onSnapshot(qry, (docSnap: any) => {
            docSnap.docChanges().forEach((item: any) => {
                if (item.type === "added") {
                    callback(item.doc.data());
                }
            });
        });
    }

    // change chat room
    updateRoom(room: string) {
        this.room = room;
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    // update username
    updateName(username: string) {
        // method 1 
        this.username = username;
        localStorage.setItem("username", username);

        // method 2
        // return new Promise(resolve => {
        //     this.username = username;
        //     localStorage.setItem("username", username);
        //     resolve();
        // });
    }

    
}