<template>
    <v-content>
        <v-container
                fluid
                fill-height
        >
            <v-layout
                    align-center
                    justify-center
            >
                <v-flex
                        xs12
                        sm8
                        md4
                >
                    <v-card class="elevation-12">
                        <v-toolbar
                                color="primary"
                                dark
                                flat
                        >
                            <v-toolbar-title>Login form</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-form @submit.prevent="onSubmit">
                                <v-text-field
                                        label="Login"
                                        type="text"
                                        v-model="username"
                                ></v-text-field>

                                <v-text-field
                                        id="password"
                                        label="Password"
                                        v-model="password"
                                        type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="onSubmit">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import {authenticationService} from '../auth'
    import router from '../router'
    export default {
        data () {
            return {
                username: 'admin',
                password: 'admin',
                submitted: false,
                loading: false,
                returnUrl: '',
                error: ''
            };
        },
        created () {
            // redirect to home if already logged in
            if (authenticationService.currentUserValue) {
                return this.$route.push('/');
            }

            // get return url from route parameters or default to '/'
            this.returnUrl = this.$route.query.returnUrl || '/';
        },
        methods: {
            onSubmit () {
                this.submitted = true;
                this.loading = true;
                authenticationService.login(this.username, this.password)
                    .then(
                        () => router.push(this.returnUrl),
                        error => {
                            this.error = error;
                            this.loading = false;
                        }
                    );
            }
        }
    };
</script>