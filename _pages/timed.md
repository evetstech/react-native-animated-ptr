---
title: "Timed Animation"
layout: single
sidebar:
  nav: "docs"
permalink: timed/
---

This animation component allows you to animate a View or Image to move at a speed in which it meets the timed interval.  As with the other animations, this allows for nesting under the other animation to create some unique designs.

<h3>Props</h3>
<p class="notice">
<strong>occurence</strong> PropTypes.oneOf(['BEFORE_REFRESH', 'DURING_REFRESH']).isRequired<br>
Sets when the animation should occur: before or during the refresh state.
</p>
<p class="notice--info">
<strong>componentType</strong> PropTypes.oneOf(['View', 'Image']).isRequired<br>
Component Type being created.  View allows for more nested components.
</p>
<p class="notice">
<strong>xValues</strong> React.PropTypes.shape({
      from: React.PropTypes.number.isRequired,
      to: React.PropTypes.number
    }).isRequired<br>
Points for where the animation components will start and end at on the X-axis.  If not moving on X axis, only the from is required (or can be set the same)
</p>
<p class="notice--info">
<strong>yValues</strong> React.PropTypes.shape({
      from: React.PropTypes.number.isRequired,
      to: React.PropTypes.number
    }).isRequired<br>
Points for where the animation components will start and end at on the Y-axis.  If not moving on Y-axis, only the from is required (or can be set the same)
</p>
<p class="notice">
<strong>duration</strong> React.PropTypes.number.isRequired<br>
The duration of how long the animation will take to complete in ms.
</p>
<p class="notice--info">
<strong>shouldRepeat</strong> React.PropTypes.bool<br>
Will repeat the animation after completion if set to true. Default is false.
</p>
<p class="notice">
<strong>styleProps</strong> React.PropTypes.any<br>
The components style props.
</p>
<p class="notice--info">
<strong>imageSrc</strong> React.PropTypes.node<br>
If using image, define the source
</p>
