exports.run_cmd = function(sudo, cmd, args, callback, onErrCallback ) {
    var childProcess = require('child_process');
    var resp = "";

    if (sudo) {
        var command = "sudo "+cmd;
        for (var i=0; i<args.length;i++) {
            command += " "+args[i];
        }
        console.log('cmd: ',command);
        var child = childProcess.exec(command, function(err,stdout,stderr){
            if (err) {
                if (onErrCallback != undefined) {
                    onErrCallback(err);
                } else {
                    //throw err;
                    console.log('Error in run_cmd exec: ',err);
                }
            }
            callback(stdout.toString());
        });

        child.on('exit', function (code) { console.log('run_cmd exec process exited with code: ',code);});
    } else {
        var child = childProcess.spawn(cmd, args);

        child.stdout.on('data', function (buffer) { resp += buffer.toString() });
        child.stdout.on('end', function() { callback (resp) });
        child.on('error',function(err){
            if (onErrCallback != undefined) {
                onErrCallback(err);
            } else {
                //throw err;
            }
        });
    }



};

