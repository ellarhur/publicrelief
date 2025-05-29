import { describe, it, expect } from 'vitest';
import Donation from './donation.mjs';

describe('Donation', () => {
    const timestamp = new Date().toString();
    const currentHash = 'current-hash';
    const lastHash = 'prev-hash';
    const data = '[1, 2, 3]';
    const donation = new Donation({ timestamp, hash: currentHash, lastHash, data });

    describe('should have the correct properties', () => {
        it ('should have a timestamp property', () => {
            expect(donation).toHaveProperty('timestamp');
        })

        it ('should have a hash property', () => {
            expect(donation).toHaveProperty('hash');
        })

        it ('should have a lastHash property', () => {
            expect(donation).toHaveProperty('lastHash');
        })

        it ('should have a data property', () => {
            expect(donation).toHaveProperty('data');
        })
    })
    describe('should have its properties correct initialized', () => {
        it('should set a timestamp value', () => {
            expect(donation.timestamp).not.toEqual(undefined)     })
    })

    describe('genesis function()', () => {
        const genesisDonation = Donation.genesis();
        it('should return an instance of the Donation class', () => {
            expect(genesisDonation instanceof Donation).toBeTruthy();
        })
    })

    it('should have a correct hash', () => {
        expect(donation.hash).toEqual(currentHash);
    })
    it('should set the lastHash to the hash of the previous donation', () => {
        expect(donation.lastHash).toEqual(lastHash);
    })
    it('should set the data property', () => {
        expect(donation.data).toEqual(data);
        
    })
    it('should return an instance of the Donation class', () => {
        expect(donation instanceof Donation).toBeTruthy();
    });

    describe('mineblock() function', () => {
        const previousDonation = Donation.genesis();
        const data = [6,7,8,9,10];
        const minedBlock = Donation.mineBlock({previousDonation, data});
        it('should return an instance of class Donation', () => {
            expect(minedBlock instanceof Donation).toBeTruthy();
        });
        it('should set the lastHash to the hash of the previous block', () => {
            expect(minedBlock.lastHash).toEqual(previousDonation.hash);
        });
        it('should set the data property', () => {})
    });
});