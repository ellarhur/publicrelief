import { createHash } from '../utilities/hash.mjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Donation {
    constructor({timestamp, hash, lastHash, data}) {
        this.timestamp = timestamp;
        this.hash = hash;
        this.lastHash = lastHash;
        this.data = data;
    }

    static genesis() {
        return new Donation({
            timestamp: Date.now(),
            hash: '#1',
            lastHash: '######',
            data: '[]'
        });
    }

    static async mineBlock({previousDonation, data}) {
        const timestamp = Date.now();
        const lastHash = previousDonation.hash;
        const hash = createHash(timestamp, lastHash, data);
        return new this({timestamp, lastHash, hash, data});
    }

    static async getAllDonations() {
        try {
            const data = await fs.readFile(path.join(__dirname, '../db/donations.json'), 'utf8');
            return JSON.parse(data);
        } catch (error) {
            await this.logError('Fel vid läsning av donationer: ' + error.message);
            return [];
        }
    }

    static async createDonation(donationData) {
        try {
            const donations = await this.getAllDonations();
            const previousDonation = donations[donations.length - 1] || this.genesis();
            
            const newDonation = await this.mineBlock({
                previousDonation,
                data: JSON.stringify(donationData)
            });

            donations.push(newDonation);
            await fs.writeFile(
                path.join(__dirname, '../db/donations.json'),
                JSON.stringify(donations, null, 2)
            );
        return newDonation;
        } catch (error) {
            await this.logError('Fel vid skapande av donation: ' + error.message);
            throw error;
        }
    }

    static async logError(message) {
        try {
            const timestamp = new Date().toISOString();
            const logMessage = `[ERROR] ${timestamp}: ${message}\n`;
            const logPath = path.join(__dirname, '../logs/error.log');
            
            await fs.mkdir(path.dirname(logPath), { recursive: true });
            
            await fs.appendFile(logPath, logMessage);
        } catch (error) {
            console.error('Kunde inte logga fel:', error);
        }
    }

    static async logInfo(message) {
        try {
            const timestamp = new Date().toISOString();
            const logMessage = `[INFO] ${timestamp}: ${message}\n`;
            const logPath = path.join(__dirname, '../logs/info.log');
            

            await fs.mkdir(path.dirname(logPath), { recursive: true });
            
            await fs.appendFile(logPath, logMessage);
        } catch (error) {
            console.error('Kunde inte logga info:', error);
        }
    }
}