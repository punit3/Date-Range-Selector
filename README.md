# Project Readme

## Overview

This project is built using the [Mantine](https://mantine.dev/) library along with Vite, React, and TypeScript. It showcases a Date Range Selector component that allows users to select a range between two dates and provides additional functionality for enhanced user experience.

## Features

- **Date Range Selector**: Allows users to select a range between two dates.
- **Range Output**: Displays the selected range, including weekdays and weekend dates.
- **Month Navigation**: Use arrow keys to move between months easily.
- **Predefined Range Buttons**: Quickly select common date ranges such as:
  - Last 7 days
  - Next 7 days
  - Next 30 days

## Setup Instructions

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**

   Navigate into the project directory and run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Run the Development Environment**

   Start the development server using:

   ```bash
   npm run dev
   ```

   This will run the project in development mode, and you can access it in your browser at `http://localhost:3000` (or the port specified by the Vite configuration).

### Building for Production

1. **Create a Production Build**

   To generate the production-ready build, run:

   ```bash
   npm run build
   ```

   This command will compile and optimize the project files for production.

2. **Preview the Production Build**

   To preview the production build, use:

   ```bash
   npx vite preview
   ```

   This will start a local server to serve the production build, allowing you to test the final output before deployment.

## Usage

- **Date Range Selection**: Use the calendar UI to select the start and end dates. The component will display the selected range, including weekdays and weekends.
- **Arrow Key Navigation**: Navigate through months using the arrow keys for a smoother experience.
- **Predefined Date Ranges**: Click on the predefined buttons to quickly select common date ranges like "Last 7 days," "Next 7 days," and "Next 30 days."

## Additional Information

- For more details on the Mantine library, visit [Mantine Documentation](https://mantine.dev/docs/getting-started/).
- For any issues or questions, please open an issue on the repository or contact the project maintainers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to modify this README as needed for your specific project requirements!
