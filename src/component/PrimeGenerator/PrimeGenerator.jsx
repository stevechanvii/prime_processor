import React, { useState, useEffect } from 'react';

import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import algorithmCheck from '../AlgorithmCheck/AlgorithmCheck';
import { primeBruteForce, primeEratosthenes } from '../../algorithm/prime';

const PrimeGenerator = () => {
    /**
     * primeCount: the number of primes to be calculated
     * algorithm: a string of selected algorithm
     * primes: a list of prime numbers
     * loading: boolean state to check weather the algorithm is running
     * info: a short description of running status
     * isVisible: a modal display
     */
    const [primeCount, setPrimeCount] = useState(1000);
    const [algorithm, setAlgorithm] = useState('Brute Force');
    const [primes, setPrimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState('');
    const [isVisible, setVisible] = useState(false);
    const [modal, setModal] = useState({ name: 'Error', desc: ['Input must be an integer'] });

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    /**
     * Radio button change handler
     */
    const onAlgorithmCheckClick = () => {
        console.log('Check');
        setModal({ name: algorithm, desc: algorithmCheck[algorithm] });
        showModal();
    };

    /**
     * Button Generate Prime click handler, set loading to provoke effect hook
     */
    const clickHandler = () => {
        const n = parseInt(primeCount);
        console.log(algorithm);
        if (n > 0 && Number.isInteger(n)) {
            if (algorithm === 'Brute Force' && primeCount > 10000) {
                setModal({
                    name: 'Error',
                    desc: [
                        'Brute Force will spend you minutes to calculate, try a smaller number or use Eratosthenes algorithm',
                    ],
                });
                showModal();
            } else if (algorithm === 'Sieve of Eratosthenes' && primeCount > 500000) {
                setModal({
                    name: 'Error',
                    desc: [
                        'Eratosthenes algorithm support numbers up to 500,000, plesase try a smaller number',
                    ],
                });
                showModal();
            } else {
                setLoading(true);
            }
        } else {
            setModal({ name: 'Error', desc: ['Input must be a positive integer greater than 1'] });
            showModal();
        }
    };

    /**
     * Calculate prime numbers after the page first render or loading state change
     */
    useEffect(() => {
        const start = new Date().getTime();
        if (algorithm === 'Brute Force') {
            setPrimes(primeBruteForce(primeCount));
        } else {
            setPrimes(primeEratosthenes(primeCount));
        }
        const end = new Date().getTime();
        const time = end - start;

        setInfo(
            `We spend ${time}ms to find the ${
                algorithm === `Brute Force`
                    ? `first ${primeCount} primes`
                    : `primes between 0 to ${primeCount}`
            } by ${algorithm} algorithm.`
        );
        setLoading(false);
    }, [loading]);

    return (
        <div className='generator'>
            <div className='generator__form'>
                <div className='generator__form-subtitle'>
                    {algorithm === 'Brute Force'
                        ? 'Find the first '
                        : 'Find prime numbers from 0 to '}
                    <input
                        type='number'
                        name='prime'
                        autoComplete='off'
                        className='generator__form-input'
                        value={primeCount}
                        onChange={(e) => setPrimeCount(e.target.value)}
                    ></input>
                    {algorithm === 'Brute Force' ? ' prime numbers' : ''}
                </div>

                <div className='generator__form__group'>
                    <div className='generator__form__radio-group'>
                        <input
                            type='radio'
                            id='small'
                            className='generator__form__radio-input'
                            name='algorithm'
                            value='Brute Force'
                            checked={algorithm === 'Brute Force'}
                            onChange={(e) => setAlgorithm(e.target.value)}
                        />
                        <label htmlFor='small' className='generator__form__radio-label'>
                            <span className='generator__form__radio-button'></span>
                            Brute Force
                        </label>
                    </div>

                    <div className='generator__form__radio-group'>
                        <input
                            type='radio'
                            id='large'
                            className='generator__form__radio-input'
                            name='algorithm'
                            value='Sieve of Eratosthenes'
                            checked={algorithm === 'Sieve of Eratosthenes'}
                            onChange={(e) => setAlgorithm(e.target.value)}
                        />
                        <label htmlFor='large' className='generator__form__radio-label'>
                            <span className='generator__form__radio-button'></span>
                            Eratosthenes
                        </label>
                    </div>
                </div>

                <div className='generator__form-button-group'>
                    <button className='generator__form-button' onClick={onAlgorithmCheckClick}>
                        Check Algorithm
                    </button>
                    <button className='generator__form-button' onClick={clickHandler}>
                        Generate Prime
                    </button>
                </div>
            </div>
            <div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className='prime'>
                        <div className='prime__info'>{info}</div>
                        <div className='prime__list'>
                            {primes.map((prime, index) => (
                                <span
                                    key={index}
                                    className='prime__number-scale prime__number'
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {prime}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Modal visible={isVisible} onClose={() => hideModal()} animation='zoom' width={560}>
                <p className='modal__header'>{modal.name}</p>
                <div className='modal__content'>
                    <ul className='modal__content-ul'>
                        {modal.desc.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </div>
    );
};

export default PrimeGenerator;
