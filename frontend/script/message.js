document.addEventListener('DOMContentLoaded', () => {
    // 엔터 키 입력 시 메시지 전송
    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // 메시지 전송 함수
    async function sendMessage() {
        const messageInput = document.getElementById("messageInput");
        if (!messageInput) {
            console.error("메시지 입력 필드를 찾을 수 없습니다.");
            return;
        }

        const message = messageInput.value;

        // 서버로 메시지 전송
        try {
            const response = await fetch('http://localhost:3010/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    send_user: '송신자_아이디_또는_이름', // 적절한 값을 넣어주세요
                    get_user: '수신자_아이디_또는_이름', // 적절한 값을 넣어주세요
                    test_message: message,
                }),
            });

            if (response.ok) {
                console.log('메시지 전송 성공');
                // 전송 후 입력창 비우기
                messageInput.value = "";
            } else {
                console.error('메시지 전송 실패');
            }
        } catch (error) {
            console.error('서버 통신 오류:', error);
        }
    }

    var currentTime = function(){
        var date = new Date();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var apm = hh > 12 ? "오후" : "오전";
        var ct = apm + " " + hh + ":" + mm + "";
        return ct;
    }
});
