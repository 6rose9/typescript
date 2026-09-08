import { Timestamp } from "firebase/firestore";
import { auth, provider } from "./firebaseConfig.js";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signInWithPopup
} from "firebase/auth";
import { id } from "date-fns/locale";

export class Authorize {
    private defaultprofileimg;
    constructor() {
        this.defaultprofileimg = "https://static.thenounproject.com/png/65476-200.png";

        // console.log(window.location.pathname); // /l52chatroomwithauth/index.html
        // console.log(window.location.pathname.replace(/\/[^/]*$/,'/')); // /l52chatroomwithauth/ 
        // console.log(window.location.pathname.replace(/[^/]*$/,'')); // /l52chatroomwithauth/

        // ^ start with             = '/^abc/'    = abc...
        // $ end with               = '/abc$/'    = ...abc
        // * quantifier 0 or more   = '/a*/'      = aaa
        // *$ qunaitfier + end      = '/[0-9]*$/' =

        // console.log(/^a/.test("abc")); // true   => start with a
        // console.log(/^a/.test("bca")); // false  => start with a

        // console.log(/[^a]/.test("abc")); // true => b and c are not a
        // console.log(/[^a]/.test("bc")); //  true => b and c are not a
        // console.log(/[^a]/.test("bac")); // true => b and c are not a
        // console.log(/[^a]/.test("bca")); // true => b and c are not a
        // console.log(/[^a]/.test("a")); //   false => a
        // console.log(/[^a]/.test("aa")); //   false => a

        // $ ->  = until end of string 
        // [^/]* = zero or more characters that are not /
        // /[^/]*$/


    }

    // helper to redirect relative to current directory 
    redirectTo(page: string) {
        const base = window.location.pathname.replace(/\/[^/]*$/, '/');
        window.location.href = base + page;
    }

    // Register user with fullname email & password
    async registerUser(fullname: string, email: string, password: string) {

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile 
            await updateProfile(user, {
                displayName: fullname,
                photoURL: this.defaultprofileimg
            })


            // Save username locally 
            this.setLocalName(user);


            // Redirect to index 
            // window.location.href = "../index.html";

            this.redirectTo("index.html");

        } catch (error:any) {
            console.error("Error registering users : ", error);
            window.alert(error.message);
        }

    }

    // Login user with email & password
    async loginUser(email:string, password:string) {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // set name to localstorage 
            this.setLocalName(user);

            // Redirect to index.html
            // window.location.href = "../index.html";

            this.redirectTo("index.html");

        } catch (error: any) {
            console.error("Error logging in : ", error);
            window.alert(error.message);
        }

    }

    // Logout user
    async logoutUser() {

        try {

            await signOut(auth);

            // unset name from localstorage 
            this.unsetLocalName();

            // Redirect to signin.html
            // window.location.href="../signin.html";

            this.redirectTo("signin.html");

        } catch (error:any) {
            console.error("Error logging out : ", error);
            window.alert(error.message);
        }

    }

    // Reset password
    async resetPassword(email:string, msgElement:HTMLElement) {

        try {

            await sendPasswordResetEmail(auth, email);

            msgElement.textContent = "Password reset email send. Please check your inbox.";
            msgElement.style.color = "green";
            msgElement.style.fontSize = "11px";

        } catch (error:any) {

            console.error("Error sending password reset email = ", error);
            window.alert(error.message);

            msgElement.textContent = `Error : ${error.message}`;
            msgElement.style.color = "red";
            msgElement.style.fontSize = "11px";

        }

    }

    // Google Login
    async googleLogin() {

        try {
            const result = await signInWithPopup(auth, provider);

            // set name to localstorage 
            this.setLocalName(result.user);

            // Redirect to index.html
            // window.location.href = "../index.html";

            this.redirectTo("index.html");

        } catch (error:any) {
            console.error("Error with Google sign-in = ", error);
            window.alert(error.message);
        }

    }

    // Check if user is logged in
    isLoggedIn() {

        onAuthStateChanged(auth, (user) => {
            if (!user) {
                // Redirect to sign.html
                // window.location.href = "../signin.html";

                this.redirectTo("signin.html");
            }
        });

    }

    // Get current user Info
    getUser(callback: (user:any)=>void) {
        onAuthStateChanged(auth, (user) => {
            if (user) callback(user);
        });
    }


    // Local storage helper methods 
    setLocalName(userdata:any) {
        localStorage.setItem("username", userdata.displayName || "Guest");
    }

    unsetLocalName() {
        localStorage.removeItem("username");
    }

}


