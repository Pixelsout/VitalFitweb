document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const logoutButton = document.getElementById('logout');
    const toast = document.getElementById('toast');

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        window.location.href = 'index.html';
    }

    const dietRecommendations = [
        { title: 'Breakfast', description: 'Oatmeal with berries and nuts' },
        { title: 'Lunch', description: 'Grilled chicken salad with mixed vegetables' },
        { title: 'Dinner', description: 'Baked salmon with quinoa and steamed broccoli' },
        { title: 'Snack', description: 'Greek yogurt with honey and almonds' },
    ];

    const exerciseRecommendations = [
        { title: 'Cardio', description: '30 minutes of jogging or cycling' },
        { title: 'Strength', description: '3 sets of 10 reps: squats, push-ups, and lunges' },
        { title: 'Flexibility', description: '15 minutes of yoga or stretching' },
        { title: 'Core', description: '3 sets of 20 reps: planks, crunches, and Russian twists' },
    ];

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    function renderRecommendations(recommendations, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = recommendations.map(item => `
            <div class="recommendation-card">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <button class="complete-btn" data-item="${item.title}">Complete</button>
            </div>
        `).join('');
    }

    renderRecommendations(dietRecommendations, 'diet-recommendations');
    renderRecommendations(exerciseRecommendations, 'exercise-recommendations');

    let completedTasks = 0;
    const totalTasks = dietRecommendations.length + exerciseRecommendations.length;

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            e.target.classList.toggle('completed');
            if (e.target.classList.contains('completed')) {
                completedTasks++;
                e.target.textContent = 'Completed';
            } else {
                completedTasks--;
                e.target.textContent = 'Complete';
            }
            updateProgress();
        }
    });

    function updateProgress() {
        const percentage = (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${completedTasks} of ${totalTasks} tasks completed`;
    }

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        window.location.href = 'index.html';
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    showToast(`Welcome, ${userData.name}! Here are your personalized recommendations.`);
});


