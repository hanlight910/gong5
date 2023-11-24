
document.addEventListener('DOMContentLoaded', function() {
    // 서버 API 엔드포인트
    const apiUrl = 'http://localhost:3010/products';

    // fetch를 사용하여 GET 요청 보내기
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // 서버에서 받아온 중고 제품 목록을 화면에 표시
            const productList = document.getElementById('productList');
            data.products.forEach(product => {
                const listItem = document.createElement('li');
                listItem.textContent = `제목: ${product.title}, 가격: ${product.price}, 판매자: ${product.userInfo.name}`;
                productList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('에러 발생:', error);
            // 에러 처리 작업 수행
        });
});