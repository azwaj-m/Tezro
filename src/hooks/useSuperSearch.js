import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit, startAt, endAt, orderBy } from 'firebase/firestore';

export const useSuperSearch = (activeService, searchTerm) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm || searchTerm.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      
      // ہم سروس کے حساب سے صحیح کلیکشن کا انتخاب کریں گے
      const collectionMap = {
        FOOD: 'restaurants',
        SHOP: 'products',
        RIDE: 'locations',
        HOTEL: 'hotels'
      };

      const collectionName = collectionMap[activeService];
      
      try {
        const q = query(
          collection(db, collectionName),
          orderBy('name'), // ہم 'name' کی بنیاد پر سرچ کریں گے
          startAt(searchTerm),
          endAt(searchTerm + '\uf8ff'),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(data);
      } catch (error) {
        console.error("Search Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    // 'Debouncing' تاکہ ہر لفظ لکھنے پر ڈیٹا بیس پر بوجھ نہ پڑے
    const timeoutId = setTimeout(() => fetchResults(), 500);
    return () => clearTimeout(timeoutId);

  }, [activeService, searchTerm]);

  return { results, loading };
};
