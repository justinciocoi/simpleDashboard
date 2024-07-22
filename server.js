require('dotenv').config(); //for local use of env variables
const express = require('express'); //for web server
const connect = require('./database');
const axios = require('axios'); //for fetching data
const app = express();
const PORT = process.env.PORT || 3000; //uses environment defined port OR 3000 if no port defined

// Middleware
app.use(express.static('public'));


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//endpoint for quote fetching
app.get('/api/quote', async (req, res) => {
    let connection;
    try{
        connection = await connect();

        const [countResult] = await connection.query(`SELECT COUNT(*) as count from Quotes`); //counts # of quotes
        const count =countResult[0].count; //sets count to # of quotes
        
        if(count === 0) { 
            return res.status(404).send('Quote not found.'); //ensures at least one quote is retured
        }

        const randInt = Math.floor(Math.random() * count) + 1; //selects random int between 1 and count

        const [quoteResult] = await connection.query(`SELECT quote, CONCAT(firstName, ' ', lastName) as author FROM Quotes WHERE id = ?`, [randInt]); //selects quote where id = random int

        res.json(quoteResult[0]); //returns the result in json form

    } catch (error) {
        console.error('Server Error', error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat: lat,
                lon: lon,
                units: 'imperial',
                appid: apiKey
            }
        });
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/news', async (req, res) => {
    const keyWord = req.query.q;
    const apiKey = process.env.NEWS_API_KEY;

    try {
        const response = await axios.get(`http://newsdata.io/api/1/latest`, {
            params: {
                apikey: apiKey,
                language: 'en',
                q: 'tech',
                category: 'technology',
                country: 'us',
                prioritydomain: 'Top'
            }
        });
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).send('Internal Server Error');
    }
})