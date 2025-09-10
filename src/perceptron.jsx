import S from "./s";
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
			tldr: "Eine Linie in den Sand zeichnen",
			expl: <div>Erzeugt einen <b>flachen Raum, der die Daten sauber trennt</b>.</div>,
			params: ["Max. Iterationen (\u2264 100): Maximale Anzahl von Aktualisierungen für das Training"],
			usecase: ["Binäre Klassifizierung", "Regression"],
			expl2: ["Einer der ältesten Algorithmen überhaupt - denn er ist sehr einfach. Mathematisch ausgedrückt, lösen wir einfach eine lineare Kombination der Eingaben (d.h. h = ax + by + cz..., wobei x, y, z Eingaben und a, b, c Konstanten sind), und verwenden dann diese Ausgabe h zur Vorhersage - positives h für Klasse A, negatives h für Klasse B. Intuitiv ausgedrückt, finden wir eine gerade Grenze, die die Daten exakt durchschneidet.",
				"Es ist leicht, es als Linie zu visualisieren, wenn die Daten zweidimensional sind - wie in unserem Fall. In drei Dimensionen ist es eine Ebene. In vier Dimensionen ist es ein ganzer 3D-Raum - nicht mehr so einfach zu visualisieren.",
				"Die Geschichte hinter dem Perzeptron ist ziemlich interessant. Bald nach seiner Erfindung durch Rosenblatt an der Cornell University im Jahr 1957 wurde es als das \"nächste große Ding\" hochgespielt - die New York Times berichtete zum Beispiel, dass das Perzeptron \"laufen, sprechen, sehen, schreiben, sich selbst reproduzieren und sich seiner Existenz bewusst sein können wird.\"", 
				"Es wurde jedoch ziemlich schnell klar, dass es keine dieser Leistungen vollbringen konnte - es konnte nicht einmal einen Kreis erkennen, zum Beispiel (probieren Sie es aus!). Dies führte 1969 zu einem abrupten Ende der Perzeptron-Forschung - was wir heute als einen von mehreren \"KI-Wintern\" bezeichnen. Vielleicht dient dies als warnendes Beispiel für unser eigenes goldenes Zeitalter des maschinellen Lernens...", 
				<img className = \"col-xs-10 col-xs-offset-1\" src = \"./build/img/percep_eqn.png\"/>],
			pros: ["Einfach zu implementieren", "Winziges, winziges Modell (läuft auf eine kleine Liste von Zahlen hinaus!)"],
			cons: ["Setzt linear trennbare Daten voraus - schneidet sonst schlecht ab",
				"Kann zu schlechten Anpassungen führen, wenn Punkte direkt am 'Rand' liegen"],
			links: [
				["https://en.wikipedia.org/wiki/Perceptron", "Wikipedia: Perzeptron"],
				["http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Perceptron.html", "SKlearn Perzeptron-Paket"],
				["http://www.cs.cornell.edu/courses/cs4780/2017sp/lectures/lecturenote03.html", "Perzeptron-Mathe-Notizen (Cornell CS 4780, Weinberger)"]
			]
		});
	}
}