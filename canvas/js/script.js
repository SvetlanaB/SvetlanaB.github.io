var canvas = document.querySelector('#canv');
var ctx = canvas.getContext('2d');

ctx.save();


var xCoord = document.getElementById('xCoord');
var yCoord = document.getElementById('yCoord');


var getCoordinates = function (evt) {
	let arr = {};
	let x = evt.offsetX; //координаты
	let y = evt.offsetY;

	xCoord.innerText = x; //добавила в id координаты
	yCoord.innerText = y;
};

var system = { //стартовые значения
	currentTool : '',
	currentColor : document.querySelector('#color'),
	brushSize : 5
};

var renderSystem = function (obj, elem, action) { 
	//obj -> change
	obj[elem] = action; 
	console.log(system);
};



var switchTool = function (el) {  //выбор кнопки класса toolButton
	if (el.id == 'brush') {
		console.log ('brush');
		return 'brush'
	} 
	if (el.id == 'circleBrush') { 
		console.log ('circleBrush');
		return 'circleBrush'
	} 
	if (el.id == 'clear') {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
};

var switchSize = function (evt) { //выбор размера кисти 
	renderSystem (system, 'brushSize', evt.target.value);
};

var switchColor = function (evt) { //выбор цвета input
	renderSystem (system, 'currentColor', evt.target.value);
};

var clicker = function (evt) {  //выбор КНОПОК
	//если выбрана кнопка
	if (evt.target.classList.contains('toolButton') == true) {
		//console.log (`Выбран инструмент ${evt.target.id}`);
		//switchTool(evt.target);
		console.log(system);
		renderSystem (system, 'currentTool', switchTool (evt.target)); 
	} 

	//если выбран размер
	// else if (evt.target.id == 'sizeSelect') {
	// 	renderSystem (system, 'brushSize', switchSize(evt.target));
	// }

	//если выбран цвет
	// else if (evt.target.id == 'color') {
	// 	// console.log (`Выбран инструмент color`);
	
	// }
};



var startDraw = function (evt) { //будет по нажатию мыши 		
	//зафиксировать нач коорд
	//начать процесс рисования
	if (system.currentTool == 'brush') {
		draw (evt);
	} else if (system.currentTool == 'circleBrush') {
		drawCircle (evt);
	} 
};

var endDraw = function (evt) { //по отпусканию мыши
	//зафиксировать конеч коорд
	//остановить процесс рисования
	console.log('end');
	canvas.onmousemove = null;
};


var draw = function (evt) { //квадратная кисть (пусть будет стандартная)
	canvas.onmousemove = function (evt) {
		ctx.fillRect (xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);
		//fillRect(x, y, width, height)
	}
	ctx.fillStyle = system.currentColor;
};

var drawCircle = function (evt) { //круглая кисть
	canvas.onmousemove = function (evt) {
		ctx.beginPath();
		// ctx.arc (xCoord.innerText, yCoord.innerText, 0, Math.PI+(Math.PI*xCoord)/2, system.brushSize);
		ctx.arc (xCoord.innerText, yCoord.innerText, system.brushSize, 0, Math.PI * 2, false);
		//ctx.arcTo(x1, y1, x2, y2, radius);
		ctx.fill();
	}
	ctx.fillStyle = system.currentColor;
};



document.getElementById('color').addEventListener ('input', switchColor);
document.getElementById('sizeSelect').addEventListener ('input', switchSize);

canvas.addEventListener ('mousemove', getCoordinates); //движение мышки, сюда передаются координаты
canvas.addEventListener ('mousedown', startDraw);
canvas.addEventListener ('mouseup', endDraw);
window.addEventListener ('click', clicker);


var date = new Date();
var timestamp = date.getTime();

var day = date.getDay();
var month = date.getMonth(); //Be careful! January is 0 not 1
var year = date.getFullYear();
var hour = date.getHours();
var minutes = date.getMinutes();
document.getElementById("time").innerText = `Today is: ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}. Current time: ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;



ctx.restore();


function getImage(canvas){
    var imageData = canvas.toDataURL();
    var image = new Image();
    image.src = imageData;
    return image;
}
 
function saveImage(image) {
    var link = document.createElement('a');
 
    link.setAttribute('href', image.src);
    link.setAttribute('download', 'canvasImage');
    link.click();
}
 
 
function saveCanvasAsImageFile(){
    var image = getImage(document.getElementById('canv'));
    saveImage(image);
}


document.getElementById('save').addEventListener ('click', saveCanvasAsImageFile);



