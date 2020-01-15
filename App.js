import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';

var testSpectateRes = require('./testSpectateResponse.json');
var champMap = require('./champ.json');
var spellMap = require('./spells.json');

export default function App() {

  
  var summonerCache = {};

  summonerCache['achillesgreat'] = '3wTCAeH9cg7rp3lpocQR0nLzA8mWMwlznV23gVNqDralvWc';
  const[summonerName, setSummonerName] = useState('');
  const[enemyTimers, setEnemyTimers] = useState([]);

  const getSummoner = (enteredText) => {
    setSummonerName(enteredText);
  };


  const createEnemyTimers = () => {

    var trimmedSumm = summonerName.replace(' ', '').toLowerCase();

    var summonerId = getSummonerId(trimmedSumm);
    if (summonerId == null) {
      console.log('summoner does not exist');
      return;
    }
    var temp = [];
    var spectateData = getSpectateData(summonerId);

    for (var player in spectateData){
      var playerData = spectateData[player];
      //http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/Ahri.png
      var imageDataUrl = 'http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/' + champMap[playerData.championId].image;
      playerData.image =  imageDataUrl;

      //http://ddragon.leagueoflegends.com/cdn/9.24.2/img/spell/SummonerFlash.png
      playerData.summoner1Image = 'http://ddragon.leagueoflegends.com/cdn/9.24.2/img/spell/' + spellMap[playerData.spell1].image;
      playerData.summoner2Image = 'http://ddragon.leagueoflegends.com/cdn/9.24.2/img/spell/' + spellMap[playerData.spell2].image;
      playerData.cooldown1 = parseInt(spellMap[playerData.spell1].cooldown);
      playerData.cooldown2 = parseInt(spellMap[playerData.spell2].cooldown);

      console.log(playerData.summoner1Image);
      temp.push(playerData);
    }
    setEnemyTimers(temp);
  }

  const getSpectateData = (summId) => {
    return testSpectateRes.playerSpells;
  }
  const getSummonerId = (ign) => {
    return summonerCache[ign];
  }

  
  return (

    <View style={styles.container}>

      <View style={styles.inputContainer} >
        <TextInput 
          placeholder="Summoner Name" 
          style={styles.input}
          onChangeText={getSummoner}
          value={summonerName}
        />
        <Button title="start" onPress={createEnemyTimers} /> 
      </View>
      
      
      <View style={{flex: 1}}> 
        {enemyTimers.map((enemy) => 
        <View style={styles.listItem}>
          <Image source={{uri: enemy.image}} style={{flex: .2, height: '100%'}} />
          <TouchableOpacity style={{flex: .4}} >
            <ImageBackground source={{uri: enemy.summoner1Image}} style={{height: '100%'}}>
            <Text>time</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: .4}}>
            <Image source={{uri: enemy.summoner2Image}} style={{height: '100%'}}/>
          </TouchableOpacity>
        </View>
        )}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    width: '80%', 
    borderColor: 'black', 
    borderWidth: 1, 
    padding: 10
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  listItem: {

    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row'
  }
});


function httpGet(theUrl, data)
{
    var xmlHttp = new XMLHttpRequest();
    console.log('attempting to get ' + theUrl);
    xmlHttp.onreadystatechange = function() {
      data = xmlHttp.response;
    }
    xmlHttp.open( 'GET', theUrl, true ); // false for synchronous request
    xmlHttp.send();
}

