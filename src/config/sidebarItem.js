import { AiFillDashboard, AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiStudentBold } from "react-icons/pi";
export const sidebarItems = [
    {
        id: 1,
        title: "Dashboard",
        icon: <AiFillDashboard className="me-2" />,
        url: "/admin"
    },
    {
        id: 2,
        title: "Student",
        icon: <PiStudentBold className="me-2" />,
        url: "/admin/students"
    },
    {
        id: 3,
        title: "Teacher",
        icon: <AiOutlineUsergroupAdd className="me-2" />,
        url: "/admin/teachers"
    }
]