---
title: "Fade Animation"
layout: single
sidebar:
  nav: "docs"
permalink: fade/
---
This animation allows you to fade the View or Image component's opacity percent depending on how far down the pull distance is. This is useful for shadow type effects, or even just to give the app a visual cue on when the refresh state is triggerable.

<h3>Props</h3>
<p class="notice">
<b>componentType</b> React.PropTypes.oneOf(['View', 'Image']).isRequired<br>
Component Type being created.  View allows for more nested components.
</p>
<p class="notice--info">
<strong>imageSrc</strong> React.PropTypes.node<br>
If using image, define the source.
</p>
<p class="notice">
<b>styleProps</b> React.PropTypes.any<br>
The components style props.
</p>
<p class="notice--info">
<strong>fadeType</strong> React.PropTypes.oneOf(['FADE_IN', 'FADE_OUT']).isRequired<br>
Fade Type for component.
</p>
<p class="notice">
<b>maxOpacity</b> React.PropTypes.number.isRequired<br>
Lower bound opacity
</p>
<p class="notice--info">
<strong>minOpacity</strong> React.PropTypes.number.isRequired<br>
Upper bound opacity
</p>
