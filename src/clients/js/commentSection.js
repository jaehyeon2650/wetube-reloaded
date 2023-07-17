const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".comment_delete");


const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    newComment.dataset.id = id;
    const i = document.createElement("i");
    i.className = "fas fa-comment";
    const span = document.createElement("span");
    const span2 = document.createElement("span");
    span.innerText = `  ${text}`;
    span2.innerText = `  ❌`;
    span2.className = "comment_delete"
    span2.addEventListener("click", deleteComment);
    newComment.appendChild(i);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
}
const submitevent = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const video = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${video}/comments`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    })
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }

}

const deleteComment = async (event) => {
    const video = videoContainer.dataset.id;
    const { id } = event.target.parentElement.dataset
    const { status } = await fetch(`/api/videos/${video}/delete-comments`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    })
    if (status === 201) {
        const videoComments = document.querySelector(".video__comments ul");
        videoComments.removeChild(event.target.parentElement);
    }
}
if (form) {
    form.addEventListener("submit", submitevent);
}

deleteBtn.forEach(function (btn) {
    btn.addEventListener("click", deleteComment);
})