import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = ({navigation, route}) => {
  const[title,setTitle] = useState("");
  const[isbn,setIsbn] = useState("");
  const[image,setImage] = useState("");
  const[copies,setCopies] = useState("");

  const setData = async(value) => {
      AsyncStorage.setItem("bookdata",value);
      navigation.navigate("Home");
  };

  return (
    <View style={{margin:5}}>
      <StatusBar/>
      <Text>Title:</Text>
      <TextInput style={{borderWidth:1, margin:5}} onChangeText={(text)=>setTitle(text)}/>
        <Text>ISBN:</Text>
        <TextInput style={{borderWidth:1, margin:5}} onChangeText={(text)=>setIsbn(text)}/>
        <Text>Image:</Text>
        <TextInput style={{borderWidth:1, margin:5}} onChangeText={(text)=>setImage(text)}/>
        <Text>Copies:</Text>
        <TextInput style={{borderWidth:1, margin:5}} onChangeText={(text)=>setCopies(text)} keyboardType="numeric"/>
      <View style={{margin:10}}>
          <Button title='Submit'
                  onPress={()=>{
                      let mydata =JSON.parse(route.params.datastring);
                      let item = {title: title, isbn: isbn, image: image, copies: copies};
                      mydata[0].data.push(item);
                      let stringdata = JSON.stringify(mydata);
                      setData(stringdata);
                  }
                  }
          />
      </View>
    </View>
  );
};

export default Add;
