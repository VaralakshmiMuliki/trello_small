import React from 'react';
import { CustomButton } from '../components/CustomButton/customButton';

export default {
    title: 'CustomButton',
    component: CustomButton,
    
  };

export const Primary = () => <CustomButton backgroundColor="blue" label="Button" />;
export const Secondary = () => <CustomButton backgroundColor="white" label="😄👍😍💯" />;
export const Tertiary = () => <CustomButton backgroundColor="#ff0" label="📚📕📈🤓" />;