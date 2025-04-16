// DOM Elements
const blogGrid = document.querySelector('.blog-grid');

// Function to create blog card HTML
function createBlogCard(blog) {
    return `
        <div class="blog-card" onclick="window.location.href='blog-detail.html?id=${blog.id}'">
            <img src="${blog.image}" alt="${blog.title}" class="blog-card-image">
            <div class="blog-card-content">
                <span class="blog-category">${blog.category}</span>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-metadata">
                    <div class="blog-author">
                        <img src="https://placehold.co/100x100/2c3e50/FFFFFF/png?text=${blog.author.charAt(0)}" alt="${blog.author}">
                        <span>${blog.author}</span>
                    </div>
                    <div class="blog-stats">
                        <span>${blog.readTime}</span>
                        <span>★ ${blog.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to render blog posts
function renderBlogPosts() {
    blogGrid.innerHTML = blogPosts.map(blog => createBlogCard(blog)).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
});