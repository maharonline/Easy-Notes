import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css';
// import { ShoppingOutlined,RightCircleFilled,LeftCircleFilled } from '@ant-design/icons';



const ImageCarousel = () => {
  return (
    <div style={{ width: '100%', padding: "10px" }} className='mx-auto'>

      {/* <h1  className='fw-bolder fs-3 mt-5 '> <ShoppingOutlined />Shop by Categories</h1>   */}
      <div style={{}}>
        <Carousel
          autoplay
          arrows
          prevArrow={<CustomLeftArrow />}
          nextArrow={<CustomRightArrow />}
          slidesToShow={4}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

              },
            },
          ]}
        >
          

          <div>
            <img src="/Assets/image/one.jpg" alt="Slide 1" style={imageStyle} className='image1' />
            
          </div>
          <div>
            <img src="/Assets/image/two.jpg" alt="Slide 2" style={imageStyle} className='image2' />
          </div>
          <div>
            <img src="/Assets/image/three.jpg" alt="Slide 3" style={imageStyle} className='image3' />
          </div>
          <div>
            <img src="/Assets/image/four.jpg" alt="Slide 4" style={imageStyle} className='image4' />
          </div>
        </Carousel>
      </div>
</div>

    
  );
};

// Custom arrow components


const CustomLeftArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      onClick={onClick} className={`${className} text-dark custom-left-arrow`}  >
      {/* <span  ><LeftCircleFilled style={{fontSize:"40px",color:"black",marginRight:"50px"}}  /></span> */}

    </div>
  );
};

const CustomRightArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div onClick={onClick} className={`${className} text-dark custom-right-arrow`}>
      {/* <RightCircleFilled style={{ fontSize: "40px", color: "black" }} className='position-absolute top-0 end-0 translate-middle-y ' /> */}
    </div>
  );
};


// Custom styling for the images in the carousel
const imageStyle = {
  width: '100%',
  height: '250px', // Adjust the height to your preference
  objectPosition: 'cover',
  borderRadius: '10px', // Add rounded corners like in your screenshot

 
};


export default ImageCarousel;
