import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAPOD, getMarsPhotos } from '../api';
import { Ionicons } from '@expo/vector-icons'; // Importing an icon library for the search icon

const HomeScreen = ({ navigation }) => {
  const [apod, setApod] = useState(null);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMarsPhotos, setFilteredMarsPhotos] = useState([]);
  const [filteredAPOD, setFilteredAPOD] = useState(null);

  useEffect(() => {
    getAPOD().then(data => setApod(data));
    getMarsPhotos().then(data => {
      setMarsPhotos(data.slice(0, 20)); // Get 20 Mars photos
      setFilteredMarsPhotos(data.slice(0, 20)); // Initial filter
    });
  }, []);

  useEffect(() => {
    // Filter Mars photos based on search text
    const filteredMars = marsPhotos.filter(photo => 
      photo.camera.full_name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Filter APOD based on search text
    const filteredAPOD = apod && apod.title.toLowerCase().includes(searchText.toLowerCase()) ? apod : null;

    setFilteredMarsPhotos(filteredMars);
    setFilteredAPOD(filteredAPOD);
  }, [searchText, marsPhotos, apod]);

  // Clear search text when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setSearchText('');
    }, [])
  );

  const renderCard = (item, title, onPress, cardStyle) => (
    <TouchableOpacity style={[styles.card, cardStyle]} onPress={onPress}>
      <Image source={{ uri: item.url || item.img_src }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search Mars Photos or APOD..." 
          value={searchText} 
          onChangeText={setSearchText} 
        />
      </View>
      
      {/* Show APOD if it matches the search term */}
      {filteredAPOD && (
        <View style={styles.apodContainer}>
          <Text style={styles.apodTitle}>Astronomy Picture of the Day</Text>
          {renderCard(filteredAPOD, filteredAPOD.title, () => navigation.navigate('DetailAPOD', { apod: filteredAPOD }), styles.apodCard)}
        </View>
      )}
      
      <Text style={styles.sectionTitle}>Mars Photos</Text>
      <FlatList
        data={filteredMarsPhotos}
        horizontal
        renderItem={({ item }) =>
          renderCard(item, item.camera.full_name, () => navigation.navigate('DetailMarsPhoto', { photo: item }), styles.marsCard)
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F3E0' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,  // Elliptical shape
    elevation: 6, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 8, // Shadow radius for iOS
    paddingHorizontal: 12, // Reduced padding for a smaller input area
    paddingVertical: 8, // Adjusted vertical padding
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8, // Space between icon and input
  },
  searchInput: {
    flex: 1, // Allow input to take remaining space
    height: 32, // Reduced height for the search bar
    fontSize: 14, // Reduced font size for the search text
  },
  apodContainer: { marginBottom: 20 },
  apodTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  card: { marginRight: 16, alignItems: 'center' },
  apodCard: { width: '100%', height: 300 },
  marsCard: { width: 150, height: 100 },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  title: { marginTop: 8, fontWeight: 'bold', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
});

export default HomeScreen;
