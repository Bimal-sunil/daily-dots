import React from 'react';
import { Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '../icons';

/**
 * Universal SVG Icon component that works reliably on Web and Mobile (iOS / Android).
 *
 * Usage:
 *   <Icon name="plus" size={20} color={THEME.bg} />
 *   <Icon xml="<svg...>...</svg>" size={24} color="#EE6C4D" />
 */
export default function Icon({ name, xml, size = 20, color, style }) {
  let rawXml = xml || (name && ICONS[name]) || '';

  if (!rawXml) return null;

  // Normalize width and height in root <svg>
  let processedXml = rawXml
    .replace(/width="[^"]*"/i, `width="${size}"`)
    .replace(/height="[^"]*"/i, `height="${size}"`);

  if (!/width="[^"]*"/i.test(processedXml)) {
    processedXml = processedXml.replace('<svg', `<svg width="${size}" height="${size}"`);
  }

  // Replace currentColor with the desired color (if provided)
  if (color) {
    processedXml = processedXml.replace(/currentColor/g, color);
  }

  // 1. Web: Native browser SVG injection (100% reliable, immune to react-native-web CSS bugs)
  if (Platform.OS === 'web') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          lineHeight: 0,
          ...(style || {}),
        }}
        dangerouslySetInnerHTML={{ __html: processedXml }}
      />
    );
  }

  // 2. Mobile (iOS / Android): SvgXml from react-native-svg
  return <SvgXml xml={processedXml} width={size} height={size} style={style} />;
}

