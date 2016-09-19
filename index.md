---
layout: single
sidebar:
  nav: "docs"
author_profile: false
---
<h2>Getting Started</h2>

<h3>Installation</h3>
---
```
npm -i react-native-animated-ptr --save
```

<h3>Usage</h3>
---
```
import 'AnimatedPTR' from 'react-native-animated-ptr';
```
The structure is such that you start with the AnimatedPTR component, then nest inside it animations that either are included with the component, or a custom animation component that you can create.  The component will render any component fed into it.  The refresh state works in the same way the native React Native RefreshControl works:  A isRefreshing boolean along with a callback is assigned to the component.  When a threshold amount (minPullDistance) is hit and touch is released, the componet will call the onRefresh function, which you write that toggles isRefreshing state to true while logic is being run.  To stop the refresh, set isRefreshing back to false.

<h3>Props</h3>
<p class="notice">
<strong>isRefreshing</strong> React.PropTypes.bool.isRequired<br>
Refresh state set by parent to trigger refresh.
</p>
<p class="notice--info">
<strong>minPullDistance</strong> React.PropTypes.number<br>
Sets pull distance for how far the Y axis needs to be pulled before a refresh event is triggered
</p>
<p class="notice">
<strong>onRefresh</strong> React.PropTypes.number<br>
Callback for when the refreshing state occurs
</p>
<p class="notice--info">
<strong>contentComponent</strong> React.PropTypes.object.isRequired<br>
The content view which should be passed in as a scrollable type (i.e ScrollView or ListView)
</p>
<p class="notice">
<strong>contentBackgroundColor</strong> React.PropTypes.object.isRequired<br>
The content view's background color, not to be mistaken with the content component's background color
</p>
<p class="notice--info">
<strong>PTRbackgroundColor</strong> React.PropTypes.string<br>
The pull to refresh background color.
</p>
