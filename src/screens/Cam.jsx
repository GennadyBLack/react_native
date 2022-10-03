import { Camera, CameraType } from "expo-camera";
import {useEffect, useRef, useState} from "react";
import {
  Button,
  Dimensions, Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");
const screenRatio = height / width;
const screenLandscapeRatio =  width / height;


export default function Cam() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [isRatioSet, setIsRatioSet] = useState(false);

  console.log(screenRatio, "screenRatio");

  useEffect(() => {
    const func = async () => {
      const camRatio = await camera.getSupportedRatiosAsync();
      const camRatioDivided = camRatio.map(el => {
        const ratioArr = el.split(':')
        return screenRatio - ratioArr[0] / ratioArr[1]
      })
      const nearest = Math.min(...camRatioDivided)
      console.log(nearest, "camRatioDivided");

    }
    if(camera) {
        func()
    }
  }, [camera])

  // const prepareCamera = () => {
  //   if(Platform.OS === 'android') {
  //
  //   }
  // }



  // const setCameraReady = async () => {
  //   if (!isRatioSet) {
  //     const ratio = camera?.getR
  //     setIsRatioSet()
  //   }
  // };

  // console.log(avaliableSizes, "avaliable");
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cam => setCamera(cam)}
      ></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: 550,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
