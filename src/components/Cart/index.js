import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Image } from 'antd';
import { useReadContext } from '../../Context/ReadContext';
import { doc, serverTimestamp, setDoc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../Context/AuthContext';

const ItemList = () => {
  const { users } = useAuthContext();
  const { items } = useReadContext(); // Getting all items from Firestore

  const [cart, setCart] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [disabledItems, setDisabledItems] = useState(new Set());

  console.log(cart);

  // Real-time listener for the cart collection
  useEffect(() => {
    if (users?.uid) {
      const q = query(collection(firestore, 'Cart'), where("userId", "==", users.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cartItems = querySnapshot.docs.map(doc => doc.data().ItemId);
        setDisabledItems(new Set(cartItems)); // Update the disabled items for the current user
      });
  
      return () => unsubscribe(); // Clean up the listener on component unmount
    }
  }, [users?.uid]);

  const addData = useCallback(async (newItem) => {
    const formData = {
      ...newItem,
      cartuid: Math.random().toString(36).slice(2),
      CartEntering: serverTimestamp(),
      userId: users.uid
    };
    try {
      await setDoc(doc(firestore, "Cart", formData.cartuid), formData);
      window.toastify("Successfully Added", "success");
    } catch (e) {
      window.toastify("Something Went Wrong", "error");
      console.log(e);
    }
  }, [users.uid]);

  useEffect(() => {
    if (cart.length > 0) {
      const newItem = cart[cart.length - 1]; // Get the last item added to the cart
      addData(newItem);
    }
  }, [cart, addData]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 ">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {items?.length > 0 ? (
              items?.map((item) => (
                <div
                  key={item.uid}
                  style={{ position: 'relative', width: '300px', height: '300px', overflow: 'hidden' }}
                  onMouseEnter={() => setHoveredItemId(item?.uid)}
                  onMouseLeave={() => setHoveredItemId(null)}
                >
                  {/* Item Image */}
                  <Image
                    src={item?.photo?.url}
                    alt={item?.fullname}
                    width={"100%"}
                    height={"100%"}
                    preview={false}
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Add to Cart Button */}
                  {hoveredItemId === item.uid && (
                    <Button
                      type="primary"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                      }}
                      onClick={() => {
                        const newItem = { ItemId: item.uid, product: item.product, price: item.price, image: item.photo.url };
                        setCart((prevCart) => [...prevCart, newItem]);
                      }}
                      disabled={disabledItems.has(item?.uid)} // Disable the button if item is in the cart
                    >
                      {disabledItems.has(item?.uid) ? 'Added' : <ShoppingCartOutlined className='fs-2'/>}
                    </Button>
                  )}

                  {/* Item Details */}
                  <Card.Meta
                    title={item.product}
                    description={`${item?.description} - $${item?.price}`}
                    style={{ marginTop: '10px' }}
                  />
                </div>
              ))
            ) : (
              <p>No items found!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
