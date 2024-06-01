import { PermissionsAndroid } from "react-native";
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from "react-native-android-location-enabler";

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Attendance App Requires Camera Permission",
        message: "Access Granted for Camera, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
      return true;
    } else {
      console.log("Camera permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const requestLocationPermission = async () => {
  try {
    const enableLocation = await promptForEnableLocationIfNeeded();
    console.log(enableLocation);
    const grantedFine = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "App Requires Fine Location Permission",
        message:
          "Access Granted for Location, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );

    const grantedCoarse = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "App Requires Coarse Location Permission",
        message:
          "Access Granted for Location, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );

    const grantedBack = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: "App Requires Background Location Permission",
        message:
          "Access Granted for Location, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );
    if (
      (grantedFine && grantedCoarse && grantedBack) ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("You can use the Location");
      return true;
    } else {
      console.log("Location permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
