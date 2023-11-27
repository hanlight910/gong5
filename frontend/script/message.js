

document.addEventListener('DOMContentLoaded', () => {
    const id = new URL(document.location.href).searchParams.get('id');

    fetchAndDisplayProducts();

    async function fetchAndDisplayProducts() {
        $('.chat-link').click(function (e) {
            e.preventDefault();
            openChatModal();
            fetchExistingMessages();
        });
    }

    async function fetchExistingMessages() {
        try {
            const response = await fetch(`http://localhost:3010/products/${id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            const messageResponse = await fetch(`http://localhost:3010/message/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": "Bearer " + sessionStorage.getItem("loginId")
                },
                body: JSON.stringify({
                    get_user: data.product.user_id,
                }),
            });

            const message = await messageResponse.json();
            displayExistingMessages(message);
        } catch (error) {
            console.error('Error fetching existing messages:', error);
        }
    }


    function displayExistingMessages(messages) {
        var chatModalBody = document.querySelector('#chatModalBody');

        messages.forEach(function (message) {
            var newMessage = document.createElement('div');
            newMessage.className = 'chat-message';

            // 송신자와 수신자를 확인하여 클래스 추가
            var isUserMessage = message.send_user === parseInt(sessionStorage.getItem("loginId"));
            newMessage.classList.add(isUserMessage ? 'user-message' : 'agent-message');

            newMessage.textContent = message.test_message;
            chatModalBody.appendChild(newMessage);
        });

        // 스크롤을 맨 아래로 이동
        chatModalBody.scrollTop = chatModalBody.scrollHeight;
    }

    function addComment(event) {
        event.preventDefault();
        var commentInput = document.querySelector('#messageInput');
        var commentText = commentInput.value.trim();

        if (commentText !== '') {
            var commentsContainer = document.querySelector('#comments');
            var newComment = document.createElement('div');
            newComment.className = 'comment';

            // Check if the comment is from the user or agent
            var isUserComment = true; // You need to determine this based on your logic
            newComment.classList.add(isUserComment ? 'user-comment' : 'agent-comment');

            newComment.textContent = commentText;
            commentsContainer.appendChild(newComment);

            // Clear the input
            commentInput.value = '';
        }
    }

    async function addExampleMessages() {
        try {
            const response = await fetch(`http://localhost:3010/products/${id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            console.log(data.product);

            var messages = [
                { text: '안녕하세요!', isUser: false },
                { text: '판매자 채팅기능은 아직 준비중입니다 조금만 기다려주세요 😊', isUser: true }
            ];

            var chatModalBody = document.querySelector('#chatModalBody');

            messages.forEach(function (message) {
                var newMessage = document.createElement('div');
                newMessage.className = 'chat-message';

                // 메시지에 사용자와 에이전트에 따른 클래스 추가
                newMessage.classList.add(message.isUser ? 'user-message' : 'agent-message');

                newMessage.textContent = message.text;
                chatModalBody.appendChild(newMessage);
            });

            // 스크롤을 맨 아래로 이동
            chatModalBody.scrollTop = chatModalBody.scrollHeight;
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    }


    function openChatModal() {
        $('#chatModal').modal('show');
        addExampleMessages();
    }

    // 메시지를 전송할 때 실행되는 함수
    function sendMessage() {
        const message = $('#messageInput').val();
        const get_user = ''; // 수신자 정보를 여기에 추가해야 합니다.

        // 여기에서 메시지를 서버로 보내는 로직을 추가
        fetch('http://localhost:3010/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer " + sessionStorage.getItem("loginId")
            },
            body: JSON.stringify({
                get_user: 3,
                test_message: message,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // 서버로부터 응답을 받은 후에 채팅창을 업데이트하거나 새 메시지를 추가하는 로직을 여기에 추가
                updateChatModal(message);
            })
            .catch(error => {
                console.error('Error:', error);
                // 에러 처리 로직을 추가
            });
    }

    function updateChatModal(message) {
        const chatContent = $('#chatModalBody').html();
        $('#chatModalBody').html(chatContent + '<p>' + message + '</p>');
    }

    // 전송 버튼 클릭 이벤트 등록
    $('#sendButton').click(function (e) {
        e.preventDefault();
        sendMessage();
    });
});
