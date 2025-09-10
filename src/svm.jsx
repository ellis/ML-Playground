import React from "react";
import NodeSvm from "svm";
import MLModel from "./mlmodel";

export default class SVM extends MLModel {
	constructor(){
		super();
		this.isRbf = false;
		this.C = 10;
	}
	classif(x, y){
		return this.pr2cl(this.svm.predict([[x/200, y/200]])[0]);
	}
	train(){
		var y = this.yTr.map((c)=>{
			return this.cl2pr(c);
		});
		var x = this.xTr.map((c)=>{
			return [c[0] / 200, c[1] / 200];
		});
		this.svm = new NodeSvm.SVM();
		this.isRbf ? this.svm.train(x, y, {C: this.C, kernel:"rbf", rbfsigma: .5}) : 
			this.svm.train(x, y, {C: this.C, kernel:"linear"});
		return;
	}
	setRbf(bool){
		this.isRbf = bool;
		return true;
	}
	setC(c){
		if(parseFloat(c) >= 0){
			this.C = parseFloat(c);
		}
		return c;
	}
	uiInstance(){
		var self = this;
		return(
			class SvmUI extends React.Component{
				constructor(props){
					super(props);
					this.state = {
						isRbf: self.isRbf,
						C: self.C
					};
				}
				onChangeRbf(e){
					if(self.setRbf(e.target.checked)) {
						this.setState({
							isRbf: e.target.checked
						});
					}
				}
				onChangeC(e){
					this.setState({
						C: self.setC(e.target.value)
					})
				}
				render(){
					return(
						<div>
							C: <input type = "text" value = {this.state.C} onChange = {(e)=>this.onChangeC(e)}/><br/>
							RBF-Kernel?: <input name = "rbf" type = "checkbox" checked = {this.state.isRbf} onChange = {(e)=>this.onChangeRbf(e)}/>
						</div>
					);
				}
			}
		);
	}
	info(){
		return this.generateInfo({
			name: "Support-Vektor-Maschine",
			tldr: "Die breiteste Straße zwischen zwei Dörfern bauen.",
			expl1: <div>Findet die beste Trennlinie, die den größten Abstand zu den Punkten beider Gruppen hat. (Credits: Andrej Karpathys <a href = "https://www.npmjs.com/package/svm">svm</a> Node-Paket)</div>,
			params: ["C: Wie sehr die Maschine versucht, jeden einzelnen Punkt richtig einzuordnen. Ein hoher Wert kann zu komplizierten Grenzen führen.",
				"RBF-Kernel: Ein Trick, um auch kurvige Grenzen zu finden, nicht nur gerade Linien."],
			usecase: ["Dinge in Gruppen einteilen", "Auch für kompliziertere Gruppen geeignet"],
			expl2: ["Stell dir vor, du hast rote und blaue Punkte. Die SVM versucht nicht nur, eine Linie dazwischen zu ziehen, sondern die Linie mit dem größten Abstand zu beiden Gruppen. Wie eine breite Straße zwischen zwei Dörfern.",
				"Normalerweise zieht die SVM eine gerade Linie. Das ist einfach, aber nicht immer die beste Lösung. Manchmal braucht man eine kurvige Linie.",
				"Dafür gibt es den 'Kernel-Trick'. Das ist ein Mathe-Trick, der es der SVM erlaubt, auch kurvige Grenzen zu finden. Damit kann sie auch kompliziertere Gruppen trennen, zum Beispiel einen Kreis in der Mitte von Vierecken.",
				"Der RBF-Kernel ist eine Art von diesem Trick. Er schaut sich an, wie nah die Punkte beieinander liegen, ähnlich wie bei den K-Nächsten-Nachbarn, aber auf eine schlauere Art.",
				"<img className = \"col-xs-10 col-xs-offset-1\" src = \"./build/img/svm_dual.png\"/>"],
			pros: ["Findet oft die beste Trennlinie, die für Ordnung sorgt.",
				"Kann mit dem Kernel-Trick auch komplizierte Formen lernen."],
			cons: ["Wenn man den Kernel-Trick benutzt, kann es bei vielen Daten lange dauern."],
			links: [
				["https://de.wikipedia.org/wiki/Support-Vektor-Maschine", "Wikipedia: Support-Vektor-Maschine"],
				["http://scikit-learn.org/stable/modules/svm.html", "SKlearn Support Vector Machines Übersicht"],
				["http://www.cs.cornell.edu/courses/cs4780/2017sp/lectures/lecturenote09.html", "SVM-Mathe-Notizen (Cornell CS 4780, Weinberger)"],
				["http://www.cs.cornell.edu/courses/cs4780/2017sp/lectures/lecturenote13.html", "Kernels-Mathe-Notizen (Cornell CS 4780, Weinberger)"],
				["http://cs229.stanford.edu/materials/smo.pdf", "Mathematik hinter dem vereinfachten SMO-SVM-Algorithmus, der im Karpathy-Paket verwendet wird"]
			]
		});

	}
}