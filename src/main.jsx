import "./main.less";

//import * as css from "main.less";

import React from "react";
import ReactDOM from "react-dom";

import UI from "./ui";

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

const steps = [{
	title: "Fülle die Leinwand",
	text: "Klicke, um Datenpunkte hinzuzufügen",
	selector: "#canvas",
	position: "right ",
	isFixed: false
}, {
	title: "Wähle den Datentyp",
	text: "Du kannst aus zwei Farben oder Klassen wählen. Wähle x, um den Radiergummi-Modus zu starten.",
	selector: "#brushes > div",
	position: "bottom",
	isFixed: false
}, {
	title: "Wähle das Modell",
	text: "Wechsle zwischen verschiedenen Modellen. Probiere sie alle aus! Deine Daten und Vorhersagen ändern sich nicht, bis du neu trainierst.",
	selector: "#model-selector",
	position: "right",
	isFixed: false
}, {
	title: "Parameter anpassen",
	text: "Du kannst einige Einstellungen für jedes Modell ändern.",
	selector: "#parameters",
	position: "left",
	isFixed: false
}, {
	title: "Trainieren und los!",
	text: "Klicke, um dein Modell zu trainieren! Beachte, dass das Training einiger Modelle einige Zeit in Anspruch nehmen kann (manchmal bis zu 10-20 Sekunden). Wenn die Schaltfläche schwarz bleibt, wird wahrscheinlich noch trainiert.",
	selector: "#trainAndDisplay",
	position: "left",
	isFixed: false
}, {
	title: "Lesen und lernen",
	text: "Enthält Details zur Ausführung des Algorithmus. Versuche, den Anleitungen zu folgen, um die Wirksamkeit bestimmter Modelle für bestimmte Datensätze zu testen.",
	selector: "#infoPanel",
	position: "top",
	isFixed: false
}, {
	title: "Das ist alles!",
	text: "Viel Spaß! Hinterlasse ein Feedback, wenn du das cool fandest.",
	selector: "#feedback",
	position: "top",
	isFixed: true
}];

var renderInfo = (info) => {
	ReactDOM.render(
		info,
		document.getElementById("infoPanel")
	);
};

import Joyride from "react-joyride";

class JoyrideWrapper extends React.Component {

	render(){
		return (
			<Joyride
				ref="joyride"
				steps={steps}
				run={true}
				debug={false}
				showSkipButton={true}
				type={"continuous"}
				showStepsProgress={true}
				callback={this.callback}
				allowClicksThruHole={true}
				scrollToSteps={false}
				autoStart={true}
				showOverlay={false}
			/>
		);
	}
}

var renderJoyride = () => {
	ReactDOM.render(
		<JoyrideWrapper/>,
		document.getElementById("joyride-panel")
	);
};


ReactDOM.render(
	<UI setClass = {(brush) => {canvas.setBrush(brush);}}
		train = {() => {canvas.trainAndClassif();}}
		store = {store}
		renderInfo = {renderInfo}
		repaint = {()=>{canvas.clearCtx();canvas.drawStoreTr()}}
		clearAll = {()=>{canvas.clearAll()}} />,
	document.getElementById("options")
);

renderJoyride();

c.addEventListener("click", (evt)=>{canvas.onPointAdded(evt);}, false);