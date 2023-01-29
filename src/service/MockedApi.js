import {USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE} from '../data/datas'


export function getUser(id){
    return USER_MAIN_DATA.find(user => user.id = id)
}

export function getUserActivity(id){
    return USER_ACTIVITY.find(user => user.id = id).sessions
}

export function getUserAverageSessions(id){
    return USER_AVERAGE_SESSIONS.find(user => user.id = id).sessions
}

export function getUserPerformance(id){
    return USER_PERFORMANCE.find(user => user.id = id)
}