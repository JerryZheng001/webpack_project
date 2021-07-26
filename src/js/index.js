//index.js
import React, { Component } from "react";
import ReactDom from "react-dom";

class App extends Component {
    render() {
        return < p> hello world </p>

    }
}
ReactDom.render( < App /> , document.getElementById("app"));

//如果启用了HMR模块
// if (module.hot) {
//     module.hot.accept('./components/Root', () => { render(Root.default); });
//   }
  