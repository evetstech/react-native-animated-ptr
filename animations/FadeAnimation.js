import React from 'react'
import {
  View,
  Animated,
  Image,
  UIManager
} from 'react-native'
import PropTypes from 'prop-types';

export default class FadeAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY : this.props.scrollY,
      isRefreshing: this.props.isRefreshing,
      minPullDistance: this.props.minPullDistance,
    }
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  static propTypes = {
    /**
     * Component Type being created.  View allows for more nested components.
     * @type {Enum}
     */
    componentType: PropTypes.oneOf(['View', 'Image']).isRequired,

    /**
     * If using image, define the source
     * @type {node}
     */
    imageSrc: PropTypes.node,

    /**
     * The components style props.
     * @type {StyleSheet}
     */
    styleProps: PropTypes.any,

    /**
     * Fade Type for component.
     * @type {Enum}
     */
    fadeType: PropTypes.oneOf(['FADE_IN', 'FADE_OUT']).isRequired,

    /**
     * Lower bound opacity
     * @type {Integer}
     */
    maxOpacity: PropTypes.number.isRequired,

    /**
     * Upper bound opacity
     * @type {Integer}
     */
    minOpacity: PropTypes.number.isRequired
  }

  render() {
    const fadeAnimation = this.state.scrollY.interpolate({
      inputRange: [-this.state.minPullDistance, 0],
      outputRange: this.props.fadeType === 'FADE_IN' ? [this.props.maxOpacity, this.props.minOpacity] : [this.props.minOpacity,this.props.maxOpacity],
      extrapolate: 'clamp'
    });
    if(this.props.occurrence === 'BEFORE_REFRESH' || this.state.isRefreshing) {
      return (
        this.props.componentType === 'Image' ?
          <Animated.Image
            style={[
              this.props.styleProps,
              {opacity: fadeAnimation}
            ]}
            source={this.props.imageSrc}
          /> :
          <Animated.View
            style={[
              this.props.styleProps,
              {opacity: fadeAnimation}
            ]}>
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
};
