import { auth, db } from '../firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('adminEmail').value;
    const pass = document.getElementById('adminPass').value;

    if (!email || !pass) {
        showError("براہ کرم تمام خانے پُر کریں۔");
        return;
    }

    try {
        loginBtn.innerText = "تصدیق ہو رہی ہے...";
        loginBtn.disabled = true;

        // 1. فائر بیس آتھ سے لاگ ان
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        // 2. چیک کریں کہ کیا یہ صارف ایڈمن ہے (Firestore میں Role چیک کریں)
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists() && userDoc.data().role === "admin") {
            window.location.href = "Dashboard.html"; // ڈیش بورڈ پر لے جائیں
        } else {
            await auth.signOut();
            showError("رسائی مسترد! آپ ایڈمن نہیں ہیں۔");
        }
    } catch (error) {
        showError("ای میل یا پاس ورڈ غلط ہے۔");
        console.error(error);
    } finally {
        loginBtn.innerText = "لاگ ان کریں";
        loginBtn.disabled = false;
    }
});

function showError(msg) {
    errorMsg.innerText = msg;
    errorMsg.style.display = 'block';
}
