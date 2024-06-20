import React from 'react';
const data = [
  {
    title: 'Navigate',
    links: [
      { name: 'About', link: '#' },
      { name: 'Messages', link: '#' },
      { name: 'Order', link: '#' },
      { name: 'Contact Us', link: '#' },
      { name: 'Join Us', link: '#' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { name: 'Home appliances', link: '#' },
      { name: 'Groceries', link: '#' },
      { name: 'Fashion', link: '#' },
      { name: 'Electronics', link: '#' },
    ],
  },
  {
    links: [
      { name: 'KG 000 street ', link: '#' },
      { name: 'Kigali, Rwanda', link: '#' },
      { name: '(250) 788 100 000', link: '#' },
      { name: 'champsbay@gmail.com', link: '#' },
    ],
  },
];
const Icons = [
  { Icon: './insta.png', link: '#' },
  { Icon: './fb.png', link: '#' },
  { Icon: './X.png', link: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 w-full ">
      {/* <ItemsContainer /> */}
      <div className="w-full  max-w-[1400px] flex justify-center items-center">
        {/* Center section  */}
        <div className="flex sm:justify-between sm:gap-20 sm:py-4 sm:flex-row  gap-5 flex-col-reverse">
          <div className="flex flex-col sm:flex-row gap-2 mb-5">
            <div className="min-w-[300px]">
              <ul>
                <h1 className="mb-1 font-semibold">{data[0].title}</h1>
                {data[0].links.map((link) => (
                  <li key={link.name}>
                    <a
                      className="text-gray-400 hover:text-white duration-300
        text-sm cursor-pointer leading-6"
                      href={link.link}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" min-w-[300px]">
              <ul>
                <h1 className="mb-1 font-semibold">{data[1].title}</h1>
                {data[1].links.map((link) => (
                  <li key={link.name}>
                    <a
                      className="text-gray-400 hover:text-white duration-300
        text-sm cursor-pointer leading-6"
                      href={link.link}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" min-w-[300px]">
            <ul>
              <img
                src="./logofull.png"
                alt="Logo_Image"
                className="h-[40px] "
              />
              {data[2].links.map((link) => (
                <li key={link.name}>
                  <a
                    className="text-gray-400 hover:text-white duration-300
        text-sm cursor-pointer leading-6"
                    href={link.link}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mt-3 h-[20px]">
                <div className="flex gap-4 rounded-full">
                  {Icons.map((link) => (
                    <div key={link.Icon}>
                      <a
                        className="text-gray-400 hover:text-white duration-300
        text-sm cursor-pointer leading-6"
                        href={link.link}
                      >
                        <img
                          src={link.Icon}
                          alt=""
                          className="w-6 hover:w-7 duration-200"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" border-t-4 border-white items-center justify-center flex text-center  text-gray-400 text-sm p-4">
        <span>
          {' '}
          Copyright © {new Date().getFullYear()} Champs bay. All rights
          reserved
        </span>

        {/* <SocialIcons Icons={Icons} /> */}
      </div>
    </footer>
  );
}
