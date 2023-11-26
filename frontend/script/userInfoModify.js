document.addEventListener('DOMContentLoaded', () => {
    const userInfoForm = document.getElementById('userInfoForm');

    userInfoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log(userInfoForm)
        // 폼 데이터를 FormData 객체로 가져오기
        const formData = new FormData(userInfoForm);
        console.log(formData);

        // 서버에 PUT 요청 보내기
        try {
            const response = await fetch('http://localhost:3010/auth/user', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('loginId')
                },
                body: formData
            });

            if (response.ok) {
                // 서버에서 성공적인 응답을 받았을 때 수행할 작업
                alert('유저 정보 수정이 완료되었습니다.');
                location.href = 'mypage.html'
            } else {
                // 서버에서 오류 응답을 받았을 때 수행할 작업
                console.error('유저 정보 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('유저 정보 수정 중 오류 발생:', error);
        }
    });
});
