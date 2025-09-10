import S from "./s";
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
			tldr: "Bitte Abstand halten",
			expl1: <div>Wählt eine Hyperebene, die die Daten trennt, aber den Rand maximiert. (Credits: Andrej Karpathys <a href = "https://www.npmjs.com/package/svm">svm</a> Node-Paket)</div>,
			params: ["C (≥ 0): Regularisierungskonstante. Wie sehr die SVM versuchen wird, alle Ihre Daten anzupassen, auf die Gefahr hin, mit einem übermäßig komplexen Modell zu überanpassen",
				"RBF-Kernel: Standard ist nicht ausgewählt - verwendet lineare SVM. Umschalten, um RBF-Kernel-SVM zu verwenden"],
			usecase: ["Binäre Klassifizierung", "Mehrklassenklassifizierung", "Regression"],
			expl2: ["Im Grunde ein Perzeptron auf Steroiden. Mit \"Rand\" meinen wir \"den Abstand zwischen der Ebene und dem Punkt, der der Ebene am nächsten liegt\". Indem wir den Rand maximieren, stellen wir also sicher, dass alle Punkte so weit wie möglich von der Entscheidungsgrenze entfernt sind.",
				"Ursprünglich beginnen wir mit einer linearen SVM - das bedeutet, dass unsere trennende Hyperebene, ähnlich wie das Perzeptron, mit geraden Linien als Grenzen \"operiert\". Offensichtlich ist dies etwas einschränkchränkend - wir können immer noch keine Kreise erkennen! Es ist jedoch nicht alles verloren - wir können einige hilfreiche Änderungen einführen.",
				"Der Kernel-Trick (lässt es fast wie Magie klingen...) ist, wenn wir von einer primalen SVM-Formulierung zu einer dualen Formulierung übergehen. Abgesehen von komplizierter Mathematik bedeutet dies effektiv, dass Sie einen Testvektor mit ausgewählten Stützvektoren 'multiplizieren' und dann die Produkte kombinieren, um eine gute Vorhersage zu treffen. (Siehe Ressourcen für eine komplexe Definition)",
				"Bei einer linearen SVM verwenden wir im Wesentlichen ein Skalarprodukt als 'Multiplikation' für das Dual. Wir könnten dies durch andere Formen von 'Multiplikations'-Methoden ersetzen, die als Kernel bezeichnet werden. Eine sehr beliebte Wahl ist der RBF-Kernel - die 'Multiplikationen' hängen letztendlich vom Nettoabstand zwischen den Testpunkten ab, so dass es im Grunde genommen so etwas wie KNN ist, aber viel stärker regularisiert.",
				<img className = \"col-xs-10 col-xs-offset-1\" src = \"./build/img/svm_dual.png\"/>],
			pros: ["Option zur Regularisierung - d.h. Reduzierung der Überanpassung durch Bevorzugung 'einfacherer' Modelle gegenüber komplexen. Versuchen Sie, C zu optimieren, um die Auswirkungen zu sehen!",
				"Parametrisch (Lineare SVM): Das Modell bleibt unabhängig von der Größe des Datensatzes gleich groß"],
			cons: ["Nicht-parametrisch (RBF-Kernel-SVM): Das Modell selbst kann mit wachsendem Datensatz komplizierter werden"],
			links: [
				["https://en.wikipedia.org/wiki/Support_vector_machine", "Wikipedia: Support-Vektor-Maschine"],
				["http://scikit-learn.org/stable/modules/svm.html", "SKlearn Support Vector Machines Übersicht"],
				["http://www.cs.cornell.edu/courses/cs4780/2017sp/lectures/lecturenote09.html", "SVM-Mathe-Notizen (Cornell CS 4780, Weinberger)"],
				["http://www.cs.cornell.edu/courses/cs4780/2017sp/lectures/lecturenote13.html", "Kernels-Mathe-Notizen (Cornell CS 4780, Weinberger)"],
				["http://cs229.stanford.edu/materials/smo.pdf", "Mathematik hinter dem vereinfachten SMO-SVM-Algorithmus, der im Karpathy-Paket verwendet wird"]
			]
		});

	}
}