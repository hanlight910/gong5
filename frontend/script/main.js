document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayProducts();
});
const cardList = document.querySelector('.list-products')
const headers = document.querySelector('.navbar-nav')
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        "authorization": "Bearer " + sessionStorage.getItem("loginId")
    }
};

async function fetchAndDisplayProducts() {
    if (sessionStorage.getItem("loginId")) {
        headers.innerHTML = `
        <li class="nav-item">
        <a href="createProduct.html" class="btn btn-light">
            <span>
                <i class="material-icons">add</i>
                판매하기
            </span>
        </a>
        </li>
        <li class="nav-item">
        <a href="mypage.html" class="btn btn-light">
            <span>
                <i class="material-icons">person</i>
                마이페이지
            </span>
        </a>
        </li>
        <li class="nav-item">
            <a href="login.html" class="btn btn-light" id = "log_out">
                <span>
                    <i class="material-icons">logout</i>
                    로그아웃
                </span>
            </a>
        </li>
        `
        document.querySelector('#log_out').addEventListener('click', function (event) {
            sessionStorage.removeItem('loginId');
        })
    }

    try {
        fetch('http://localhost:3010/products', options)
            .then(response => response.json())
            .then(response => {
                response.products.map(element => {
                    cardList.innerHTML += `
                <li class="list-products-item col-12 col-md-4 col-lg-3">
                <a href="detail.html?id=${element.id}">
                    <div class="card">
                        <div class="card-img-top"
                            style="background: url('https://onelinght.s3.ap-northeast-2.amazonaws.com/${element.image}') no-repeat center; background-size: cover; height: 240px">
                        </div>
                        <div class="card-body">
                            <h5 class="title">${element.title}</h5>
                            <h6 class="price">${element.price}</h6>

                            <div class="text-muted">
                                <h6 class="status">${element.status}</h6>
                                <time datetime=${element.updatedAt}>2개월전</time>
                            </div>
                        </div>
                    </div>
                </a>
            </li>`
                });
            })
            .catch(err => console.error(err));
    } catch (error) {
        console.error(error);
        alert(error);
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
