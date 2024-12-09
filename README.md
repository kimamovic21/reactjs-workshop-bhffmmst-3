# Currency Converter App

## About

The Currency Converter App is a dynamic web application designed to convert between currencies in real time. Built using React.js, it leverages ExchangeRate-API to fetch up-to-date exchange rates and provides additional insights, such as buying, selling, high, low, and percentage change values. The app features an interactive currency conversion tool, a dynamic table with updated currency information, and a ticker tape at the top for real-time updates.

The application is deployed at: [Currency Converter App](currenncy-converter.netlify.app/)


## Features

1. **Currency Conversion:**
    - Easily convert amounts between different currencies using live exchange rates.
    - Users can input amounts and select currencies for conversion.

2. **Dynamic Table with Additional Data:**
- Displays comprehensive currency information:
    - Buying price
    - Selling price
    - High and Low values
    - Change percentage with conditional styling (green for positive, red for negative).
    - Table dynamically rotates every 10 seconds to show updated data.

3. **Real-Time Ticker Tape:**
    - A tape bar at the top of the page displays real-time information for selected currencies:
    - Currency name, value, and percentage change.
    - Automatically updates content for a seamless user experience.
      
4. **Enhanced UI/UX:**
    - Clean and modern design for improved user experience.
    - Circular country flags displayed next to currency names in the table.


## Installation

To install and run the Currency Converter App, follow these steps:

1. Clone the repository to your local machine
2. Navigate to the project directory
3. Install dependencies using `npm install`
4. Start the application using `npm start`

## Technologies Used
- **React.js:** Core framework for building the front-end.
- **ExchangeRate-API:** Fetches real-time currency exchange rates.
- **CSS:** Custom styling for improved design and layout.
- **Netlify:** Deployment platform.
- **CDN Resources:** Integrated libraries for icons and dropdowns.

## License
This project is licensed under the MIT License.

