import React from 'react';
import { Platform } from 'react-native';
import { HugeiconsIcon as WebHugeIcon } from '@hugeicons/react';
import { HugeiconsIcon as NativeHugeIcon } from '@hugeicons/react-native';

export default function HugeIcon(props) {
  if (Platform.OS === 'web') {
    return <WebHugeIcon {...props} />;
  }
  return <NativeHugeIcon {...props} />;
}

