// Navigate to Different Screens
window.navigateTo = (path) => {
    window.location.href = path;
};

// Open Referral System
window.openReferral = () => {
    const referralCode = "ALINGO-" + Math.random().toString(36).substr(2, 5).toUpperCase();
    alert(`Your Referral Code: ${referralCode}\nShare this with friends to earn Rs. 500!`);
};

// Active Logout Function
window.handleLogout = () => {
    if(confirm("Are you sure you want to logout?")) {
        // Firebase logout logic here
        localStorage.clear();
        window.location.href = 'Login.html';
    }
};
