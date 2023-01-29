export default class ActivityData {
    constructor(sessions) {
        this._sessions = sessions
    }

    get sessions(){
        return this._sessions.map(({kilogram, calories}, index) => {
            return {day:index+1, kilogram, calories}
        })
    }
}