import { Component, OnInit } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  title = 'Simple JSON editor';
  products = [];
  newRecord = {};
  temp = JSON.stringify(products); // default textarea value
  rawJSON = this.temp;
  headers = [];
  isFullTextEditing = true;
  
  constructor() {}

  ngOnInit() {}
  
  createStruct() {
	try {
		var parseResult = JSON.parse(this.rawJSON);		  
	} catch (err) {
		alert('Incorrect JSON.');
		return;
	}
	
	this.products = parseResult;
	this.headers = parseResult.length ? Object.keys(parseResult[0]) : [];
	this.resetServiceRecord();
	
	this.isFullTextEditing = false;
  }
  
  showInEditor() {
	  this.rawJSON = JSON.stringify(this.products);
	  
	  this.isFullTextEditing = true;
  }
  
  appendRecord() {
	  let recordValues = Object.values(this.newRecord);
	  let isEmptyRecord = recordValues.every(propValue => propValue.trim().length == 0);

	  if (isEmptyRecord) {
		  alert("Record wasn't empty!");
		  return;
	  }
	  
	  this.products.push(Object.assign({}, this.newRecord));
	  this.resetServiceRecord();
  }
  
  deleteRecord(itemIndx) {
	  this.products.splice(itemIndx, 1);
  }
  
  resetServiceRecord() {
	this.headers.forEach((value) => {
	  this.newRecord[value] = '';
	});
  }

}
