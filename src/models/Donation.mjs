import { createHash } from '../utilities/hash.mjs';

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

    static mineBlock({previousDonation, data}) {
        const timestamp = Date.now();
        const lastHash = previousDonation.hash;
        const hash = createHash(timestamp, lastHash, data);
        return new this({timestamp, lastHash, hash, data
        });
    }
}