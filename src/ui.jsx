/*jshint esversion: 6 */

import React from "react";

import S from "./s";

import Knn from "./knn";
import Perceptron from "./perceptron";
//import Linear from "./linear";
import SVM from "./svm";
import Ann from "./ann";
import Tree from "./tree";

const modelList = [new Knn(), new Perceptron(), new SVM(), new Ann(), new Tree()];
const modelUiList = modelList.map(function (model) {
	return model.uiInstance();
});

export default class UI extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modelSelected: S.model[0],
			modelUi: modelUiList[0]
		};
	}
	componentDidMount() {
		this.changeModel(this.state.modelSelected);
	}
	changeModel(target) {
		var i = S.model.indexOf(target);
		if (i < 0)
			throw Error("Invalid model!");
		this.setState({
			modelSelected: target,
			modelUi: modelUiList[i]
		});
		this.props.store.linkClassif(modelList[i]);
		this.props.renderInfo(modelList[i].info());
	}
	train() {
		this.props.train();
	}
	render() {
		return (
			<div>

				<div id="model-selector">
					<a href="#"><div className={this.state.modelSelected == S.model[0]} onClick={() => this.changeModel(S.model[0])}><img src="./build/img/knn.png" /> <h4>K Nächste Nachbarn</h4> </div></a>
					<a href="#"><div className={this.state.modelSelected == S.model[1]} onClick={() => this.changeModel(S.model[1])}><img src="./build/img/perceptron.png" /> <h4> Perzeptron </h4> </div></a>
					<a href="#"><div className={this.state.modelSelected == S.model[2]} onClick={() => this.changeModel(S.model[2])}><img src="./build/img/linear.png" /> <h4> Support-Vektor-Maschine</h4> </div></a>
					<a href="#"><div className={this.state.modelSelected == S.model[3]} onClick={() => this.changeModel(S.model[3])}><img src="./build/img/ann.png" /> <h4> Künstliches neuronales Netz </h4> </div></a>
					<a href="#"><div className={this.state.modelSelected == S.model[4]} onClick={() => this.changeModel(S.model[4])}><img src="./build/img/tree.png" /> <h4> Entscheidungsbaum </h4> </div></a>
				</div>

				<div id="parameters">
					<h3>Parameter:</h3>
					<this.state.modelUi /><br />
				</div>
				<button id="trainAndDisplay" onClick={() => { this.train(); }}>Trainieren</button>

			</div>
		);
	}
}