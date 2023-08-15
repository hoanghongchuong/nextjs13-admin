import Dropdown from "@/components/dropdown/dropdown";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";
import user_image from "../../../../assets/images/avatar-1.jpg";

function NavbarTop({ toggleSidebar }) {
  const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  );
  const curr_user = {
    display_name: "Tuat Tran",
    image: user_image,
  };

  const renderUserToggle = (user) => (
    <div className="topnav-right-user">
      <div className="topnav-right-user-image">
        <Image src={user.image} alt="" />
      </div>
      {/* <div className="topnav__right-user__name">{user.display_name}</div> */}
    </div>
  );

  const renderUserMenu = (item, index) => (
    <Link href="/" key={index}>
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  );

  const userMenus = [
    {
      icon: "bx bx-user",
      content: "Profile",
    },
    {
      icon: "bx bx-wallet-alt",
      content: "My Wallet",
    },
    {
      icon: "bx bx-cog",
      content: "Settings",
    },
    {
      icon: "bx bx-log-out-circle bx-rotate-180",
      content: "Logout",
    },
  ];
  const notifications = [
    {
      icon: "bx bx-error",
      content: "Curabitur id eros quis nunc suscipit blandit",
    },
    {
      icon: "bx bx-package",
      content:
        "Duis malesuada justo eu sapien elementum, in semper diam posuere",
    },
    {
      icon: "bx bx-cart",
      content: "Donec at nisi sit amet tortor commodo porttitor pretium a erat",
    },
    {
      icon: "bx bx-error",
      content: "In gravida mauris et nisi",
    },
    {
      icon: "bx bx-cart",
      content: "Curabitur id eros quis nunc suscipit blandit",
    },
  ];

  return (
    <div className="header">
      <div className="navbar d-flex align-items-center navbar-classic navbar navbar-expand-lg navbar navbar-expand navbar-light">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <span id="nav-toggle" className="m-2" onClick={toggleSidebar}>
              <FaBars />
            </span>
            {/* <div className="ms-lg-3 d-none d-md-none d-lg-block">
              <form className="d-flex align-items-center">
                <input
                  placeholder="Search"
                  type="search"
                  className="form-control"
                />
              </form>
            </div> */}
          </div>
          <div className="navbar-right ms-2 d-flex nav-top-wrap navbar-nav align-items-center">
            <div className="topnav-right-item me-2">
              <Dropdown
                icon="fa fa-bell"
                contentData={notifications}
                renderItems={(item, index) =>
                  renderNotificationItem(item, index)
                }
                classCustom="item-alert"
              />
            </div>
            <div className="topnav-right-item">
              <Dropdown
                customToggle={() => renderUserToggle(curr_user)}
                contentData={userMenus}
                renderItems={(item, index) => renderUserMenu(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarTop;
