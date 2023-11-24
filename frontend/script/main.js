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
        
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }

    
    fetchProducts('DESC'); 

    
    const sortButton = document.getElementById('sortButton');
    if (sortButton) {
      sortButton.addEventListener('click', function () {
        const sortOrder = 'ASC';
        fetchProducts(sortOrder);
      });
    }
});
