var app = {

    exit_dlg: false,
    locale: 'ru',

    init: function(){
        this.bindEvents();
    },
    
    bindEvents: function(){
        var body = $('body'),
            sidebar = $('.sidebar');

        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnline, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
        document.addEventListener('volumeup', this.onVolumeUp, false);
        document.addEventListener('volumedown', this.onVolumeDown, false);
        document.addEventListener('backbutton', this.onBackButton, true);
        document.addEventListener('menubutton', this.onMenuButton, true);
        document.addEventListener('searchbutton', this.onSearchButton, true);

        body.touch({
            allowPageScroll:"vertical",
            swipe: function(event, direction, distance, duration, fingerCount, fingerData){
                var sidebar_obj = sidebar.data('sidebar');

                if (direction == 'right' && fingerData[0].start.x < 24) {
                    if (!sidebar_obj.isOpened()) {
                        sidebar_obj.open();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                } else if (sidebar_obj.isOpened() && direction == 'left') {
                    sidebar_obj.close();
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // Swipe on screen

                }
            }
        });

    },
    
    onDeviceReady: function(){

    },

    onOffline: function(){},
    onOnline: function(){},
    onPause: function(){},
    onResume: function(){},
    onVolumeUp: function(){},
    onVolumeDown: function(){},

    onBackButton: function(){
        if (app.exit_dlg === true) {
            app.exit();
        }
        app.exit_dlg = true;
        coreToasts(locale[app.locale].msg_exit, function(){
            app.exit_dlg = false;
        });
    },

    /* for android hardware MenuButton
     1) open platforms\android\platform_www\cordova.js
     2) find cordova.addDocumentEventHandler('menubutton');
     3) replace with
     var menuButtonChannel = cordova.addDocumentEventHandler('menubutton');
     menuButtonChannel.onHasSubscribersChange = function() {
         exec(null, null, APP_PLUGIN_NAME, "overrideButton", [this.numHandlers == 1]);
     };
    */
    onMenuButton: function(){
    },

    /* for android hardware SearchButton
     1) open platforms\android\platform_www\cordova.js
     2) find cordova.addDocumentEventHandler('searchbutton');
     3) replace with
     var searchButtonChannel = cordova.addDocumentEventHandler('searchbutton');
     searchButtonChannel.onHasSubscribersChange = function() {
        exec(null, null, APP_PLUGIN_NAME, "overrideButton", [this.numHandlers == 1]);
     };
    */
    onSearchButton: function(){
    },

    exit: function(){
        navigator.app.exitApp();
    }
};