import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs, limit, startAt, endAt, orderBy } from 'firebase/firestore';

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
      
      const collectionMap = {
        FOOD: 'restaurants',
        SHOP: 'products',
        RIDE: 'locations',
        HOTEL: 'hotels'
      };

      const collectionName = collectionMap[activeService] || 'products';
      
      try {
        const q = query(
          collection(db, collectionName),
          orderBy('name'),
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

    const timeoutId = setTimeout(() => fetchResults(), 500);
    return () => clearTimeout(timeoutId);

  }, [activeService, searchTerm]);

  return { results, loading };
};
