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