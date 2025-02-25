import React, { useCallback, useEffect } from "react";
import DrawerComponent from "./DrawerComponent";
import SnackbarUtils from "../utils/SnackbarUtils";
import talentService from "./services/talentService";
import ProfileInfo from "./ProfileInfo";
import { setProfileDetails } from "../redux/profileSlice";
import { useDispatch } from "react-redux";

function Profile(props) {
  const dispatch = useDispatch();

  const fetchProfileDetails = useCallback(async () => {
    try {
      const response = await talentService.talentProfile();
      if (response.status === 200) {
        dispatch(setProfileDetails(response.data));
      }
    } catch (error) {
      SnackbarUtils.error("Sorry, Something went wrong");
    }
  }, [dispatch]); // Dependency array ensures function is stable

  useEffect(() => {
    fetchProfileDetails();
  }, [fetchProfileDetails]);

  return (
    <DrawerComponent>
      <ProfileInfo />
    </DrawerComponent>
  );
}

export default Profile;
