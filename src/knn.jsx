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
			tldr: "Du bist, mit wem du dich umgibst.",
			expl1: <div>Schau dir die <b>k nächsten Nachbarn</b> an. Die Farbe, die die meisten von ihnen haben, ist deine Farbe!</div>,
			params: ["k: Wie viele Nachbarn du fragen möchtest."],
			usecase: ["Dinge in Gruppen einteilen", "Vorhersagen, zu welcher Gruppe etwas gehört"],
			expl2: ["Das ist ein ganz einfacher Trick. Wir nehmen an, dass Dinge, die nah beieinander sind, auch ähnlich sind.",
				"Stell dir vor, du siehst eine Gruppe von Tieren. Wenn die meisten davon Katzen sind, ist das Tier in der Mitte wahrscheinlich auch eine Katze.",
				"Es gibt verschiedene Wege, um zu messen, wie nah etwas ist. Wir benutzen hier den direkten Weg (wie ein Vogel fliegt)."],
			pros: ["Super einfach zu verstehen und zu benutzen."],
			cons: ["Wenn du viele Daten hast, kann es lange dauern, alle Nachbarn zu überprüfen.",
				"Manchmal ist es schwer zu sagen, wer wirklich ein 'naher' Nachbar ist, besonders wenn es viele verschiedene Eigenschaften gibt."],
			links: [
				["https://de.wikipedia.org/wiki/K-Nächste-Nachbarn-Algorithmus", "Wikipedia: k-Nächste-Nachbarn-Algorithmus"],
				["http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html", "SKlearn KNN-Klassifikator-Paket"],
				["http://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsRegressor.html", "SKlearn KNN-Regressor-Paket"],
				["http://www.cs.cornell.edu/courses/cs4780/2017sp/lectures/lecturenote02_kNN.html", "KNN-Mathe-Notizen (Cornell CS 4780, Weinberger)"]
			]
		});
	}
}