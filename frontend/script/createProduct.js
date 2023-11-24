document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.querySelector('.btn-submit');

    submitButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const title = document.getElementById('productsTitle').value;
        const tag = document.getElementById('productsTag').value;
        const price = document.getElementById('productsPrice').value;
        const description = document.getElementById('productsDescription').value;

        try {
            const response = await fetch('http://localhost:3010/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, tag, price, description }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Product created successfully:', result.product);
                window.location.href = '';
            } else {
                const errorData = await response.json();
                console.error('Error creating product:', errorData.message);
            }

        } catch (error) {
            console.error('Unexpected error:', error);
        }
    });
});
