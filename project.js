/*
@title: Map maker
@author: Lovidu
@snapshot: 1.png
*/

const size = 125; // width and height of display
const gridsize = 250; // size of grid that lines are on
const px_per_mm = gridsize / size; // how many grid pixels per mm
const shaded = true; // scan lines

let xrange = [-2, 0.5];
let yrange = [-1.125, 1.125];
setDocDimensions(size, size);

const shapes = []; // high level turtle

function mandelbrot_px(x, y) { // calculates mandelbrot set inclusion for a complex number (x+iy)
  let z1 = 0;
  let z2 = 0;
  let c = 0;
  let itr = 0;
  const max_itr = 1000;
  let newz1 = 0;
  while (z2 * z2 + z1 * z1 <= 4 && itr <= max_itr) {
    newz1 = z1 * z1 - z2 * z2 + x;
    z2 = 2 * z1 * z2 + y;
    z1 = newz1;
    itr++;
  }
  return itr;
}

function shade(pixsize, density) { // shades a pixel to a given density (in lines/mm)
  const t = new bt.Turtle();
  for (let i = 0; i < pixsize; i += (1 / density)) {
    t.goTo([0, i]);
    t.down();
    t.forward(pixsize);
    t.up();
  }
  return t;
}

function map_linear(f1, f2, t1, t2, val) { // simple linear mapping to make it easier to get complex values
  const f_dist = f1 - f2;
  const t_dist = t1 - t2;
  const mult = t_dist / f_dist;
  return val * mult + t1;
}

let x_cent = 0;
let y_cent = 0; // x and y center to check
let itr = 0;
while (itr < 10000) { // checks a bunch of random points in the range
  x_cent = map_linear(0, 1, -2, 0.5, Math.random());
  y_cent = map_linear(0, 1, -1.125, 1.125, Math.random());
  itr++;
  const val = mandelbrot_px(x_cent, y_cent); // the mandelbrot value of the point
  if (val < 1000 && val > 70) { // if point is classified as "interesting"
    const zoom = Math.pow(0.1, Math.random() * 5); // set a zoom and zoom in on it.
    xrange = [x_cent - zoom, x_cent + zoom];
    yrange = [y_cent - zoom, y_cent + zoom];
    break;
  }
}
