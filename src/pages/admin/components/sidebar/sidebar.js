import React from "react";
import styles from "./page.module.css";
import Link from "next/link";


import { sidebarItems } from "@/config/sidebarItem";

function Sidebar() {
  return (
    <div className="navbar-vertical nabar sidebar">
      <div className="d-flex align-items-center p-3">
        <Link className="sidebar-logo text-upppercase fw-bold" href="#">
          ChuongHH
        </Link>
      </div>
      <ul className="sidebar-menu p-3">
        {sidebarItems.map((item) => {
          return (
            <li className="sidebar-menu-item" key={item.id}>
              <Link href={item.url}>
                {item.icon} {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
