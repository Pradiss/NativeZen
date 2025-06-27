import { View } from "react-native";
import styles from "./Style";

export function Progress({ progress }) {
  return (
    <View style={styles.containerProgress}>
      <View style={[styles.progress, { width: `${progress}%` }]} />
    </View>
  );
}
