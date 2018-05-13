// @flow
import React from "react";
import {
  PixelRatio,
  Platform,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "../../components/Text";
import {
  lightNavyBlueColor,
  transparent,
  mediumGreyColor,
  eucalyptusGreenColor
} from "../../constants/colors";

type Props = {|
  label: string,
  placeholder: string,
  onFocus: () => void,
  onChangeText: string => void,
  returnKeyLabel?: string,
  returnKeyType?: "done" | "go" | "next" | "search" | "send",
  onSubmitEditing?: () => void,
  style?: ViewStyleProp,
  value: ?string
|};

type State = {|
  focused: boolean
|};

const getAccessibiltyLabel = (
  label: string,
  value: ?string,
  focused: boolean
) => {
  const labelParts = [];
  if (focused) {
    labelParts.push("editing");
  }

  if (value) {
    labelParts.push(value);
  }

  labelParts.push("edit box");
  labelParts.push(label);

  const descriptionParts = [];
  if (!focused) {
    descriptionParts.push("double tap to enter text");
  } else {
    descriptionParts.push("double tap and hold to long press");
  }

  return [labelParts.join(", "), descriptionParts.join(", ")].join("; ");
};

class DonateScreen extends React.PureComponent<Props, State> {
  state = { focused: false };

  onFocus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const { label, placeholder, onFocus, style, ...otherProps } = this.props;
    const { focused } = this.state;

    // Note on accessibility:
    // React Native does not support to mark up labels for input fields
    // properly. See for example: https://github.com/facebook/react-native/issues/14989

    return (
      <View
        accessible
        accessibilityLabel={getAccessibiltyLabel(
          label,
          otherProps.value,
          focused
        )}
        style={style}
      >
        <Text
          type="h4"
          color="lightNavyBlueColor"
          importantForAccessibility="no"
          style={styles.label}
        >
          {label}
        </Text>
        <TextInput
          keyboardType="numeric"
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          placeholder={focused ? placeholder : null}
          placeholderTextColor={mediumGreyColor}
          style={[styles.input, focused && styles.inputFocused]}
          underlineColorAndroid={transparent}
          importantForAccessibility="no"
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8
  },
  input: {
    borderColor: mediumGreyColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 50 * PixelRatio.getFontScale(),
    paddingHorizontal: 14,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: lightNavyBlueColor,
    ...Platform.select({
      android: {
        lineHeight: 18,
        includeFontPadding: false,
        textAlignVertical: "bottom"
      }
    })
  },
  inputFocused: {
    borderColor: eucalyptusGreenColor
  }
});

export default DonateScreen;
