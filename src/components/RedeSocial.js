import { View, Text, Image ,Alert, Pressable,Linking ,ScrollView, } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const SocialIcon = ({ platform, icon, username, urlScheme, webBaseUrl }) => (
  <View style={{ flexDirection: "column", alignItems: "center", gap: 8 }}>
    <MaterialCommunityIcons
      name={icon}
      color="#333"
      size={28}
      onPress={() => {
        const appUrl = `${urlScheme}${username}`;
        const webUrl = `${webBaseUrl}${username}`;

        Linking.canOpenURL(appUrl)
          .then((supported) => {
            Linking.openURL(supported ? appUrl : webUrl);
          })
          .catch(() => {
            Alert.alert('Erro', `Não foi possível abrir o perfil do ${platform}.`);
          });
      }}
      style={{ padding: 12, backgroundColor: "#6BD2D7", borderRadius: 50 }}
    />
    <Text>{username}</Text>
  </View>
);

