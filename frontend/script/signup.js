document.addEventListener('DOMContentLoaded', function () {
    const signupButton = document.querySelector('.btn-primary');

    signupButton.addEventListener('click', async function (event) {
        event.preventDefault();
        console.log("hello")
        const name = document.getElementById('inputName').value;
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;

        try {
            const response = await fetch('http://localhost:3010/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('회원가입 성공:', result.message);
                alert('회원가입이 성공했습니다.');
                location.href = 'login.html' // 실제 주소로 변경해야 합니다.
            } else {
                const errorData = await response.json();
                console.error('회원가입 실패:', errorData.error);
                alert(errorData.error);
            }

        } catch (error) {
            console.error('예상치 못한 에러:', error);
            alert(error);
        }
    });
});

