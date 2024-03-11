<template>
    <div class="page">
        <v-card
         color="white"
         class="page_card"
         elevation="16"
        >
            <h1 class="center_title">Welcome To Recipe Roulette</h1>
            <h2 class="center_title">{{ login ? 'Login To Existing Account' : 'Create an Account' }}</h2>
            <v-window class="login_signup" v-if="login">
                <v-form @submit.prevent>
                    <v-text-field
                        v-model=username
                        :rules="rules"
                        label="Username"
                    ></v-text-field>
                    <v-text-field
                        v-model=password
                        :rules="rules"
                        label="Password"
                    ></v-text-field>
                    <v-btn 
                    class="mt-2 anta-regular" 
                    type="submit" 
                    block
                    @click="checkLogin()"
                    >
                        Login
                    </v-btn>
                </v-form>
                <div class="accountActionBtn">
                        <v-row dense class="anta-regular">
                            <span class="account-check">Don't have an account?</span> 
                            <v-btn
                            plain
                            class="anta-regular"
                            style="margin-left:0.5rem"
                            @click="login = !login"
                            >
                            Sign-Up
                            </v-btn>
                        </v-row>
                </div>
            </v-window>
            <v-window class="login_signup" v-if="!login">
                <v-form @submit.prevent>
                <v-text-field
                    v-model="username"
                    :rules="rules"
                    label="Username"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="rules"
                    label="Password"
                ></v-text-field>
                <v-text-field
                    v-model="re_enter_password"
                    :rules="rules"
                    label="Re-enter Password"
                ></v-text-field>
                <v-btn 
                 class="mt-2 anta-regular" 
                 type="submit" 
                 block
                 @click="checkSignUp()"
                >
                    Sign-Up
                </v-btn>
                </v-form>
                <div class="accountActionBtn">
                    <v-row dense class="anta-regular">
                        <span class="account-check">Already have an account?</span> 
                        <v-btn
                         plain
                         class="anta-regular invisible"
                         style="margin-left:0.5rem"
                         @click="login = !login"
                        >
                        Login
                        </v-btn>
                    </v-row>
                </div>
            </v-window>
            <div class="text-center">
                <v-btn
                 class="mt-2 anta-regular" 
                 type="submit" 
                 ref="forceReload"
                 @click="reloadPage()"
                >Reload
            </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script >

export default {
    name: 'SignIn',
    data: () => ({
        title: 'Sign Up/Log In',
        username: '',
        password: '',
        re_enter_password: '',
        login: true,
        validLoginAccount: null,
        validSignUpAccount: null,
        accounts: [],
        test: []
    }),
    created: function() {
        this.initializeAccounts();
    },
    methods: {
        async retrieveAccounts() {
            return fetch('http://localhost:8080/getAccounts', {
                method: 'GET',
                headers: {
                    'If-Modified-Since': 'YourLastModifiedTime'
                }
            })
            .then(response => {
                if (response.status === 304) {

                } else if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        return response.json(); // Parse JSON response
                    } else {
                        return response.text(); // Return plain text response
                    }
                } else {
                    throw new Error(`Failed to retrieve response data: ${response.status}`)
                }
            })
            .then(e => {
                let accountsArray = [];
                e.forEach((account) => {
                    accountsArray.push({
                            'username': account.Name,
                            'password': account.Password__c,
                            'ImageLinks': account.ImageLinks__c
                    })
                })
                return accountsArray;
                //alert('Successful Retrieval')
            })
            .catch(error => {
                console.log(error);
            })
        },
        async initializeAccounts() {
            this.accounts = await this.retrieveAccounts()
        },
        checkLogin() {
            this.validLoginAccount = false;
            if (this.login) {
                this.accounts.forEach((account) => {
                    if (this.username === account?.username && this.password === account?.password) {
                        this.validLoginAccount = true;
                    }
                })
            }
            this.sendSignInResults()
        },
        async checkSignUp() {
            this.validSignUpAccount = true;
            this.accounts.forEach((account) => {
                    if (
                        this.username === account?.username && 
                        this.password === account?.password
                        ) 
                    {
                        this.validSignUpAccount = false;
                    }
            })
            if (this.password === this.re_enter_password && this.validSignUpAccount) {
                this.createNewAccount();
                this.accounts = await this.retrieveAccounts();
                this.login = !this.login
                this.$refs.forceReload.$el.click();
            } else {
                this.validSignUpAccount = false;
            }

        },
        createNewAccount() {
            const newUsername = this.username
            const newPassword = this.password

            fetch('http://localhost:8080/addAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: newUsername, password: newPassword })
            })
            .then(response => {
                if (!response.ok) { throw new Error("Failed creating an account")}
            })
            .catch(error => {
                console.log(error);
            })
        },
        sendSignInResults() {
            this.$emit('send-sign-in-results', this.validLoginAccount)
        },
        reloadPage() {
            window.location.reload();
        }
    }
    
}
</script>
<style>
    .center_title {
        text-align: center;
    }
    h1 {
        margin: 3.5rem;
        font-family: "Anta", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    h2 {
        margin: 2.0rem;
        font-family: "Anta", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    .login_signup {
        margin-left: 25%;
        margin-right: 25%;
        margin-bottom: 15%
    }
    .accountActionBtn {
        margin:2rem
    }
    .page_card {
        height: 100%;
        margin:0;
    }
    .page {
        height:100%;
        font-size: 1.6rem;
        display: grid;
        place-items: center;
        min-height: 200px;
        border: 8px solid;
        padding: 1rem;
        border-width: 10px;
	    border-image: repeating-linear-gradient(45deg, red, black 4%) 1;
        background-color:rgb(144, 92, 88)
    }
    .account-check {
        font-size: 1.2rem;
    }
    .anta-regular {
        font-family: "Anta", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    .reload {
        left: 22.2rem
    }
</style>../lib/TsFunctions/retrieveAccounts
