import { AiFillDashboard, AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiStudentBold } from "react-icons/pi";
import {SiGoogleclassroom} from "react-icons/si";
import {SlCalender} from "react-icons/sl";

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
    title: "Học sinh",
    icon: <PiStudentBold className="me-2" />,
    url: "/admin/students",
  },
  {
    id: uuid(),
    title: "Giáo viên",
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
  {
    id: uuid(),
    title: "Danh sách lớp",
    icon: <SiGoogleclassroom className="me-2" />,
    url: "/admin/classes"
  },
  {
    id: uuid(),
    title: "Thời khóa biểu",
    icon: <SlCalender className="me-2" />,
    url: "/admin/schedules"
  }
];
