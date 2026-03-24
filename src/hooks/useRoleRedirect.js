import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useRoleRedirect = () => {
  const navigate = useNavigate();

  const redirectUser = async (user) => {
    if (!user) return;

    try {
      // 1. فائر بیس سے صارف کا ڈیٹا چیک کریں
      const userRef = doc(db, "registrations", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // 2. اگر ایڈمن نے ابھی تک اپروو نہیں کیا
        if (userData.status === 'pending') {
          alert("آپ کا اکاؤنٹ ابھی جانچ پڑتال کے مرحلے میں ہے۔");
          return;
        }

        // 3. کیٹیگری کے لحاظ سے ری ڈائریکشن
        switch (userData.category) {
          case 'Driver':
          case 'Delivery Boy':
            navigate('/ride-dashboard');
            break;
          case 'Vendor':
          case 'Shopkeeper':
          case 'Hotel Manager':
            navigate('/vendor-portal');
            break;
          case 'Plumber':
          case 'Carpenter':
            navigate('/service-home');
            break;
          default:
            navigate('/home'); // عام صارف کے لیے
        }
      } else {
        // اگر ڈیٹا موجود نہیں تو رجسٹریشن پیج پر بھیجیں
        navigate('/register');
      }
    } catch (error) {
      console.error("Redirect Error:", error);
      navigate('/login');
    }
  };

  return { redirectUser };
};
