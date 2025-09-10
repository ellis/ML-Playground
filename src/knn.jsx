import React from "react";
import MLModel from "./mlmodel";

export default class Knn extends MLModel{
	constructor(){
		super();
		this.k = 3;
	}
	classif(x, y){
		var knn_xTr_dist = [];
		var knn_yTr = [];
		for (var i = 0; i < this.xTr.length; i ++){
			var ii = 0;
			var notInserted = true;
			while(ii < this.k && notInserted){
				var dist = this.dist(x, y, this.xTr[i][0], this.xTr[i][1]);
				if(knn_xTr_dist[ii] == undefined){
					knn_xTr_dist[ii] = dist;
					knn_yTr[ii] = this.yTr[i];
					notInserted = false;
				}
				else if (knn_xTr_dist[ii] > dist){
					knn_xTr_dist.splice(ii, 0, dist);
					knn_yTr.splice(ii, 0, this.yTr[i]);
					notInserted = false;
					knn_xTr_dist = knn_xTr_dist.slice(0, this.k);
					knn_yTr = knn_yTr.slice(0, this.k);
				}
				ii ++;
			}
		}
		var bucket = [];
		for (var i = 0; i < this.k; i ++){
			bucket[knn_yTr[i]] = bucket[knn_yTr[i]] ? bucket[knn_yTr[i]] + 1 : 1;
		}
		return this.maxIndex(bucket);
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
	setK(k){
		var _k = parseInt(k);
		if(isNaN(_k) && k != "") return false;
		if(k != "")
			this.k = _k;
		return true;
	}
	uiInstance(){
		var self = this;
		var setK = this.setK.bind(this);
		return(
			class KnnUi extends React.Component{
				constructor(props){
					super(props);
					this.state = {
						value: self.k
					};
					this.onChange = this.onChange.bind(this);
				}
				onChange(e){
					if(setK(e.target.value)) {
						this.setState({
							value: e.target.value
						});
					}
				}
				render(){
					return(
						<div>
							K: <input type = "text" value = {this.state.value} onChange = {this.onChange}/>
						</div>
					);
				}
			}
		);
	}
	info(){
		return this.generateInfo({
			name: "K Nächste Nachbarn",
			tldr: "Gleich und gleich gesellt sich gern",
			expl1: <div>Wählt die <b>k nächstgelegenen Punkte aus den Trainingsdaten</b> aus und entscheidet dann die Vorhersage per Mehrheitsentscheid.</div>,
			params: ["k (≥ 1): Anzahl der zu wählenden nächsten Nachbarn"],
			usecase: ["Binäre Klassifizierung", "Mehrklassenklassifizierung", "Regression"],
			expl2: ["Ein einfacher und unkomplizierter Algorithmus. Die zugrunde liegende Annahme ist, dass Datenpunkte, die nahe beieinander liegen, dieselbe Bezeichnung haben.",
				"Analogie: Wenn ich mit Informatik-Studenten abhänge, bin ich wahrscheinlich auch ein Informatik-Student (oder der eine Philosophie-Student, der alles im Nebenfach belegt).",
				"Beachten Sie, dass die Entfernung auf unterschiedliche Weise definiert werden kann, z. B. Manhattan (Summe aller Merkmale oder Eingaben), Euklidisch (geometrische Entfernung), p-Norm-Entfernung ... typischerweise wird Euklidisch verwendet (wie in dieser Demo), aber Manhattan kann schneller und daher vorzuziehen sein."],
			pros: ["Einfach zu implementieren"],
			cons: ["Nicht-parametrisch - die Größe des Modells wächst mit den Trainingsdaten. Es kann lange dauern, die Entfernungen für Milliarden von Datenpunkten zu berechnen.",
				"Fluch der Dimensionalität - wenn die Anzahl der Merkmale zunimmt (d. h. mehr Dimensionen), konvergiert der durchschnittliche Abstand zwischen zufällig verteilten Punkten gegen einen festen Wert. Dies bedeutet, dass die meisten Punkte am Ende den gleichen Abstand voneinander haben - so wird die Entfernung als Metrik weniger aussagekräftig"],
			links: [
				["https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm", "Wikipedia: k-Nächste-Nachbarn-Algorithmus"],
				["http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html", "SKlearn KNN-Klassifikator-Paket"],
				["http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsRegressor.html", "SKlearn KNN-Regressor-Paket"],
				["http://www.cs.cornell.edu/courses/cs4780/2017sp/lectures/lecturenote02_kNN.html", "KNN-Mathe-Notizen (Cornell CS 4780, Weinberger)"]
			]
		});
	}
}