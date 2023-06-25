import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

import { sidebarItems } from "@/config/sidebarItem";
import { useRouter } from "next/router";
import SidebarItem from "./sidebarItem";

function Sidebar() {
  return (
    <div className="navbar-vertical nabar sidebar">
      <div className="d-flex align-items-center p-3">
        <Link className="sidebar-logo text-upppercase fw-bold" href="#">
          ChuongHH
        </Link>
      </div>
      <ul className="sidebar-menu navbar-nav">
        {sidebarItems.map((menu, index) => {
          return <SidebarItem menu={menu} key={index} />;
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
