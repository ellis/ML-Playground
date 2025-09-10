import "./main.less";

//import * as css from "main.less";

import React from "react";
import ReactDOM from "react-dom";

import UI from "./ui";
import Toolbar from "./toolbar";

import Store from "./store";
import Canvas from "./canvas";
import S from "./s";

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

ctx.canvas.width = S.canvasW;
ctx.canvas.height = S.canvasH;

const canvas = new Canvas(c);
const store = new Store();
canvas.linkToStore(store);

var renderInfo = (info) => {
	ReactDOM.render(
		info,
		document.getElementById("infoPanel")
	);
};


ReactDOM.render(
	<Toolbar setClass = {(brush) => {canvas.setBrush(brush);}}
		store = {store}
		repaint = {()=>{canvas.clearCtx();canvas.drawStoreTr()}}
		clearAll = {()=>{canvas.clearAll()}} />,
	document.getElementById("toolbar-container")
);

ReactDOM.render(
	<UI train = {() => {canvas.trainAndClassif();}}
		store = {store}
		renderInfo = {renderInfo} />,
	document.getElementById("options")
);

c.addEventListener("click", (evt)=>{canvas.onPointAdded(evt);}, false);