import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {
    // Initializing all the state variables 
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("KN");
    const [to, setTo] = useState("KM");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

    // Fetching currency data
    useEffect(() => {
        Axios.get('YOUR_API_ENDPOINT')
            .then(response => {
                setInfo(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Update options and convert amount when currency info changes
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info]);

    // Function to convert the currency
    function convert() {
        if (info[to]) {
            const rate = info[to];
            setOutput(input * rate);
        }
    }

    // Function to switch between two currencies
    function flip() {
        const temp = from;
        setFrom(to);
        setTo(temp);
    }

    // Star animation functions
    useEffect(() => {
        for (let i = 0; i < 15; i++) {
            setTimeout(createStar, i * 2000); // Add delay between stars
        }
    }, []);

    function createStar() {
        const starsContainer = document.querySelector('.stars');
        const star = document.createElement('div');
        star.classList.add('star');

        // Set initial position in the top right corner
        star.style.left = '100vw'; // Starting position on the right
        star.style.top =  Math.random() * 100 + 'vh'; // Random height

        // Add star to the container
        starsContainer.appendChild(star);

        // Animate the star
        animateStar(star);
    }

    function animateStar(star) {
        const duration = Math.random() * 10 + 5; // Random duration (5-15 seconds)

        star.animate([
            { transform: 'translate(0, 0)' }, // Starting position
            { transform: `translate(-100vw, 100vh)` } // Move left and down
        ], {
            duration: duration * 1000,
            easing: 'linear', // Linear motion
            iterations: 5 // Only move once
        });

        // Remove star after animation
        star.addEventListener('finish', () => {
            star.remove(); // Remove the star after the animation
        });
    }

    return (
        <div className="App">
            <div className="stars"></div>

            <div className="heading">
                <h1>Currency Converter</h1>
            </div>
            <div className="container">
                <div className="currency-input">
                    <h3>Amount</h3>
                    <input
                        type="text"
                        placeholder="Enter the amount"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="currency-input">
                    <h3>From</h3>
                    <Dropdown
                        options={options}
                        onChange={(e) => { setFrom(e.value) }}
                        value={from}
                        placeholder="From"
                    />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px" onClick={flip} />
                </div>
                <div className="currency-input">
                    <h3>To</h3>
                    <Dropdown
                        options={options}
                        onChange={(e) => { setTo(e.value) }}
                        value={to}
                        placeholder="To"
                    />
                </div>
                <div className="button-container">
                    <button onClick={convert}>Convert</button>
                </div>
            </div>
            <div className="result">
                <h2>Converted Amount:</h2>
                <p>{`${input} ${from} = ${output.toFixed(2)} ${to}`}</p>
            </div>
        </div>
    );
}

export default App;
