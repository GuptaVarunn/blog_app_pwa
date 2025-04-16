// Features initialization

// Reading Time Estimator
function estimateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// Initialize reading time display
function initReadingTime() {
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        const readingTime = estimateReadingTime(articleContent.textContent);
        const readingTimeElement = document.querySelector('.reading-time');
        if (readingTimeElement) {
            readingTimeElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>${readingTime} min read`;
        }
    }
}

// Bookmark functionality
function initBookmarks() {
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

    bookmarkBtns.forEach(btn => {
        const postId = btn.dataset.postId;
        if (bookmarks.includes(postId)) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            const index = bookmarks.indexOf(postId);
            if (index === -1) {
                bookmarks.push(postId);
                btn.classList.add('active');
            } else {
                bookmarks.splice(index, 1);
                btn.classList.remove('active');
            }
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        });
    });
}

// Newsletter subscription
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            // Here you would typically send this to your backend
            console.log('Newsletter subscription:', email);
            form.innerHTML = '<p class="text-center">Thanks for subscribing!</p>';
        });
    }
}

// Social sharing functionality
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.getElementById('blog-title').textContent);
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Comment system functionality
function initCommentSystem() {
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const textarea = commentForm.querySelector('textarea');
            const commentText = textarea.value.trim();
            
            if (commentText) {
                // Create new comment element
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `
                    <div class="comment-header">
                        <img src="./assets/profile-icon.svg" alt="User" class="comment-author-avatar">
                        <div>
                            <div class="comment-author-name">Guest User</div>
                            <div class="comment-date">${new Date().toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div class="comment-content">
                        <p>${commentText}</p>
                    </div>
                `;
                
                // Add comment to comments section
                const commentsSection = document.querySelector('.comments-section');
                commentsSection.insertBefore(commentElement, commentForm);
                
                // Clear the form
                textarea.value = '';
            }
        });
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize features here
    initReadingTime();
    initBookmarks();
    initNewsletterForm();
    initSocialSharing();
});