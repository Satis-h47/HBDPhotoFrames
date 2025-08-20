import React from 'react';
import {Image, SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {MavenCompat} from 'react-native-image-filter-kit';

const Filter = () => (
  <SafeAreaView style={{flex: 1}}>
    <ScrollView contentContainerStyle={{paddingVertical: 20}}>
      <Image
        style={styles.image}
        source={{uri: 'https://static.cdn.circlesix.co/uploads/articles/dsc_2049_60809-564c6f63611b8.jpg'}}
        resizeMode={'contain'}
      />
      <View style={styles.image}>
        <MavenCompat
          image={
            <Image
              style={styles.image}
              source={{uri: 'https://static.cdn.circlesix.co/uploads/articles/dsc_2049_60809-564c6f63611b8.jpg'}}
              resizeMode={'contain'}
            />
          }
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default Filter;
