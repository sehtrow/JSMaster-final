import Axios from 'axios';

const baseApi = Axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
})

export const Api = {
    getCharacters: () => baseApi({
        method: 'GET',
        url: '/character'
    }),
    getPageCharacters: (page) => baseApi({
        method: 'GET',
        url: `/character?page=${page}`
    })
}