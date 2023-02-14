import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import styled from "styled-components";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.theme.textColor};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;
const ViewTint = styled.View<{ isDark: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isDark ? "rgba(0, 0, 0, .5)" : "rgba(255, 255, 255, .5)"};
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { originalTitle, posterPath, backdropPath, overview },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
          blurRadius={3}
        />
        <ViewTint isDark={isDark}></ViewTint>
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 ? (
              <Votes isDark={isDark}>⭐️ {voteAverage}/10</Votes>
            ) : null}
            <Overview isDark={isDark}>{overview.slice(0, 100)}...</Overview>
          </Column>
        </Wrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

interface SearchFunc {
  (source: string, subString: string): string;
}

let mySearch: SearchFunc;
mySearch = function (src, sub) {
  let result = src.search(sub);
  return "string";
};

mySearch("abc", "b");

export default Slide;
