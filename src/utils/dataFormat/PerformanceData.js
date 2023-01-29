export default class PerformanceData {
    constructor({kind, data}) {
        this._kind = kind
        this._data = data
    }

    get performance(){
        return this._data.map(({value, kind}) => {
            return {value, kind: this._kind[kind]}
        })
    }

}