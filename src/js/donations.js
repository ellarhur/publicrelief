document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3010/api/v1/donations');
        if (!response.ok) {
            throw new Error('Could not fetch donations');
        }
        const donations = await response.json();
        
        const donationsList = document.getElementById('donations-list');
        
        // Sortera donationerna så att de nyaste kommer först
        donations.sort((a, b) => {
            // Om någon av donationerna är genesis-blocket, placera det sist
            if (a.hash === 'genesis-hash') return 1;
            if (b.hash === 'genesis-hash') return -1;
            
            // Annars sortera efter timestamp (nyaste först)
            return b.timestamp - a.timestamp;
        });
        
        donations.forEach(donation => {
            const donationData = JSON.parse(donation.data);
            
            const donationCard = document.createElement('div');
            donationCard.className = 'donation-card';
            
            donationCard.innerHTML = `
                <h3>Donation #${donation.hash.substring(0, 8)}</h3>
                <p><strong>Donor:</strong> ${donationData.donor}</p>
                <p><strong>Amount:</strong> ${donationData.amount} ${donationData.currency}</p>
                <p><strong>For project:</strong> ${donationData.project}</p>
                <p><strong>Date:</strong> ${new Date(donation.timestamp).toLocaleDateString('sv-SE')}</p>
                <p><strong>Message:</strong> ${donationData.message}</p>
            `;
            
            donationsList.appendChild(donationCard);
        });
    } catch (error) {
        console.error('could not load donations-data:', error);
        const donationsList = document.getElementById('donations-list');
        donationsList.innerHTML = '<p>could not load donations-data, sorry</p>';
    }
}); 