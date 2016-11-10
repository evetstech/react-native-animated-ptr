import React from 'react'
import {
  View,
  Animated,
  Image,
  UIManager
} from 'react-native'

export default class TimedAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.ValueXY({
        x: this.props.xValues.from,
        y: this.props.yValues.from
      }),
      isRefreshing: this.props.isRefreshing,
      triggered: false
    };
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

  }

  static propTypes = {
    /**
     * Sets when the animation should occur: before or during the refresh state.
     * @type {Enum}
     */
    occurrence: React.PropTypes.oneOf(['BEFORE_REFRESH', 'DURING_REFRESH']).isRequired,

    /**
     * Component Type being created.  View allows for more nested components.
     * @type {Enum}
     */

    componentType: React.PropTypes.oneOf(['View', 'Image']).isRequired,
    /**
     * Points for where the animation components will start and end at on the X-axis.  If not moving on X axis,
     * only the from is required (or can be set the same)
     * @type {object}
     */

    xValues: React.PropTypes.shape({
      from: React.PropTypes.number.isRequired,
      to: React.PropTypes.number,
    }).isRequired,

    /**
     * Points for where the animation components will start and end at on the X-axis.  If not moving on Y axis,
     * only the from is required (or can be set the same)
     * @type {object}
     */
    yValues: React.PropTypes.shape({
      from: React.PropTypes.number.isRequired,
      to: React.PropTypes.number
    }).isRequired,

    /**
     * The duration of how long the animation will take to complete in ms.
     * @type {Integer}
     */
    duration: React.PropTypes.number.isRequired,

    /**
     * Will repeat the animation after completion if set to true.
     * @type {[type]}
     */
    shouldRepeat: React.PropTypes.bool,

    /**
     * The components style props.
     * @type {StyleSheet}
     */
    styleProps: React.PropTypes.any,

    /**
     * If using image, define the source
     * @type {node}
     */
    imageSrc: React.PropTypes.node,
  }

  componentDidMount() {
    this.triggerBindID = this.props.scrollY.addListener((scroll) => {
      if(!this.state.triggered && this.props.isRefreshing) {
        this.setState({triggered: true});
        this.triggerAnimation();
      } else if(this.state.triggered && !this.props.isRefreshing) {
        this.setState({triggered: false});
        this.stopAnimation();
      }
    })
  }
  componentWillUnmount() {
    if(this.triggerBindID) {
      this.state.scrollY.removeListener(this.triggerBindID);
    }
  }
  triggerAnimation(cb) {
    Animated.timing(this.state.animation, {
      toValue: {
        x: this.props.xValues.to || this.props.xValues.to === 0 ? this.props.xValues.to : this.props.xValues.from,
        y: this.props.yValues.to || this.props.yValues.to === 0 ? this.props.yValues.to : this.props.yValues.from },
      duration: this.props.duration
    }).start((event) => {
      if(event.finished && this.props.shouldRepeat) {
        this.state.animation.setValue({
          x: this.props.xValues.from,
          y: this.props.yValues.from});
        this.triggerAnimation();
      }
    });
  }
  stopAnimation() {
    this.state.animation.setValue({
      x: this.props.xValues.from,
      y: this.props.yValues.from});
  }

  render() {
    if(this.props.occurrence === 'BEFORE_REFRESH' || this.props.isRefreshing) {
      return (
        this.props.componentType === 'Image' ?
          <Animated.Image
            style={[this.props.styleProps, {
              transform: [
                {translateX: this.state.animation.x},
                {translateY: this.state.animation.y},
              ],
              position:'absolute'
            }]}
            source={this.props.imageSrc}
          />
         :
          <Animated.View
            style={[this.props.styleProps, {
              transform: [
                {translateX: this.state.animation.x},
                {translateY: this.state.animation.y},
              ],
              position:'absolute'
            }]}
          >
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, {
                isRefreshing: this.props.isRefreshing,
                scrollY: this.state.scrollY,
                minPullDistance: this.props.minPullDistance
              })
            })}
          </Animated.View>
      )
    }
    return null;
  }
}
