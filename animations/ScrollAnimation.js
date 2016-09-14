import React from 'react'
import {
  View,
  Animated,
  Image,
  UIManager
} from 'react-native'

export default class ScrollAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY : this.props.scrollY,
      isRefreshing: this.props.isRefreshing,
      minPullDistance: this.props.minPullDistance,
      spinAnimation: new Animated.Value(0),
      isSpinning: false,
      hideAnimation: new Animated.ValueXY({
        x: this.props.xValues.to || this.props.xValues.to === 0 ? this.props.xValues.to : this.props.xValues.from,
        y: this.props.yValues.to || this.props.yValues.to === 0 ? this.props.yValues.to: this.props.yValues.from
      }),
      rotationAnimation: null
    }
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
     * If using image, define the source
     * @type {node}
     */
    imageSrc: React.PropTypes.node,

    /**
     * The components style props.
     * @type {StyleSheet}
     */
    styleProps: React.PropTypes.any,

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
     * The targeted direction of where the animation should go.  Try to choose a suitable direction, or results might not match the intention.
     * @type {Enum}
     */
    direction: React.PropTypes.oneOf([
      'MOVE_DOWN', 'MOVE_UP', 'MOVE_LEFT', 'MOVE_RIGHT',
      'MOVE_UP_LEFT', 'MOVE_UP_RIGHT', 'MOVE_DOWN_LEFT', 'MOVE_DOWN_RIGHT'
    ]).isRequired,

    /**
     * If set, allows for the animation to trigger at a specific Y-axis scroll number
     * @type {Integer}
     */
    shouldTriggerAt: React.PropTypes.number,

    /**
     * If set, will animate a moving animation to where values are set to.
     * @type {object}
     */
    shouldHideDuringRefresh: React.PropTypes.shape({
      toXValue: React.PropTypes.number,
      toYValue: React.PropTypes.number,
    }),

    /**
     * If set, will rotate an animation clockwise or counter-clockwise.  This will potentially be separated out into it's own animation.
     * @type {object}
     */
    shouldRotate: React.PropTypes.shape({
      direction: React.PropTypes.oneOf(['CLOCKWISE', 'COUNTER_CLOCKWISE']).isRequired,
      rotationType: React.PropTypes.oneOf(['ROTATE_WITH_SCROLL', 'ROTATE_CONTINUOUSLY']).isRequired,
      endRotationDeg: React.PropTypes.string.isRequired,
      shouldRotateBack: React.PropTypes.bool,
      rotationTiming: React.PropTypes.number.isRequired,
    })
  }

  componentWillMount() {
    this.setState({rotationAnimation : this.setRotateAnimation()});
  }

  componentWillUnmount() {
    if(this.triggerBindID) {
      this.triggerAnimated.removeListener(this.triggerBindID);
    }
    if(this.rotateTriggerBind) {
      this.spinAnimation.removeListener(this.rotateTriggerBind);
    }
  }

  componentWillReceiveProps(props){
    if(props.isRefreshing != this.state.isRefreshing){
      this.setState({isRefreshing: props.isRefreshing});
      if(this.props.shouldHideDuringRefresh){
        this.state.hideAnimation.setValue({
          x: this.props.xValues.to || this.props.xValues.to === 0 ? this.props.xValues.to : this.props.xValues.from,
          y: this.props.yValues.to || this.props.yValues.to === 0 ? this.props.yValues.to: this.props.yValues.from
        });
        Animated.spring(this.state.hideAnimation, {
          toValue: {
            x: this.props.shouldHideDuringRefresh.toXValue || this.props.shouldHideDuringRefresh.toXValue === 0 ? this.props.shouldHideDuringRefresh.toXValue : this.props.xValues.from,
            y: this.props.shouldHideDuringRefresh.toYValue || this.props.shouldHideDuringRefresh.toYValue === 0 ? this.props.shouldHideDuringRefresh.toYValue : this.props.yValues.from
          }
        }).start();
      }
    }
  }

  setRotateAnimation() {
    if(this.props.shouldRotate) {
      if(this.props.shouldRotate.rotationType === 'ROTATE_WITH_SCROLL') {
        if(this.props.shouldRotate.direction === 'CLOCKWISE') {
          let rotateObjectLeft = this.state.scrollY.interpolate({
            inputRange: [-this.props.minPullDistance, 0],
            outputRange: [this.props.shouldRotate.endRotationDeg, '0deg'],
            extrapolate: 'clamp'
          });
          return rotateObjectLeft;
        } else {
          let rotateObjectRight = this.state.scrollY.interpolate({
            inputRange: [-this.props.minPullDistance, 0],
            outputRange: ['0deg', this.props.shouldRotate.endRotationDeg],
            extrapolate: 'clamp'
          });
          return rotateObjectRight;
        }
      } else {
        this.rotateTriggerBind = this.state.scrollY.addListener((scroll) => {
          if(scroll.value >= 0) {
            if(this.state.isSpinning) {
              this.setState({isSpinning: false});
              this.state.spinAnimation.setValue(0);
            }
          } else {
            if(!this.state.isSpinning) {
              this.triggerRotation();
            }
          }
        });

        if(this.props.shouldRotate.direction === 'CLOCKWISE') {
          let rotateObjectLeft = this.state.spinAnimation.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', this.props.shouldRotate.endRotationDeg],
            extrapolate: 'clamp'
          });
          return rotateObjectLeft;
        } else {
          let rotateObjectRight = this.state.spinAnimation.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '-' + this.props.shouldRotate.endRotationDeg],
            extrapolate: 'clamp'
          });
          return rotateObjectRight;
        }
      }
    }
    return null;
  }

  triggerRotation() {
    this.setState({isSpinning: true});
    Animated.timing(this.state.spinAnimation, {
      toValue: 360,
      duration: this.props.shouldRotate.rotationTiming,
    }).start((event) => {
      if(event.finished) {
        if(this.props.shouldRotate.shouldRotateBack) {
          Animated.timing(this.state.spinAnimation, {
            toValue: 0,
            duration: this.props.shouldRotate.rotationTiming,
          }).start((event) => {
            if(event.finished) {
              this.triggerRotation();
            }
          });
        } else {
          this.state.spinAnimation.setValue(0);
          this.triggerRotation();
        }
      }
    });
  }

  constantScrollAnimation() {
    const scrollDown = this.props.scrollY.interpolate({
      inputRange: [-this.props.minPullDistance, 0],
      outputRange: [this.props.yValues.to || this.props.yValues.to == 0 ? this.props.yValues.to: this.props.yValues.from, this.props.yValues.from],
      extrapolate: 'clamp'
    });
    const scrollUp = this.props.scrollY.interpolate({
      inputRange: [-this.props.minPullDistance, 0],
      outputRange: [this.props.yValues.to || this.props.yValues.to === 0 ? this.props.yValues.to : this.props.yValues.from, this.props.yValues.from],
      extrapolate: 'clamp'
    });
    const scrollLeftRight = this.props.scrollY.interpolate({
      inputRange: [-this.props.minPullDistance, 0],
      outputRange: [this.props.xValues.to || this.props.xValues.to == 0 ? this.props.xValues.to : this.props.xValues.from, this.props.xValues.from],
      extrapolate: 'clamp'
    });

    let topAnimation, leftAnimation;
    switch(this.props.direction) {
      case 'MOVE_UP': topAnimation = scrollUp; leftAnimation = this.props.xValues.from; break;
      case 'MOVE_UP_LEFT':
      case 'MOVE_UP_RIGHT': topAnimation = scrollUp; leftAnimation = scrollLeftRight; break;
      case 'MOVE_DOWN': topAnimation = scrollDown; leftAnimation = this.props.xValues.from; break;
      case 'MOVE_DOWN_LEFT':
      case 'MOVE_DOWN_RIGHT': topAnimation = scrollDown; leftAnimation = scrollLeftRight; break;
      case 'MOVE_LEFT':
      case 'MOVE_RIGHT': topAnimation = this.props.yValues.from; leftAnimation = scrollLeftRight; break;
    }
    return (
    this.props.componentType === 'Image' ?
      <Animated.Image
        style={[
          this.props.styleProps, {
            top: this.props.shouldHideDuringRefresh ?
              (this.state.isRefreshing ?
                this.state.hideAnimation.y
                : topAnimation)
              : topAnimation,
            left: this.props.shouldHideDuringRefresh ?
              (this.state.isRefreshing ?
                this.state.hideAnimation.x
                : leftAnimation)
              : leftAnimation,
            position: 'absolute'},
            this.props.shouldRotate ?
              {transform: [{rotate: this.state.rotationAnimation}]
          } : null
        ]}
        source={this.props.imageSrc}
      />
      :
      <Animated.View
        style={[
          this.props.styleProps, {
            top: this.props.shouldHideDuringRefresh ?
              (this.state.isRefreshing ?
                this.state.hideAnimation.y
                : topAnimation)
              : topAnimation,
            left: this.props.shouldHideDuringRefresh ?
              (this.state.isRefreshing ?
                this.state.hideAnimation.x
                : leftAnimation)
              : leftAnimation,
            position: 'absolute'},
            this.props.shouldRotate ?
              {transform: [{rotate: this.state.rotationAnimation}]
          } : null
        ]}
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

  createTriggerBind() {
    this.triggerBind = 'f';
    this.triggerAnimated = new Animated.ValueXY({x:this.props.xValues.from, y:this.props.yValues.from});
    this.triggerBindID = this.state.scrollY.addListener((scroll) => {
      if(this.triggerBind === 'f' && scroll.value < -this.props.shouldTriggerAt) {
        this.triggerBind = 't';
        Animated.spring(this.triggerAnimated, {
          toValue: {x: this.props.xValues.to || this.props.xValues.to === 0 ? this.props.xValues.to : this.props.xValues.from,
            y: this.props.yValues.to || this.props.yValues.to === 0 ? this.props.yValues.to : this.props.yValues.from}
        }).start();
      } else if(this.triggerBind === 't' && scroll.value >= -this.props.shouldTriggerAt) {
        this.triggerBind = 'f';
        Animated.spring(this.triggerAnimated, {
          toValue: {x:this.props.xValues.from, y:this.props.yValues.from}
        }).start();
      }
    });
  }

  triggerAnimation() {
    if(!this.triggerBind){
      this.createTriggerBind();
    }

    return (
      this.props.componentType === 'Image' ?
        <Animated.Image
          style={[
            this.props.styleProps,
            { transform: [
              {translateX: this.triggerAnimated.x},
              {translateY: this.triggerAnimated.y}],
              position: 'absolute'
            },
            this.props.shouldRotate ?
              {transform: [{rotate: rotationAnimation}]} : null
          ]}
          source={this.props.imageSrc}
        /> :
        <Animated.View
          style={[
            this.props.styleProps,
            { transform: [
              {translateX: this.triggerAnimated.x},
              {translateY: this.triggerAnimated.y}],
              position: 'absolute'
            },
            this.props.shouldRotate ?
              {transform: [{rotate: rotationAnimation}]} : null
          ]}
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

  render() {
    if(this.props.occurrence === 'BEFORE_REFRESH' || this.state.isRefreshing) {
      if(this.props.shouldTriggerAt) {
        return this.triggerAnimation();
      } else {
        return this.constantScrollAnimation();
      }
    }
    return null;
  }
};
