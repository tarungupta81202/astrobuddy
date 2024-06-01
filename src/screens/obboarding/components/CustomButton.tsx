import React, { useMemo } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import createStyles from "../OnboardingScreen.style";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { AnimatedRef, SharedValue } from "react-native-reanimated";
import { OnboardingData } from "data/data";
import { SCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";

type Props = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  // x: SharedValue<number>;
};

export const CustomButton = ({
  dataLength,
  flatListIndex,
  flatListRef,
  // x,
}: Props) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderContent = () => (
    <TouchableOpacity
      onPress={() => {
        if (flatListIndex?.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          console.log("Nativate");
          NavigationService.push(SCREENS.LOGIN);
        }
      }}
    >
      <View style={styles.button}>
        <Text h4 color={colors.white}>
          Next
        </Text>
      </View>
    </TouchableOpacity>
  );

  return <View>{renderContent()}</View>;
};
