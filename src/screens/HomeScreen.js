import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGenres,
  fetchTopRatedMovie,
} from "../../utils/moviesapi";
import TopRatedMovies from "../components/TopRatedMovies";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [topRated, SetTopRated] = useState([]);
  const [genre, SetGenres] = useState([]);

  const { isLoading: isTopRatedLoading } = useQuery({
    queryKey: ["topratedMovies"],
    queryFn: fetchTopRatedMovie,
    onSuccess: (data) => {
      SetTopRated(data.results);
    },
    onError: (error) => {
      console.log("Error fetching Top Rated Movies", error);
    },
  });


  const { isLoading: isGenresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    onSuccess: (data) => {
      SetGenres(data.genres);
    },
    onError: (error) => {
      console.log("Error fetching Genre", error);
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/homescreen.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
      <ScrollView style={{ marginTop: 16 }}>
        <StatusBar style="light" />


        <View className="flex-row justify-between items-center mx-4 mg-4">
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'darkblue' }}>You Space Movies</Text>

          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
          <ScrollView>
            {topRated?.length > 0 && (
              <TopRatedMovies genre={genre} title="Top Rated Movies" data={topRated} />
            )}

          </ScrollView>
      </ScrollView>
    </View>
  );
}
