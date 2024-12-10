import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';
import Ticker from './Ticker';

function App() {
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
       const [from, setFrom] = useState({
        value: "USD",
        label: (
            <div className="dropdown-item">
                <img
                    src="https://flagcdn.com/w40/us.png"
                    alt="USD flag"
                    className="currency-flag"
                />
                <span>USD</span>
            </div>
        ),
    });

    const [to, setTo] = useState({
        value: "EUR",
        label: (
            <div className="dropdown-item">
                <img
                    src="https://flagcdn.com/w40/eu.png"
                    alt="EUR flag"
                    className="currency-flag"
                />
                <span>EUR</span>
            </div>
        ),
    });
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0); // For rotating table data

    useEffect(() => {
        const apiKey = "1cf0499f285c4aa06dfef970";
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

        Axios.get(apiUrl)
            .then(response => {
                const rates = Object.entries(response.data.conversion_rates).map(([currency, rate]) => ({
                    currency,
                    rate,
                    buying: (rate * 0.99).toFixed(4), // Mock buying price (slightly lower)
                    selling: (rate * 1.01).toFixed(4), // Mock selling price (slightly higher)
                    high: (rate * 1.05).toFixed(4),    // Mock high
                    low: (rate * 0.95).toFixed(4),     // Mock low
                    change: (Math.random() * 2 - 1).toFixed(2), // Mock change (-1 to +1)
                    time: new Date().toLocaleTimeString(), // Current time
                    flag: `https://flagcdn.com/w40/${currency.substring(0, 2).toLowerCase()}.png`,
                }));
                setInfo(rates);
                setOptions(
                    rates.map(rate => ({
                        value: rate.currency,
                        label: (
                            <div className="dropdown-item">
                                <img
                                    src={rate.flag}
                                    alt={`${rate.currency} flag`}
                                    className="currency-flag"
                                />
                                <span>{rate.currency}</span>
                            </div>
                        ),
                    }))
                );
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Update currentIndex every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 5) % info.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [info]);

    function convert() {
        const rateFrom = info.find(item => item.currency === from.value)?.rate;
        const rateTo = info.find(item => item.currency === to.value)?.rate;
    
        if (rateFrom && rateTo) {
            const convertedAmount = (input / rateFrom) * rateTo;
            setOutput(convertedAmount);
        }
    }
    

    
    // Slice the table data dynamically for 5 items
    const displayCurrencies = info.slice(currentIndex, currentIndex + 5);

    return (
        <div className="App">
            {/* Add the ticker */}
            {info.length > 0 && <Ticker data={info} />}
            <div className="converter-section">
                <h1>Currency Converter</h1>
                <p className="converter-caption">
                Easily convert between popular currencies using live exchange rates. Explore current market trends with our up-to-date data.
                </p>
                <div className="input-container">
                    <input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter Amount"
                    />
                    <Dropdown
                        options={options}
                        onChange={(e) => setFrom(e)}
                        value={from}
                        placeholder="Select currency"
                    />
                    <div className='switch'>
                     <HiSwitchHorizontal   size="30px"
                        onClick={() => {
                            const temp = from;
                            setFrom(to);
                            setTo(temp);
                        }}
                    />
                    </div>
                    <Dropdown
                        options={options}
                        onChange={(e) => setTo(e)}
                        value={to}
                        placeholder="Select currency"
                    />
                    <div className='button-container'>
                    <button onClick={convert}>Convert</button>
                    </div>
                </div>
                {output > 0 && (
                    <div className="output-container">
                        <p>
                            {input} {from.value} = {output.toFixed(2)} {to.value}
                        </p>
                    </div>
                )}
            </div>

            <div className="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Buying</th>
                            <th>Selling</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Change (%)</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayCurrencies.map((item) => (
                            <tr key={item.currency}>
                                <td>
                                    <div className="currency-name">
                                        <img
                                            src={item.flag}
                                            alt={`${item.currency} flag`}
                                            className="currency-flag"
                                        />
                                        <span>{item.currency}</span>
                                    </div>
                                </td>
                                <td>{item.buying}</td>
                                <td>{item.selling}</td>
                                <td>{item.high}</td>
                                <td>{item.low}</td>
                                <td style={{ color: item.change >= 0 ? 'green' : 'red' }}>{item.change}</td>
                                <td>{item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
