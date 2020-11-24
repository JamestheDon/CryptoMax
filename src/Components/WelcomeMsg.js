'use strict';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';
import usePositions from '../hooks/usePositions';
import {Colors} from './index';

const WelcomeMsg = ({switchView, navigation, btc$, testNums}) => {
  const [apiResults, positions, setPosition] = usePositions([]);

  useEffect(() => {
 
console.log('ALWAYS ANOTHER CONSOLE LOg', positions)
  })





  // useEffect(() => {
  //   console.log('BUILD SLow and steady=>', typeof btc, btc);
  // }, [btc]);

  // const setBitcoinPrice = (btc) => {

  //   const btcPrice = [btc]

  //   setCurrentBtcPrice(btcPrice)
  // }

  // store in Async Storage
  //   const AccountIndex = () => {
  // const acct = {count: index[i]}
  //     // set indexx in storage
  // // get index from storage
  // // if key is > 0; ++
  // // update state with account # count.
  // try {
  //   await AsyncStorage.setItem(index, JSON.stringify(pos));
  // } catch (err) {}
  //      setIndex(prevState => {
  //        return prevState + 1
  //      })
  //   }

  return (
    <View style={styles.component}>
      <View style={styles.sectionContainer}>
        
        <View style={styles.addPositionBtn}>
        { testNums() === true ? (    
                <View style={styles.activated}>
        
            
                {/* <Text style={styles.sectionDescription}>
                #2  Activated 
                </Text> */}
                <Button
                  type="outline"
                  // title="Add new postions"
                 // titleStyle={{borderColor: Colors.darkScheme.dark,  borderRightWidth: 2, borderBottomWidth: 2, borderColor: Colors.darkScheme.primary}}
                  buttonStyle={styles.buttonSuccess}
                  containerStyle={styles.btnContainerSuccess}
                  icon={
                    <Icon
                      name="text-box-plus-outline"
                      size={30}
                      color={Colors.darkScheme.gold}
                    />
                  }
                  // onPress={() => getPosition(item.key)}
                  onPress={() => switchView()}
                />
              </View>
            ) : ( 
              <View style={styles.deactivated}>
                
                  
                    
                    {/* <Text style={styles.sectionDescription}>
                   Deactivated
                    </Text> */}
                  <Button
                  type="outline"
                  // title="Add new postions"
                 // titleStyle={{color: Colors.darkScheme.primary}}
                  buttonStyle={styles.buttonFail}
                  containerStyle={styles.btnContainerFail}
                  icon={
                    <Icon
                      name="alert-circle-outline"
                      size={30}
                      color={Colors.darkScheme.red}
                    />
                  }
                  // onPress={() => getPosition(item.key)}
                
                  onPress={() => Alert.alert("Please enter a valid Bitcoin price.")}
                
                />
            
            </View>
            )}
            </View>
 
        
          <View style={styles.ledgerBtn}>
            { testNums() === true && positions.length > 0 ? (    
              <View>
                <View>
      
                {/* <Text style={styles.sectionDescription}>
                 #3 Activated
                </Text> */}
                <Button
                  type="outline"
                  // title="Add new postions"
                //  titleStyle={{color: Colors.darkScheme.primary}}
                  buttonStyle={styles.buttonSuccess}
                  containerStyle={styles.btnContainerSuccess}
                  icon={
                    <Icon
                    name="text-box-search-outline"
                    size={30}
                    color={Colors.darkScheme.gold}
                  />
                  }
                  // onPress={() => getPosition(item.key)}
                  onPress={() =>
                    navigation.navigate('HomeScreenDetails', {
                      data: positions,
                      btc$: btc$,
                    })
                  }
                />
                </View>
            </View>
            ) : ( 
            <View>
                <View>
                {/* <Text style={styles.sectionDescription}>
                 Deactivated
                </Text> */}
             
           
                <Button
                type="outline"
                // title="Add new postions"
                
               // titleStyle={{color: Colors.darkScheme.primary}}
                buttonStyle={styles.buttonFail}
                containerStyle={styles.btnContainerFail}
                icon={
                  <Icon
                      name="alert-circle-outline"
                      size={30}
                      color={Colors.darkScheme.red}
                    />
                }
                // onPress={() => getPosition(item.key)}
              
                onPress={() => Alert.alert("Please add a new position before going to the Ledger")}
              
                />
              </View>
            </View>
            )}
          </View>
          </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
   
    //  width: '100%',
  //  alignItems: 'center',

    //backgroundColor: Colors.darkScheme.light,
    // height: '50%',
    // paddingTop: 5,
  },

  inputContainerStyle: {
    borderWidth: 1,
  },
  sectionDescription: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.darkScheme.primary,
  },
  ledgerBtn: {
     // flexDirection: 'row',
   //  margin: 10
  },
  addPositionBtn: {
  // justifyContent: 'center'
  },
  activated: {},
  deactivated: {
   // width: '100%'
  },

  sectionContainer: {
   // flex: 1,
     flexDirection: 'row',
    backgroundColor: Colors.darkScheme.light,
    //paddingTop: 5,
justifyContent: 'center',
   
  },
btnContainerSuccess: {
  
  padding: 10,
  shadowColor: Colors.darkScheme.grey,
  shadowOffset: { height: 4, width: 4 }, // IOS
  shadowOpacity: 1, // IOS
  shadowRadius: 1, //IOS
},
  buttonSuccess: {
   
    width: 150,
    backgroundColor: Colors.darkScheme.primary,  
    borderRightWidth: 2, 
    borderBottomWidth: 2,
    borderTopWidth: 2, 
    borderLeftWidth: 2,  
    borderColor: Colors.darkScheme.gold
  },
  btnContainerFail:{
  
    padding: 10,
    shadowColor: Colors.darkScheme.red,
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 3, //IOS
  
  
  },
  buttonFail: {  
    width: 150,   
    borderRightWidth: 2, 
    borderBottomWidth: 2, 
    borderColor: Colors.darkScheme.red,
    backgroundColor: Colors.darkScheme.light
  }
});

export default WelcomeMsg;
