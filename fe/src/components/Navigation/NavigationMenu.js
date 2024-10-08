import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MessageIcon from "@mui/icons-material/Message";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import PendingIcon from "@mui/icons-material/Pending";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteIcon from "@mui/icons-material/Delete";
export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },

  {
    title: "Notification",
    icon: <CircleNotificationsIcon />,
    path: "/notification",
  },

  {
    title: "Message",
    icon: <MessageIcon />,
    path: "/message",
  },
  {
    title: "Lists",
    icon: <ListAltIcon />,
    path: "/list",
  },
  {
    title: "Communtities",
    icon: <GroupIcon />,
    path: "/communtities",
  },
  {
    title: "Verified",
    icon: <VerifiedIcon />,
    path: "/verified",
  },
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
  {
    title: "More",
    icon: <PendingIcon />,
    path: "/more",
  },
];
