import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import {useNavigation,useTheme} from '@react-navigation/native'

const Card = (props)=>{
    const navigation = useNavigation()
    const {colors} = useTheme()
    const textColor = colors.iconColor
    return(
        <TouchableOpacity onPress={()=>
        navigation.navigate('videoplayer',{videoId:props.videoId,title:props.title})
        }>
        <View style={{elevation:4,margin:10}}
        
        >
            <Image
            source={{uri:`https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`}}
            style={{
                width:'100%',
                height:200
            }}
            />
            <View style={{
                flexDirection:'row',
                margin:5
            }}>
              <MaterialIcons name='account-circle'  size={40} color='#212121'/>

                <View style={{
                    marginLeft:10,
                    width:'80%',
                   
                    
                }}>
                <Text style={{fontSize:20,
                    color:textColor

            }} ellipsizeMode='tail' 
                numberOfLines={2}
            >{props.title}</Text>
                <Text style={{
                    color:textColor
                }}>{props.channel}</Text>
                </View>

            </View>
        </View>
        </TouchableOpacity>
    )
}

export default Card 