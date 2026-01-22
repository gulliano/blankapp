import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Expo Router</Text>
      <Link   href={{ pathname: 'detail/[id]', params: { id: 'bacon' }  }}  > Chez Mario</Link>
    </View>
  );
}