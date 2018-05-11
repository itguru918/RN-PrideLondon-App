// @flow
import React from "react";
import ActionButton from "../../components/ActionButton";
import text from "../../constants/text";
import GlobalHeader from "../../components/Header";

type Props = {
  onClearPress: () => void,
  onCancelPress: () => void,
  showClear: boolean
};

const Header = ({ onClearPress, onCancelPress, showClear }: Props) => {
  const clearElement = showClear ? (
    <ActionButton label={text.clearAll} onPress={onClearPress} />
  ) : null;
  return (
    <GlobalHeader
      leftElement={<ActionButton label={text.cancel} onPress={onCancelPress} />}
      title={text.filterEvents}
      rightElement={clearElement}
    />
  );
};

export default Header;
