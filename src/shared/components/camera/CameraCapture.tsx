import React, { useRef } from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import { Camera, getCameraDevice } from "react-native-vision-camera";
type CameraProps = {
  isActive: boolean;
  style: any;
  setIsActiveCamera: any;
  setImageSource: any;
  setModalVisible: any;
};

const CameraCapture = ({ isActive, style, setIsActiveCamera, setImageSource}: CameraProps) => {
  const devices = Camera.getAvailableCameraDevices();
  const device = getCameraDevice(devices, "front");

  //Ref
  const cameraRef = useRef(null);

  // State

  const capturePhoto = async () => {
    if (cameraRef.current !== null) {
      try {
        const photo = await cameraRef.current.takePhoto({ quality: 'high' }); // Adjust quality if needed
        console.log(photo.path);
        setImageSource(photo.path);
        setIsActiveCamera(false);
        Keyboard.dismiss();
        // setModalVisible(false);
      } catch (error) {
        console.log('Error capturing photo:', error);
        // Handle any errors that occur during photo capture
      }
    }
  };

  return (
    <>
      <Camera
        ref={cameraRef}
        device={device!}
        isActive={isActive}
        style={style.camera}
        photo={true}
      />
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.camButton}
          onPress={() => capturePhoto()}
        />
      </View>
    </>
  );
};

export default CameraCapture;
