document.addEventListener('DOMContentLoaded', async function () {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "Bearer " + sessionStorage.getItem("loginId")
        },
    };
    const productList = document.querySelector('#products_list');
    try {
        const response = await fetch('http://localhost:3010/auth/user', options)
            .then(response => response.json())
            .then(response => {

                document.querySelector('#userName').innerText = response.user.name || '이름이 없습니다.';
                document.querySelector('#email').innerText = response.user.email;
                document.querySelector('#profile_image').src = `https://onelinght.s3.ap-northeast-2.amazonaws.com/${response.user.profileImage}`;
            })

    } catch (error) {
        console.error('Unexpected error:', error);
    }
    try {
        fetch('http://localhost:3010/products/me', options)
            .then(products => products.json())
            .then(products => {
                console.log(products.data.length);
                if (products.data.length !== 0) {
                    products.data.map(e => {
                        productList.innerHTML += `
                        <li>
                        <a href="detail.html?id=${e.id}" class = "product-name" >${e.title} </a>
                        <a class="delete-btn" onclick="deleteProduct(event, ${e.id})" >삭제</a>
                        <a href="productEdit.html?id=${e.id}" class="update-btn">수정</a>
                        </li>
                        `
                    });
                } else {
                    productList.innerHTML = '<dd>쓴 글이 없습니다.</dd>'
                }
            })
    } catch (error) {
        console.error('Unexpected error:', error);
    }

    window.deleteProduct = async function (event, productId) {
        const confirmDelete = window.confirm('해당 판매게시물을 삭제하시겠습니까?');

        if (confirmDelete) {
            // Continue with the deletion
            fetch(`http://localhost:3010/products/${productId}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": "Bearer " + sessionStorage.getItem("loginId")
                },
            })

                .then(response => {
                    if (response.ok) {
                        location.reload()
                        alert("해당 게시물이 삭제되었습니다.")
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
});