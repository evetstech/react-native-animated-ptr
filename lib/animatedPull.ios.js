import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native'
import TimedAnimation from '../animations/TimedAnimation';
import ScrollAnimation from '../animations/ScrollAnimation';
import FadeAnimation from '../animations/FadeAnimation';
import PropTypes from 'prop-types';

class AnimatedPTR extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      shouldTriggerRefresh: false,
      scrollY : new Animated.Value(0),
      isScrollFree: true,
    }
  }

  static propTypes = {
    /**
     * Refresh state set by parent to trigger refresh
     * @type {Boolean}
     */
    isRefreshing : PropTypes.bool.isRequired,
    /**
     * Sets pull distance for how far the Y axis needs to be pulled before a refresh event is triggered
     * @type {Integer}
     */
    minPullDistance : PropTypes.number,
    /**
     * Callback for when the refreshing state occurs
     * @type {Function}
     */
    onRefresh : PropTypes.func.isRequired,
    /**
     * The content view which should be passed in as a scrollable type (i.e ScrollView or ListView)
     * @type {Object}
     */
    contentComponent: PropTypes.object.isRequired,
    /**
     * The content view's background color, not to be mistaken with the content component's background color
     * @type {string}
     */
    contentBackgroundColor: PropTypes.string,
    /**
     * The pull to refresh background color.
     * @type {string}
     */
    PTRbackgroundColor: PropTypes.string,
    /**
     * Custom onScroll event
     * @type {Function}
     */
     onScroll: PropTypes.func
  }

  static defaultProps = {
    minPullDistance : 120,
    PTRbackgroundColor: 'white',
    contentBackgroundColor: 'white'
  }

  componentDidMount() {
    this.state.scrollY.addListener((value) => this.onScrollTrigger(value));
  }

  componentWillUnmount() {
    this.state.scrollY.removeAllListeners();
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
      this.refs.PTR_ScrollComponent.scrollTo({y: -this.props.minPullDistance})
      this.setState({isScrollFree: false});
      this.props.onRefresh();
    }
  }

  componentWillReceiveProps(props) {
    if(this.props.isRefreshing !== props.isRefreshing) {
        if(!props.isRefreshing) {
          this.refs.PTR_ScrollComponent.scrollTo({y: 0});
          this.setState({isScrollFree: true});
        }
    }
  }

  render() {
    const onScroll = this.props.onScroll
    let onScrollEvent = (event) => {
      if (onScroll) {
        onScroll(event)
      }
      this.state.scrollY.setValue(event.nativeEvent.contentOffset.y)
    };
    let animateHeight = this.state.scrollY.interpolate({
      inputRange: [-this.props.minPullDistance,0],
      outputRange: [this.props.minPullDistance, 0]
    });

    return (
      <View style={{flex:1, zIndex:-100,backgroundColor: this.props.contentBackgroundColor}}>
        <Animated.View style={{height: animateHeight,backgroundColor: this.props.PTRbackgroundColor}}>
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
              isRefreshing: this.props.isRefreshing,
              scrollY: this.state.scrollY,
              minPullDistance: this.props.minPullDistance
            });
          })}
        </Animated.View>
        <View style={styles.contentView}>
          {React.cloneElement(this.props.contentComponent, {
            scrollEnabled: this.state.isScrollFree,
            onScroll: onScrollEvent,
            scrollEventThrottle: 16,
            onResponderRelease: this.onScrollRelease.bind(this),
            ref:'PTR_ScrollComponent',
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
});

AnimatedPTR.TimedAnimation = TimedAnimation;
AnimatedPTR.ScrollAnimation = ScrollAnimation;
AnimatedPTR.FadeAnimation = FadeAnimation;

module.exports = AnimatedPTR;
