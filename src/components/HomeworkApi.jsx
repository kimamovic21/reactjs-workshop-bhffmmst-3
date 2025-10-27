import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './HomeworkApi.module.css';

const HomeworkApi = () => {
  // State for storing crypto data
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // CoinGecko API - free, no API key needed, no CORS issues
  const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h';

  // Fetch cryptocurrency data
  const fetchCryptoData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(API_URL);
      console.log('API Response:', response.data);
      
      // Add 1 second delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCryptoData(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
      
    } catch (err) {
      setError(err.message || 'Failed to fetch cryptocurrency data');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCryptoData();
  }, []);

  // Format large numbers
  const formatNumber = (num) => {
    if (!num) return 'N/A';
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return '$' + (num / 1e3).toFixed(2) + 'K';
    return '$' + num.toFixed(2);
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 1) return `$${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    return `$${price.toFixed(6)}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>💰 Cryptocurrency Prices</h1>
        <p className={styles.subtitle}>Top 10 Cryptocurrencies - Live Data from CoinGecko</p>
        {lastUpdated && (
          <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
        )}
        <button onClick={fetchCryptoData} className={styles.refreshButton}>
          🔄 Refresh Data
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles.error}>
          <p>❌ Error: {error}</p>
          <button onClick={fetchCryptoData} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      )}

      {/* Crypto Data Grid */}
      {!loading && !error && cryptoData.length > 0 && (
        <div className={styles.grid}>
          {cryptoData.map((crypto, index) => (
            <div key={crypto.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.rank}>#{crypto.market_cap_rank}</div>
                {crypto.image && (
                  <img src={crypto.image} alt={crypto.name} className={styles.cryptoImage} />
                )}
                <div className={styles.cryptoInfo}>
                  <h3 className={styles.cryptoName}>{crypto.name}</h3>
                  <span className={styles.cryptoSymbol}>{crypto.symbol.toUpperCase()}</span>
                </div>
              </div>

              <div className={styles.priceSection}>
                <p className={styles.price}>
                  {formatPrice(crypto.current_price)}
                </p>
                {crypto.price_change_percentage_24h !== null && (
                  <p
                    className={`${styles.change} ${
                      crypto.price_change_percentage_24h >= 0
                        ? styles.positive
                        : styles.negative
                    }`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </p>
                )}
              </div>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Market Cap:</span>
                  <span className={styles.detailValue}>
                    {formatNumber(crypto.market_cap)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Volume (24h):</span>
                  <span className={styles.detailValue}>
                    {formatNumber(crypto.total_volume)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>High (24h):</span>
                  <span className={styles.detailValue}>
                    {formatPrice(crypto.high_24h)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Low (24h):</span>
                  <span className={styles.detailValue}>
                    {formatPrice(crypto.low_24h)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Learning Section */}
      <div className={styles.learningSection}>
        <h3 className={styles.learningTitle}>📚 What You Learned:</h3>
        <ul className={styles.learningList}>
          <li>
            <strong>API Integration:</strong> Used <code>axios</code> to fetch
            data from CoinGecko API (free, no API key needed!)
          </li>
          <li>
            <strong>useEffect Hook:</strong> Fetched data when component mounts
          </li>
          <li>
            <strong>Loading States:</strong> Managed loading, error, and success
            states properly
          </li>
          <li>
            <strong>Data Mapping:</strong> Rendered API data using{' '}
            <code>map()</code> with proper keys
          </li>
          <li>
            <strong>Conditional Rendering:</strong> Displayed different UI based
            on state (loading/error/success)
          </li>
          <li>
            <strong>Event Handling:</strong> Added refresh functionality with onClick
          </li>
          <li>
            <strong>Data Formatting:</strong> Formatted numbers and prices for better readability
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeworkApi;