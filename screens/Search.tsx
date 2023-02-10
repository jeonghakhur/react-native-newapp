import React, { useState } from "react";
import { useQuery } from "react-query";
import { StyleSheet, SafeAreaView, TextInput } from "react-native";
import { moviesApi } from "../api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  const handleChangText = (text: string) => setQuery(text);
  console.log(query);
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={query}
        style={styles.search_bar}
        onChangeText={handleChangText}
        placeholderTextColor="gray"
        returnKeyType="search"
        placeholder="Search"
      />
    </SafeAreaView>
  );
};
export default Search;
