document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const blockHash = document.getElementById('search-input').value.trim();

        try {
            const response = await fetch('http://localhost:3010/api/v1/donations');
            
            if (!response.ok) {
                throw new Error('Could not fetch donations');
            }

            const donations = await response.json();
            
            const donation = donations.find(d => d.hash === blockHash);
            
            if (!donation) {
                throw new Error('No donation found with this block hash');
            }

            const donationData = JSON.parse(donation.data);
            
            const donationCard = document.createElement('div');
            donationCard.className = 'donation-card';
            
            const date = new Date(donation.timestamp).toLocaleDateString('sv-SE');
            
            donationCard.innerHTML = `
                <h3>Block Information</h3>
                <p><strong>Block Hash:</strong> ${donation.hash}</p>
                <p><strong>Previous Hash:</strong> ${donation.lastHash}</p>
                <p><strong>Timestamp:</strong> ${date}</p>
                <hr>
                <h4>Donation Details</h4>
                <p><strong>Donor:</strong> ${donationData.donor}</p>
                <p><strong>Email:</strong> ${donationData.email}</p>
                <p><strong>Amount:</strong> ${donationData.amount} ${donationData.currency}</p>
                <p><strong>Project:</strong> ${donationData.project}</p>
                ${donationData.message ? `<p><strong>Message:</strong> ${donationData.message}</p>` : ''}
            `;

            // Clear previous results and show the new one
            searchResults.innerHTML = '';
            searchResults.appendChild(donationCard);

        } catch (error) {
            searchResults.innerHTML = `
                <div class="error-message">
                    <p>An error occurred: ${error.message}</p>
                </div>
            `;
        }
    });
}); 