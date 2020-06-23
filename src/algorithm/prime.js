export const primeBruteForce = (primeCount) => {
    const primes = [];
    let n = primes.length;
    let flag = true;

    let i = 2;
    while (n < primeCount) {
        flag = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                flag = false;
                break;
            }
        }

        if (flag) {
            primes.push(i);
            n++;
        }
        i++;
    }

    return primes;
};

export const primeEratosthenes = (primeCount) => {
    // This demo can be found at http://jsfiddle.net/KARZw/
    // Eratosthenes algorithm to find all primes under n
    var array = [],
        upperLimit = Math.sqrt(primeCount),
        primes = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < primeCount; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < primeCount; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (var i = 2; i < primeCount; i++) {
        if (array[i]) {
            primes.push(i);
        }
    }

    return primes;
};
