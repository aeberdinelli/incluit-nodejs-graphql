// Async
function doSomething(callback) {
    for (let i = 0;i < 10;i++) {
        console.log('doing something');
    }

    // Once finished, call the callback
    callback();
}

// Implementation
doSomething(function(err) {
    if (err) {
        console.log('something went wrong');
    }

    console.log('done!');
});

// Transform something into a promise:
const promise = new Promise(function(resolve, reject) {
    // The callback will be the resolve method
    // This sets the promise as resolved/completed
    doSomething(resolve);

    // You could also handle possible errors and reject the promise
    doSomething(function(err) {
        if (err) {
            return reject(err);
        }

        resolve();
    });
});

// Implementation:
promise
    .then(() => console.log('done'))
    .err(() => console.log('error'));

// You could also do:
await promise;