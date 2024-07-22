import {defineStore} from "pinia";
import {ref} from "vue";
import centerClient from "../../centerClient.js";
import apiClient from "../../apiClient.js";

export const useProfileStore = defineStore('profile', () => {

    const user=ref({
        email:null,
        password:null
    })
    const authorized = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('credentials=') && cookie.substring('credentials='.length, cookie.length).length > 5) {
                return true
            }
        }

        return false
    }

    const errors=ref([])

    const logout = async (state = null) => {
            await apiClient.post(`logout`, user.value);
            let domain = 'https://view.afin-panel.ru'
            localStorage.clear();
            document.cookie = `credentials=''; path=/;`;
            window.location.href = domain
    }
        const login = async (state = null) => {
        try{
            const cookies = document.cookie.split(";");

            // Iterate through each cookie and set its expiration date to the past
            cookies.forEach(cookie => {
                const cookieName = cookie.split("=")[0].trim();
                document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });

            // Inform the user that the cookies have been cleared
            console.log("All cookies have been cleared.");

            const response =await centerClient.post(`login`, user.value);
            console.log(response.data)
            const credentials = JSON.stringify(response.data);

            localStorage.setItem('authorized', credentials);

            let domain = 'https://view.afin-panel.ru'
            const encodedJsonString = encodeURIComponent(credentials);
            document.cookie = `credentials=${encodedJsonString}; path=/;`;
            window.location.href = domain

            errors.value=[];
        }catch (e){
            errors.value=e.response.data.errors;
        }
    }

    return {
        user,
        errors,
        authorized,
        login,
        logout
    };
});
