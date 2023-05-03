import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserTableWrapper from "../../../../common/Tables";
import { endpoints } from "../../../../config/endpoints";
import { GETREQUEST } from "../../../../config/requests";
import { setData } from "../../../../Store/Features/DataSlice";
import { hideLoader, showLoader } from "../../../../Store/Features/LoaderSlice";

function PostMangment() {
  const dispatch = useDispatch();
  useEffect(() => {
    get()
    return () => {
      dispatch(hideLoader("content"));
      dispatch(setData([]))
    };
  }, []);
  const get = async () => {
    try {
      dispatch(showLoader("content"));
      const data = await GETREQUEST(endpoints.Admin_getruser);

      if (data?.type === "success") {
        dispatch(setData(data.result))
      }
      dispatch(hideLoader("content"));
    }
    catch (e) {
      dispatch(hideLoader("content"));
      console.log(e);
    }
  }
  return (
    <UserTableWrapper text={"Reported Users"} status="reportedusers" />
  );
}

export default PostMangment;
