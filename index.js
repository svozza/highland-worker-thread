const hl = require('highland');
const { Worker } = require('worker_threads');

function createWorkerStream(fileName, workerData) {
    const worker = new Worker(fileName, { workerData });
    return hl(function (push, next) {
        worker.on('message', msg => push(null, msg));
        worker.on('error', err => push(err));
        worker.on('exit', code => {
            if (code !== 0) {
                push(new Error(`Worker stopped with exit code ${code}`));
            } else {
                push(null, hl.nil);
            }
        });
    });
}

createWorkerStream('./worker.js',{start: 0, end: 100})
    .series()
    .each(console.log);