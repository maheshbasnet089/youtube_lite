import React,{useState} from 'react';
import { StyleSheet, Text, View ,ScrollView,TextInput,FlatList,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import MiniCard from '../components/MiniCard'
import Constants from 'expo-constants'
import {useSelector,useDispatch} from 'react-redux'
import {useTheme} from '@react-navigation/native'

//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyCxxv4bONvvI4-UQizdrxQuNeXl0Qe36Rg

const Search = ({navigation})=>{
    const {colors} = useTheme()
    const mycolor = colors.iconColor
    const [value,setValue] = useState('')
    //const [miniCardData,setMiniCard] = useState([])
    const dispatch = useDispatch()

    const miniCardData = useSelector(state=>{
        return state.cardData 
    })
    const [loading,setLoading] = useState(false)
    const fetchData =()=>{
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyCxxv4bONvvI4-UQizdrxQuNeXl0Qe36Rg`)
        .then(res=>res.json())
        .then(data=>{
            setLoading(false)
            dispatch({type:'add',payload:data.items})
            //setMiniCard(data.items)
        })
    }
    return(
        <View style={{flex:1,marginTop:Constants.statusBarHeight}}>
            <View style={{
                padding:5,
                flexDirection:'row',
                justifyContent:'space-around',
                elevation:5,
                backgroundColor:colors.headerColor
                
            }}>
            <Ionicons name='md-arrow-back' size={32} 
            style={{
                color:mycolor
            }}
            onPress={()=>navigation.goBack()}
            />
            <TextInput 
            style={{
                width:'70%',
                backgroundColor:'#e6e6e6',
                color:mycolor
            }}
            value={value}
            onChangeText ={(text)=>setValue(text)}
            />
            <Ionicons name='md-send' size={32} 
                style={{
                    color:mycolor
                }}
            onPress={()=>fetchData()}
            />
            
            </View>
            {loading ? <ActivityIndicator style={{marginTop:10}} size='large' color='red' /> :null}
           <FlatList
           data={miniCardData}
           renderItem={({item})=>{
               return <MiniCard
               videoId = {item.id.videoId}
               title={item.snippet.title}
               channel={item.snippet.channelTitle}
               />
           }}
           keyExtractor={item=>item.id.videoId}
           />

        </View>
    )
}

export default Search