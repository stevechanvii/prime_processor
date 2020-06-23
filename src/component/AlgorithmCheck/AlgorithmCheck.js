export default {
    'Brute Force': [
        'Loop number one by one',
        'Set another inner loop from 2 to current number N',
        'For each inner loop, get the remainder and compare with 0',
        'If the remainder is 0, set the flag to false and jump out the loop',
        'If flag is true then N is prime',
        'Time complexity: O(N²)',
    ],
    'Sieve of Eratosthenes': [
        'Create a list of consecutive integers from 2 through n',
        'Initially, let p equal 2, the smallest prime number',
        'Enumerate the multiples of p by counting in increments of p from 2p to n, and mark them in the list',
        'Find the first number greater than p in the list that is not marked. If there was no such number, stop. Otherwise, let p now equal this new number (which is the next prime), and repeat from previous step',
        'When the algorithm terminates, the numbers remaining not marked in the list are all the primes below n',
        'Time complexity: O(nlog logn)',
    ],
};
