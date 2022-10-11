"use strict";

let divs = [
  document.querySelector("#a"),
  document.querySelector("#b"),
  document.querySelector("#c"),
  document.querySelector("#d"),
  document.querySelector("#e"),
];
var svg = document.getElementById('arrows');
let connectors = [];

class Connector {
  constructor(divStart, divEnd, connector) {
    this.divStart = divStart;
    this.divEnd = divEnd;
    this.connector = connector;
  }
}

function getClosestPointOnCircle(point, circle, radius) {
  const vX = point.x - circle.x;
  const vY = point.y - circle.y;
  const magV = Math.sqrt(vX * vX + vY * vY);
  const aX = circle.x + (vX / magV) * radius;
  const aY = circle.y + (vY / magV) * radius;
  return { x: aX, y: aY };
}

function getBezierQPoint (startPoint, endPoint, middle, radius) {
  const offset = radius / 4;
  const averageX = (startPoint.x + endPoint.x) / 2;
  const outWardRight = averageX > middle.x;
  const averageY = (startPoint.y + endPoint.y) / 2
  const outWardDown = averageY > middle.y;
  const sameHeight = startPoint.y === endPoint.y;
  const posX = averageX + (outWardRight ? offset : (sameHeight ? 0 : - offset));
  const posY = averageY + (outWardDown ?  offset : - offset);
  return posX + "," + posY + " ";
}

function offsetFromCenter(pos, middle, radius) {
  const offsetRight = pos.x > middle.x;
  const offsetDown = pos.y > middle.y;
  return {
    x: pos.x + (offsetRight ? radius : -radius) * 0.2,
    y: pos.y + (offsetDown ? radius : -radius) * 0.2,
  }
}

function getDString(divStart, divEnd) {
  let posA = {
    x: divStart.offsetLeft + divStart.offsetWidth / 2,
    y: divStart.offsetTop  + divStart.offsetHeight / 2,
  };
  let posB = {
    x: divEnd.offsetLeft + divStart.offsetWidth / 2,
    y: divEnd.offsetTop  + divStart.offsetHeight / 2,
  };
  const middle = {
    x: divStart.parentElement.offsetLeft + divStart.parentElement.offsetWidth / 2,
    y: divStart.parentElement.offsetTop + divStart.parentElement.offsetHeight / 2,
  }
  const radius = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--radius'));
  posA = offsetFromCenter(posA, middle, radius);
  posB = offsetFromCenter(posB, middle, radius);
  const closestStartPoint = getClosestPointOnCircle(posB, posA, radius);
  const closestEndPoint = getClosestPointOnCircle(posA, posB, radius * 1.5);
  const dStr =
    "M" + closestStartPoint.x + "," + closestStartPoint.y + " " +
    "Q" + getBezierQPoint(closestStartPoint, closestEndPoint, middle, radius) +
    closestEndPoint.x + "," + closestEndPoint.y;
  return dStr;
}

function drawConnector(divStart, divEnd) {
  let connector = new Connector(
    divStart,
    divEnd,
    document.querySelector("#connector").cloneNode(true)
  );
  let count = connectors.push(connector);
  connector.connector.id = "connector" + count;

  let dStr = getDString(divStart, divEnd);
  connector.connector.setAttribute("d", dStr);
  // let strokeColor = document.defaultView.getComputedStyle(connector.divStart,null).backgroundColor;
  let strokeColor = getRandomColor();
  connector.connector.setAttribute('stroke', strokeColor);
  svg.appendChild(connector.connector);
}

function updateConnectors() {
  for (const connector of connectors) {
    let dStr = getDString(connector.divStart, connector.divEnd);
    connector.connector.setAttribute("d", dStr);
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

window.addEventListener("resize", updateConnectors);

let couples = [
  [divs[0], divs[1]],
  [divs[1], divs[2]],
  [divs[2], divs[3]],
  [divs[3], divs[4]],
  [divs[4], divs[0]],
  [divs[0], divs[3]],
  [divs[1], divs[4]],
  [divs[2], divs[0]],
  [divs[3], divs[1]],
  [divs[4], divs[2]],
]
// let couples = divs.flatMap((v, i) => divs.slice(i + 1).map((w) => [v, w]));
couples.forEach(([a, b]) => drawConnector(a,b));

