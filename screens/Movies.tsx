import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import styled from 'styled-components/native'

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.mainBgColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => (
  <Btn onPress={() => navigate("Stack", { screen: "One" })}>
    <Title>Movies</Title>
  </Btn>
);
export default Movies;
