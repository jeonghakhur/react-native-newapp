import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  margin: 0 8px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  originalName: string;
  backdropPath: string;
  overview: string;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  originalName,
  backdropPath,
  overview,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        originalTitle,
        originalName,
        posterPath,
        backdropPath,
        overview,
      },
    });
  };
  const title = originalTitle ? originalTitle : originalName;

  return (
    <TouchableNativeFeedback onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title>
          {title.slice(0, 13)}
          {title.length > 13 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </Movie>
    </TouchableNativeFeedback>
  );
};

export default VMedia;
