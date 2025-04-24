const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const RADIOBOSS_API_INFO = "https://ritmoboss.moxapps.shop/?pass=moxradioserver&action=playbackinfo";
const RADIOBOSS_API_IMG = "https://ritmoboss.moxapps.shop/?pass=moxradioserver&action=trackartwork";
const STREAM_URL = "https://mox.moxapps.shop/stream";

app.get('/metadata', async (req, res) => {
    try {
        const response = await axios.get(RADIOBOSS_API_INFO);
        const xmlData = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");

        const currentTrack = xmlDoc.querySelector('CurrentTrack TRACK');
        const artist = currentTrack.getAttribute('ARTIST');
        const title = currentTrack.getAttribute('TITLE');

        res.json({
            artist: artist,
            title: title,
            cover: RADIOBOSS_API_IMG,
            stream: STREAM_URL
        });

    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener los metadatos" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
