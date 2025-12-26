// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
});

// Load navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Navbar not found');
            }
            return response.text();
        })
        .then(data => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = data;
                
                // Set active navigation link
                setActiveNav();
                
                // Initialize account modal
                setTimeout(initializeAccountModal, 100);
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            console.log('Make sure navbar.html is in the same directory as your HTML files');
        });
}

// Load footer
function loadFooter() {
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Footer not found');
            }
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            console.log('Make sure footer.html is in the same directory as your HTML files');
        });
}

// Set active navigation link
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage.includes('index.html') || currentPage === '' || currentPage === '/') {
        const homeLink = document.getElementById('nav-home');
        if (homeLink) homeLink.classList.add('active');
    } else if (currentPage.includes('about.html')) {
        const aboutLink = document.getElementById('nav-about');
        if (aboutLink) aboutLink.classList.add('active');
    } else if (currentPage.includes('Contact.html')) {
        const contactLink = document.getElementById('nav-contact');
        if (contactLink) contactLink.classList.add('active');
    }
}

// Account Modal Functionality
function initializeAccountModal() {
    const modal = document.getElementById('accountModal');
    const accountIcon = document.getElementById('accountIcon');
    const closeModal = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!modal || !accountIcon) {
        console.log('Account modal elements not found');
        return;
    }

    // Check if user is already logged in
    checkLoginStatus();

    // Open modal when account icon is clicked
    accountIcon.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        checkLoginStatus();
    });

    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

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
            const targetTab = document.getElementById(tabName + '-tab');
            if (targetTab) targetTab.classList.add('active');
        });
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email && password) {
                const userData = {
                    email: email,
                    name: email.split('@')[0],
                    isLoggedIn: true
                };
                
                localStorage.setItem('userData', JSON.stringify(userData));
                alert('Login successful! Welcome back.');
                checkLoginStatus();
                loginForm.reset();
            }
        });
    }

    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (name && email && password) {
                const userData = {
                    email: email,
                    name: name,
                    isLoggedIn: true
                };
                
                localStorage.setItem('userData', JSON.stringify(userData));
                alert('Registration successful! Welcome to The Decor Garage.');
                checkLoginStatus();
                registerForm.reset();
            }
        });
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userData');
            alert('You have been logged out successfully.');
            checkLoginStatus();
            modal.classList.remove('active');
        });
    }

    // Check login status and update modal view
    function checkLoginStatus() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const authTabs = document.querySelector('.auth-tabs');
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loggedinView = document.getElementById('loggedin-view');
        const userName = document.getElementById('user-name');
        const userEmail = document.getElementById('user-email');
        
        if (userData && userData.isLoggedIn) {
            // User is logged in
            if (loginTab) loginTab.classList.remove('active');
            if (registerTab) registerTab.classList.remove('active');
            if (loggedinView) {
                loggedinView.style.display = 'block';
                loggedinView.classList.add('active');
            }
            if (authTabs) authTabs.style.display = 'none';
            if (userName) userName.textContent = `Welcome, ${userData.name}!`;
            if (userEmail) userEmail.textContent = userData.email;
        } else {
            // User is not logged in
            if (loginTab) loginTab.classList.add('active');
            if (loggedinView) loggedinView.style.display = 'none';
            if (authTabs) authTabs.style.display = 'flex';
            
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            const loginTabBtn = document.querySelector('[data-tab="login"]');
            if (loginTabBtn) loginTabBtn.classList.add('active');
        }
    }
}
