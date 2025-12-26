// Load navbar
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
        
        // Set active navigation link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (currentPage.includes('index.html') || currentPage === '' || currentPage === '/') {
            document.getElementById('nav-home')?.classList.add('active');
        } else if (currentPage.includes('about.html')) {
            document.getElementById('nav-about')?.classList.add('active');
        } else if (currentPage.includes('Contact.html')) {
            document.getElementById('nav-contact')?.classList.add('active');
        }
        
        // Initialize account modal after navbar is loaded
        initializeAccountModal();
    })
    .catch(error => console.error('Error loading navbar:', error));

// Load footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));

// Account Modal Functionality
function initializeAccountModal() {
    const modal = document.getElementById('accountModal');
    const accountIcon = document.getElementById('accountIcon');
    const closeModal = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if user is already logged in
    checkLoginStatus();

    // Open modal when account icon is clicked
    accountIcon?.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        checkLoginStatus();
    });

    // Close modal when X is clicked
    closeModal?.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });

    // Login form submission
    loginForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Simulate login (replace with actual API call)
        if (email && password) {
            // Store user data
            const userData = {
                email: email,
                name: email.split('@')[0], // Use email username as name
                isLoggedIn: true
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message
            alert('Login successful! Welcome back.');
            
            // Update modal view
            checkLoginStatus();
            
            // Reset form
            loginForm.reset();
        }
    });

    // Register form submission
    registerForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Simulate registration (replace with actual API call)
        if (name && email && password) {
            // Store user data
            const userData = {
                email: email,
                name: name,
                isLoggedIn: true
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message
            alert('Registration successful! Welcome to The Decor Garage.');
            
            // Update modal view
            checkLoginStatus();
            
            // Reset form
            registerForm.reset();
        }
    });

    // Logout functionality
    logoutBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove user data
        localStorage.removeItem('userData');
        
        // Show message
        alert('You have been logged out successfully.');
        
        // Update modal view
        checkLoginStatus();
        
        // Close modal
        modal.classList.remove('active');
    });

    // Check login status and update modal view
    function checkLoginStatus() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        if (userData && userData.isLoggedIn) {
            // User is logged in - show logged in view
            document.getElementById('login-tab').classList.remove('active');
            document.getElementById('register-tab').classList.remove('active');
            document.getElementById('loggedin-view').style.display = 'block';
            document.getElementById('loggedin-view').classList.add('active');
            
            // Hide auth tabs
            document.querySelector('.auth-tabs').style.display = 'none';
            
            // Update user info
            document.getElementById('user-name').textContent = `Welcome, ${userData.name}!`;
            document.getElementById('user-email').textContent = userData.email;
        } else {
            // User is not logged in - show login/register tabs
            document.getElementById('login-tab').classList.add('active');
            document.getElementById('loggedin-view').style.display = 'none';
            
            // Show auth tabs
            document.querySelector('.auth-tabs').style.display = 'flex';
            
            // Activate login tab by default
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-tab="login"]').classList.add('active');
        }
    }
}