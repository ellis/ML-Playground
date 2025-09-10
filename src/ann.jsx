import { default as m } from "mathjs";
import React from "react";
import MLModel from "./mlmodel";

const norm = 100;
const MAX_PER_LAYER = 10;
const MAX_LAYERS = 8;


export default class Ann extends MLModel {
	constructor() {
		super();
		this.layers = [2, 4, 3, 1];
		this.shuffleWeights();
		this.classif = this.classif.bind(this);
		this.alpha = 0.02;
		this.maxEpochs = 500;
		this.maxError = 0.02;
	}
	shuffleWeights() {
		this.A = [];
		this.b = [];
		for (var i = 0; i < this.layers.length - 1; i++) {
			this.A[i] = m.matrix(m.random([this.layers[i + 1], this.layers[i]], -.5, .5));
			this.b[i] = m.matrix(m.random([1, this.layers[i + 1]], -.2, .2).valueOf()[0]);
		}
	}
	relu(input) {
		input.resize([input.size()[0], 2], 0);
		return m.max(input, 1);
	}
	tanh(input) {
		return m.tanh(input);
	}
	classif(x, y) {
		var z = [
			[x / norm, y / norm], 0, 0
		];
		var ax = [0, 0];
		for (var i = 0; i < this.layers.length - 1; i++) {
			ax[i] = m.add(m.multiply(this.A[i], z[i]), this.b[i]);
			z[i + 1] = this.tanh(ax[i]);
		}
		return this.pr2cl(z[this.layers.length - 1].valueOf()[0]);
	}
	vvMult(v1, v2) {
		v1 = m.transpose(m.matrix([v1]));
		v2 = m.matrix([v2]);
		var ret = m.multiply(v1, v2);
		if (typeof ret == "number")
			return m.matrix([
				[ret]
			]);
		if (ret.size().length == 1)
			return m.matrix([ret]);
		return ret;
	}
	shuffle(a, b) {
		for (let i = a.length; i; i--) {
			let j = Math.floor(Math.random() * i);
			[a[i - 1], a[j]] = [a[j], a[i - 1]];
			[b[i - 1], b[j]] = [b[j], b[i - 1]];
		}
	}
	train() {
		this.shuffleWeights();

		var self = this;
		var yTr = this.yTr.map(function(i) {
			return self.cl2pr(i);
		});
		var xTr = this.xTr.map(function(i) {
			return m.divide(i.slice(), norm);
		});
		//var g = [0, 0];
		var err = 0;
		for (var i = 0; i < this.maxEpochs; i++) {
			err = 0;
			this.shuffle(xTr, yTr);
			var _A = m.clone(this.A);
			var _b = m.clone(this.b);
			for (var ii = 0; ii < xTr.length; ii++) {
				var z = [0, 0, 0];
				var ax = [0, 0];

				z[0] = [xTr[ii][0], xTr[ii][1]];

				for (var j = 0; j < this.layers.length - 1; j++) {
					ax[j] = m.squeeze(m.add(m.squeeze(m.multiply(this.A[j], z[j])), this.b[j]));
					z[j + 1] = this.tanh(ax[j]);
				}


				var delta = [0, 0];
				var lmax = this.layers.length;
				var diff = z[lmax - 1] - yTr[ii];

				delta[lmax - 2] = m.multiply(diff, m.subtract(1, m.square(z[lmax - 1])));
				err += Math.abs(diff);

				for (var l = lmax - 2; l >= 0; l--) {
					_A[l] = m.subtract(_A[l], m.chain(this.alpha).multiply(this.vvMult(delta[l], z[l])).done());
					_b[l] = m.subtract(_b[l], m.squeeze(m.multiply(this.alpha, delta[l])));
					if (l != 0) {
						var der = m.subtract(1, m.square(z[l]));
						var tpDelt = m.squeeze(m.multiply(m.transpose(this.A[l]), delta[l]));
						var d = m.dotMultiply(der, tpDelt);
						delta[l - 1] = d;
					}
				}

			}
			this.A = _A;
			this.b = _b;
			err /= xTr.length;
			console.log("ANN error: ", err);
			if (err < this.maxError) {
				break;
			}
			//alpha *= .95
		}
		return;
	}
	addNeuron(layer) {
		if (layer && layer > 0 && layer < this.layers.length - 1 && this.layers[layer] < MAX_PER_LAYER) {
			this.layers[layer] += 1;
		}
		return this.layers;
	}
	removeNeuron(layer) {
		if (layer && layer > 0 && layer < this.layers.length - 1 && this.layers[layer] > 1) {
			this.layers[layer] -= 1;
		}
		return this.layers;
	}
	addLayer() {
		if (this.layers.length - 2 < MAX_LAYERS) {
			this.layers.push(1);
			this.layers[this.layers.length - 2] = 3;
		}
		return this.layers;
	}
	removeLayer() {
		if (this.layers.length > 3) {
			this.layers.splice(this.layers.length - 1, 1);
			this.layers[this.layers.length - 1] = 1;
		}
		return this.layers;
	}
	setAlpha(a) {
		var aa = parseFloat(a);
		if (aa < 1000) {
			this.alpha = aa;
			return a;
		}
		return this.alpha;
	}
	setEpochs(e) {
		var ee = parseInt(e);
		if (ee < 5000 && ee >= 0) {
			this.maxEpochs = ee;
			return e;
		}
		return this.maxEpochs;
	}
	setError(e) {
		var ee = parseFloat(e);
		if (ee < 100 && ee > 0.0001) {
			this.maxError = ee / 100;
			return e
		}
		return this.maxError * 100;
	}
	uiInstance() {
		//var setK = this.setK.bind(this);//this.setK.bind(this);
		var self = this;
		return (
			class AnnUI extends React.Component {
				constructor(props) {
					super(props);
					this.state = {
						layers: self.layers,
						alpha: self.alpha,
						maxEpochs: self.maxEpochs,
						maxError: self.maxError * 100
					};
				}
				dispatch(type, n) {
					switch (type) {
						case "n+":
							this.setState({ layers: self.addNeuron(n) });
							break;
						case "n-":
							this.setState({ layers: self.removeNeuron(n) });
							break;
						case "l+":
							this.setState({ layers: self.addLayer() });
							break;
						case "l-":
							this.setState({ layers: self.removeLayer() });
							break;
						case "a":
							this.setState({ alpha: self.setAlpha(n) });
							break;
						case "epoch":
							this.setState({ maxEpochs: self.setEpochs(n) });
							break;
						case "error":
							this.setState({ maxError: self.setError(n) });
							break;
					}
				}
				createDispatch(type, n) {
					return () => { this.dispatch(type, n); };
				}

				render() {
					var layers = [];
					//first input layer
					layers.push(<div key = {0} className = "layer">
						<button>X</button>
						<button>Y</button>
					</div>);
					//middle layers
					for (var i = 1; i < self.layers.length - 1; i++) {
						var layer = [];
						var l = i;
						for (var ii = 0; ii < self.layers[i]; ii++) {
							layer.push(<button onClick = {this.createDispatch("n-", l)}></button>);
						}
						layer.push(<button className = "flipped" onClick = {this.createDispatch("n+", l)}>+</button>);
						layers.push(<div key = {i} className = "layer">
							{layer}
						</div>);
					}
					//last layer
					layers.push(<div key = {self.layers.length - 1} className = "layer">
						<button></button>
					</div>);
					layers.push(<div key = {self.layers.length} className = "layer">
												Schichten hinzufügen
						<button className = "flipped" onClick = {this.createDispatch("l+")}>+</button>
						<button className = "flipped" onClick = {this.createDispatch("l-")}>-</button>
					</div>);
					var annContainer = <div id = "ANN-panel">{layers}</div>;
					return (
						<div>
							Lernrate: <input type = "text" value = {this.state.alpha} onChange = {(e)=>this.dispatch("a", e.target.value)}/>
							Max. Epochen: <input type = "text" value = {this.state.maxEpochs} onChange = {(e)=>this.dispatch("epoch", e.target.value)}/><br/>
							Max. Fehler %: <input type = "text" value = {this.state.maxError} onChange = {(e)=>this.dispatch("error", e.target.value)}/><br/>
							Klicke auf Neuronen, um sie zu entfernen<br/>
							{annContainer}
						</div>
					);
				}
			}
		);
	}
	info() {
		return this.generateInfo({
			name: "Künstliches neuronales Netz",
			tldr: "Perzeptrone! Mehr Perzeptrone!",
			expl1: "Verkette viele Perzeptrone in Schichten. Führe eine Vorwärtspropagierung durch, um eine Vorhersage zu treffen. Trainiere durch Backpropagation und Aktualisierung der Gewichte der Neuronen.",
			params: ["Trainingsrate: Wie schnell das Netzwerk aus Fehlern lernt. Verringern, wenn das Netzwerk schlechte Ergebnisse liefert.",
			"Max. Epochen: Anzahl der Trainingsrunden. Erhöhen, wenn die Ergebnisse schlecht sind.",
			"Max. Fehler: prozentualer Fehler, der erreicht werden soll, bevor wir aufhören zu trainieren.",
			"Schichten und Neuronen - halte es in einem vernünftigen Rahmen! Trainiere keine 1000 Schichten mit jeweils 1000 Neuronen - du wirst dir noch ein Auge ausschießen."],
			usecase: ["Binäre Klassifizierung", "Mehrklassenklassifizierung", "Regression"],
			expl2: ["Das Heißeste, was es gibt (Anmerkung: geschrieben 2017). Wer weiß, wie lange dieser Trend anhalten wird.",
				"Die Grundvoraussetzung ist, dass man mehrere Schichten von Perzeptronen hat. Jede Schicht erhält eine Eingabe von der letzten, und jedes Neuron gibt eine Zahl aus - d.h. es 'feuert'. Wir wenden dann eine Aktivierungsfunktion auf diese 'gefeuerte' Ausgabe an, und dann gehen wir zur nächsten Schicht über.",
				<img className = "col-xs-10 col-xs-offset-1" src = "./build/img/ann_flow.png"/>,
				"Die Aktivierungsfunktion ist hier entscheidend - wenn man die Ausgaben nicht durch eine Aktivierungsfunktion schickt, trainiert man effektiv ein einfaches Perzeptron. Mit anderen Worten, Aktivierungsfunktionen sind das, was neuronalen Netzen ihre Magie verleiht. In diesem Fall verwenden wir eine tanh-Aktivierungsfunktion, die die Ausgaben zwischen -1 und 1 skaliert - eine Vielzahl anderer wird verwendet, wie z. B. Rectified Linear Units (ReLU) und die logistische Funktion.",
				"Eine weitere Schlüsselkomponente ist der Backpropagation-Algorithmus. Aufgrund der unkomplizierten Struktur des Netzwerks können wir mathematisch einen Weg finden, unser Netzwerk zu optimieren. Wir berechnen einen 'Gradienten', was die Berechnung von Ableitungen für jedes einzelne Neuron beinhaltet, und passen dann alle Gewichte entsprechend an. Wir passen die Gewichte an, indem wir von der letzten Schicht zur ersten zurückgehen - daher 'Backpropagation' der Gewichtsaktualisierungen.",
				"Viele coolere Anwendungen von neuronalen Netzen drehen sich um die Verwendung komplexerer Formen als ein einfaches dichtes Netzwerk (wie hier vorgestellt).",
				"Convolutional Networks (ConvNets) sind Experten für die Bildverarbeitung, da sie über das gesamte Bild 'falten', d.h. das Bild mit einem kleineren beweglichen Fenster abtasten.",
				"Recurrent Neural Networks (RNNs) sind leistungsstark für die Datengenerierung, sowohl für Bilder als auch für Text, da sie die Fähigkeit haben, sich an Daten aus früheren Einträgen in einer Zeitreihe zu 'erinnern'."
			],
			pros: ["Universeller Approximator - jede kontinuierliche Funktion kann durch eine endliche Anzahl von Neuronen in einer Schicht angenähert werden. Keine Garantie für die Lernfähigkeit - d.h. es gibt eine gute Lösung, aber es liegt an Ihnen, sie zu finden. Irgendwie.",
				"Wie bereits erwähnt, sehr effektiv bei bestimmten Problemen wie visuellen oder sprachlichen Problemen."
			],
			cons: ["Sperrig - das Training kann eine Weile dauern, und die Anzahl der Schichten, die heutzutage trainiert werden, ist irgendwie lächerlich",
				"Geheimnisvoll - in gewisser Weise sind wir uns nicht ganz sicher, warum sie so effektiv sind. Fast wie Black Boxes. Leicht zu visualisieren, wenn man mit Bilddaten arbeitet, aber in höheren Dimensionen braucht es etwas Kreativität, um die Neuronen und Gewichte zu verstehen."
			],
			links: [
				["https://en.wikipedia.org/wiki/Artificial_neural_network", "Wikipedia: Künstliches neuronales Netz"],
				["http://cs231n.github.io/optimization-2/", "Intuitionen zur Backpropagation (Stanford CS 231n, Karpathy)"],
				["https://ujjwalkarn.me/2016/08/11/intuitive-explanation-convnets/", "Intuitive Erklärung von ConvNets (Karn)"],
				["http://karpathy.github.io/2015/05/21/rnn-effectiveness/", "Die unzumutbare Wirksamkeit von rekurrenten neuronalen Netzen (Karpathy)"]
			]
		});
	}
}