FormData.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try{
        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);

        } else {
            console.error('Ooops, went wrong', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});