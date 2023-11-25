// 댓글 생성
async function commentpost(title) {
  const response = await fetch("http://localhost:3000/api/comment/:product_id", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          title
      })
  })
  return response.json()
}
// 댓글 수정
async function commentput(id) {
  const response = await fetch(`http://localhost:3000/api/comment/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
  })
  return response.json()
}

// 댓글 삭제
async function commentdelete(id) {
  const response = await fetch(`http://localhost:3000/api/comment/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
  })
  return response.json()
}

function addComment(event) {
  event.preventDefault();
  var commentInput = event.target.querySelector("input");
  var commentText = commentInput.value;
  var date = new Date().toLocaleString();

  var commentDiv = document.createElement("div");
  commentDiv.className = "card my-3";
  commentDiv.innerHTML = `
    <div class="card-body">
      <p class="card-text">${commentText}</p>
      <p class="card-text"><small class="text-muted">${date}</small></p>
    </div>
  `;

  var commentsDiv = event.target.parentNode.querySelector(".comments");
  commentsDiv.insertBefore(commentDiv, commentsDiv.firstChild);

  commentInput.value = "";
}