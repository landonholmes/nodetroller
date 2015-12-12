exports.run_cmd = function(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
    child.on('error',function(err){callBack(err);});
};

/* Example usage: from http://stackoverflow.com/a/17466459
    run_cmd( "ls", ["-l"], function(text) { console.log (text) });
    run_cmd( "hostname", [], function(text) { console.log (text) });
*/
