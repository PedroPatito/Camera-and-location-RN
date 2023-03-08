import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { Button } from "react-native";
import { COLORS } from "../constants";
import MapPreview from "./MapPreview";

const LocationSelector = (props) => {
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permisos insuficientes",
        "Necesita dar permisos de la ubicacion para usar la aplicacion"[
          { text: "Ok" }
        ]
      );
      return false;
    }
    return true;
  };

  handleGetLocation = async () => {
    const isLocationOk = await verifyPermissions();
    if (!isLocationOk) return;
    const location = await Location.getCurrentPositionAsync({
      timeOut: 5000,
    });

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    props.onLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text>Ubicacion en progreso...</Text>
      </MapPreview>
      <Button
        title="Obtener ubicacion"
        color={COLORS.PEACH_PUFF}
        onPress={handleGetLocation}
      />
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.BLUSH,
    borderWidth: 1,
  },
});
