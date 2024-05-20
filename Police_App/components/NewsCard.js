import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import NewsCard from "../components/NewsCard";
import { Border, Color, Padding } from "../app/constants/GlobalStyles";

const NewsCard = ({ style }) => {
  const [newsCardItems, setNewsCardItems] = useState([
    <NewsCard />,
    <NewsCard />,
  ]);

  return (
    <View style={[styles.newsCard, style]}>
      <Carousel
        style={styles.carousel}
        width={339}
        height
        vertical={true}
        mode="normal"
        autoPlay={true}
        loop={true}
        pagingEnabled={true}
        data={newsCardItems}
        renderItem={({ item }) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    width: 339,
    height: 146,
  },
  newsCard: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGainsboro,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    elevation: 6,
    shadowOpacity: 1,
    width: 339,
    height: 146,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: Padding.p_75xl,
    paddingVertical: 0,
  },
});

export default NewsCard;
