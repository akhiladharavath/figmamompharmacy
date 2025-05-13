import { View } from 'react-native';
import GetStart from './Login/getstart';
import { userAuth } from '@/context/authContext';


const Index = () => {
  return (
    <View style={{ flex: 1 }}>
      <GetStart />
    </View>
  );
};

export default Index;