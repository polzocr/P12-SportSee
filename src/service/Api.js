import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

export async function getUser(id) {
    try{
        const response = await instance.get('/user/' + id)
        return response.data.data
    } catch(err){
        throw new Error(err)
    } 
}

export async function getUserActivity(id) {
    try {
        const response = await instance.get('/user/' + id + "/activity")
        return response.data.data.sessions
    } catch (err) {
        throw new Error(err)
    } 
}

export async function getUserAverageSessions(id) {
    try {
        const response = await instance.get('/user/' + id + "/average-sessions")
        return response.data.data.sessions
    } catch (err) {
        throw new Error(err)
    } 
}

export async function getUserPerformance(id) {
    try {
        const response = await instance.get('/user/' + id + "/performance")
        return response.data.data
    } catch (err) {
        throw new Error(err)
    } 
}
