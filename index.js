const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

let cachedImageUrl = null;
let cacheTimestamp = 0;
const cacheDuration = 60 * 1000; // 60 seconds

app.get('/neko', async (req, res) => {
    const now = Date.now();

    if (cachedImageUrl && (now - cacheTimestamp < cacheDuration)) {
        return res.json({ imageUrl: cachedImageUrl });
    }

    try {
        const response = await axios.get('https://nekos.life/api/v2/img/neko');
        cachedImageUrl = response.data.url;
        cacheTimestamp = now;
        res.json({ imageUrl: cachedImageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching image', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
