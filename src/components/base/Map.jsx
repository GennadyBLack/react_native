import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [errorMsg, setErrorMsg] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let l = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: l?.coords?.latitude,
        longitude: l?.coords?.longitude,
      });
      setDestination({
        latitude: l?.coords?.latitude,
        longitude: l?.coords?.longitude,
      });
    })();
  }, []);
  return (
    <View style={styles.container}>
      {location.latitude && (
        <MapView
          style={styles.map}
          showsCompass
          showsUserLocation
          followsUserLocation
          initialRegion={{
            latitude: location?.latitude,
            longitude: location?.longitude,
          }}
        >
          <Marker
            coordinate={location}
            draggable
            onDragEnd={(e) => {
              setLocation(e.nativeEvent.coordinate);
            }}
          />
          <Marker
            coordinate={destination}
            draggable
            onDragEnd={(e) => {
              setDestination(e.nativeEvent.coordinate);
            }}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
