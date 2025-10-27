# 💰 Cryptocurrency Price Tracker

A simple React application that displays real-time cryptocurrency prices using the CoinGecko API.

## 📋 Features

- ✅ Display top 10 cryptocurrencies by market cap
- ✅ Real-time price updates
- ✅ 24-hour price change indicators
- ✅ Market cap and trading volume information
- ✅ Responsive design for mobile and desktop
- ✅ Refresh button to update data
- ✅ Loading and error states

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project files

2. Install dependencies:
```bash
npm install
```

3. Install Axios (if not already installed):
```bash
npm install axios
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

## 📂 Project Structure

```
src/
├── HomeworkApi.jsx          # Main component
├── HomeworkApi.module.css   # Styles
└── App.jsx                  # Root component
```

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Axios** - HTTP client for API requests
- **CoinGecko API** - Free cryptocurrency data API
- **CSS Modules** - Component-scoped styling

## 📚 What You'll Learn

This project demonstrates:

- **API Integration** - Fetching data from external APIs
- **useState Hook** - Managing component state
- **useEffect Hook** - Side effects and data fetching
- **Conditional Rendering** - Showing different UI based on state
- **Array Mapping** - Rendering lists of data
- **Event Handling** - User interactions
- **Error Handling** - Managing API errors gracefully
- **Loading States** - Providing user feedback

## 🎨 Features Breakdown

### Component State
- `cryptoData` - Stores the cryptocurrency data
- `loading` - Tracks loading state
- `error` - Stores error messages
- `lastUpdated` - Shows last refresh time

### API Integration
- Uses CoinGecko free API (no API key required)
- Fetches top 10 cryptocurrencies
- Updates on component mount and manual refresh

### Data Display
- Cryptocurrency name and symbol
- Current price in USD
- 24h price change percentage
- Market capitalization
- 24h trading volume
- 24h high and low prices

## 🌐 API Reference

This app uses the [CoinGecko API](https://www.coingecko.com/en/api):

```
GET https://api.coingecko.com/api/v3/coins/markets
```

**Parameters:**
- `vs_currency=usd` - Display prices in USD
- `order=market_cap_desc` - Sort by market cap
- `per_page=10` - Get 10 cryptocurrencies
- `page=1` - First page

**Note:** No API key required! 🎉

## 🎯 Usage

1. The app automatically fetches data when it loads
2. Click the **"🔄 Refresh Data"** button to update prices
3. View cryptocurrency details including:
   - Current price
   - 24h price change (green ↑ for positive, red ↓ for negative)
   - Market cap
   - Trading volume

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features
- Improve the UI/UX
- Add more cryptocurrency data
- Implement search functionality
- Add price charts

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing free cryptocurrency data
- React team for the amazing framework
- Workshop instructors and participants

## 📞 Support

If you have questions or run into issues:
1. Check the browser console for errors
2. Make sure all dependencies are installed
3. Verify your internet connection
4. Check that the API is accessible

---

**Happy Coding!** 🎉💻

Made with ❤️ for React Workshop 2025
