import { auth, db } from '../firebase-config.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const loginBtn = document.getElementById('loginBtn');
const resetBtn = document.getElementById('resetBtn');
const errorMsg = document.getElementById('errorMsg');

// --- لاگ ان لاجک ---
loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('adminEmail').value.trim();
    const pass = document.getElementById('adminPass').value;

    if (!email || !pass) {
        return showError("ای میل اور پاسورڈ درج کرنا لازمی ہے۔");
    }

    try {
        loginBtn.disabled = true;
        loginBtn.innerText = "تصدیق ہو رہی ہے...";

        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        // Firestore میں چیک کریں کہ کیا رول "admin" ہے
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists() && userDoc.data().role === 'admin') {
            sessionStorage.setItem("isTezroAdmin", "true");
            window.location.href = "../admin/Dashboard.html";
        } else {
            await auth.signOut();
            showError("رسائی مسترد! آپ ایڈمن نہیں ہیں۔");
        }
    } catch (error) {
        showError("ای میل یا پاسورڈ غلط ہے۔");
    } finally {
        loginBtn.disabled = false;
        loginBtn.innerText = "لاگ ان کریں";
    }
});

// --- پاسورڈ ری سیٹ لاجک ---
resetBtn.addEventListener('click', async () => {
    const email = document.getElementById('resetEmail').value.trim();
    if (!email) return alert("براہ کرم ای میل درج کریں۔");

    try {
        await sendPasswordResetEmail(auth, email);
        alert("پاسورڈ ری سیٹ لنک آپ کی ای میل پر بھیج دیا گیا ہے۔");
    } catch (error) {
        alert("ای میل بھیجنے میں غلطی ہوئی۔ دوبارہ کوشش کریں۔");
    }
});

function showError(msg) {
    errorMsg.innerText = msg;
    errorMsg.style.display = 'block';
}
