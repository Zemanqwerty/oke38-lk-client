import axios from "axios";
import AuthService from "../services/AuthService";
import { makeAutoObservable } from "mobx";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
    email: string | null = null;
    role: string = '';
    isAuth = false;
    isLoading = false;
    response: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setEmail(email: string | null) {
        this.email = email;
    }

    setRole(role: string) {
        this.role = role;
    }

    setResponse(message: string) {
        this.response = message;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }



    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log('---');
            console.log(response);
            console.log('---');
            if (response.data.email) {
                console.log('good');
                localStorage.setItem('token', response.data.accessToken);
                console.log(localStorage.getItem('token'));
                this.setAuth(true);
                this.setEmail(response.data.email);
                this.setRole(response.data.role);
            } else {
                this.setAuth(false);
                this.setEmail(null);
            }
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async registration(type: string,
        lastname: string,
        firstname: string,
        surname: string,
        email: string,
        phoneNumber: string,
        password: string)
    {
        try {
            const response = await AuthService.registration(type, lastname, firstname, surname, email, phoneNumber, password);
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setEmail('');
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        // this.setLoading(true);
        try {
            // const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});

            await AuthService.refresh().then((response) => {
                console.log('access');
                console.log(response.data.accessToken);
                console.log('access');
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setEmail(response.data.email);
                this.setRole(response.data.role);
                console.log(response.data);
            })
        } catch (e) {
            console.log('error while set access');
            console.log(e);
        } finally {
            // this.setLoading(false);
        }
    }

    // async getGuildsList() {
    //     try {
    //         const response = await GuildService.getGuilds();
    //         this.guildsList = response.data;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}