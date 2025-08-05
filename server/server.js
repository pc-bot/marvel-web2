const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const coreOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE'
};


app.use(express.json());
app.use(cors(coreOptions));

app.get('/characters.json', async (req, res) => {
    try {
        const data = await fs.readFile('characters.json', 'utf8');
        const characters = JSON.parse(data);
        res.json({characters: characters || []});
    } catch (error) {
        console.error('Error reading characters.json:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
