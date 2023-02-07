import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => (props.selected ? "blue" : "red")};
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "One" })}>
    <Title selected={false}>Movies</Title>
    <Title selected={true}>Movies</Title>
  </Btn>
);
export default Movies;
