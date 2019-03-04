const { workerData, parentPort } = require('worker_threads');

function isPrime(n) {
    const sqrt = Math.sqrt(n);

    for (let i = 2; i <= sqrt; i++)
        if (n % i === 0) return false;
    return true;
}

function range(start, end) {
    let xs = [];
    for(let i = start; i < end; i++) {
        xs.push(i)
    }
    return xs;
}

const {start, end} = workerData;

const primes = range(start, end).filter(isPrime);

parentPort.postMessage(primes);
