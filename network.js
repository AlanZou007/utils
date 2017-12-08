class Network {
    constructor(callback) {
        this.navigator = window.navigator;
        this.callback = callback;
        this._init();
    }
    
    _init() {
        window.addEventListener('online', () =>{
            this._fnNetworkHandler();
        }, true);
        
        window.addEventListener('offline', () => {
            this._fnNetworkHandler();
        }, true);
    }
    
    _fnNetworkHandler() {
        this.callback && this.callback(this.navigator.onLine ? 'online' : 'offline') ;
    }
    
    isOnline() {
        return this.navigator.onLine ;
    }
}

export default Network
