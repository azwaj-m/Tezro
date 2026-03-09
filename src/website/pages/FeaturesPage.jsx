import React from 'react';

const FeaturesPage = () => {
    const WEBSITE_FEATURES_URL = "https://tezro-web.vercel.app/features";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
            <h1 className="text-2xl font-bold text-blue-700">Tezro Features</h1>
            <p className="mt-4 text-gray-600">
                ایپ کے تمام جدید فیچرز اور رجسٹریشن کی تفصیلات دیکھنے کے لیے ہماری آفیشل ویب سائٹ وزٹ کریں۔
            </p>
            <button 
                onClick={() => window.location.href = WEBSITE_FEATURES_URL}
                className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition"
            >
                Explore on Website
            </button>
        </div>
    );
};

export default FeaturesPage;
