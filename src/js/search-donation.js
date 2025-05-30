document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const blockHash = document.getElementById('search-input').value.trim();

        try {
            // First get all donations
            const response = await fetch('http://localhost:3010/api/v1/donations');
            
            if (!response.ok) {
                throw new Error('Could not fetch donations');
            }

            const donations = await response.json();
            
            // Find the donation with matching hash
            const donation = donations.find(d => d.hash === blockHash);
            
            if (!donation) {
                throw new Error('No donation found with this block hash');
            }

            // Create a donation card with the information
            const donationCard = document.createElement('div');
            donationCard.className = 'donation-card';
            
            const date = new Date(donation.timestamp).toLocaleDateString('en-US');
            
            donationCard.innerHTML = `
                <h3>Block Information</h3>
                <p><strong>Block Hash:</strong> ${donation.hash}</p>
                <p><strong>Previous Hash:</strong> ${donation.lastHash}</p>
                <p><strong>Timestamp:</strong> ${date}</p>
                <hr>
                <h4>Donation Details</h4>
                <p><strong>Donor:</strong> ${donation.donor}</p>
                <p><strong>Email:</strong> ${donation.email}</p>
                <p><strong>Amount:</strong> ${donation.amount} ${donation.currency}</p>
                <p><strong>Project:</strong> ${donation.project}</p>
                ${donation.message ? `<p><strong>Message:</strong> ${donation.message}</p>` : ''}
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