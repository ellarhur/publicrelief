import { v4 as uuidv4 } from 'uuid';
import JsonHandler from '../../JsonHandler.mjs';

export default class DonationController {
	#jsonHandler;

	constructor() {
		this.#jsonHandler = new JsonHandler('data', 'donations.json');
	}

	async getAllDonations() {
		try {
			return await this.#jsonHandler.readFromFile();
		} catch (error) {
			console.error('Error getting donations:', error);
			throw error;
		}
	}

	async getDonationById(id) {
		try {
			const donations = await this.#jsonHandler.readFromFile();
			return donations.find(donation => donation.id === id);
		} catch (error) {
			console.error('Error getting donation by id:', error);
			throw error;
		}
	}

	async createDonation(donationData) {
		try {
			const donation = {
				id: uuidv4(),
				...donationData,
				createdAt: new Date().toISOString()
			};
			await this.#jsonHandler.addToFile(donation);
			return donation;
		} catch (error) {
			console.error('Error creating donation:', error);
			throw error;
		}
	}

	async updateDonation(id, updateData) {
		try {
			const donations = await this.#jsonHandler.readFromFile();
			const index = donations.findIndex(donation => donation.id === id);
			
			if (index === -1) {
				throw new Error('Donation not found');
			}

			donations[index] = {
				...donations[index],
				...updateData,
				updatedAt: new Date().toISOString()
			};

			await this.#jsonHandler.writeToFile(JSON.stringify(donations, null, 2));
			return donations[index];
		} catch (error) {
			console.error('Error updating donation:', error);
			throw error;
		}
	}

	async deleteDonation(id) {
		try {
			const donations = await this.#jsonHandler.readFromFile();
			const filteredDonations = donations.filter(donation => donation.id !== id);
			
			if (filteredDonations.length === donations.length) {
				throw new Error('Donation not found');
			}

			await this.#jsonHandler.writeToFile(JSON.stringify(filteredDonations, null, 2));
			return { message: 'Donation deleted successfully' };
		} catch (error) {
			console.error('Error deleting donation:', error);
			throw error;
		}
	}
}
