function updateUserInfo() {
    // FormData 객체를 사용하여 form 데이터를 생성
    const formData = new FormData(document.getElementById('userForm'));

    // PUT 요청을 보낼 주소 (API 엔드포인트)
    const url = '/user';

    // fetch를 사용하여 PUT 요청을 보냄
    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // 성공적으로 업데이트되면 다른 동작을 수행하거나 사용자에게 알림을 표시할 수 있음
        })
        .catch(error => {
            console.error('Error:', error);
            // 오류가 발생하면 사용자에게 알림을 표시할 수 있음
        });
}