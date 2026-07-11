const API = "http://localhost:5000/api/blogs";

let editingId = null;
let blogs = [];

const form = document.getElementById("blogForm");

async function loadBlogs() {

    const response = await fetch(API);
    blogs = await response.json();

    const container = document.getElementById("blogList");

    container.innerHTML = "";

    blogs.forEach(blog => {

        container.innerHTML += `
        <div class="card">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
         <strong>${blog.author}</strong>
         <br><br>
         <button onclick="editBlog('${blog._id}')">Edit</button>
          <button onclick="deleteBlog('${blog._id}')">Delete</button>
         </div>
        `;

    });

}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const blog = {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
        author: document.getElementById("author").value
    };

    if (editingId) {
        await fetch(`${API}/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        });

        editingId = null;
        form.querySelector("button").textContent = "Add Blog";

    } else {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        });
    }

    form.reset();
    loadBlogs();
});

loadBlogs();

async function deleteBlog(id) {

    if (!confirm("Are you sure you want to delete this blog?")) return;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadBlogs();
}

function editBlog(id) {

    const blog = blogs.find(b => b._id === id);

    document.getElementById("title").value = blog.title;
    document.getElementById("content").value = blog.content;
    document.getElementById("author").value = blog.author;

    editingId = id;

    form.querySelector("button").textContent = "Update Blog";
}