import React from "react";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Platform,
	SafeAreaView,
	TouchableOpacity,
	YellowBox
} from "react-native";
import Routes from "./src/routes";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

export default function App() {
	return (
		<>
			<SafeAreaView style={safeAreaViewAndroid.containerAndroidBar} />
			<Routes />
		</>
	);
}

const safeAreaViewAndroid = StyleSheet.create({
	containerAndroidBar: {
		backgroundColor: "#f05a5b",
		height: Platform.OS === "android" ? StatusBar.currentHeight : 0
	}
});
