import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

export const useSuperSearch = (searchTerm) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchAllServices = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      const allResults = [];
      
      // تمام سروسز کے کلیکشنز کی فہرست
      const collections = [
        { name: 'restaurants', type: 'FOOD', icon: '🍔' },
        { name: 'products', type: 'SHOP', icon: '🛍️' },
        { name: 'locations', type: 'RIDE', icon: '🚗' },
        { name: 'professionals', type: 'SERVICE', icon: '🛠️' }, // پلمبر، الیکٹریشن وغیرہ
        { name: 'hotels', type: 'HOTEL', icon: '🏨' },
        { name: 'doctors', type: 'HEALTH', icon: '👨‍⚕️' }
      ];

      try {
        const searchPromises = collections.map(async (col) => {
          const q = query(
            collection(db, col.name),
            where('searchKeywords', 'array-contains', searchTerm.toLowerCase()),
            limit(5)
          );
          const snap = await getDocs(q);
          return snap.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(), 
            serviceType: col.type,
            icon: col.icon 
          }));
        });

        const resolvedResults = await Promise.all(searchPromises);
        setResults(resolvedResults.flat());
      } catch (error) {
        console.error("Super Search Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => searchAllServices(), 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return { results, loading };
};
