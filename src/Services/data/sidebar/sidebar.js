import { PiListChecksBold } from "react-icons/pi";
import { GrProjects } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { MdOutlineContentCut } from "react-icons/md";
import { IoMdLaptop } from "react-icons/io";
import { MdOutlineFilterList } from "react-icons/md"
import { BiCalendar } from "react-icons/bi";



export const sidebardata = [
  { id: 1, title: "Dashboard", icon: <GrProjects/>, path:"/"},
  { id: 2, title: "Services", icon: <MdOutlineContentCut />,path:"/Services" },
  { id: 3, title: "Experts", icon: <GrProjects />,path:"/Experts" },
  { id: 4, title: "Client", icon: <FaTasks /> ,path:"/Client" },
  { id: 5, title: "Blog", icon: <IoMdLaptop />,path:"/Blog" },
  { id: 6, title: "Categories", icon: <MdOutlineFilterList />,path:"/Categories" },
];

export const otherpages = [
  { id: 1, title: "Inbox", icon: <GrProjects/>, path:"/Inbox"},
  { id: 2, title: "Booking Alerts", icon: <PiListChecksBold />,path:"/BookingAlerts" },
  { id: 3, title: "Schedule", icon: <BiCalendar />,path:"/Schedule" },
  
];



