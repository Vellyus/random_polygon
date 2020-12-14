/*

const grid_size = 8
function RandPoly()
{
  // let points = Math.round(Math.random() *5 + 3)
  let points = 4
  let poly = new Array(points)
  // console.log(points) // print
  let x = 0
  let y = 0

  for (let i = 0; i < points - 1; i++)
  {
    x = Math.round(Math.random() * 16 - 8)
    y = Math.round(Math.random() * 16 - 8)
    vector2 = [x, y]
    poly.push(vector2)
    // Print
    console.log(poly.length)
    for (let i = 0; i < poly.length; i++)
    {
      console.log(poly[i])
    }
  }
}

RandPoly()

*/

const canvas = document.createElement("canvas")
document.querySelector("body").appendChild(canvas)
const ctx = canvas.getContext("2d")

canvas.width = canvas.height = 600
canvas.style.width = "600px"
canvas.style.height = "600px"
canvas.style.border = "1px solid black"
canvas.style.display = "block"
canvas.style.margin = "auto"

function getRandomPoints(number)
{
  let points = []

  for (let i = 0; i < number; i++)
  {
    let point = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.width)
    }
    points.push(point)
  }
  return points
}

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a, b, c, d, p, q, r, s)
{
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0)
  {
    return false;
  } else
  {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}


function createRandomPoly(edges)
{
  let points = getRandomPoints(edges)
  let lines = []
  let linesIntersect = false

  for (let i = 0; i < points.length; i++)
  {
    if (i != points.length - 1)
    {
      let line = {
        a: points[i].x,
        b: points[i].y,
        c: points[i + 1].x,
        d: points[i + 1].y
      }
      lines.push(line)
    }
    else
    {
      let line = {
        a: points[i].x,
        b: points[i].y,
        c: points[0].x,
        d: points[0].y
      }
      lines.push(line)
    }

  }

  for (let i = 0; i < lines.length; i++)
  {
    for (let j = 0; j < lines.length; j++)
    {
      if (i != j)
      {
        if (intersects(lines[i].a, lines[i].b, lines[i].c, lines[i].d, lines[j].a, lines[j].b, lines[j].c, lines[j].d))
        {
          linesIntersect = true
        }
      }
    }
  }

  if (linesIntersect === true) points = createRandomPoly(edges)

  console.log(linesIntersect)
  return points
}

function render(points)
{
  ctx.fillStyle = 'black';
  ctx.beginPath();

  for (let i = 0; i < points.length; i++)
  {
    if (i === 0) ctx.moveTo(points[i].x, points[i].y);
    else ctx.lineTo(points[i].x, points[i].y)

  }
  ctx.closePath();
  ctx.fill();
}

render(createRandomPoly(4))


// first point should be the one with the lowest x value
// second should be with the second lowest x value
// the next line should be with the lowest angle to that line







