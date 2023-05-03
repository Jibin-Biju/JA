import { HiCurrencyDollar, HiMenuAlt2, HiUsers } from "react-icons/hi";
import { FaListAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import {
  BsBellFill,
  BsCartDashFill,
  BsCash,
  BsCircleFill,
  BsDot,
  BsGear,
  BsMoonFill,
} from "react-icons/bs";
import {
  AiFillAppstore,
  AiFillCaretRight,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { MdInsertChart } from "react-icons/md";
import { TbDiscount2, TbWorld } from "react-icons/tb";
import { IoIosListBox, IoMdListBox, IoMdLogOut } from "react-icons/io";
import { IoMail, IoSearch } from "react-icons/io5";
import { GoArrowDown, GoArrowUp, GoReport } from "react-icons/go";
import { SettingsIcon } from "@chakra-ui/icons";

const cn = "Icon";
export const iconmap = {
  mail: <IoMail className={cn} />,
  hamburger: <HiMenuAlt2 className={`${cn} hamburger`} />,
  logout: <IoMdLogOut className={cn} />,
  moon: <BsMoonFill className={cn} />,
  bell: <BsBellFill className={cn} />,
  dot: <BsDot className={"dot organge " + cn} />,
  cart: <BsCartDashFill className={cn} />,
  users: <HiUsers className={cn} />,
  list: <FaListAlt className={cn} />,
  search: <IoSearch className={`${cn} hamburger`} />,
  burger: <FiMenu className={cn} />,
  gamelog: <IoMdListBox className={cn} />,
  eventlog: <IoIosListBox className={cn} />,
  app: <AiFillAppstore className={cn} />,
  chart: <MdInsertChart className={cn} />,
  "deposit/withdraw": <TbDiscount2 className={cn} />,
  "charge/exchange": <TbDiscount2 className={cn} />,

  arrowup: <AiOutlineArrowUp className={cn} />,
  arrowdown: <AiOutlineArrowDown className={cn} />,
  arrowright: <AiFillCaretRight className={cn} />,

  circle: <BsCircleFill className={cn} />,
  deposit: <HiCurrencyDollar className={cn} />,
  down: <GoArrowDown className={cn} />,
  up: <GoArrowUp className={cn} />,

  world: <TbWorld className={cn} style={{ fontSize: "1.5rem" }} />,
  withdraw: <BsCash className={cn} />,
  setting: <BsGear className={cn} />,
  report: <GoReport className={cn} />,
};
