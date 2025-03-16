import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://prolegomenon.s3.amazonaws.com',
})

export const getContent = async () => {
    try {
        return (await axiosInstance.get('/contents.json')).data
    } catch (e) {
        throw e
    }
}