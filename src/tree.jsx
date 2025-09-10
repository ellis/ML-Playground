import React from "react";
import MLModel from "./mlmodel";
import S from "./s";

class Node {
	// data: [[[x, y], [x, y]....], [1, 0, 0, 1, 1,...]]
	constructor(data, layer) {
		this.data = data;
		this.layer = layer;
		this.isLeaf = true;
		this.pred = null;
		this.feature = null;
		this.splitVal = null;
		this.children = [];
	}
	fire(xTr) {
		if (this.isLeaf)
			return this.pred;
		if (xTr[this.feature] <= this.splitVal)
			return this.children[0].fire(xTr);
		return this.children[1].fire(xTr);
	}
	train(layersLeft) {
		if (layersLeft <= 0 || this.homogenous(this.data[1])) {
			this.pred = this.majorityLabel(this.data[1]);
			this.isLeaf = true;
			return;
		}
		var bestSplit = this.bestSplit(this.data);

		this.isLeaf = false;
		this.feature = bestSplit.feature;
		this.splitVal = bestSplit.value;

		this.children[0] = new Node(bestSplit.left, this.layer + 1);
		this.children[1] = new Node(bestSplit.right, this.layer + 1);

		this.children[0].train(layersLeft - 1);
		this.children[1].train(layersLeft - 1);
	}
	homogenous(arr) {
		var poten = arr[0];
		for (var i = 1; i < arr.length; i++) {
			if (arr[i] != poten)
				return false
		}
		return true;
	}
	majorityLabel(arr) {
		var counter = [0, 0];
		arr.forEach((entry) => {
			if (entry == S.class1)
				counter[0] += 1;
			else
				counter[1] += 1;
		});
		return counter[0] > counter[1] ? S.class1 : S.class2;
	}
	// ONLY yTr
	gini(arr) {
		var counter = [0, 0];
		arr.forEach((entry) => {
			if (entry == S.class1)
				counter[0] += 1;
			else
				counter[1] += 1;
		});
		var p = counter[0] / (counter[0] + counter[1]);
		return p * (1 - p);
	}
	// split by going from 0 -> split - 1 vs split -> end
	// ONLY yTr
	entropyAtSplit(arr, split) {
		var arr1 = arr.slice(0, split);
		var arr2 = arr.slice(split, arr.length);
		return arr1.length * this.gini(arr1) + arr2.length * this.gini(arr2);
	}
	bestSplit(data) {
		var xTr = data[0];
		var yTr = data[1];
		var bestFeature = -1;
		var bestSplitIndex;
		var bestEntropy = Infinity;
		for (var f = 0; f < 2; f++) {
			var sortedData = this.sortByX(data, f);
			for (var i = 1; i < sortedData[0].length; i++) {
				var _e = this.entropyAtSplit(sortedData[1], i);
				if (_e < bestEntropy) {
					bestEntropy = _e;
					bestSplitIndex = i;
					bestFeature = f;
				}
			}
		}
		var sortedData = this.sortByX(data, bestFeature);
		xTr = sortedData[0];
		yTr = sortedData[1];
		console.log("xTr", xTr);
		console.log("bestSplit", bestSplitIndex);
		return {
			feature: bestFeature,
			value: (xTr[bestSplitIndex - 1][bestFeature] + xTr[bestSplitIndex][bestFeature]) / 2,
			left: [xTr.slice(0, bestSplitIndex), yTr.slice(0, bestSplitIndex)],
			right: [xTr.slice(bestSplitIndex, xTr.length), yTr.slice(bestSplitIndex, yTr.length)]
		};
	}
	sortByX(data, feature) {
		var xTr = data[0];
		var yTr = data[1];
		var concatted = xTr.map((val, ind) => [...val, yTr[ind]]);
		concatted.sort((a, b) => a[feature] - b[feature]);
		var xTrNew = concatted.map((val) => [val[0], val[1]]);
		var yTrNew = concatted.map((val) => val[2]);
		return [xTrNew, yTrNew];
	}
}

export default class Tree extends MLModel {
	constructor() {
		super();
		this.root = null;
		this.maxDepth = 5;
	}
	classif(x, y) {
		return this.root.fire([x, y]);
	}
	dist(x1, y1, x2, y2) {
		return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	}
	train() {
		this.root = new Node([this.xTr, this.yTr], 0);
		this.root.train(this.maxDepth);
	}
	setMaxDepth(val) {
		if (val >= 0 && val <= 100) {
			this.maxDepth = val;
			return true;
		}
		return false;
	}
	uiInstance() {
		var self = this;
		return (
			class TreeUI extends React.Component {
				constructor(props) {
					super(props);
					this.state = {
						maxDepth: self.maxDepth
					};
				}
				onChangeDepth(e) {
					if (self.setMaxDepth(e.target.value)) {
						this.setState({ maxDepth: e.target.value });
					}
				}
				render() {
					return (<div>
							Max. Baumtiefe: <input type = "text" value = {this.state.maxDepth} onChange = {(e)=>this.onChangeDepth(e)}/>
						</div>);
				}
			}
		);
	}
	info() {
		return this.generateInfo({
			name: "Entscheidungsbaum",
			tldr: "Wie 'Wer bin ich?', nur für Daten.",
			expl1: "Stellt eine Reihe von 'Ja' oder 'Nein' Fragen, um die Daten in die richtigen Schubladen zu sortieren.",
			params: ["Max. Tiefe: Wie viele Fragen der Baum stellen darf."],
			usecase: ["Dinge in Gruppen einteilen", "Vorhersagen treffen"],
			expl2: ["Stell dir ein Flussdiagramm vor. Du startest oben und beantwortest eine Frage nach der anderen. Je nachdem, wie du antwortest, gehst du einen anderen Weg im Baum, bis du ganz unten ankommst und deine Antwort hast.",
				"Einen fertigen Baum zu benutzen ist super einfach. Die eigentliche Arbeit ist, den Baum zu bauen und die richtigen Fragen zu finden.",
				[<img className = "col-xs-12 col-md-6" src = "./build/img/tree_flow.png"/>,
					<img className = "col-xs-12 col-md-6" src = "./build/img/tree_entropy.png"/>],
				"Der Baum versucht, die besten Fragen zu finden, um die Daten so gut wie möglich zu trennen. Er will 'saubere' Gruppen, in denen nur eine Farbe ist. Wenn eine Gruppe gemischt ist, ist das 'unordentlich' (hohe Entropie).",
				"Es gibt coole Tricks, um Bäume noch besser zu machen, zum Beispiel 'Boosting' und 'Bagging'.",
				"Boosting ist, als würde man viele kleine, nicht so schlaue Bäume trainieren und sie dann zusammenarbeiten lassen, um eine super Vorhersage zu treffen.",
				"Bagging ist, als würde man viele verschiedene Trainings-Sets aus den Originaldaten erstellen und auf jedem einen Baum trainieren. Am Ende fragt man alle Bäume und nimmt die häufigste Antwort.",
				"Das Tolle an diesen Tricks ist, dass sie die Bäume besser machen, ohne große Nachteile zu haben.",
			],
			pros: ["Leicht zu verstehen, wie der Baum zu seiner Entscheidung kommt."],
			cons: ["Kann zu kompliziert werden, wenn der Baum zu viele Fragen stellt.",
				"Ein kleiner Unterschied in den Daten kann einen komplett anderen Baum ergeben.",
				"Kann nur senkrechte und waagerechte Linien ziehen, um Gruppen zu trennen."
			],
			links: [
				["https://de.wikipedia.org/wiki/Entscheidungsbaum", "Wikipedia: Entscheidungsbaum"],
				["https://de.wikipedia.org/wiki/Bootstrap-Aggregating", "Wikipedia: Bootstrap Aggregating (Bagging)"],
				["http://xgboost.readthedocs.io/en/latest/model.html", "Einführung in Boosted Trees (XGBoost, eine beliebte Boosted Tree-Bibliothek)"]
			]
		});
	}
}