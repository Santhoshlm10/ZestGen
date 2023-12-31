class AppStore {
    data: any;

    constructor(data: any) {
        this.data = data;
    }

    updateStoreData(key: string, value: string) {
        this.data[key] = value;
    }

    getStoreData(key: string) {
        return this.data;
    }
}

let appStore = new AppStore({});
export default appStore;
