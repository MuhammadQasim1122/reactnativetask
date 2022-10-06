import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  launchCamera
} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import firebase from '@react-native-firebase/app';
import firebaseConfig from '../services/firebase';
import storage  from '@react-native-firebase/storage';
import styles from './AddVideocss';

export default function AddVideo() {
  const [image, setImage] = useState({});
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);
  
takePic = async (type)=> {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    includeBase64: true,
    // videoQuality: 'low',
    // durationLimit: 30,
  };
  await launchCamera(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      alert('User cancelled camera picker');
      return;
    } else if (response.errorCode == 'camera_unavailable') {
      alert('Camera not available on device');
      return;
    } else if (response.errorCode == 'permission') {
      alert('Permission not satisfied');
      return;
    } else if (response.errorCode == 'others') {
      alert(response.errorMessage);
      return;
    }
    console.log('base64 -> ', response.assets[0].base64);
    console.log('uri -> ', response.assets[0].uri);
    console.log('width -> ', response.assets[0].width);
    console.log('height -> ', response.assets[0].height);
    console.log('fileSize -> ', response.assets[0].fileSize);
    console.log('type -> ', response.assets[0].type);
    console.log('fileName -> ', response.assets[0].fileName);
    setImage(response);
  });
  console.log(image,"++++++++++++++++++++++++++++++++++++");
  uploadImageToStorage();
};
  uploadImageToStorage = async ()=> {
    const storageFirebase = storage();
    const reference = storageFirebase.ref('images/test2.jpg');
    const task = reference.putFile(image.assets[0].uri);

    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    });
  }
  return (
    <View>
      <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => takePic('image')}>
          <Text style={styles.textStyle}>
            Launch Camera for Image
          </Text>
        </TouchableOpacity>
    </View>
  );
}
