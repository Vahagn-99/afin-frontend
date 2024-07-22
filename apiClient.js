import axios from 'axios';
import {getParameterByName} from "@/helper/function.js";

const cookies = document.cookie.split(';');
let retrievedJsonData = null;
for (let i = 0; i < cookies.length; i++) {

    const cookie = cookies[i].trim();
    if (cookie.startsWith('credentials=') && cookie.substring('credentials='.length, cookie.length).length > 5) {
        const cookieValue = cookie.substring('credentials='.length, cookie.length);
        retrievedJsonData = JSON.parse(decodeURIComponent(cookieValue));
        break;
    }
}


let url='https://afin-panel.ru/api/v1/'
let token=getParameterByName('access_token')
console.log(token)

if(!token&&retrievedJsonData){
    localStorage.setItem('token', retrievedJsonData.access_token)
    token = localStorage.getItem("token")
}

const apiClient =
    axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
        },
    });



export default apiClient