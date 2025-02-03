# DNS Propagation Checker

This application allows you to check the DNS propagation status for a given domain and record type. It performs a DNS query against multiple resolvers across different regions and provides you with the results in a table format, as well as a map showing the locations of the DNS resolvers.

## Features

- Enter any domain (e.g., example.com) to check its DNS propagation status.
- Select the record type to query (A, AAAA, CNAME, MX, TXT).
- View results in a table format.
- See the locations of DNS resolvers on a map.
- Responsive design: Map and table displayed side by side on larger screens, stacked on smaller screens.

## Installation

To get started with the DNS Propagation Checker, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/dns-checker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd dns-checker
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

This will start the Next.js development server. Open your browser and go to http://localhost:3000 to see the app in action.

## Usage

1. Open the application in your browser.
2. Enter the domain name (e.g., example.com) in the input field.
3. Select the DNS record type you wish to check (e.g., A, AAAA, CNAME, MX, TXT).
4. Click on the "Check DNS" button.
5. The application will fetch the DNS propagation data and display the results in a table and a map.

## Components

- **Input Field**: Enter the domain you want to check.
- **Select Dropdown**: Choose the type of DNS record (A, AAAA, CNAME, MX, TXT).
- **Check DNS Button**: Trigger the DNS query and display results.
- **Results Table**: Displays the resolver, IP address, and TTL for each DNS query.
- **Map**: Displays the locations of the DNS resolvers on a map.

## Technologies Used

- **Next.js**: React framework for building the application.
- **TypeScript**: Strongly-typed JavaScript for better code quality and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React**: JavaScript library for building user interfaces.
- **Leaflet**: A JavaScript library for interactive maps (used in DNSMap component).
- **Lucide Icons**: Lightweight, customizable icons (used for the loading spinner).
- **API**: Custom backend API (/api/dns-check) for performing DNS lookups.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and create a pull request with your proposed changes. Please ensure that your code follows the existing style and includes appropriate tests.

### Steps for Contributing:

1. Fork the repository.
2. Clone your fork locally.
3. Create a new branch for your changes.
4. Make your changes.
5. Push your changes to your fork.
6. Open a pull request to the original repository.

## License

This project is open source and available under the MIT License.
