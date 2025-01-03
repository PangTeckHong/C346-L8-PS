import React,{useState} from 'react';
import {Alert, View, Button, Text, TextInput, StatusBar} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({navigation, route}) => {
    const[title,setTitle] = useState(route.params.title);
    const[isbn,setIsbn] = useState(route.params.isbn);
    const[image,setImage] = useState(route.params.image);
    const[copies,setCopies] = useState(route.params.copies);
  let mydata = JSON.parse(route.params.datastring);

  const setData = async(value) => {
    AsyncStorage.setItem("bookdata",value);
    navigation.navigate("Home");
  }
  return (
    <View>
        <StatusBar/>
        <Text>Title:</Text>
        <TextInput value={title} style={{borderWidth:1, margin:5}} onChangeText={(text)=>setTitle(text)}/>
        <Text>ISBN:</Text>
        <TextInput value={isbn} style={{borderWidth:1, margin:5}} onChangeText={(text)=>setIsbn(text)}/>
        <Text>Image:</Text>
        <TextInput value={image} style={{borderWidth:1, margin:5}} onChangeText={(text)=>setImage(text)}/>
        <Text>Copies:</Text>
        <TextInput value={copies} style={{borderWidth:1, margin:5}} onChangeText={(text)=>setCopies(text)} keyboardType="numeric"/>

        <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
        <Button title='Save'
          onPress={()=>{
              mydata[0].data[route.params.index] = { title, isbn, image, copies: parseInt(copies) };
              let stringData = JSON.stringify(mydata);
            setData(stringData)
          }
        }
        />
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            Alert.alert("Are you sure?",'',
              [{text:'Yes', onPress:()=>{
                mydata[0].data.splice(route.params.index,1);
                let stringData = JSON.stringify(mydata);
                setData(stringData);
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;
