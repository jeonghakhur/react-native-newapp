import React, { useEffect } from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { Dimensions, StyleSheet } from "react-native";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(p: any) => p.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0px 20px;
`;

const Detail = ({ navigation: { setOptions }, route }) => {
  const { originalTitle, originalName, posterPath, backdropPath, overview } =
    route.params;
  const title = originalTitle || originalName;
  console.log();
  useEffect(() => {
    setOptions({
      title: originalTitle ? "Movie" : "Tv",
    });
  }, []);

  console.log(backdropPath, overview, posterPath);

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath || "") }}
        />
        <LinearGradient
          colors={["transparent", "#000"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={posterPath || ""} />
          <Title>{title}</Title>
        </Column>
      </Header>
      <Overview>{overview}</Overview>
    </Container>
  );
};

export default Detail;
