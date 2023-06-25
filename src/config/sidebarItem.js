import { AiFillDashboard, AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiStudentBold } from "react-icons/pi";
import { v4 as uuid } from "uuid";

export const sidebarItems = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "home",
    url: "/admin",
  },
  {
    id: uuid(),
    title: "Student",
    icon: <PiStudentBold className="me-2" />,
    url: "/admin/students",
  },
  {
    id: uuid(),
    title: "Teacher",
    icon: "users",
    children: [
      {
        id: uuid(),
        title: "Danh sách",
        icon: "",
        url: "/admin/teachers",
      },
      {
        id: uuid(),
        title: "Thêm mới",
        icon: "",
        url: "/admin/teachers/add",
      },
    ],
  },
];
