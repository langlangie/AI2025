const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const integrationRoutes = require('./routes/integrationRoutes');
const db = require('./config/db');
const logMiddleware = require('./middleware/logMiddleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logMiddleware);

// Database connection
db.connectDB();

// Routes
app.use('/api', integrationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});