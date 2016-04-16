var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');
//to efficiently store words alphabetically by the number of syllable they are.
var store = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[],14:[]};

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n"),
       lineSplit
   lines.forEach(function(line){ 

    lineSplit = line.split("  ");
    store[sylCount(lineSplit[1])].push(lineSplit[0]);    
  });   
}

formatData(cmudictFile);
//console.log(store);
//console.log("testing");

//This function is responsible for counting the number of syllables of a particular word. 
//It does this using a regular expression looking for digits withing a phoneme.
function sylCount(phoneme){
	var rE = /\d/g; 
	if(rE.test(phoneme)) return phoneme.match(rE).length;
	else return 1; 
}

//This function determines syllable structure on a line of a haiku. 
function sylPerLine(num){
	var arr = [];
	while(num > 0){
		var temp = Math.round(Math.random() * (num - 1)) + 1;
		arr.push(temp);
		num -= temp; 
	}
	return arr;
}

function pickWord(arr){
	var retArr = []; 
	for (var i = 0; i < arr.length; i++) {
		retArr.push(store[arr[i] ][Math.round(Math.random() * (store[arr[i]].length - 1))]);
	}
	return retArr;
}

function createHaiku(structure){
	for (var i = 0; i < structure.length; i++) {
		var lineStruct = sylPerLine(structure[i]);
		console.log(pickWord(lineStruct).join(" "));
	};
	
    //console.log("this should log a haiku with the structure " + structure);


}

module.exports = {
  	createHaiku: createHaiku,
};

//console.log(module);
//console.log(fs);
//console.log( fs.readFileSync('./cmudict.txt') );