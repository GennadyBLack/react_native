import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";

export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      }
      let location = (await Location.getCurrentPositionAsync({}))?.coords;
      //пока не пашет, нужен ключ гугл апи
      // location = await Location.reverseGeocodeAsync(location);
      setLocation(location);
    })();
  }, []);
  if (errorMsg) {
    console.error(errorMsg);
  } else {
    return location;
  }
}
