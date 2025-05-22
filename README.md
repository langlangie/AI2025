# Mobile Webview App

This project is an API of mobile application that integrates various websites using a WebView component. It consists of a mobile frontend built with Flutter and a backend service implemented with ExpressJS, utilizing PostgreSQL as the database.

## Project Structure

```
igate-api
│   ├── src             # Source files for the backend
│   ├── package.json    # Backend dependencies and scripts
│   ├── .env            # Environment variables for the backend
│   └── README.md       # Documentation for the backend
└── README.md           # Overall project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- PostgreSQL (version 12 or higher)

### Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd mobile-webview-app
   ```

2. **Set up the mobile application:**
   - Navigate to the `mobile-app` directory:
     ```
     cd mobile-app
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Run the mobile application:
     ```
     npm start
     ```

3. **Set up the backend service:**
   - Navigate to the `backend` directory:
     ```
     cd ../backend
     ```
   - Create a `.env` file based on the `.env.example` template and fill in your database credentials.
   - Install dependencies:
     ```
     npm install
     ```
   - Run the backend service:
     ```
     npm start
     ```

## Usage

- The mobile application allows users to log in, register, and integrate various websites through a WebView.
- The backend service handles user authentication and integration requests, interacting with a PostgreSQL database.

## Running Unit Tests

To run the backend unit tests and view code coverage:

1. Make sure dependencies are installed:
   ```zsh
   npm install
   ```

2. Run all unit tests:
   ```zsh
   npm test
   ```

3. To generate a code coverage report:
   ```zsh
   npx jest --coverage
   ```
   The coverage summary will be shown in the terminal. For a detailed HTML report, open:
   ```zsh
   open coverage/lcov-report/index.html
   ```

Test files are located in the `testing/` directory. Coverage reports are generated in the `coverage/` directory.

## Versioning

This project uses semantic versioning (MAJOR.MINOR.PATCH) for both backend and mobile app releases. Version numbers are updated in the `package.json` for the backend and in the mobile app's configuration files. All significant changes, bug fixes, and new features should increment the version appropriately:

- **MAJOR**: Breaking changes or major new features
- **MINOR**: Backward-compatible new features or improvements
- **PATCH**: Backward-compatible bug fixes

Release notes and version history are maintained in the project changelog or in the release section of the repository.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the Team 3 License.