import S from "./s";
import React from "react";
import MLModel from "./mlmodel";

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
			tldr: "Wenn Computer 21 Fragen spielen würden",
			expl1: "Entwerfen Sie einen Baum, der versucht, Daten in Eimer zu legen, unter Verwendung bestimmter Schwellenwerte für Merkmale (d. H. Eingaben)",
			params: ["Max. Tiefe (\u2264 100): Maximale Anzahl von Teilungen für den Baum"],
			usecase: ["Binäre Klassifizierung", "Mehrklassenklassifizierung", "Regression"],
			expl2: ["Im Grunde genommen Flussdiagramme. Sie beginnen am Wurzelknoten. Basierend auf dem Wert eines Merkmals (oder manchmal auch mehrerer) gehen wir zum linken oder rechten Kind des Baumes. Und so weiter, bis wir an einem Blattknoten ankommen, und dann treffen wir eine Vorhersage auf der Grundlage dieses Blattes.",
				"Es ist einfach, einem Baum zu folgen, wenn man ihn einmal konstruiert hat - es ist eine sehr einfache Kette von 'Ja/Nein's und Wahr/Falsch. Der interessante Teil ist offensichtlich, den Baum zu erstellen.",
				[<img className = "col-xs-12 col-md-6" src = "./build/img/tree_flow.png"/>,
					<img className = "col-xs-12 col-md-6" src = "./build/img/tree_entropy.png"/>],
				"Es gibt verschiedene Algorithmen zur Erstellung von Bäumen, aber im Allgemeinen arbeiten alle darauf hin, die Entropie zu minimieren. Nicht die physische Art, sondern die informationelle Art. Im Kontext eines Entscheidungsbaums und von Knoten ist die Entropie hoch, wenn die Punkte in einem 'Eimer' in Bezug auf ihre Bezeichnungen stark variieren. Wenn wir einen Baum haben, der die gleiche Anzahl von orangen und lila Punkten zusammenfasst, hat dieser Baum eine hohe Entropie und ist schlecht. Umgekehrt - wenn wir am Ende orangefarbene Punkte zusammenfassen und lila Punkte getrennt, dann ist die Entropie niedrig, und dies ist ein guter Baum.",
				"Beliebte Techniken zur Verwendung von Bäumen sind Boosting und Bagging.",
				"Boosting beinhaltet das Training einer großen Anzahl von Bäumen mit geringer Tiefe (d.h. hohem Bias), die knapp über dem Zufall vorhersagen - dann lassen Sie jeden kleinen Baum intelligent zu einer endgültigen, gewichteten Vorhersage beitragen. Dieser Ansatz senkt in erster Linie den Bias Ihres Modells.",
				"Bagging beinhaltet das Resampling des Datensatzes - mit Ihren Trainingsdaten möchten wir einen neuen Trainingssatz erstellen, der sich nur geringfügig vom Original unterscheidet. Wir tun dies, indem wir zufällig einen von n Punkten im ursprünglichen Datensatz auswählen - und wir setzen dies so oft fort, wie wir benötigen, um unseren neuen 'Beutel' mit Trainingsdaten zu bilden. Beachten Sie, dass derselbe Datenpunkt mehr als einmal ausgewählt werden darf. Dieser Ansatz bekämpft die Varianz in Ihrem Modell und kann eine Überanpassung reduzieren.",
				"Das Coole an Bagging und Boosting ist, dass Sie sich normalerweise keine Gedanken über Kompromisse machen müssen - Boosting reduziert den Bias, ohne zu stark zu überanpassen, und Bagging reduziert die Varianz/Überanpassung, ohne den Bias zu stark zu erhöhen. Bei vielen maschinellen Lernverfahren gibt es einen Kompromiss zwischen Bias und Varianz - daher macht diese Fähigkeit, einen zu verringern, ohne den anderen wesentlich zu beeinflussen, Bagging und Boosting so leistungsstark.",
				"Beachten Sie, dass Bagging und Boosting allgemeine Ansätze sind, die nicht spezifisch für Bäume sein müssen - es ist nur so, dass Bäume häufiger mit ihnen in Verbindung gebracht werden. Sie könnten den Bias eines beliebigen Algorithmus durch Boosting reduzieren und seine Varianz durch Bagging."
			],
			pros: ["Sehr einfach zu implementieren und zu interpretieren"],
			cons: ["Überanpassung, wenn die Baumtiefe zu hoch ist",
				"Instabil - wenn sich die Daten geringfügig unterscheiden, kann der resultierende Baum drastisch anders aussehen, insbesondere wenn die Bäume eine geringe Tiefe haben.",
				"Entscheidungsgrenzen sind orthogonal - kein Zeichnen von 'schrägen' Linien zur Trennung von Klassen"
			],
			links: [
				["https://en.wikipedia.org/wiki/Decision_tree", "Wikipedia: Entscheidungsbaum"],
				["https://en.wikipedia.org/wiki/Bootstrap_aggregating", "Wikipedia: Bootstrap Aggregating (Bagging)"],
				["http://xgboost.readthedocs.io/en/latest/model.html", "Einführung in Boosted Trees (XGBoost, eine beliebte Boosted Tree-Bibliothek)"]
			]
		});
	}
}