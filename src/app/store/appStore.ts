class AppStore {
    data: any;

    constructor(data: any) {
        this.data = data;
    }

    updateStoreData(key: string, value: string) {
        this.data[key] = value;
    }

    getStoreData(key?: string | any) {
        if(key){
            return this.data
        }else{
            return this.data[key];
        }
    }

    clearStoreData(){
        this.data = {}
    }
}

let appStore = new AppStore({});
export default appStore;
