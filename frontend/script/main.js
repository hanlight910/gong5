document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayProducts();
});

// API를 호출하고 상품 목록을 가져와서 화면에 표시하는 함수
async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('http://localhost:3010/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });

        if (!response.ok) {
            throw new Error('상품 목록을 가져오는데 실패하였습니다.');
        }

        // 내용을 확인할 수 없음
        console.log(response);
    } catch (error) {
        console.error(error);
        alert('상품 목록을 가져오는데 실패하였습니다.');
    }
}

// 받아온 상품 목록을 화면에 표시하는 함수
function displayProductList(products) {
    const productListContainer = document.querySelector('.container-main-index');

    // 기존에 있던 상품 목록을 지우고 새로운 상품 목록으로 대체
    productListContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.content}</p>
            <p>${product.price}원</p>
            <img src="${product.imageUrl}" alt="${product.title}">
        `;
        productListContainer.appendChild(productElement);
    });
}
