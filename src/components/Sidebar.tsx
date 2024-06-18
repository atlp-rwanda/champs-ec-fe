import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoBag, IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { IconType } from "react-icons";
interface menuInterface {
  title: string,
  src: IconType,
  gap?: boolean,
  clicked: boolean
}
const Menus: menuInterface[] = [
  { title: "Dashboard", src: MdDashboard, clicked: false },
  { title: "Users", src: IoPersonOutline, clicked: false },
  { title: "Logout", src: IoLogOutOutline, gap: true, clicked: false },
];
function Dashboard() {
  const [open, setOpen] = useState(true);
  const [display, setDisplay] = useState();
  const [menu, setMenus] = useState(Menus);
  // const handleItemClick = (index: any) => {
  //   const clickedItem = Menus[index];
  //   const updatedMenus = Menus.map((menu, i) => {
  //     if (i === index) {
  //       return { ...menu, clicked: true };
  //     } else {
  //       return { ...menu, clicked: false };
  //     }
  //   });
  //   setMenus(updatedMenus);
  //   // switch (clickedItem.title) {
  //   //   case "Users":
  //   //     setDisplay();
  //   //     break;
  //   //   default:
  //   //     setDisplay();
  //   //     break;
  //   // }
  // };
  return (
    <div className="flex ">
      <div
        className={` ${open ? "w-72" : "w-20"
          } bg-dark-purple h-screen p-5  pt-4 relative duration-300 bg-blue-600`}
      >
        <img
          src="/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center">
          <img
            src="/logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]" && "min-w-[30px]"
              }`}
          />
          <h1
            className={`text-white text-2xl origin-left font-medium  duration-200 ${!open && "scale-0"
              }`}
          >
            Champs Bay
          </h1>
        </div>
        <ul className="pt-6">
          {menu.map((Menu, index) => (
            <li
              key={index}
              className={`flex ${Menu.clicked === true
                ? " bg-primary/80 text-black"
                : "bg-transparent"
                }  rounded-md ${!open && "hover:bg-primary"
                } p-2 cursor-pointer  hover:bg-light-white text-white  text-[25px] items-center gap-x-4
            ${Menu.gap ? "mt-10" : "mt-2"} ${index === 0 && "bg-light-white"} `}
            >
              {React.createElement(Menu.src)}
              <span
                className={`${!open && "hidden"
                  } origin-left duration-200 hover:text-primary hover:text-[20px]`}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">{display}</div>
    </div>
  );
}
export default Dashboard;