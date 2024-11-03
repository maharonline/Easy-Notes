import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { firestore } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from './AuthContext';

const Profile = createContext();

export default function ReadProfileContext({ children }) {
  const { users } = useAuthContext();
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false ); // Track loading state
  

  const fetchData = useCallback(async () => {
    if (!users?.uid) {
      // If no user or user.uid is undefined, don't fetch data
      setData(null);
      setLoading(false); // Stop loading if no user
      return;
    }

    setLoading(true); // Set loading to true before fetching data
    try {
      const docRef = doc(firestore, "users", users.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = docSnap.data();
        console.log(user)
        const form = {
          fullname: user.fullname,
          email: user.email,
          id: user.uid,
          firstname:user.firstname,
          photo: user?.photo?.url,
          
        };
        setData(form); // Store fetched data
        console.log("Document data:", user);
      } else {
        console.log("No such document!");
        // setError("No such document found");
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // setError("Failed to fetch user data");
      setData(null);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  }, [users?.uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Profile.Provider value={{ data, loading }}>
      {children}
    </Profile.Provider>
  );
}

export const useProfileContext = () => useContext(Profile);
