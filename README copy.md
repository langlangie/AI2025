# Mobile Webview App Backend

This is the backend service for the Mobile Webview App, built using Node.js and Express. The backend provides an API for user integration and manages interactions with a PostgreSQL database.

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the integration controller for handling requests.
  - **routes/**: Defines the API routes for integration operations.
  - **repositories/**: Manages database operations related to user and integration data.
  - **services/**: Contains business logic for user registration and integration eligibility checks.
  - **models/**: Defines the structure of user and integration data for the database.
  - **config/**: Contains configuration files, including database connection settings.
  - **app.js**: Entry point for the backend application.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd mobile-webview-app/backend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend` directory and add your PostgreSQL database credentials:
   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=your_db_port
   DB_NAME=your_db_name
   ```

4. **Run the application**:
   ```
   npm start
   ```

## API Usage

The backend provides the following API endpoints:

- **POST /api/integration/register**: Register a new integration.
- **POST /api/integration/check-eligibility**: Check if a user is eligible for integration.

Refer to the individual route files for more details on request and response formats.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.