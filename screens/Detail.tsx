import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Share,
  Platform,
  Image,
  View,
} from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Movie, moviesApi, TV, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
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

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const PosterItem = styled.Image`
  height: 200px;
  margin: 16px 0;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route,
}) => {
  const {
    id,
    originalTitle,
    originalName,
    posterPath,
    backdropPath,
    overview,
  } = route.params;
  const title = originalTitle || originalName;
  const isMovie = !!originalTitle;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${overview}\nCheck it out: ${homepage}`,
        title,
      });
    } else {
      await Share.share({
        url: homepage,
        title,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: originalTitle ? "Movie" : "Tv",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYTLink = async (videoID: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  // if (data) {
  //   data.images.backdrops.map((image) => console.log(image));
  // }

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
      <Data>
        <Overview>{overview}</Overview>

        {data?.images?.backdrops?.map((image) => (
          <PosterItem source={{ uri: makeImgPath(image.file_path || "") }} />
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
