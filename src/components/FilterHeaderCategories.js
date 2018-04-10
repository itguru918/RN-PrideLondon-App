// @flow
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Touchable from "./Touchable";
import {
  interestButtonBgColor,
  interestButtonTextColor,
  filterShowMeTextColor,
  categoriesFilterButtonBgColor
} from "../constants/colors";
import text from "../constants/text";
import Text from "./Text";
import CategoriesPills from "./CategoriesPills";
import chevronRightImg from "../../assets/images/chevronRight.png";

type Props = {
  selectedCategories: Set<string>,
  onFilterPress: Function
};

type CategoriesFilterButtonProps = {
  style?: StyleObj,
  onPress: Function
};

const CategoriesFilterButton = ({
  style,
  onPress
}: CategoriesFilterButtonProps) => (
  <Touchable style={[styles.categoriesFilterButton, style]} onPress={onPress}>
    <Image source={chevronRightImg} />
  </Touchable>
);

CategoriesFilterButton.defaultProps = {
  style: {}
};

const FilterHeaderCategories = ({ selectedCategories, onFilterPress }: Props) =>
  selectedCategories.size === 0 ? (
    <View style={styles.contentInterest}>
      <Text type="h1" style={styles.filterTitle} allowFontScaling={false}>
        {text.filterTitle}
      </Text>
      <View style={styles.interestButton}>
        <Text type="h2" style={styles.interestButtonText}>
          {text.filterByInterest}
        </Text>
        <CategoriesFilterButton onPress={onFilterPress} />
      </View>
    </View>
  ) : (
    <View style={styles.categoryPillsContainer}>
      <CategoriesPills
        style={styles.categoryPills}
        selectedCategories={selectedCategories}
      />
      <CategoriesFilterButton onPress={onFilterPress} />
    </View>
  );

const styles = StyleSheet.create({
  contentInterest: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  filterTitle: {
    color: filterShowMeTextColor,
    paddingTop: 8,
    marginRight: 8
  },
  categoryPillsContainer: {
    flexDirection: "row"
  },
  categoriesFilterButton: {
    backgroundColor: categoriesFilterButtonBgColor,
    alignItems: "center",
    width: 44,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  categoryPills: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  interestButton: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 130,
    paddingLeft: 8,
    backgroundColor: interestButtonBgColor,
    borderRadius: 4
  },
  interestButtonText: {
    color: interestButtonTextColor
  }
});

export default FilterHeaderCategories;
