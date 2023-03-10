import React from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import { Movie, TV } from "../api";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: ${(props: any) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: Movie[] | TV[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HListSeparator}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          id={item.id}
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          originalName={item.original_name}
          voteAverage={item.vote_average}
          backdropPath={item.backdrop_path || ""}
          overview={item.overview}
        />
      )}
    />
  </ListContainer>
);

export default HList;
