---
title: "Scroll Animation"
layout: single
sidebar:
  nav: "docs"
permalink: scroll/
---
Using the scroll animation allows you to tie a View or Image to the pull down value of the ListView/ScrollView.  There are different options of what happens when the value chanegs; i.e you can trigger an animation at a specific point, or as you scroll, the component will move up or down.  

<h3>Props</h3>
<p class=".notice">
<b>occurence</b> PropTypes.oneOf(['BEFORE_REFRESH', 'DURING_REFRESH']).isRequired<br>
Sets when the animation should occur: before or during the refresh state.
</p>

#####componentType
PropTypes.oneOf(['View', 'Image']).isRequired
Component Type being created.  View allows for more nested components.
