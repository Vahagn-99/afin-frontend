import axios from 'axios';

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

let token = null;
let cid = null;


let url='https://afin-panel.ru/api/v1/'


if (retrievedJsonData) {
    localStorage.setItem('token', retrievedJsonData.access_token)
    token = localStorage.getItem("token")
}else{
    token=getParameterByName('token')
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

function getParameterByName(name, url) {
    console.log('---',name,url)
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


export default apiClient