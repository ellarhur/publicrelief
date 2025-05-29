import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import Donation from './models/Donation.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

// Servera statiska filer från src-mappen
app.use(express.static(path.join(__dirname)));

// Specifik route för donation.html
app.get('/donation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'donation.html'));
});

const API_BASE = '/api/v1';

// Hämta alla donationer
app.get(`${API_BASE}/donations`, (req, res) => {
    try {
        const donations = Donation.getAllDonations();
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Hämta en specifik donation med ID
app.get(`${API_BASE}/donation/:id`, (req, res) => {
    try {
        const donation = Donation.getDonationById(req.params.id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation hittades inte' });
        }
        res.json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Skapa en ny donation
app.post(`${API_BASE}/donation`, (req, res) => {
    try {
        const donationData = {
            id: uuidv4(),
            ...req.body
        };
        const newDonation = Donation.createDonation(donationData);
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server körs på port ${port}`);
});
