import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailAPOD = ({ route }) => {
  const { apod } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: apod.url }} style={styles.image} />
      <Text style={styles.title}>{apod.title}</Text>
      <Text style={styles.description}>{apod.explanation}</Text>
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

export default DetailAPOD;
