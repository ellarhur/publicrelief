import { describe, it, expect } from 'vitest';
import Donation from './Donation.mjs';

describe('Donation', () => {
    const timestamp = new Date().toString();
    const donation = new Donation(timestamp);

    describe('should have the correct properties', () => {
        it ('should have a timestamp property', () => {
            expect(donation).toHaveProperty('timestamp');
        })
    })
});