import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteApiEndpoint)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userData = await this.account.create(ID.unique(), email, password, name);
            if (userData) {
                return this.login({ email, password })
            }
            else {
                return userData;
            }
        } catch (error) {
            console.log("Appwrite::AuthService::createAccount::error", error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite::AuthService::login::error", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite::AuthService::getCurrentUser::error", error.message)
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite::AuthService::logout::error", error)
        }
    }

}

const authService = new AuthService()

export default authService