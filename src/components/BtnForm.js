import { TouchableOpacity, Text } from "react-native";
import styles from "./Style";


export function Button({ title, ...rest }) {
  return (
    <TouchableOpacity style={styles.buttonSteps} {...rest}>
      <Text style={styles.titleBtnSteps}>{title}</Text>
    </TouchableOpacity>
  );
}
