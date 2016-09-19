---
title: "Nested Animations"
layout: single
sidebar:
  nav: "docs"
permalink: nested/
---

Most animations allow for nested components.  If there is a prop to set the componentType to a View, you can create that base animation along with what is contained in the view.  This opens up a lot of potential to create different types of animations.  An example would be the yelp animation, which nests the platform of the rocketship with the fading animation of the rockets shadow.  This could further be nested if you so choose.

```
<PullToRefresh.ScrollAnimation
  componentType={'View'}
  xValues={{from:0}}
  yValues={{from:10, to:90}}
  styleProps={{width:480,height: 200,backgroundColor: '#cccdc8'}}
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
```
