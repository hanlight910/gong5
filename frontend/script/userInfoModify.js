document.addEventListener('DOMContentLoaded', async () => {
    const userInfoForm = document.getElementById('userInfoForm');

    try {
        const userInfoResponse = await fetch('http://localhost:3010/auth/user', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer " + sessionStorage.getItem("loginId")
            },
        });

        if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();

            // 가져온 사용자 정보를 이용하여 HTML 업데이트
            document.getElementById('name').value = userInfo.user.name || '';
            document.getElementById('phoneNumber').value = userInfo.user.phoneNumber || '';
            document.getElementById('addressSearch').value = userInfo.user.address || '';
            document.getElementById('introduction').value = userInfo.user.introduction || ''


        } else {
            console.error('Failed to fetch user information');
        }
    } catch (error) {
        console.error('Error during page load:', error);
    }

    userInfoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // 폼 데이터를 FormData 객체로 가져오기
        const formData = new FormData(userInfoForm);

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
                location.href = 'mypage.html';
            } else {
                // 서버에서 오류 응답을 받았을 때 수행할 작업
                console.error('유저 정보 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('유저 정보 수정 중 오류 발생:', error);
        }
    });

});
function searchAddress() {
    new daum.Postcode({
        oncomplete: function (data) {
            document.getElementById('addressSearch').value = data.roadAddress;
        }
    }).open();
}