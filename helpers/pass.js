var crypto = require('crypto');
var defaultLength = 128;
var defaultIterations = 10000;

exports.hash =  function(pass, callback) {
    crypto.randomBytes(defaultLength, function (err, salt) {
        if (err) {throw err;}
        exports.hashWithOptions(pass, defaultIterations, salt, callback);
    });
};

exports.hashWithOptions =  function(pass, iterations, salt, callback) {
    crypto.pbkdf2(pass, salt, iterations, 256, function (err, hash) {
            if (err) { throw err; }
            var hashed = (new Buffer(hash).toString('hex'));
            salt = salt.toString('hex');
            var hashedPassword = iterations + ':' + salt + ':' + hashed;
            callback(null, hashedPassword);
    });
};

exports.validatePassword = function(attemptedPassword, storedPassword, callback) {
    var parts = storedPassword.split(":"); //get the parts of the stored password
    if (parts.length != 3) { //crap out if the stored password does not have the right parts
        console.log('comparison password does not have 3 parts');
        callback(false);
    }
    var storedPasswordIterations = parseInt(parts[0]); //get the stored password iterations
    var storedPasswordSalt = parts[1]; //get the stored password salt
    exports.hashWithOptions(attemptedPassword, storedPasswordIterations, storedPasswordSalt, function(err, e){ //encode our attempted password in the same way as the stored one, then compare
        callback(e == storedPassword);
    });
};
