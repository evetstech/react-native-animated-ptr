import React from 'react'
import {
  View,
  ScrollView,
  Animated,
  PanResponder,
  UIManager
} from 'react-native'
import TimedAnimation from '../animations/TimedAnimation';
import ScrollAnimation from '../animations/ScrollAnimation';
import FadeAnimation from '../animations/FadeAnimation';

class AnimatedPTR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldTriggerRefresh: false,
      scrollY : new Animated.Value(0),
      refreshHeight: new Animated.Value(0),
      currentY : 0,
      isScrollFree: false
    }
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  static propTypes = {
    /**
     * Refresh state set by parent to trigger refresh
     * @type {Boolean}
     */
    isRefreshing : React.PropTypes.bool.isRequired,
    /**
     * Sets pull distance for how far the Y axis needs to be pulled before a refresh event is triggered
     * @type {Integer}
     */
    minPullDistance : React.PropTypes.number,
    /**
     * Callback for when the refreshing state occurs
     * @type {Function}
     */
    onRefresh : React.PropTypes.func.isRequired,
    /**
     * The content view which should be passed in as a scrollable type (i.e ScrollView or ListView)
     * @type {Object}
     */
    contentComponent: React.PropTypes.object.isRequired,
    /**
     * The content view's background color, not to be mistaken with the content component's background color
     * @type {string}
     */
    contentBackgroundColor: React.PropTypes.string,
    /**
     * The pull to refresh background color.
     * @type {string}
     */
    PTRbackgroundColor: React.PropTypes.string
  }

  static defaultProps = {
    minPullDistance : 120,
    PTRbackgroundColor: 'white',
    contentBackgroundColor: 'white'
  }

  componentWillMount() {
    //Android does not allow for negative scroll, so we have to listen to the scroll values ourselves (at least initially)
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
       onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
       onPanResponderMove: this._handlePanResponderMove.bind(this),
       onPanResponderRelease: this._handlePanResponderEnd.bind(this),
       onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
    });
  }
  onScrollTrigger(distance) {
    if(distance.value <= -this.props.minPullDistance) {
      if(!this.state.shouldTriggerRefresh) {
        return this.setState({shouldTriggerRefresh: true});
      }
    } else if(this.state.shouldTriggerRefresh) {
      return this.setState({shouldTriggerRefresh: false});
    }
  }

  onScrollRelease() {
    if(!this.props.isRefreshing && this.state.shouldTriggerRefresh) {
      this.props.onRefresh();
    }
  }

  componentWillReceiveProps(props) {
    if(!props.isRefreshing) {
      Animated.spring(this.state.refreshHeight, {
        toValue: 0
      }).start();
    }
  }
  componentDidMount() {
    this.state.refreshHeight.addListener((value) => this.onScrollTrigger(value));
  }

  componentWillUnmount() {
    this.state.refreshHeight.removeAllListeners()
  }

  _handleStartShouldSetPanResponder(e, gestureState) {
    return !this.state.isScrollFree;
  }

  _handleMoveShouldSetPanResponder(e, gestureState) {
    return !this.state.isScrollFree;
  }

  //if the content scroll value is at 0, we allow for a pull to refresh, or else let native android scrolling handle scrolling
  _handlePanResponderMove(e, gestureState) {
    if(!this.props.isRefreshing) {
      if((gestureState.dy >= 0 && this.state.scrollY._value === 0) || this.state.refreshHeight._value > 0) {
        this.state.refreshHeight.setValue(-1*gestureState.dy*.5);
      } else {
        //TODO: create a momentum scroll for the first pass
        this.refs.PTR_ScrollComponent.scrollTo({y: -1*gestureState.dy, animated: true});
      }
    }
  }

  _handlePanResponderEnd(e, gestureState) {
    if(!this.props.isRefreshing) {
      if(this.state.refreshHeight._value <= -120) {
        this.onScrollRelease();
        Animated.spring(this.state.refreshHeight, {
          toValue: -120
        }).start();
      } else if(this.state.refreshHeight._value <= 0) {
        Animated.spring(this.state.refreshHeight, {
          toValue: 0
        }).start();
      }

      if(this.state.scrollY._value > 0) {
        this.setState({isScrollFree: true});
      }
    }
  }

  isScrolledToTop() {
    if(this.state.scrollY._value === 0 && this.state.isScrollFree) {
      this.setState({isScrollFree: false});
    }
  }

  render() {
    let onScrollEvent = Animated.event([{
      nativeEvent: { contentOffset: { y: this.state.scrollY }}
    }]);
    let animateHeight = this.state.refreshHeight.interpolate({
      inputRange: [-120, 0],
      outputRange: [120, 0]
    });
    return  (
      <View style={{flex:1, backgroundColor:this.props.contentBackgroundColor}}
        {...this._panResponder.panHandlers}>
        <ScrollView ref='PTR_ScrollComponent'
          scrollEnabled={this.state.isScrollFree}
          onScroll={onScrollEvent}
          onTouchEnd= {() => {this.isScrolledToTop()}}
          onScrollEndDrag= {() => {this.isScrolledToTop()}}
          onMomentumScrollEnd = {() => {this.isScrolledToTop()}}
          onResponderRelease ={() => {this.onScrollRelease.bind(this)}}
        >
        <Animated.View style={{height: animateHeight, overflow:'visible',backgroundColor: this.props.PTRbackgroundColor}}>
        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            isRefreshing: this.props.isRefreshing,
            scrollY: this.state.refreshHeight,
            minPullDistance: this.props.minPullDistance
          });
        })}
        </Animated.View>
        {React.cloneElement(this.props.contentComponent, {
          scrollEnabled: false,
          scrollEventThrottle: 16,
          ref:'PTR_ScrollComponent',
        })}
        </ScrollView>
      </View>
    );
  }
}

AnimatedPTR.TimedAnimation = TimedAnimation;
AnimatedPTR.ScrollAnimation = ScrollAnimation;
AnimatedPTR.FadeAnimation = FadeAnimation;

module.exports = AnimatedPTR;
