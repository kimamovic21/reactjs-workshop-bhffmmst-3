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

    

    return (
        <div className="App">
            <div className="heading">
                <h1>Currency Converter</h1>
            </div>
            <div className="container">
                <div className="input-container">
                <span className="dollar-icon">$</span>
                <input type="text" id="amount"/>
                <label htmlFor="amount" className="input-label">Amount</label>
            </div>
            <div className="currency-input">
                <Dropdown
                options={options}
                onChange={(e) => { setFrom(e.value); }}
                value={from}
                className="custom-dropdown"
                />
            </div>
            <div className="switch">
                    <HiSwitchHorizontal size="30px" onClick={flip} />
            </div>
            <div className="currency-input2">
                <Dropdown
                options={options}
                onChange={(e) => { setFrom(e.value); }}
                value={to}
                className="custom-dropdown2"
                />
            </div>
            <div className="button-container">
                <button onClick={convert}>Convert</button>
            </div>
            </div>
        </div>
    );
}

export default App;
