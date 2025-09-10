/*jshint esversion: 6 */

import React from "react";
import S from "./s";
import FileSaver from "file-saver";
import FileReaderInput from 'react-file-reader-input';

export default class Toolbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brushSelected: S.class1
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(e) {
		this.setState({
			brushSelected: e.target.value
		});
		this.props.setClass(e.target.value);
	}
	
	clearAll() {
		this.props.clearAll();
	}
	
	export() {
		var blob = new Blob([this.props.store.exportJSONString()], {type: "text/plain;charset=utf-8"});
		FileSaver.saveAs(blob, "data.json");
	}
	
	handleUpload(result){
		this.props.store.importJSONString(result[0][0].target.result);
		this.props.repaint();
	}
	
	render() {
		return (
			<div id="controls-toolbar">
				<div id="brushes">
					{[S.class1, S.class2, S.eraser].map((i) => {
						return (
							<div key={i}>
								<input id={"br-" + i} value={i} type="radio" checked={this.state.brushSelected == i} onChange={this.handleChange} />
								<label htmlFor={"br-" + i}></label>
							</div>
						);
					})}
				</div>
				<button onClick={() => this.clearAll()} id="clearAll" title="Alles löschen">✕</button>
				<div id="io">
					<FileReaderInput as="text" id="data-file-input"
						onChange={(_, b) => this.handleUpload(b)}>
          				<button className="upload-btn" title="Daten hochladen">📤</button>
        			</FileReaderInput>
					<button onClick={() => this.export()} className="download-btn" title="Daten speichern">📥</button>
				</div>
			</div>
		);
	}
}