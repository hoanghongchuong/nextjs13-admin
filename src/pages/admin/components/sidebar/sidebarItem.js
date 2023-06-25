import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function SidebarItem({ menu }) {
  const location = useRouter();
  const [open, setOpen] = useState(false);
  console.log(menu);
  //   useEffect(() => {
  //     if (appState.includes(menu.state)) {
  //       setOpen(true);
  //     }
  //   }, [menu]);
  if (menu) {
    if (menu.children) {
      return (
        <li
          className={
            open
              ? "sidebar-menu-item nav-item open"
              : "sidebar-menu-item nav-item"
          }
        >
          <Link
            href="#"
            className={`nav-link ${
              location.pathname === menu.url ? "active" : ""
            }`}
          >
            <div
              className="d-flex w-100 justify-content-between align-items-center"
              onClick={() => setOpen(!open)}
            >
              <span>
                {typeof menu.icon === "string" ? (
                  <i className={`nav-icon fa fa-${menu.icon} me-2`}></i>
                ) : (
                  menu.icon
                )}
                {menu.title}
              </span>
              {open ? (
                <i className="fa fa-chevron-up icon-toggle"></i>
              ) : (
                <i className="fa fa-chevron-down icon-toggle"></i>
              )}
            </div>
          </Link>
          <ul className={"sub-menu"}>
            {menu.children.map((child, index) => (
              <SidebarItem key={index} menu={child} />
            ))}
          </ul>
          {/* <div className={"sidebar-title"} onClick={() => setOpen(!open)}>
            <span>
              {menu.icon && (
                <i className={`nav-icon fa fa-${menu.icon} me-2`}></i>
              )}
              {menu.title}
            </span>
            {open ? (
              <i className="bx bx-chevron-up toggle-btn"></i>
            ) : (
              <i className="bx bx-chevron-down toggle-btn"></i>
            )}
          </div> */}
        </li>
      );
    } else {
      return (
        <li className="sidebar-menu-item nav-item" key={menu.id}>
          <Link
            href={menu.url}
            className={`nav-link ${
              location.pathname === menu.url ? "active" : ""
            }`}
          >
            {typeof menu.icon === "string" ? (
              <i className={`nav-icon fa fa-${menu.icon} me-2`}></i>
            ) : (
              menu.icon
            )}
            {menu.title}
            {menu.badge ? (
              <Badge
                className="ms-1"
                bg={menu.badgecolor ? menu.badgecolor : "primary"}
              >
                {menu.badge}
              </Badge>
            ) : (
              ""
            )}
          </Link>
        </li>
      );
    }
  }
}

export default SidebarItem;
