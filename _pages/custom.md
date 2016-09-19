---
title: "Custom Animation"
layout: single
sidebar:
  nav: "docs"
permalink: fade/
---
This component will automatically render any components nested inside the main AnimatedPTR component.  Therefore, this allows for any types of custom animations to be passed in if one is comfortable with the React Native Animated class. All children of the main component will be passed the following props: <strong>isRefreshing</strong>, <strong>scrollY</strong>, and <strong>minPullDistance</strong>.  If any more is needed, feel free to modify the library to pass whatever else is needed.If you do create an animation that isn't listed here, please consider doing a pull request!
