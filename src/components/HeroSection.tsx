import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderData = [
  {
    id: 1,
    img: './desk.png',
    title: 'Interior furnitures',
    description:
      'Upgrade your living space with our premium furniture collection, designed to offer you style at an unbeatable price',
  },
  {
    id: 1,
    img: './force.png',
    title: 'Sports sneakers',
    description:
      'Today in the market you can find sneakers of different styles and sizes. There are also special categories',
  },
];

const HeroSection = () => {
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    pauseOnHover: false,
    pauseOnFocus: true,
    height: 100,
  };
  return (
    <div>
      <div className=" mx-3 overflow-hidden  p-6  bg-Herobackground mt-6   rounded-3xl flex justify-center items-center duration-200">
        <div className="container  sm:pb-0  ">
          <Slider {...settings} className="relative  ">
            {sliderData.map((items) => (
              <div key={items.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 ">
                  <div className="flex flex-col ml-5 justify-center pt-10 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative sm:items-start items-center">
                    <h1 className="text-4xl sm:text-4xl lg:text-7xl font-bold mb-10 text-h">
                      {items.title}
                    </h1>
                    <p className="text-lg w-[80%] mb-10">{items.description}</p>
                    <div className="bg-green-500 w-[160px]  items-center px-2 p-1 pr-6 hover:pr-2 duration-200 hover:bg-green-600 flex justify-between">
                      <button className=" text-white bg-primary   hover:bg-primary/70 rounded-2xl">
                        See All Deals
                      </button>
                      <span className="text-white font-bold text-2xl ">→</span>
                    </div>
                  </div>
                  <div className="order-1 sm:order-2 sm:mr-10">
                    <div className="relative z-10">
                      <img
                        src={items.img}
                        alt=""
                        className="w-[400px] h-[300px] sm:h-[400px]  sm:w-[450px] sm:scale-105 lg:scale-120 object-contain "
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
