const assert = require('chai').assert
const {createWorkerStream} = require('../index');

describe('index.js', () => {

    describe('createWorkerStream', () => {

        it('should list number of primes under 20', () => {
            return createWorkerStream('./worker.js',{start: 1, end: 20})
                .toPromise(Promise)
                .then(xs => assert.deepEqual(xs, [1, 2, 3, 5, 7, 11, 13, 17, 19]))
        });

    })

});