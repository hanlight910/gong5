// script.js

// API를 호출하고 상품 목록을 가져와서 화면에 표시하는 함수
async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('/api/products'); // API 엔드포인트에 맞게 수정
        const data = await response.json();

        if (data.products) {
            const productList = document.querySelector('.container-main-index');

            // 받아온 상품 목록을 화면에 표시
            data.products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
                    <h3>${product.title}</h3>
                    <p>${product.content}</p>
                    <p>${product.price}원</p>
                    <!-- 필요한 정보를 여기에 추가하세요 -->
                `;
                productList.appendChild(productElement);
            });
        } else {
            console.error('상품 목록을 가져오지 못했습니다.');
        }
    } catch (error) {
        console.error('API 호출 중 에러 발생:', error);
    }
}

// 페이지 로드 시 상품 목록을 가져와서 표시
window.onload = fetchAndDisplayProducts;
