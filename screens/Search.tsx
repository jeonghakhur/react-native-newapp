import React, { useState } from "react";
import { useQuery } from "react-query";
import { StyleSheet, SafeAreaView, TextInput, Alert } from "react-native";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  search_bar: {
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: moviesRefetch,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: tvRefetch,
  } = useQuery(["searchTv", query], tvApi.search, { enabled: false });
  const handleChangText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    moviesRefetch();
    tvRefetch();
  };
  console.log(moviesLoading || tvLoading);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={query}
        style={styles.search_bar}
        onChangeText={handleChangText}
        placeholderTextColor="gray"
        returnKeyType="search"
        placeholder="Search"
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="Tv Results" data={tvData.results} /> : null}
    </SafeAreaView>
  );
};
export default Search;
