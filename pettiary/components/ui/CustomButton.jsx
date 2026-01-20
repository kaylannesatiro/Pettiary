import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Button = ({ 
  children, 
  mode = 'contained', 
  icon, 
  onPress, 
  disabled = false,
  loading = false,
  style,
  ...props 
}) => {
  return (
    <PaperButton
      mode={mode}
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      style={[styles.button, style]}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default Button;
