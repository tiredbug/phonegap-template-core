var app = {
    init: function(){
        this.bindEvents();
    },
    
    bindEvents: function(){
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function(){

    }
}