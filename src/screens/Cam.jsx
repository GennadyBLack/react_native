import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useStore from "../hooks/useStore";

const { height, width } = Dimensions.get("window");
const screenRatio = height / width;
const screenLandscapeRatio = width / height;
// const presetRatio = "4:3";
const presetRatio = null;

export default function Cam() {
  const [tools] = useStore("tools");
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [screenHeight, setScreenHeight] = useState(null);
  const [photo, setPhoto] = useState(null);

  const usePresetRatio = (camRatio) => {
    if (presetRatio && camRatio.includes(presetRatio)) return presetRatio;
    return false;
  };

  const prepareCamera = async () => {
    if (Platform.OS === "android") {
      const camRatio = await camera?.getSupportedRatiosAsync();
      const desiredRatio = usePresetRatio(camRatio);
      const ratioMap = {};
      const distanceMap = {};
      let nearestRatio;
      for (const ratio of camRatio) {
        const ratioArr = ratio.split(":");
        const currRatio = ratioArr[0] / ratioArr[1];
        ratioMap[ratio] = currRatio;
        const currDif = screenRatio - currRatio;
        distanceMap[ratio] = currDif;
        if (!nearestRatio) {
          nearestRatio = ratio;
        } else {
          if (currDif >= 0 && currDif < distanceMap[nearestRatio]) {
            nearestRatio = ratio;
          }
        }
      }
      const calcHeight = width * ratioMap[desiredRatio || nearestRatio];
      setScreenHeight(calcHeight);
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareCamera();
    }
  };
  // console.log(avaliableSizes, "avaliable");
  const takePicture = async () => {
    let options = {
      base64: true,
      quality: 1,
      exif: false,
      onPictureSaved,
    };
    if (camera) {
      await camera.takePictureAsync(options);
    }
  };

  const onPictureSaved = async (photo) => {
    await setPhoto(`data:image/jpg;base64,${photo.base64}`);
    await tools
      .setCameraImage(`data:image/jpg;base64,${photo.base64}`)
      .then(async () => await navigation.navigate("feed_create"));
  };

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
      {!photo && isFocused && (
        <View style={{ flex: 1 }}>
          <Camera
            style={[styles.camera, { height: screenHeight }]}
            type={type}
            ref={(cam) => setCamera(cam)}
            onCameraReady={setCameraReady}
          ></Camera>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {photo && (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: tools?.cameraImage, cache: "reload" }}
            style={{ width: "100%", height: 350 }}
            key={new Date()}
          />
        </View>
      )}
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
  },
  buttonContainer: {
    ...StyleSheet.absoluteFill,
    flexDirection: "row",
    backgroundColor: "transparent",
    bottom: 50,
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
