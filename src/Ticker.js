import React, { useEffect, useRef } from 'react';
import './Ticker.css';

const Ticker = ({ data }) => {
    const tapeRef = useRef();

    useEffect(() => {
        const scroll = () => {
            if (tapeRef.current) {
                tapeRef.current.scrollLeft += 1;
                if (tapeRef.current.scrollLeft >= tapeRef.current.scrollWidth / 2) {
                    tapeRef.current.scrollLeft = 0;
                }
            }
        };
        const interval = setInterval(scroll, 20);
        return () => clearInterval(interval);
    }, []);

    const duplicatedData = [...data, ...data]; // Duplicate for seamless scrolling

    return (
        <div className="ticker">
            <div className="ticker-tape" ref={tapeRef}>
                {duplicatedData.map((item, index) => (
                    <div className="ticker-item" key={index}>
                        <div className="ticker-block">
                            <span className="ticker-currency">{item.currency}</span>: 
                            <span className="ticker-value">{item.rate}</span>
                            <span
                                className={`ticker-change ${
                                    item.change >= 0 ? 'positive' : 'negative'
                                }`}
                            >
                                {item.change}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ticker;