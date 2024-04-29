const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { LengthUnits, Length } = require('unitsnet-js');
const swaggerDocument = require('./swagger.json');

const app = express();

// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Serve Swagger UI
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mock API response for /length endpoint
app.get('/length', (req, res) => {
    const LengthUnitsValues = Object.values(LengthUnits);
    const randomUnitIndex = Math.floor(Math.random() * LengthUnitsValues.length);
    const randomUnit = LengthUnitsValues[randomUnitIndex];

    const length = Length.FromMeters(10);

    const exampleResponse = {
        someInfo: `Below is a length of 10 meters, represented by a ${randomUnit} DTO units`,
        someInfoLength: length.toDto(randomUnit)
    };
    res.json(exampleResponse);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
