
/**
 * @class
 * Format all the data received
 */
export default class AllDatas {
    constructor([user, activity, sessions, performance]) {
        this._user = user
        this._userActivity = activity
        this._userSessions = sessions
        this._userPerformance = performance
    }

    get id(){
        return this._user.id
    }

    get firstName(){
        return this._user.userInfos.firstName
    }

    get score() {
        const oldScore = this._user.todayScore
        return oldScore === null || oldScore === 0 ? 0 : oldScore * 100
    }

    /**
     * formating datas with 'Intl.NumberFormat for 3 digits with coma
     * Creating new array from object 'this._user.keyData (Object.entries)
     * mapping to change value
     * Creating object from this new Array (Object.fromEntries)
     */
    get keyData() {
        const formatValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
        const NewObject = Object.fromEntries(Object.entries(this._user.keyData).map(([key, value]) => {
            return [key, formatValue.format(value) + (key == 'calorieCount' ? 'Kcal' : 'g')]
        }));
        return NewObject
    }

    //changing index of day
    get activity(){
        return this._userActivity.map(({ kilogram, calories }, index) => {
            return { day: index + 1, kilogram, calories }
        })
    }

    //changin days to get day of week
    get sessions() {
        const days = {
            1: 'L',
            2: 'M',
            3: 'm',
            4: 'J',
            5: 'V',
            6: 'S',
            7: 'D',
        }
        return this._userSessions.map(({ day, sessionLength }) => {
            return { day: days[day], sessionLength }
        })
    }

    //changing kinds values
    get performance() {
        const kinds = [
            "Cardio",
            "Energie",
            "Endurance",
            "Force",
            "Vitesse",
            "Intensité",
        ]
        return this._userPerformance.data.map(({ value, kind }) => {
            return { value, kind: kinds[kind-1] }
        })
    }
}