import React from 'react'
import CustomerCard from './CustomerCard';
import Instagram from './Instagram';
import Confidence from './Confidence';
import Hero from './Hero';
import Deals from './Deals';
import ShopingCatgories from './ShopingCatgories';
import ItemList from 'components/Cart';
import { useAuthContext } from 'Context/AuthContext';
import Header from "components/Header"
import Footer from "components/Footer"



export default function Home() {
  const { isAuthenticated } = useAuthContext()

  return (
    <>
    <Header/>

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Shopping Catgories */}

        <ShopingCatgories />

        {/* Deals COmponent */}
        {isAuthenticated ? <Deals /> : <></>}

        {/* Products  */}
        {isAuthenticated ? <div className='container d-flex justify-content-center align-items-center flex-column mt-5'>
          <h1>Products</h1>
          <ItemList />
        </div>
          : ""
        }

        {/* Card Section */}
        <div className="container d-flex justify-content-center align-items-center flex-column" >

          <CustomerCard />
        </div>

        {/* Instgram Story  Section*/}
        <div className="container d-flex justify-content-center align-items-center flex-column" style={{ marginTop: "100px" }}>

          <Instagram />
        </div>

        {/* <div style={{ marginTop: "100px" }}>

          <Confidence />
        </div> */}

        {/* Footer Section */}



<Footer/>

      </main>
    </>
  )
}
