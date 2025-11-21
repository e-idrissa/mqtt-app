import { Platform } from 'react-native';

const IOS_SYSTEM_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  light: {
    grey6: '#F2F2F7',
    grey5: '#E6E6EB',
    grey4: '#D2D2D7',
    grey3: '#C7C7CC',
    grey2: '#B0B0B5',
    grey: '#99999E',
    background: '#F2F2F7',
    foreground: '#000000',
    root: '#F2F2F7',
    card: '#F2F2F7',
    destructive: '#FF382B',
    primary: '#007BFF',
  },
  dark: {
    grey6: '#151518',
    grey5: '#282828',
    grey4: '#333333',
    grey3: '#464646',
    grey2: '#636363',
    grey: '#9E9E9E',
    background: '#000000',
    foreground: '#FFFFFF',
    root: '#000000',
    card: '#000000',
    destructive: '#FE4336',
    primary: '#0385FF',
  },
} as const;

const ANDROID_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  light: {
    grey6: '#FAFCFF',
    grey5: '#F3F7FB',
    grey4: '#E6F2F8',
    grey3: '#E9EFEF',
    grey2: '#E5EDF5',
    grey: '#E2EAF3',
    background: '#FAFCFF',
    foreground: '#1B1C1D',
    root: '#FAFCFF',
    card: '#FAFCFF',
    destructive: '#BA1A1A',
    primary: '#0070E9',
  },
  dark: {
    grey6: '#191E24',
    grey5: '#1F262D',
    grey4: '#232B34',
    grey3: '#26303B',
    grey2: '#28333E',
    grey: '#2C3844',
    background: '#181C20',
    foreground: '#DDDDDD',
    root: '#181C20',
    card: '#181C20',
    destructive: '#93000A',
    primary: '#004594',
  },
} as const;

const WEB_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  light: {
    grey6: '#FAFCFF',
    grey5: '#F3F7FB',
    grey4: '#E6F2F8',
    grey3: '#E9EFEF',
    grey2: '#E5EDF5',
    grey: '#E2EAF3',
    background: '#FAFCFF',
    foreground: '#1B1C1D',
    root: '#FAFCFF',
    card: '#FAFCFF',
    destructive: '#BA1A1A',
    primary: '#0070E9',
  },
  dark: {
    grey6: '#191E24',
    grey5: '#1F262D',
    grey4: '#232B34',
    grey3: '#26303B',
    grey2: '#28333E',
    grey: '#2C3844',
    background: '#181C20',
    foreground: '#DDDDDD',
    root: '#181C20',
    card: '#181C20',
    destructive: '#93000A',
    primary: '#004594',
  },
} as const;

const COLORS =
  Platform.OS === 'ios'
    ? IOS_SYSTEM_COLORS
    : Platform.OS === 'android'
      ? ANDROID_COLORS
      : WEB_COLORS;

export { COLORS };