import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class location extends Component {

   state = {
        longitude:'',//經度
        latitude:'',//緯度
        position:'',//位置名稱
    };

    componentWillMount = () => {
        this.getPositions();
    };

    getPositions=()=>{
        return new Promise(() => {
            /** 獲取當前位置資訊 */
            navigator.geolocation.getCurrentPosition(
                location => {
                    this.setState({
                        longitude: location.coords.longitude,//經度
                        latitude: location.coords.latitude,//緯度
                    });
                    //通過呼叫高德地圖逆地理介面，傳入經緯度獲取位置資訊
                    fetch(`http://restapi.amap.com/v3/geocode/regeo?key=97c933e33025b3843b40016900074704&location=${this.state.longitude},${this.state.latitude}&radius=1000&extensions=all&batch=false&roadlevel=0`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: ``
                    })
                        .then((response) => response.json())
                        .then((jsonData) => {
                            try {
                                this.setState({
                                    position:jsonData.regeocode.formatted_address,
                                });
                                alert(jsonData.regeocode.formatted_address)
                            }catch (e) {

                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    //訪問網路結束
                },
                error => {
                    console.error(error);
                }
            );

        })
    }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>經度：{this.state.longitude}</Text>
        <Text style={styles.instructions}>緯度：{this.state.latitude}</Text>
        <Text style={styles.instructions}>當前位置：{this.state.position}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});