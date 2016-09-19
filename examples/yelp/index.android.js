import React, {Component} from 'react'
import {
  AppRegistry,
  View,
  Text,
  ListView,
  ScrollView,
  StyleSheet,
  Animated,
  Image,
  Platform,
  PanResponder,
  UIManager,
  InteractionManager,
} from 'react-native'
import PullToRefresh from 'react-native-animated-ptr'

class customPull extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.fillRows(),
      isRefreshing: false,
    }
  }

  onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 5000);
  }

  fillRows() {
    this.numRows = 10;
    var rows = Array.apply(0, new Array(this.numRows)).map((x,i) => `ListView Item ${i}`);
    return this.ds.cloneWithRows(rows);
  }

  render() {
    return(
      <View style={{flex:1}}>
        <View style={{height: 64, backgroundColor: 'red'}}>
          <Text style={{top: 35, fontWeight: 'bold', fontSize: 18,color: 'white', textAlign: 'center'}}>Header or Nav. of some sort</Text>
        </View>
        <PullToRefresh
          isRefreshing= {this.state.isRefreshing}
          onRefresh= {this.onRefresh.bind(this)}
          PTRbackgroundColor= {'#ebebe6'}
          contentBackgroundColor = {'#ebebe6'}
          contentComponent= {
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View style={styles.row}><Text style={styles.text}>{rowData}</Text></View>}
            />
          }
        >
        <PullToRefresh.ScrollAnimation
          componentType={'Image'}
          imageSrc={require('./images/launchpad_bg.png')}
          styleProps={{height: 80, resizeMode: 'contain'}}
          occurrence={'BEFORE_REFRESH'}
          direction={'MOVE_DOWN'}
          xValues={{from:113}}
          yValues={{from:0, to:20}}
          shouldHideDuringRefresh={{toXValue:113, toYValue: 120}}
        />
        <PullToRefresh.ScrollAnimation
          componentType={'View'}
          xValues={{from:50}}
          yValues={{from:120, to:20}}
          styleProps={styles.circle}
          occurrence={'BEFORE_REFRESH'}
          direction={'MOVE_UP'}
        />
        <PullToRefresh.ScrollAnimation
          componentType={'View'}
          xValues={{from:0}}
          yValues={{from:10, to:90}}
          styleProps={{height: 300,width:480,backgroundColor: '#cccdc8'}}
          occurrence={'BEFORE_REFRESH'}
          direction={'MOVE_DOWN'}
          shouldHideDuringRefresh={{toXValue:0, toYValue: 120}}
        >
          <PullToRefresh.FadeAnimation
            componentType={'View'}
            styleProps={styles.circle2}
            occurrence={'BEFORE_REFRESH'}
            fadeType={'FADE_IN'}
            maxOpacity={.1}
            minOpacity={0}
          />
        </PullToRefresh.ScrollAnimation>
        <PullToRefresh.TimedAnimation
          componentType={'Image'}
          imageSrc={require('./images/cloud2.png')}
          styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
          occurrence={'DURING_REFRESH'}
          xValues={{from:80}}
          yValues={{from:-60, to:120}}
          duration={1300}
          shouldRepeat={true}
        />
        <PullToRefresh.TimedAnimation
          componentType={'Image'}
          imageSrc={require('./images/cloud2.png')}
          styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
          occurrence={'DURING_REFRESH'}
          xValues={{from:30}}
          yValues={{from:-20, to:120}}
          duration={1500}
          shouldRepeat={true}
        />
        <PullToRefresh.TimedAnimation
          componentType={'Image'}
          imageSrc={require('./images/cloud2.png')}
          styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
          occurrence={'DURING_REFRESH'}
          xValues={{from:190}}
          yValues={{from:-20, to:120}}
          duration={800}
          shouldRepeat={true}
        />
        <PullToRefresh.TimedAnimation
          componentType={'Image'}
          imageSrc={require('./images/cloud2.png')}
          styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
          occurrence={'DURING_REFRESH'}
          xValues={{from:140}}
          yValues={{from:-20, to:120}}
          duration={1400}
          shouldRepeat={true}
        />
        <PullToRefresh.TimedAnimation
          componentType={'Image'}
          imageSrc={require('./images/cloud2.png')}
          styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
          occurrence={'DURING_REFRESH'}
          xValues={{from:250}}
          yValues={{from:-20, to:120}}
          duration={1400}
          shouldRepeat={true}
        />
        <PullToRefresh.ScrollAnimation
          componentType={'Image'}
          imageSrc={require('./images/flame.png')}
          direction={'MOVE_DOWN'}
          styleProps={{height: 15, resizeMode: 'contain'}}
          occurrence={'DURING_REFRESH'}
          xValues={{from:182}}
          yValues={{from:94, to:94}}
          shouldRotate= {{direction: 'CLOCKWISE', rotationType: 'ROTATE_CONTINUOUSLY', endRotationDeg:'12deg', rotationTiming: 100, shouldRotateBack: true}}
        />
        <PullToRefresh.TimedAnimation
          componentType={'Image'}
          xValues={{from:180}}
          yValues={{from:60, to:120}}
          duration={300}
          styleProps={{height:40, width: 40, opacity: .7}}
          occurrence={'DURING_REFRESH'}
          direction={'MOVE_DOWN'}
          imageSrc={require('./images/smoke.png')}
        />
        <PullToRefresh.ScrollAnimation
          componentType={'Image'}
          imageSrc={require('./images/ship_bg.png')}
          direction={'MOVE_DOWN'}
          styleProps={{height: 80, resizeMode: 'contain'}}
          occurrence={'BEFORE_REFRESH'}
          xValues={{from:140}}
          yValues={{from:-120, to:20}}
        />
        <PullToRefresh.ScrollAnimation
          componentType={'Image'}
          imageSrc={require('./images/chipmunk.png')}
          direction={'MOVE_DOWN'}
          styleProps={{height: 30, resizeMode: 'contain'}}
          occurrence={'BEFORE_REFRESH'}
          xValues={{from:178}}
          yValues={{from:0, to:55}}
        />
        <PullToRefresh.ScrollAnimation
          componentType={'Image'}
          imageSrc={require('./images/ship.png')}
          direction={'MOVE_DOWN'}
          styleProps={{height: 80, resizeMode: 'contain'}}
          occurrence={'BEFORE_REFRESH'}
          xValues={{from:140}}
          yValues={{from:-120, to:20}}
        />
        <PullToRefresh.ScrollAnimation
          componentType={'Image'}
          xValues={{from:30, to: 30}}
          yValues={{from:120, to:100}}
          styleProps={{height: 25, resizeMode: 'contain'}}
          occurrence={'BEFORE_REFRESH'}
          direction={'MOVE_UP'}
          shouldTriggerAt={121}
          removeAfterRefresh={true}
          imageSrc={require('./images/release.png')}
        />
        </PullToRefresh>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  row: {
    padding: 10,
    height: 125,
    backgroundColor: '#dccdc8',
    borderTopWidth: 1,
    marginBottom:-1,
    borderBottomColor: '#E5EDF5',
    borderTopColor: '#E5EDF5',
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    color: 'black'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100/2,
    backgroundColor: 'white',
    opacity: .7
  },
  circle2: {
    width: 45,
    height: 25,
    left: 175,
    borderRadius: 50,
    backgroundColor: 'black',
    transform: [
      {scaleX: 2}
    ]
  }
})

AppRegistry.registerComponent('customPull', () => customPull);



















 //
 //
 //
 //  constructor(props) {
 //    super(props);
 //    this.state = {
 //      scrollY : new Animated.Value(0),
 //      refreshHeight: new Animated.Value(0),
 //      currentY : 0,
 //      scrollEnabled: false
 //    }
 //    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
 //    this.dy = 0;
 //    this._lastOrigin = 0;
 //    this.lock = false;
 //    this._lastRelease = 0 ;
 //  }
 //  componentWillMount() {
 //    this._panResponder = PanResponder.create({
 //      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
 //       onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
 //       onPanResponderGrant: this._handlePanResponderGrant.bind(this),
 //       onPanResponderMove: this._handlePanResponderMove.bind(this),
 //       onPanResponderRelease: this._handlePanResponderEnd.bind(this),
 //       onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
 //    });
 //  }
 //
 //  _handleStartShouldSetPanResponder(e, gestureState) {
 //    return !this.state.scrollEnabled;
 //  }
 //  _handleMoveShouldSetPanResponder(e, gestureState) {
 //
 //   return !this.state.scrollEnabled;
 // }
 // _handlePanResponderGrant(e, gestureState) {
 //   console.log('granted');
 // }
 // _handlePanResponderMove(e, gestureState) {
 //   if((gestureState.dy >= 0 && this.state.scrollY._value === 0) || this.state.refreshHeight._value > 0) {
 //     this.state.refreshHeight.setValue(gestureState.dy*.5);
 //   } else {
 //     this.refs.scrollView.scrollTo({y: -1*gestureState.dy, animated: true});
 //   }
 // }
 // _handlePanResponderEnd(e, gestureState) {
 //   if(gestureState.dy >= 120 && this.state.refreshHeight._value > 0) {
 //     Animated.spring(this.state.refreshHeight, {
 //       toValue: 120
 //     }).start();
 //   } else if(this.state.refreshHeight._value > 0) {
 //     Animated.spring(this.state.refreshHeight, {
 //       toValue: 0
 //     }).start();
 //   }
 //   if(this.state.scrollY._value > 0) {
 //     this.setState({scrollEnabled: true});
 //   }
 // }
 // checkY() {
 //   if(this.state.scrollY._value === 0 && this.state.scrollEnabled) {
 //     this.setState({scrollEnabled: false});
 //   }
 // }
 //  render() {
 //       let onScrollEvent = Animated.event([{
 //         nativeEvent: { contentOffset: { y: this.state.scrollY }}
 //       }]);
 //  return  (
 //         <View style={{flex:1}}>
 //          <View style={{height:100, backgroundColor:'green'}}>
 //
 //          </View>
 //         <View style={{flex:1}}
 //             {...this._panResponder.panHandlers}
 //
 //         >
 //           <ScrollView ref='scrollView'
 //           scrollEnabled={this.state.scrollEnabled}
 //           onScroll={onScrollEvent}
 //           onTouchEnd= {() => {this.checkY()}}
 //           onScrollEndDrag= {() => {this.checkY()}}
 //           onMomentumScrollEnd = {() => {this.checkY()}}
 //           >
 //              <Animated.View style={{height: this.state.refreshHeight,backgroundColor: 'black'}}>
 //              </Animated.View>
 //           </ScrollView>
 //         </View>
 //         </View>
 //       );
 //  }
