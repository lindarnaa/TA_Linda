import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Button } from 'react-native';

const DetailNewsScreen = ({ route }) => {
  const { article } = route.params; // Get the article passed from NewsScreen

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      {article.author && <Text style={styles.author}>By {article.author}</Text>}
      {article.publishedAt && (
        <Text style={styles.date}>
          Published on {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
      )}
      <Text style={styles.description}>{article.description}</Text>
      {article.content && <Text style={styles.content}>{article.content}</Text>}
      <Button
        title="Read More"
        onPress={() => Linking.openURL(article.url)} // Open the article in a web browser
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#F3F3E0'  // Set background color here
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },
  author: { 
    fontSize: 16, 
    fontStyle: 'italic', 
    marginBottom: 8 
  },
  date: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 8 
  },
  description: { 
    fontSize: 16, 
    marginBottom: 16 
  },
  content: { 
    fontSize: 14, 
    marginBottom: 16 
  }, // Content style, adjust as needed
});

export default DetailNewsScreen;
