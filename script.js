var canvas, cantx, flag = false,
previousX = 0,
currentX = 0,
previousY = 0,
currentY = 0,
dot_flag = false;

var x = "black",
  y = 2;

function init() {

  canvas = document.getElementById('can');
  cantx = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  canvas.addEventListener("mousemove", function (e) {
      findxy('move', e)
  }, false);
  canvas.addEventListener("mousedown", function (e) {
      findxy('down', e)
  }, false);
  canvas.addEventListener("mouseup", function (e) {
      findxy('up', e)
  }, false);
  canvas.addEventListener("mouseout", function (e) {
      findxy('out', e)
  }, false);
}

function color(obj) {
  switch (obj.id) {
      case "green":
          x = "green";
          break;
      case "blue":
          x = "blue";
          break;
      case "red":
          x = "red";
          break;
      case "yellow":
          x = "yellow";
          break;
      case "orange":
          x = "orange";
          break;
      case "black":
          x = "black";
          break;
      case "white":
          x = "white";
          break;
  }
  if (x == "white") y = 14;
  else y = 2;

}

function draw() {
  cantx.beginPath();
  cantx.moveTo(previousX, previousY);
  cantx.lineTo(currentX, currentY);
  cantx.strokeStyle = x;
  cantx.lineWidth = y;
  cantx.stroke();
  cantx.closePath();
}

function erase() {
  var m = confirm("Want to clear");
  if (m) {
      cantx.clearRect(0, 0, w, h);
      document.getElementById("canImg").style.display = "none";
  }
}

function save() {
  document.getElementById("canImg").style.border = "2px solid";
  var dataURL = canvas.toDataURL();
  document.getElementById("canImg").src = dataURL;
  document.getElementById("canImg").style.display = "inline";
}

function findxy(res, e) {
  if (res == 'down') {
      previousX = currentX;
      previousY = currentY;
      currentX = e.clientX - canvas.offsetLeft;
      currentY = e.clientY - canvas.offsetTop;

      flag = true;
      dot_flag = true;
      if (dot_flag) {
          cantx.beginPath();
          cantx.fillStyle = x;
          cantx.fillRect(currentX, currentY, 2, 2);
          cantx.closePath();
          dot_flag = false;
      }
  }
  if (res == 'up' || res == "out") {
      flag = false;
  }
  if (res == 'move') {
      if (flag) {
          previousX = currentX;
          previousY = currentY;
          currentX = e.clientX - canvas.offsetLeft;
          currentY = e.clientY - canvas.offsetTop;
          draw();
      }
  }
}