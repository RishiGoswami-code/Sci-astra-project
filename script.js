// Run this code once the content of the page has loaded
document.addEventListener('DOMContentLoaded', () => {
  loadContent(); // Load all content (courses and blogs)
});

// Main function to load content
function loadContent() {
  fetchAndDisplayData('courses', 'course-list', renderCourse);
  fetchAndDisplayData('blogs', 'blog-list', renderBlog);
}

// Generic function to fetch and display data from API
async function fetchAndDisplayData(endpoint, elementId, renderFunction) {
  try {
    // Fetch data from the backend API
    const response = await fetch(`http://localhost:3000/api/${endpoint}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    
    const data = await response.json();
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear existing content

    // Render each item in the data using the provided render function
    data.forEach(item => {
      const element = renderFunction(item);
      container.appendChild(element);
    });
  } catch (error) {
    console.error(error);
    displayErrorMessage(elementId, `Error loading ${endpoint}. Please try again later.`);
  }
}

// Function to render a course item
function renderCourse(course) {
  const courseElement = document.createElement('div');
  courseElement.classList.add('course-item');
  courseElement.innerHTML = `
    <h3>${course.name}</h3>
    <p>Discounted Price: ${course.discounted_price}</p>
  `;
  return courseElement;
}

// Function to render a blog post item
function renderBlog(blog) {
  const blogElement = document.createElement('div');
  blogElement.classList.add('blog-item');
  blogElement.innerHTML = `
    <h3>${blog.title}</h3>
    <p>${blog.content}</p>
  `;
  return blogElement;
}

// Function to display error messages
function displayErrorMessage(elementId, message) {
  const container = document.getElementById(elementId);
  container.innerHTML = `<p class="error-message">${message}</p>`;
}

// Toggle menu display
document.querySelector('.menu').addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('menu-open');
});

// Dummy payment button functionality (if integrated on the payment page)
document.querySelectorAll('.pay-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    alert("This is a dummy payment system. Payment processing will be implemented soon.");
  });
});
