import React from "react";
import MLModel from "./mlmodel";

export default class Perceptron extends MLModel {
	constructor(){
		super();
		this.w = [0, 0, 0];
		this.maxIters = 20;
	}
	classif(x, y){
		var result = this.w[0] * x + this.w[1] * y + this.w[2] * 100;
		return this.pr2cl(result);
	}
	maxIndex(arr){
		var bestIndex = -1;
		var bestVar = -Infinity;
		for (var i = 0; i < arr.length; i ++){
			if(arr[i] > bestVar){
				bestVar = arr[i];
				bestIndex = i;
			}
		}
		return bestIndex;
	}
	dist(x1, y1, x2, y2){
		return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
	}
	train(){
		this.w = [(Math.random() - .5) * 10, (Math.random() - .5) * 10, 0];
		var allGood = false;
		var iters = this.maxIters;
		while(!allGood && iters > 0){
			var misClassed = 0;
			for(var i = 0; i< this.xTr.length; i ++){
				var pred = this.classif(this.xTr[i][0], this.xTr[i][1]);
				if(this.yTr[i] != pred){
					misClassed += 1;
					let y = this.cl2pr(this.yTr[i]);
					this.w[0] += y * this.xTr[i][0];
					this.w[1] += y * this.xTr[i][1];
					this.w[2] += y * 100;
				}
			}
			if(misClassed === 0)
				allGood = true;
			iters --;
		}
		return;
	}
	setMaxIters(iters){
		if(iters < 100){
			this.maxIters = iters;
			return true;
		}
		return false;
	}
	uiInstance(){
		var self = this;
		var setMaxIters = this.setMaxIters.bind(this);
		return(
			class PerceptronUI extends React.Component{
				constructor(props){
					super(props);
					this.state = {
						maxIters: self.maxIters
					};
					this.onChange = this.onChange.bind(this);
				}
				onChange(e){
					if(setMaxIters(e.target.value)) {
						this.setState({
							maxIters: e.target.value
						});
					}
				}
				render(){
					return(
						<div>
							Max. Iterationen: <input type = "text" value = {this.state.maxIters} onChange = {this.onChange}/>
						</div>
					);
				}
			}
		);
	}
	info(){
		return this.generateInfo({
			name: "Perzeptron",
			tldr: "Eine Linie ziehen, um Gruppen zu trennen.",
			expl1: <div>Zieht eine <b>gerade Linie</b>, um die Datenpunkte in zwei Gruppen zu teilen.</div>,
			params: ["Max. Runden (≤ 100): Wie oft der Computer versucht, die beste Linie zu finden."],
			usecase: ["Zwei Gruppen trennen", "Vorhersagen, ob etwas zur einen oder anderen Gruppe gehört"],
			expl2: ["Das ist einer der ältesten Tricks im Buch. Stell dir vor, du hast rote und blaue Punkte. Das Perzeptron versucht, eine gerade Linie zu finden, die alle roten von allen blauen Punkten trennt.",
				"Auf einem Blatt Papier ist das eine Linie. In einem 3D-Raum wäre es eine flache Wand. In noch mehr Dimensionen wird es kompliziert, sich das vorzustellen.",
				"Früher dachten die Leute, das Perzeptron sei ein Superhirn und könne alles lernen. Aber es hat sich herausgestellt, dass es nicht einmal einen Kreis von einem Viereck unterscheiden kann. Probier's mal aus!",
				"Das zeigt uns, dass man nicht zu viel versprechen sollte, was eine neue Erfindung alles kann. Auch heute im Zeitalter der künstlichen Intelligenz ist das eine wichtige Lektion.",
				"<img className = \"col-xs-10 col-xs-offset-1\" src = \"./build/img/percep_eqn.png\"/>"],
			pros: ["Sehr einfach zu verstehen.", "Funktioniert super schnell."],
			cons: ["Funktioniert nur, wenn man die Gruppen mit einer geraden Linie trennen kann.",
				"Tut sich schwer, wenn die Punkte sehr nah an der Trennlinie liegen."],
			links: [
				["https://de.wikipedia.org/wiki/Perzeptron", "Wikipedia: Perzeptron"],
				["http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Perceptron.html", "SKlearn Perzeptron-Paket"],
				["http://www.cs.cornell.edu/courses/cs4780/2017sp/lectures/lecturenote03.html", "Perzeptron-Mathe-Notizen (Cornell CS 4780, Weinberger)"]
			]
		});
	}
}