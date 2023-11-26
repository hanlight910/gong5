document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.querySelector('.btn-submit');
    const fileInput = document.getElementById('ex_filename');

    submitButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const title = document.getElementById('productsTitle').value;
        const tag = document.getElementById('productsTag').value;
        const price = document.getElementById('productsPrice').value;
        const description = document.getElementById('productsDescription').value;
        const fileInput = document.getElementById('ex_filename');

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('title', title);
        formData.append('tag', tag);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', fileInput.files[0]);  // 이미지 파일 추가

        try {
            const response = await fetch('http://localhost:3010/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": "Bearer " + sessionStorage.getItem("loginId")
                },
                body: JSON.stringify({
                    title: title,
                    tag: tag,
                    price: price,
                    content: description,
                    fileInput: fileInput.files[0],
                }),  // FormData 전달
            });


            if (response.ok) {
                const result = await response.json();
                console.log('Product created successfully:', result.product);
                window.location.href = ''; // Replace this with the desired redirect URL
            } else {
                const errorData = await response.json();
                console.error('Error creating product:', errorData.message);
            }

        } catch (error) {
            console.error('Unexpected error:', error);
        }
    });

    // 이미지 업로드 시 파일명 표시
    fileInput.addEventListener('change', function () {
        const filename = fileInput.files[0].name;
        document.querySelector('.upload-name').value = filename;
    });
});
