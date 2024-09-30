document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toast = document.getElementById('toast');

    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

           
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!validateEmail(email) || !validatePassword(password)) {
            showToast('Invalid login credentials. Please try again.');
            return;
        }


        showToast('Logging in...');
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify({ email }));
            window.location.href = 'user-info.html'; 
        }, 1500);
    });


    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;


        if (!name || !validateEmail(email) || !validatePassword(password)) {
            showToast('Invalid sign-up details. Please check your inputs.');
            return;
        }

        showToast('Signing up...');
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify({ name, email }));
            window.location.href = 'user-info.html'; 
        }, 1500);
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    
    function validateEmail(email) {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailPattern.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }
});
