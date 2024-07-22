import axios from 'axios';

let url='https://afin-panel.ru/api/v1/'

const centerClient =
    axios.create({
        baseURL:  url,
        headers: {
            'Content-Type': 'application/json',

        },

    });

export default centerClient

