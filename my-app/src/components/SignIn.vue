<template>
    <div>
        <v-card>
            <h1>Welcome To Recipe Roulette</h1>
            <h2>{{ login ? 'Login' : 'Sign-Up' }}</h2>
            <v-window v-if="login">
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
                <v-btn class="mt-2" type="submit" block>Login</v-btn>
                </v-form>
            </v-window>
            <v-window v-if="!login">
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
                <v-btn class="mt-2" type="submit" block>Sign-Up</v-btn>
                </v-form>
            </v-window>
            <v-row>
                <v-col>
                    <v-btn 
                     @click="login = !login"
                     :active="!login"
                    >
                        Sign-Up
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn 
                     @click="login = !login"
                     :active="login"
                    >
                        Login
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>

export default {
    name: 'SignIn',
    data: () => ({
        title: 'Sign Up/Log In',
        username: null,
        password: null,
        re_enter_password: null,
        login: true
    })
}
</script>
