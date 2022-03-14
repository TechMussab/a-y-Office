import CallApi from "./CallApi";
// import {useState} from "react";

class Auth {

     token= null;
     userData={};
    authenticated = false;
    constructor() {
        try {
            this.authenticated = JSON.parse(localStorage.getItem('authenticated'));
            // this.userData = JSON.parse(JSON.stringify(localStorage.getItem('userData')));
            this.userData = JSON.parse(localStorage.getItem('userData'));
            this.token = (localStorage.getItem('token'));
        }catch (e)
        {
            this.authenticated = false
            this.userData = ''
            this.token = ''
        }
        console.log('actual in const: '+localStorage.getItem('authenticated'))

        console.log('in constructor: '+this.authenticated)
        console.log('in constructor: '+this.userData)

    }
    // setToken(token)
    // {
    //     this.token=token;
    // }
    // setUserData(userData)
    // {
    //     this.userData=userData;
    // }
    async login(email,password) {
        console.log('in login func')
        let res = {
            success: true,
        }
        console.log('in login auth? '+this.authenticated)
        if(this.authenticated===false) {
            let temp = new CallApi()
            let res = {
                success: false,
                massage: 'Invalid Email or Password'
            }
            try {
                console.log('Auth pre store pre fetch');
                res = await temp.postData({
                    data: {
                        email: email,
                        password: password
                    }, apiUrl: 'mobileLogin'
                });
                console.log('Auth pre store after fetch');

                console.log('Auth pre store '+this);
                this.userData=res.user;
                this.token=res.token;
                this.authenticated = true;
                console.log('Auth pre store '+this.authenticated);
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('token', this.token.toString());
                localStorage.setItem('userData', JSON.stringify(this.userData));
                console.log('Auth done');
            } catch (e) {
                console.log(e);
            }
        }
        return res
    }

    async logout() {
        //mobileLogOut
        this.authenticated = false;
        let temp = new CallApi()
        let res = await temp.postData({
            data: {
                token:this.token,
            }, apiUrl: 'mobileLogOut'
        });
        localStorage.setItem('authenticated', 'false');
        localStorage.setItem('token', '');
        localStorage.setItem('userData', '');
        return res
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
