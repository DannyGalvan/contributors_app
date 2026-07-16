import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ScreenBackground } from '@components/layout/ScreenBackground';

interface FormScreenProps {
  children: ReactNode;
  /** Extra bottom padding inside the scroll — increase if last field is hidden */
  bottomPadding?: number;
  /** Vertical offset to account for headers. Default: 0 on iOS, 56 on Android */
  keyboardOffset?: number;
  contentStyle?: ViewStyle;
}

/**
 * Reusable wrapper for form screens.
 *
 * - ScreenBackground provides the gradient/orb aesthetic
 * - KeyboardAvoidingView pushes content up when the keyboard appears
 *   on BOTH platforms (behavior="padding" everywhere)
 * - ScrollView lets the user reach every field on small screens
 * - keyboardShouldPersistTaps="handled" lets taps on buttons work
 *   without dismissing the keyboard first
 */
export const FormScreen = ({
  children,
  bottomPadding = 40,
  keyboardOffset,
  contentStyle,
}: FormScreenProps) => {
  // On Android the system already applies adjustResize (AndroidManifest),
  // but KeyboardAvoidingView with behavior="padding" adds an extra layer
  // of reliability for edge-to-edge devices (Android 15+).
  const defaultOffset = Platform.OS === 'android' ? 56 : 0;
  const verticalOffset = keyboardOffset ?? defaultOffset;

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={verticalOffset}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: bottomPadding },
            contentStyle,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
