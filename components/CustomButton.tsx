import { Pressable, Text, StyleSheet, useColorScheme } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

function CustomButton({ onPress, title }: ButtonProps) {
  const theme = useColorScheme();

  return (
    <Pressable
      style={[styles.button, theme === 'dark' ? styles.buttonDark : styles.buttonLight]}
      onPress={onPress}
    >
      <Text style={[styles.text, theme === 'dark' ? styles.textDark : styles.textLight]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    top: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonLight: {
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
  },
  buttonDark: {
    backgroundColor: '#4CAF50',
    shadowColor: '#FFF',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#fff',
  },
  textDark: {
    color: '#fff',
  },
});

export default CustomButton;
