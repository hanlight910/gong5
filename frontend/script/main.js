document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch products from the backend API
    function fetchProducts(sort) {
        // Make an AJAX request to the backend API
        fetch(`http://localhost:3010/products`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle the successful response from the server
                console.log(data.products); // Log the products to the console (for testing)

                // Display the products on the HTML page
                displayProducts(data.products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    // Function to display products on the HTML page
    function displayProducts(products) {
        const productContainer = document.getElementById('productContainer');

        // Clear existing content
        productContainer.innerHTML = '';

        // Loop through the products and create HTML elements for each
        products.forEach(product => {
            const productCard = document.createElement('li');
            productCard.classList.add('list-products-item', 'col-12', 'col-md-4', 'col-lg-3');

            const cardLink = document.createElement('a');
            cardLink.href = `detail.html?id=${product.id}`; // Assuming you have an 'id' property for each product

            const card = document.createElement('div');
            card.classList.add('card');

            const cardImage = document.createElement('div');
            cardImage.classList.add('card-img-top');
            cardImage.style.background = `url('${product.image}') no-repeat center`;
            cardImage.style.backgroundSize = 'cover';
            cardImage.style.height = '240px';

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.classList.add('title');
            title.textContent = product.title;

            const price = document.createElement('h6');
            price.classList.add('price');
            price.textContent = `${product.price}원`; // Assuming 'price' is in won, adjust as needed

            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('text-muted');

            const category = document.createElement('h6');
            category.classList.add('category');
            category.textContent = product.category;

            // Append elements to build the card structure
            card.appendChild(cardImage);
            cardBody.appendChild(title);
            cardBody.appendChild(price);
            categoryContainer.appendChild(category);
            cardBody.appendChild(categoryContainer);
            card.appendChild(cardBody);
            cardLink.appendChild(card);
            productCard.appendChild(cardLink);

            // Append the card to the product container
            productContainer.appendChild(productCard);
        });
    }

    // Call the fetchProducts function when the document is ready
    fetchProducts('DESC');

    // Example: Attach an event handler to a button to change the sort order
    const sortButton = document.getElementById('sortButton');
    if (sortButton) {
        sortButton.addEventListener('click', function () {
            const sortOrder = 'ASC';
            fetchProducts(sortOrder);
        });
    }
});
