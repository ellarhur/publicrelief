import DonationRepository from './repositories/donation-repository.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const listAllDonations = catchErrorAsync(async (req, res) => {
	const donation = await new DonationRepository().listAll();
	res.status(200).json({ success: true, data: donations });
});

export const createDonation = catchErrorAsync(async (req, res) => {
  const donation = await new DonationRepository().add(req);
  res.status(200).json({ success: true, data: donations });
});

export const getDonationById = catchErrorAsync(async (req, res) => {
  const donation = await new DonationRepository().find(req.params.id);
  res.status(200).json({ success: true, data: donations });

});