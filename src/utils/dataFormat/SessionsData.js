export default class SessionsData {
    
    constructor(sessions) {
        this._sessions = sessions
        this.days = {
            1: 'L',
            2: 'M',
            3: 'M',
            4: 'J',
            5: 'V',
            6: 'S',
            7: 'D',
        }
    }


    get sessions() {
        return this._sessions.map(({day, sessionLength}) => {
            return { day: this.days[day], sessionLength}
        })
    }

}

