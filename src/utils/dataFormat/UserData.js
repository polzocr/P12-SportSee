export default class UserData {
    constructor(user) {
        this._keyData = user.keyData
        this._id = user.id
        this._firstName = user.userInfos.firstName
        this._calorie = user.keyData.calorieCount
        this._protein = user.keyData.carbohydrateCount
        this._carbohydrate = user.keyData.lipidCount
        this._lipid = user.keyData.proteinCount
        this._todayScore = user.todayScore

    }

    get id(){
        return this._id
    }

    get firstName(){
        return this._firstName
    }

    get calorie(){
        const stringCal = String(this._calorie)
        if (this._calorie > 9999){
            return stringCal.slice(0, 2) + "," + stringCal.slice(2) + 'kCal'
        } else if (this._calorie > 999){
            return stringCal.slice(0, 1) + "," + stringCal.slice(1) + 'kCal'
        } else {
            return String(this._calorie) + 'kCal'
        }
    }
    
    get protein(){
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
            .format(this._protein) + 'g'
    }

    get carbohydrate(){
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
            .format(this._carbohydrate) + 'g'
    }

    get lipid() {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
            .format(this._lipid) + 'g'
    }

    get score(){
        return this._todayScore === null || this._todayScore === 0 ? 0 : this._todayScore*100
    }

    get keyData(){
        const formatValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
        const NewObject = Object.fromEntries(Object.entries(this._keyData).map(([key, value]) => {
            return [key, formatValue.format(value) + (key == 'calorieCount' ? 'Kcal' : 'g')]
        }));
        return NewObject
    }
}

