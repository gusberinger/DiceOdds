function parse(rawInput) {
	let input = rawInput + '';
	let a = input.split("+");
	let b = a[0].split("d");
	let results = [];
	if (a[1])
		results[2] = parseInt(a[1]); // bonus
	else
		results[2] = 0; // if no bonus set it to 0.
	results[1] = parseInt(b[1]); // sides
	results[0] = parseInt(b[0]); // times
	return results;
 }


function dice(times, sides) {
	// roll a ndm dice
	sum = 0;
	for (let i=0; i < times; i++) {
		sum += Math.floor(Math.random() * sides) + 1;
	}
	return sum;
}

// simulate the dice rolls
function simulation(times, sides, bonus=0, simCount=1000000, min=false, max=false) {
	// create a bunch of dice rolls
	this.trials = [];
	for (let j=0; j < simCount; j++) {
		let roll = dice(times, sides);
		if (min) {
			roll = Math.min(roll, dice(times, sides));
		} else if (max) {
			roll = Math.max(roll, dice(times, sides));
		}
		this.trials.push(roll+bonus);
	}

	// create an object to keep track of how many times dice rolls appeare
	this.chances = {};
	for (let i=0; i < this.trials.length; i++) {
		if(!this.chances[this.trials[i]])
        	this.chances[this.trials[i]] = 0;
    	++this.chances[this.trials[i]];
	}

	// translate the object into x and y data for the bar plot
	this.x = Object.keys(this.chances);
	this.y = []
	for (let i=0; i < this.x.length; i++) {
		let n = this.x[i];
		this.y[i] = this.chances[n] / simCount;
	}

	// plot the data
	var data = [{
	    x: this.x,
	    y: this.y,
	    type: 'bar'
	}];
	Plotly.newPlot('myDiv', data);
}


var form = document.getElementById("form");
var button = document.getElementById("button");
button.onclick = function() {
	diceValues = parse(document.getElementById("form").value);
	let min = false;
	let max = false;
	if (document.getElementById("max").checked) {
		max=true;
	} else if (document.getElementById("min").checked) {
		min=true;
	}
	// console.log(diceValues);
	simulation(diceValues[0], diceValues[1], diceValues[2], 1000000, min, max)
}


form.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    console.log("test");
    button.click();
  }
});










