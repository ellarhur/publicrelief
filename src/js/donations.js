document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../db/donations.json');
        const donations = await response.json();
        
        const donationsList = document.getElementById('donations-list');
        
        donations.sort((a, b) => {
            const dateA = new Date(JSON.parse(a.data).timestamp);
            const dateB = new Date(JSON.parse(b.data).timestamp);
            return dateB - dateA;
        });
        
        donations.forEach(donation => {
            const donationData = JSON.parse(donation.data);
            
            const donationCard = document.createElement('div');
            donationCard.className = 'donation-card';
            
            donationCard.innerHTML = `
                <h3>Donation #${donation.hash.substring(0, 8)}</h3>
                <p><strong>Donator:</strong> ${donationData.donor}</p>
                <p><strong>Belopp:</strong> ${donationData.amount} ${donationData.currency}</p>
                <p><strong>Projekt:</strong> ${donationData.project}</p>
                <p><strong>Datum:</strong> ${new Date(donationData.timestamp).toLocaleDateString('sv-SE')}</p>
                <p><strong>Meddelande:</strong> ${donationData.message}</p>
            `;
            
            donationsList.appendChild(donationCard);
        });
    } catch (error) {
        console.error('Kunde inte hämta donations-data:', error);
        const donationsList = document.getElementById('donations-list');
        donationsList.innerHTML = '<p>Kunde inte ladda donations-data. Försök igen senare.</p>';
    }
}); 