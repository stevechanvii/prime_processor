import React from 'react';
import './styles/main.scss';

import PrimeGenerator from './component/PrimeGenerator/PrimeGenerator';
import cpu from './assets/cpu.svg';

function App() {
    return (
        <div className='container'>
            <h1 className='app-name'>Prime Processor</h1>
            <img src={cpu} alt='cpu' className='app-img' />
            <PrimeGenerator />
        </div>
    );
}

export default App;
