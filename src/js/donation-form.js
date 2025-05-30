document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donation-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const donation = {
            id: crypto.randomUUID().replaceAll("-", ""),
            donor: document.getElementById('donor').value,
            email: document.getElementById('email').value,
            amount: parseInt(document.getElementById('amount').value),
            date: new Date().toString().split('T')[0],
            currency: document.getElementById('currency').value,
            project: document.getElementById('project').value,
            message: document.getElementById('message').value,
            timestamp: Date.now()
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donation)
            });

            if (response.ok) {
                alert(`Thannk you for your donation! Your donation ID is: ${donationId}\ which we also sent to your email.`);
                form.reset();
            } else {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            alert('This error occurred: ' + error.message);
        }
    });
}); 