import * as firebase from 'firebase/app';
import "firebase/auth";

class Auth {
    constructor() {
        this.username = null;
        this.email = null
        this.errorCode = null;
        this.fetching = false;
        this.verifyEmail = false;
        this.loggedIn = false;
    }

    async signUp(email,username, password) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.auth().currentUser.updateProfile({
                displayName: username
            });
            this.username = await firebase.auth().currentUser.displayName;
            await this.sendEmailVerification();
            this.email = email;
            this.verifyEmail = true;
            this.errorCode = null;
        } catch(error) {
            this.errorCode = error.code;
        }
    }

    async sendEmailVerification() {
        let url = `https://${window.location.hostname.replace("wwww.", "")}`
        if (url === "https://localhost") {
            url = url.replace("https", "http") + ":3000";
        }    
        var actionCodeSettings = {
            url: `${url}/?email=${firebase.auth().currentUser.email}`,
            handleCodeInApp: false,
        };
        await firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
    }

    async logIn(email, password) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            const currentUser = await firebase.auth().currentUser;
            this.username = await currentUser.displayName;
            this.errorCode = null;
            this.email = email;
            if (currentUser.emailVerified) {
                this.loggedIn = true;
            } else {
                this.verifyEmail = true;
            }
        }catch(error) {
            this.errorCode = error.code;
        }
    }

    async deleteUser() {
        try {
            const user = firebase.auth().currentUser;
            console.log(user);
            await user.delete();
        }catch(e) {
            console.log(e);
        }    
    }
}

export default Auth;