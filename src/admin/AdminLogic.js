import { auth, db } from '/src/firebase'; // مکمل پاتھ استعمال کریں
// 2. CDN لنکس کو npm پیکیجز سے بدل دیا گیا (تاکہ Vercel پر ایرر نہ آئے)
import { 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    signOut 
} from "firebase/auth";

import { 
    doc, 
    getDoc 
} from "firebase/firestore";

const loginBtn = document.getElementById('loginBtn');
const resetBtn = document.getElementById('resetBtn');
const errorMsg = document.getElementById('errorMsg');

// --- لاگ ان لاجک ---
if (loginBtn) {
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
                // یہاں signOut کو صحیح طریقے سے استعمال کیا گیا ہے
                await signOut(auth);
                showError("رسائی مسترد! آپ ایڈمن نہیں ہیں۔");
            }
        } catch (error) {
            console.error("Login Error:", error);
            showError("ای میل یا پاسورڈ غلط ہے۔");
        } finally {
            loginBtn.disabled = false;
            loginBtn.innerText = "لاگ ان کریں";
        }
    });
}

// --- پاسورڈ ری سیٹ لاجک ---
if (resetBtn) {
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
}

function showError(msg) {
    if (errorMsg) {
        errorMsg.innerText = msg;
        errorMsg.style.display = 'block';
    } else {
        alert(msg);
    }
}
