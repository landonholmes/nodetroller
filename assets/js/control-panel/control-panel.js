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
        outputDiv.append(data+'<br />');
        outputDiv.scrollTop(outputDiv[0].scrollHeight);
    });
};

var getStatusMinecraftServer = function(e){
    $.get( '/getStatusMinecraftServer',{}, function(data) {
        if (typeof data === 'string' || data instanceof String) {
            //we got a string back, no worries
        } else { //error
            data = "";
        }
        var searchString = "Active: ";
        var startIndex = data.indexOf(searchString);
        var activeFlag = data.charAt(startIndex+searchString.length); //should be a for active or f for failed

        if (activeFlag == 'a'){ //service active
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
    });

};