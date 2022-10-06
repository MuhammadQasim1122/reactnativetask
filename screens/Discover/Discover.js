import React, {useState, useEffect} from 'react'
import storage  from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import {
  View,
  Text,
  Button,
  Image,
} from 'react-native'

  function Discover() {
    const [sampleImage, setSampleImage] = useState([]);
    const getSampleImage = async () => {
      const storageFirebase = storage();
      const imageRefs = await storageFirebase.ref().child('images/').listAll();
      const urls = await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL()));
      setSampleImage(urls);
  }
    useEffect(() => {
      getSampleImage();
  });
  const seeImages = () => {
    console.log(sampleImage);
  }
    return (
     <View>
      <Button title="Click" onPress={() => seeImages()}></Button>
      {sampleImage.map((index, key) => (
        <Image style={{
          resizeMode: "center",
          height: 200,
          width: 300
        }} key={index} source={{uri: sampleImage[key]}}/>
            ))}
     </View>
    )
  }
export default Discover;