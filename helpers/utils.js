exports.run_cmd = function(cmd, args, callback, onErrCallback ) {
    var spawn = require('child_process').spawn;
    console.log('cmd: ',cmd);
    console.log('args: ',args);
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callback (resp) });
    child.on('error',function(err){
        console.log('run_cmd error: ',err);
        if (onErrCallback != undefined) {
            onErrCallback(err);
        } else {
            //throw err;
        }
    });
};

/* Example usage: from http://stackoverflow.com/a/17466459
    run_cmd( "ls", ["-l"], function(text) { console.log (text) });
    run_cmd( "hostname", [], function(text) { console.log (text) });
*/
