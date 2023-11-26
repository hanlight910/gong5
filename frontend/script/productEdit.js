document.addEventListener('DOMContentLoaded', async () => {
    const id = new URL(document.location.href).searchParams.get('id');
    const response = await fetch(`http://localhost:3010/products/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();

        document.getElementById('productsTitle').value = data.product.title;
        document.getElementById('productsPrice').value = data.product.price;
        document.getElementById('productsDescription').value = data.product.content;
    } else {
        console.error('Failed to fetch data');
    }

    const submitButton = document.querySelector('.btn-submit');
    const fileInput = document.getElementById('ex_filename');

    submitButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const title = document.getElementById('productsTitle').value;
        const price = document.getElementById('productsPrice').value;
        const description = document.getElementById('productsDescription').value;

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', fileInput.files[0]);  // 이미지 파일 추가

        try {
            const response = await fetch(`http://localhost:3010/products/${id}`, {
                method: 'put',
                headers: {
                    "authorization": "Bearer " + sessionStorage.getItem("loginId")
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert("판매제품 정보를 수정하였습니다.")
                window.location.href = 'detail.html?id=' + id; // Replace this with the desired redirect URL
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }

        } catch (error) {
            console.error(error);
        }
    });

    // 이미지 업로드 시 파일명 표시
    fileInput.addEventListener('change', function () {
        const filename = fileInput.files[0].name;
        document.querySelector('.upload-name').value = filename;
    });
});
