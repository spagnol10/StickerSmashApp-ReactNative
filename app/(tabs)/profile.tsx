import { StyleSheet, View } from 'react-native';

import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';

const PlaceholderImage = require('@/assets/images/logo.png');

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#25292e'
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    backgroundColor: '#25292e'
  },
});
