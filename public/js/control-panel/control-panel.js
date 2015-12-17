var clearOutput = function(e) {
    var outputDiv = $(this).parents(".panel-footer").siblings(".panel-body").children(".output");
    outputDiv.empty();
};

var listDirectory = function(e){
    var buttonClicked = $(this);
    $.get( '/listDir',{}, function(data) {
        var outputDiv = buttonClicked.parents(".panel-footer").siblings(".panel-body").children(".output");
        data = data.replace(/\n/g, "<br/>");
        outputDiv.append(data+'<br />');
        outputDiv.scrollTop(outputDiv[0].scrollHeight);
    });
};


var restartMinecraftServer = function(e){
    var buttonClicked = $(this);
    $.get( '/restartMinecraftServer',{}, function(data) {
        var outputDiv = buttonClicked.parents(".panel-footer").siblings(".panel-body").children(".output");
        data = data.replace(/\n/g, "<br/>");
        //outputDiv.append(data+'<br />');
        outputDiv.append(getTimestamp()+": Restarting server...<br />");
        outputDiv.scrollTop(outputDiv[0].scrollHeight);
    });
};

var stopMinecraftServer = function(e){
    var buttonClicked = $(this);
    $.get( '/stopMinecraftServer',{}, function(data) {
        var outputDiv = buttonClicked.parents(".panel-footer").siblings(".panel-body").children(".output");
        data = data.replace(/\n/g, "<br/>");
        //outputDiv.append(data+'<br />');
        outputDiv.append(getTimestamp()+": Stopping server...<br />");
        outputDiv.scrollTop(outputDiv[0].scrollHeight);
    });
};

var startMinecraftServer = function(e){
    var buttonClicked = $(this);
    $.get( '/startMinecraftServer',{}, function(data) {
        var outputDiv = buttonClicked.parents(".panel-footer").siblings(".panel-body").children(".output");
        data = data.replace(/\n/g, "<br/>");
        //outputDiv.append(data+'<br />');
        outputDiv.append(getTimestamp()+": Starting server...<br />");
        outputDiv.scrollTop(outputDiv[0].scrollHeight);
    });
};

var enableMinecraftServer = function(e){
    var buttonClicked = $(this);
    $.get( '/enableMinecraftServer',{}, function(data) {
        var outputDiv = buttonClicked.parents(".panel-footer").siblings(".panel-body").children(".output");
        data = data.replace(/\n/g, "<br/>");
        //outputDiv.append(data+'<br />');
        outputDiv.append(getTimestamp()+": Enabling server...<br />");
        outputDiv.scrollTop(outputDiv[0].scrollHeight);
    });
};

var disableMinecraftServer = function(e){
    var buttonClicked = $(this);
    $.get( '/disableMinecraftServer',{}, function(data) {
        var outputDiv = buttonClicked.parents(".panel-footer").siblings(".panel-body").children(".output");
        data = data.replace(/\n/g, "<br/>");
        //outputDiv.append(data+'<br />');
        outputDiv.append(getTimestamp()+": Disabling server...<br />");
        outputDiv.scrollTop(outputDiv[0].scrollHeight);
    });
};

var getStatusMinecraftServer = function(e) {
    $.get('/getStatusMinecraftServer', {}, function (data) {
        if (typeof data === 'string' || data instanceof String) {
            //we got a string back, no worries
        } else { //error
            data = "";
        }
        var searchString = "Active: ";
        var startIndex = data.indexOf(searchString);
        var activeFlag = data.charAt(startIndex + searchString.length); //should be a for active or f for failed

        if (activeFlag == 'a') { //service active
            PAGE.statusMinecraftServerUnknown.hide();
            PAGE.statusMinecraftServerActive.show();
            PAGE.statusMinecraftServerOffline.hide();
        } else if (activeFlag == 'f') { //service stopped
            PAGE.statusMinecraftServerUnknown.hide();
            PAGE.statusMinecraftServerActive.hide();
            PAGE.statusMinecraftServerOffline.show();
        } else {//total error
            PAGE.statusMinecraftServerUnknown.show();
            PAGE.statusMinecraftServerActive.hide();
            PAGE.statusMinecraftServerOffline.hide();
        }

        var searchString = "/etc/systemd/system/minecraftserver.service; ";
        var startIndex = data.indexOf(searchString);
        var enabledFlag = data.charAt(startIndex + searchString.length); //should be a for active or f for failed

        if (enabledFlag == 'e') { //service active
            PAGE.enabledMinecraftServerUnknown.hide();
            PAGE.enabledMinecraftServerEnable.show();
            PAGE.enabledMinecraftServerDisabled.hide();
        } else if (enabledFlag == 'd') { //service stopped
            PAGE.enabledMinecraftServerUnknown.hide();
            PAGE.enabledMinecraftServerEnable.hide();
            PAGE.enabledMinecraftServerDisabled.show();
        } else {//total error
            PAGE.enabledMinecraftServerUnknown.show();
            PAGE.enabledMinecraftServerEnable.hide();
            PAGE.enabledMinecraftServerDisabled.hide();
        }
    })
};

var getTimestamp = function() {
    var date = new Date();
    //var year = date.getFullYear();
    //var month = date.getMonth()+1;
    //var day = date.getDate();
    var hours = date.getHours();
    if (hours < 10) {hours = '0'+hours;}
    var minutes = date.getMinutes();
    if (minutes < 10) {minutes = '0'+minutes;}
    var seconds = date.getSeconds();
    if (seconds < 10) {seconds = '0'+seconds;}

    return ''+hours+':'+minutes+":"+seconds;
};

