import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import HList from "../components/HList";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import Loader from "../components/Loader";

const Container = styled.FlatList`
  background-color: ${(props: any) => props.theme.mainBgColor};
  color: ${(props: any) => props.theme.textColor};
`;

const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin: 16px;
  color: ${(props: any) => props.theme.textColor};
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moviesApi.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );

  console.log(hasNextPage, fetchNextPage);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const renderHMedia = ({ item, index }: any) => (
    <HMedia
      id={item.id}
      posterPath={item.poster_path}
      originalTitle={index + " " + item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      backdropPath={item.backdrop_path}
    />
  );
  const movieKeyExtractor = (item: any) => item.id;
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <Container
      onEndReached={loadMore}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop={false}
            showsPagination={true}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie: any) => (
              <Slide
                key={movie.id}
                id={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}

          <ListTitle>Coming soon</ListTitle>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
    />
  ) : null;
};
export default Movies;
// b1a829124e0dcdaf6c4807395ce4134d
