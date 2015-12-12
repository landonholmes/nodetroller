exports.run_cmd = function(sudo, cmd, args, callback, onErrCallback ) {
    var childProcess = require('child_process');

    if (sudo) {
        var command = "sudo"+cmd;
        for (var i=0; i<args.length;i++) {
            command += " "+args[i];
        }
        console.log('cmd: ',command);
        var child = childProcess.exec(command);
    } else {
        var child = childProcess.spawn(cmd, args);
    }

    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callback (resp) });
    child.on('error',function(err){
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
