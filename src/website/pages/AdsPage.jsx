import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // ویب سائٹ کا یو آر ایل (TezroWeb)
    const WEBSITE_URL = "https://tezro-web.vercel.app/register";

    const handleRedirect = () => {
        // موجودہ پیج کا راستہ محفوظ کریں تاکہ واپسی پر وہیں جائیں
        localStorage.setItem('returnPath', location.pathname);
        
        // صارف کو ویب سائٹ پر بھیجنا
        window.location.href = `${WEBSITE_URL}?source=app`;
    };

    useEffect(() => {
        // اگر صارف ویب سائٹ سے واپس آیا ہے (URL میں success دیکھ کر)
        const params = new URLSearchParams(window.location.search);
        if (params.get('auth') === 'success') {
            const lastPath = localStorage.getItem('returnPath') || '/';
            navigate(lastPath);
        }
    }, [navigate]);

    return (
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold">Registration Required</h2>
            <p className="my-4">مکمل رجسٹریشن کے لیے آپ کو ہماری ویب سائٹ پر جانا ہوگا۔</p>
            <button 
                onClick={handleRedirect}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
                Go to Website
            </button>
        </div>
    );
};

export default AuthRedirect;
