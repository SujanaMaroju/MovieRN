import React, { useState } from 'react';
import { View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../utils/moviesapi';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function TopRatedMovies({ data, title, genre }) {
  const navigation = useNavigation();
  const [visibleItems, setVisibleItems] = useState(10);

  const renderItem = ({ item, index }) => {
    const itemGenre = genre.find((g) => g.id === item.genre_ids[0]);

    return (
      <TouchableOpacity onPress={() => navigation.push('Movie', item)}>
        <View style={{ margin: 4 }}>
          <Image
            source={{ uri: image500(item.poster_path) }}
            style={{ width: width * 0.92, height: height * 0.15, borderRadius: 8 }}
          />

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />

          <View style={{ position: 'absolute', bottom: 8, left: 8 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 14, marginRight: 8 }}>{item.vote_average} *</Text>
              <Text style={{ color: 'white', fontSize: 14 }}>{itemGenre?.name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  return (
    <View style={{ marginTop: 16 }}>
      <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
      </View>

      <FlatList
        data={data.slice(0, visibleItems)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {visibleItems < data.length && (
        <TouchableOpacity onPress={loadMore} style={{ alignSelf: 'center', marginVertical: 16 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
