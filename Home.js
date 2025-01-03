import React,{useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        flexDirection: "row"
    },
    textContainer: {
        flex: 1, // Takes up the remaining space left by image
    },
    textStyle: {
        fontSize: 15,
        marginVertical: 5, // Space between text elements
        textAlign: 'left',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'impact',
    },
    imageStyle: {
        width: 50,
        height: 75,
        marginLeft: 10, // Space between text and image
    },
});

const Home = ({navigation}) => {
    const [mydata, setMyData] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem("bookdata");
        if(datastr != null) {
            let jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        }
        else {
            setMyData(datasource);
        }
    };

    getData();

  const renderItem = ({item, index}) => {
    return (
    <TouchableOpacity style={styles.container}
    onPress={()=>
      {
          let datastr = JSON.stringify(mydata);
        navigation.navigate("Edit",{datastring:datastr, index:index})
      }
    }
    >
    <View style={styles.textContainer}>
        <Text style={styles.headerText}>
            {item.title}
        </Text>
        <Text style={styles.textStyle}>
            ISBN: {item.isbn}
        </Text>
        <Text style={styles.textStyle}>
            Copies Owned: {item.copies}
        </Text>
    </View>
    <View >
        <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 135, }}  // Set explicit dimensions for the image
        />
    </View>
    </TouchableOpacity>
    )
  };

   return (
    <View>
      <StatusBar/>
	  <Button title='Add Book'
              onPress={()=>{
                  let datastr = JSON.stringify(mydata)
                  navigation.navigate("Add",{datastring:datastr});
              }
      }
      />
      <SectionList sections={mydata} renderItem={renderItem}/>
    </View>
  );
};

export default Home;
