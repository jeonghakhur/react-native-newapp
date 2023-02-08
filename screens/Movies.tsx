import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import Slide from "../components/Slide";

const API_KEY = "384d29bebc04dc98585d34fedfd22ea6";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
  color: ${(props) => props.theme.textColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin: 16px;
  color: ${(props) => props.theme.textColor};
`;

const TrendingScroll = styled.ScrollView`
  margin-left: 16px;
  margin-right: 16px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.textColor};
`;
const Votes = styled.Text`
  font-size: 10px;
  color: ${(props) => props.theme.textColor};
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll horizontal>
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Votes>⭐️ {movie.vote_average}/10</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};
export default Movies;
// b1a829124e0dcdaf6c4807395ce4134d
