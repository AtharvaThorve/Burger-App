import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://myburgerapp-2567a.firebaseio.com/'
})

export default instance