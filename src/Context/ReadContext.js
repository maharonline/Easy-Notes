import { collection,  getDocs, onSnapshot, query, where,  } from 'firebase/firestore';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import { useAuthContext } from './AuthContext';


const Read = createContext();



export default function ReadContext({ children }) {
  const {users}=useAuthContext()
  // console.log(users.email);
  
  const [items, setItems] = useState([]); // Updated to hold a list of items
  const [documents,setdocuments]=useState([])
  const [user,setUser]=useState([])


  // console.log(items)
  

  // Function to read all items from Firestore
  const readData = useCallback(async () => {
    try {
     
      const querySnapshot = await getDocs((collection(firestore, "Items")));
      let array=[]
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          let data=doc.data()
          // console.log("Table-data" ,data);
          
          array.push(data)

          // console.log(array);
          

      });
      setItems(array)// Store all the items in state
      
    } catch (error) {
      console.log('Error fetching items data:', error);
    }
  },[]);

  useEffect(() => {
    readData();
  }, [readData]);
  
  const readdocuments = useCallback(() => {
    if (!users?.uid) {

      setdocuments([])
      return; 

    }
    
    const q = query(collection(firestore, "Cart"), where("userId", "==", users.uid));
    
    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let array = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        array.push(data);
      });
      setdocuments(array); // Update documents with real-time changes
    }, (error) => {
      console.log('Error fetching cart data:', error);
    });
    return () => unsubscribe();
  },[users?.uid]);
  

  useEffect(() => {
    readdocuments()
  }, [readdocuments])

  // Read Users

  const readuser=useCallback(async()=>{
    try {
      const querySnapshot = await getDocs((collection(firestore, "Users")));
      let array=[]
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          let data=doc.data()         
          array.push(data)
      });
      setUser(array)// Store all the items in state
      
      
    } catch (error) {
      console.log('Error fetching items data:', error);
    }
  },[])

  useEffect(()=>{
    readuser()
    // readData()
    // const unsubscribe = readdocuments(); // Set up real-time listener for cart items
    // return () => {
    //   if (unsubscribe) unsubscribe(); // Cleanup listener on unmount or users.uid change
    // };
    // readdocuments()
  },[readuser])
  

  return (
    <Read.Provider value={{ items ,documents,setdocuments,user}}>
      {children}
    </Read.Provider>
  );
}

export const useReadContext = () => useContext(Read);
