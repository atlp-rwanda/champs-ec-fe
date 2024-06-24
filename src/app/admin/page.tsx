"use client"
import React, { Suspense, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import UsersPageAdmin from "@/components/UsersAdmin";
import AdminDashboard from "@/hooks/useAdminDashboard";
import SellerProductView from "@/app/sellers/products_/page";
import ProductPopup from "@/components/AddProducts";

function Dashboard() {
  const {
    handleItemClick,
    header,
    setDisplay,
    display,
    menu,
    open,
    setOpen } = AdminDashboard()

  useEffect(() => {
    switch (header) {
      case "Users":
        setDisplay(<UsersPageAdmin />);
        break;
      case "Products":
        setDisplay(<SellerProductView />);
        break;
      default:
        setDisplay(<h1>Welcome to the dashboard</h1>);
        break;
    }
  }, [header]);

  return (
    <div className="flex">
      <div
        className={`${open ? "w-72" : "w-20"
          } h-screen p-5 sticky top-0 pt-4 hidden sm:block relative duration-300 bg-primaryBlue`}
      >
        <img
          src="/control.png"
          alt="Control Button"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"
            }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center">
          <img
            src="/logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]" && "min-w-[30px]"
              }`}
          />
          <h1
            className={`text-white text-2xl origin-left font-medium duration-200 ${!open && "scale-0"
              }`}
          >
            Champs Bay
          </h1>
        </div>
        <ul className="pt-6">
          {menu.map((Menu, index) => (
            <li
              key={index}
              className={`flex ${Menu.clicked ? "bg-primary/80 text-white" : "bg-transparent"
                } rounded-md ${!open && "hover:bg-primary"} p-2 cursor-pointer hover:bg-light-white text-white text-[25px] items-center gap-x-4 ${Menu.gap ? "mt-10" : "mt-2"
                } ${index === 0 && "bg-light-white"}`}
              onClick={() => handleItemClick(index)}
            >
              {React.createElement(Menu.src)}
              <span
                className={`${!open && "hidden"} origin-left duration-200 hover:text-primary hover:text-[20px]`}
              >
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-screen flex-1 p-0 sm:p-7">
        <div className="flex flex-col">
          <DashboardHeader pageName={header} />
          <div className="p-2 sm:p-0">{display}</div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  )
}

export default Page;
