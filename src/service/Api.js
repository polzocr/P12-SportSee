import axios from 'axios'

//creating instance that will be used everywhere
const instance = axios.create({
    baseURL: "http://localhost:3000"
})


/**
 * get user infos
 * @param {Number} id of user
 * @returns {Promise}
 */
export async function getUser(id) {
    try{
        const response = await instance.get('/user/' + id)
        return response.data.data
    } catch(err){
        throw new Error(err)
    } 
}


/**
 * get user activities
 * @param {Number} id of user
 * @returns {Promise}
 */
export async function getUserActivity(id) {
    try {
        const response = await instance.get('/user/' + id + "/activity")
        return response.data.data.sessions
    } catch (err) {
        throw new Error(err)
    } 
}


/**
 * get user sessions
 * @param {Number} id of user
 * @returns {Promise}
 */
export async function getUserAverageSessions(id) {
    try {
        const response = await instance.get('/user/' + id + "/average-sessions")
        return response.data.data.sessions
    } catch (err) {
        throw new Error(err)
    } 
}

/**
 * get user performances
 * @param {Number} id of user
 * @returns {Promise}
 */
export async function getUserPerformance(id) {
    try {
        const response = await instance.get('/user/' + id + "/performance")
        return response.data.data
    } catch (err) {
        throw new Error(err)
    } 
}
