document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donation-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const donation = {
            id: crypto.randomUUID().replaceAll("-", ""),
            donor: document.getElementById('donor').value,
            email: document.getElementById('email').value,
            amount: parseInt(document.getElementById('amount').value),
            date: new Date().toISOString().split('T')[0],
            currency: document.getElementById('currency').value,
            project: document.getElementById('project').value,
            message: document.getElementById('message').value,
            timestamp: Date.now()
        };

        try {
            const response = await fetch('http://localhost:3010/api/v1/donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donation)
            });

            if (response.ok) {
                alert('Tack för din donation! En bekräftelse har skickats till din e-post.');
                form.reset();
            } else {
                throw new Error('Något gick fel vid donationen');
            }
        } catch (error) {
            alert('Ett fel uppstod: ' + error.message);
        }
    });
}); 