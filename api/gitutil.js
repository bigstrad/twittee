var exports = module.exports = {};

// private function
function removeNewline(input) {
    return input.replace(/(\r\n|\n|\r)/gm,"");
}

exports.getInfo = function () {
    return new Promise((resolve, reject) => {
        let result = {
            commitId: '',
            commitDate: ''
        };
        // commit id
        require('child_process').exec('git rev-parse HEAD', function (err, stdout) {
            if (err) reject(err);
            result.commitId = removeNewline(stdout);
            // commit date
            require('child_process').exec('git show -s --format=%ci', function (err, stdout) {
                if (err) reject(err);
                result.commitDate = removeNewline(stdout);
                // resolve
                resolve(result);
            });
        });
    })
}