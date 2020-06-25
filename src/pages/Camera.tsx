import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Platform, 
  ActivityIndicator, 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';

// import { Container } from './styles';

const Camera: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ExpoCamera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        return;
      }

      setHasPermission(true);
    })();
  }, []);

  const handleChangeCamera = useCallback(() => {
    if (Platform.OS !== 'web') {
      setType(
        type === ExpoCamera.Constants.Type.back
          ? ExpoCamera.Constants.Type.front
          : ExpoCamera.Constants.Type.back
      );
    }
  }, []);

  if (hasPermission === null) {
    return <ActivityIndicator size={48} style={{ flex: 1, alignItems: 'center' }} />
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Permissão à camera negada :(</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ExpoCamera style={{ flex: 1 }} type={type}/>
      {Platform.OS !== 'web' && (
        <TouchableOpacity style={styles.cameraButton} onPress={handleChangeCamera}>
          <Feather name="camera" size={32} style={styles.cameraButtonIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#7159c1',
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
  },

  cameraButtonIcon: {
    color: '#ffffff',
  }
})

export default Camera;