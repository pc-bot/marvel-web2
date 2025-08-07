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

app.get('/characters.json/:characterId', async (req, res) => {
    const { characterId } = req.params;
    try {
        const data = await fs.readFile('characters.json', 'utf8');
        const characters = JSON.parse(data).characters || [];
        const character = characters.find((char) => char.id === parseInt(characterId));
        if (character) {
            res.json({ character });
        } else {
            res.status(404).json({ error: 'Character not found' });
        }
    } catch (error) {
        console.error('Error reading characters.json:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/characters.json', async (req, res) => {
    try {
        const data = await fs.readFile('characters.json', 'utf8');
        const jsonData = JSON.parse(data);
        const newCharacter = req.body;
        if (!newCharacter.name || !newCharacter.realName || !newCharacter.universe) {
            return res.status(400).json({ error: 'Missing required fields: name, realName, universe' });
        }
        const newId = jsonData.characters.length > 0 
            ? Math.max(...jsonData.characters.map(char => char.id)) + 1 
            : 1;
        newCharacter.id = newId;
        jsonData.characters.push(newCharacter);
        await fs.writeFile('characters.json', JSON.stringify(jsonData, null, 2));
        res.status(201).json({ message: 'Character added successfully', character: newCharacter });
    } catch (error) {
        console.error('Error adding character:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
