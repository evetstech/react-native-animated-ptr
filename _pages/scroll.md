---
title: "Scroll Animation"
layout: single
sidebar:
  nav: "docs"
permalink: scroll/
---
Using the scroll animation allows you to tie a View or Image to the pull down value of the ListView/ScrollView.  There are different options of what happens when the value chanegs; i.e you can trigger an animation at a specific point, or as you scroll, the component will move up or down.  

<h3>Props</h3>
<p class="notice">
<b>occurence</b> PropTypes.oneOf(['BEFORE_REFRESH', 'DURING_REFRESH']).isRequired<br>
Sets when the animation should occur: before or during the refresh state.
</p>
<p class="notice--info">
<strong>componentType</strong> PropTypes.oneOf(['View', 'Image']).isRequired<br>
Component Type being created.  View allows for more nested components.
</p>
<p class="notice--info">
<strong>imageSrc</strong> PropTypes.node<br>
If using image, define the source
</p>
<p class="notice">
<strong>styleProps</strong> PropTypes.any<br>
The components style props.
</p>
<p class="notice--info">
<strong>xValues</strong> PropTypes.shape({from: React.PropTypes.number.isRequired,to: React.PropTypes.number}).isRequired<br>
Points for where the animation components will start and end at on the X-axis.  If not moving on X axis, only the from is required (or can be set the same)
</p>
<p class="notice">
<strong>yValues</strong> PropTypes.oneOf(['View', 'Image']).isRequired<br>
Points for where the animation components will start and end at on the Y-axis.  If not moving on Y axis, only the from is required (or can be set the same)
</p>
<p class="notice--info">
<strong>direction</strong> React.PropTypes.oneOf([
      'MOVE_DOWN', 'MOVE_UP', 'MOVE_LEFT', 'MOVE_RIGHT',
      'MOVE_UP_LEFT', 'MOVE_UP_RIGHT', 'MOVE_DOWN_LEFT', 'MOVE_DOWN_RIGHT'
    ]).isRequired<br>
The targeted direction of where the animation should go.  Try to choose a suitable direction, or results might not match the intention.
</p>
<p class="notice">
<strong>shouldTriggerAt</strong> PropTypes.number<br>
If set, allows for the animation to trigger at a specific Y-axis scroll number
</p>
<p class="notice--info">
<strong>shouldHideDuringRefresh</strong> React.PropTypes.shape({toXValue: React.PropTypes.number, toYValue: React.PropTypes.number})<br>
If set, will animate a moving animation to where values are set to.
</p>
<p class="notice">
<strong>shouldRotate</strong> PropTypes.shape({
  direction: React.PropTypes.oneOf(['CLOCKWISE', 'COUNTER_CLOCKWISE']).isRequired,
  rotationType: React.PropTypes.oneOf(['ROTATE_WITH_SCROLL', 'ROTATE_CONTINUOUSLY']).isRequired,
  endRotationDeg: React.PropTypes.string.isRequired,
  shouldRotateBack: React.PropTypes.bool,
  rotationTiming: React.PropTypes.number.isRequired,
})<br>
If set, will rotate an animation clockwise or counter-clockwise.  This will potentially be separated out into it's own animation.
</p>
