import {USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE} from '../data/datas'

/**
 * get user infos in data.js
 * @param {Number} id of user
 * @returns {Object}
 */
export function getUser(id){
    return USER_MAIN_DATA.find(user => user.id = id)
}

/**
 * get user activities in data.js
 * @param {Number} id of user
 * @returns {Object}
 */
export function getUserActivity(id){
    return USER_ACTIVITY.find(user => user.id = id).sessions
}

/**
 * get user sessions in data.js
 * @param {Number} id of user
 * @returns {Object}
 */
export function getUserAverageSessions(id){
    return USER_AVERAGE_SESSIONS.find(user => user.id = id).sessions
}


/**
 * get user performances in data.js
 * @param {Number} id of user
 * @returns {Object}
 */
export function getUserPerformance(id){
    return USER_PERFORMANCE.find(user => user.id = id)
}