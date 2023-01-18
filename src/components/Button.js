import { StyleSheet, Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';

export const ButtonTypes = {
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
};

const Colors = {
  NUMBER: ['#71717a', '#3f3f46'],
  OPERATOR: ['#f59e0b', '#f59e0b'],
};

const CustomButton = ({ title, onPress, buttonStyle, buttonType }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: Colors[buttonType][0] },
        pressed && { backgroundColor: Colors[buttonType[1]], opacity: 0.3 },
        buttonStyle,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

CustomButton.defaultProps = {
  buttonType: ButtonTypes.NUMBER,
};

CustomButton.prototype = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
  },
  title: {
    fontSize: 50,
    color: '#ffffff',
  },
});

export default CustomButton;
