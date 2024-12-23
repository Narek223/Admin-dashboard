import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";

export const sidebardata = [
  { id: 1, title: "Home", icon: <FaHome/>, path:"/"},
  { id: 2, title: "Dashboard", icon: <MdDashboard />,path:"/Dashboard" },
  { id: 3, title: "Projects", icon: <GrProjects />,path:"/Projects" },
  { id: 4, title: "Tasks", icon: <FaTasks /> ,path:"/Tasks" },
  { id: 5, title: "Reporting", icon: <MdOutlineReport />,path:"/Reporting" },
];
