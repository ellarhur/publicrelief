import express from 'express';
import {
	createDonation,
	listAllDonations,
	getDonationById,
} from '../controllers/donation-controller.mjs';

const bookingRouter = express.Router();

donationRouter
	.route('/')
	.get(listAllDonations)
	.post(), createDonation;

export default donationRouter;
