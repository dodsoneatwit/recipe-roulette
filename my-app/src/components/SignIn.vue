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
                        :rules="[rules.min]"
                        label="Username"
                    ></v-text-field>
                    <v-text-field
                        v-model=password
                        :rules="[rules.min]"
                        label="Password"
                    ></v-text-field>
                    <v-btn 
                        class="mt-2 anta-regular" 
                        type="submit" 
                        block
                        @click="checkLoginSignUp()"
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
                    :rules="[rules.min]"
                    label="Username"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="[rules.min]"
                    label="Password"
                ></v-text-field>
                <v-text-field
                    v-model="re_enter_password"
                    :rules="[rules.min]"
                    label="Re-enter Password"
                ></v-text-field>
                <v-btn 
                    class="mt-2 anta-regular" 
                    type="submit" 
                    block
                    @click="checkLoginSignUp()"
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
import { reactive } from 'vue';
import Account from "../lib/Classes/Account"

export default {
    name: 'SignIn',
    data: () => ({
        api_url: import.meta.env.VITE_APP_GATEWAY_URL,
        title: 'Sign Up/Log In',
        username: '',
        password: '',
        re_enter_password: '',
        account: null,
        login: true,
        validAccount: false,
        test: [],
        rules: {
            required: value => !!value || 'This field is required',
            min: v => v.length >= 6 || 'Minimum 6 characters',
            email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        }
    }),
    watch: {
        account(newAccount) {
            if (newAccount) {
                console.log('--ACCOUNT--',newAccount)
                this.sendSignInResults();
            }
        }
    },
    methods: {
        // async retrieveAccounts() {
        //     console.log('--RETRIEVE ACCOUNTS HIT--')
        //     let result = await fetch(`${this.api_url}/dev/api/get_accounts`, {
        //         method: "GET",
        //         headers:    {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     console.log(result)
        //    let data = await result.json()
        //    return data
        // },
        // async initializeAccounts() {
        //     this.accounts = await this.retrieveAccounts()
        // },
        async checkLoginSignUp() {
            console.log('--RETRIEVE ACCOUNTS HIT--')
            // account login or signin
            let result = await fetch(`${this.api_url}/dev/api/${this.login ? 'login_to_account' : 'create_account'}`, {
                method: "POST",
                headers:    {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            })
            let data = await result.json()
            console.log('--DATA--', data)
            // initializing account if valid response
            if (data.user !== undefined) {
                this.account = {
                    id: data.user.user_id,
                    username: data.user.username,
                    password: data.user.password,
                    recipe_ids: this.login ? data.user.savedRecipes : []
                }
                alert(`Success: ${data.message}`)
                // this.sendSignInResults()
            } else {
                alert(`Error: ${data.message}`)
            }

        },
        async sendSignInResults() {
            // send sign-in results to component
            let signInResults = {
                validAccount: true,
                account: this.account
            }
            this.$emit('send-sign-in-results', signInResults)
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
