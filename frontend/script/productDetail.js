document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayProducts();
});

const id = new URL(document.location.href).searchParams.get('id');
const product = document.querySelector('#product')
const comments = document.querySelector('#comments')
async function fetchAndDisplayProducts() {
  try {

    const response = await fetch(`http://localhost:3010/products/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json();
    product.innerHTML = `
    <img src='https://onelinght.s3.ap-northeast-2.amazonaws.com/${data.product.image}' alt="킨더 조이 초콜릿" width="100%">
    <h3 class="product-title">${data.product.title}</h3>
    <h4 class="product-price" style="font-weight:bold;">
    ${data.product.price}원
    </h4>
    <ul class="list-product-information">
        <li class="list-item date">상품 등록 시간 <span><time datetime=${data.product.updatedAt}>1시간 전</time></span></li>
    </ul>
    <div class="description">
       ${data.product.content}
        <p>판매가격: ${data.product.price}원</p>
    </div>
    `
    data.product.comment_info.map(e => {
      console.log(e)
      comments.innerHTML += `
      <div class = "card my-3">
      <div class="card-body">
      <p class="card-text">${e.comment}</p>
      <p class="card-text"><small class="text-muted">${e.updatedAt}</small></p>
      </div>
      </div>
      `
    })
  } catch (error) {
    console.log(error)
  }
}

// 댓글 생성
async function commentpost(comment) {
  const response = await fetch(`http://localhost:3010/api/comment/${id}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + sessionStorage.getItem("loginId")
    },
    body: JSON.stringify({
      comment
    })
  })
  return response.json()
}
// 댓글 수정
async function commentput(id) {
  const response = await fetch(`http://localhost:3010/api/comment/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "Bearer": sessionStorage.getItem("loginId")
    },
  })
  return response.json()
}

// 댓글 삭제
async function commentdelete(id) {
  const response = await fetch(`http://localhost:3010/api/comment/${id}`, {
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
  commentpost(commentText)
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