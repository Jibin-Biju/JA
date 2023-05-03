import { useNavigate } from "react-router-dom";
import Icons from "../../../../common/Icons";
import React from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../../../../Store/Features/ProfileSlice";

export const useMenuItems = (val) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function getItem(label, key, icon, route, children) {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => navigate(route),
    };
  }
  const desktop = [
    getItem(
      "User Mangment",
      "/dashboard/usermanagment"
      ,
      <Icons icon={"list"} />,
      "/dashboard/usermanagment"
    ),
    getItem(
      "Post Managment",
      "/dashboard/postmanagment",
      <Icons icon={"users"} />,
      "/dashboard/postmanagment"
    ),
    getItem(
      "Reported Users",
      "/dashboard/reportedusers",
      <Icons icon={"report"} />,
      "/dashboard/reportedusers"
    ),
    getItem(
      "Notice Management",
      "/dashboard/notice",
      <Icons icon={"mail"} />,
      "/dashboard/notice"
    ),
    getItem(
      "Analytics",
      "/dashboard/analytics",
      <Icons icon={"deposit/withdraw"} />,
      "/dashboard/analytics"
    )
  ];
  const mobile = [
    ...desktop,
    getItem("Log Out", "11", <Icons icon={"logout"} />, () => dispatch(setProfile(null))),
  ];


  return { items: val === 1 ? desktop : mobile };
};
