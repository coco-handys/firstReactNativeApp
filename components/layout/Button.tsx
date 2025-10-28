import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
    onPress: () => void;
    text?: string;
    buttonStyle?: object;
    textStyle?: object;
}

export const CustomButton =({ onPress, text, buttonStyle, textStyle }: ButtonProps) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}