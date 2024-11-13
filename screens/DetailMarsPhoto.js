import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailMarsPhoto = ({ route }) => {
  const { photo } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.img_src }} style={styles.image} />
      <Text style={styles.title}>{photo.camera.full_name}</Text>
      <Text style={styles.description}>
        This photo was taken by {photo.rover.name} on {photo.earth_date}.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#F3F3E0'  // Set background color here
  },
  image: { 
    width: '100%', 
    height: 300 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginVertical: 8, 
    textAlign: 'center'  // Centering the title
  },
  description: { 
    fontSize: 16 
  },
});

export default DetailMarsPhoto;
