const drawSegmentVoo = function (coordinates) {
  const x1 = Math.abs(coordinates["1"].x);
  const y1 = Math.abs(coordinates["1"].y);
  const x2 = Math.abs(coordinates["2"].x);
  const y2 = Math.abs(coordinates["2"].y);
  let points = [];
  let dx = Math.abs(x2 - x1); // Разница по X между начальной и конечной точками
  let dy = Math.abs(y2 - y1); // Разница по Y между начальной и конечной точками
  let sx = x1 < x2 ? 1 : -1; // Направление движения по X (вправо или влево)
  let sy = y1 < y2 ? 1 : -1; // Направление движения по Y (вверх или вниз)
  let x = x1;
  let y = y1;
  let swap = false;
  if (dx < dy) {
    let buff;
    buff = dx;
    dx = dy;
    dy = buff;
    buff = x;
    x = y;
    y = buff;
    buff = sx;
    sx = sy;
    sy = buff;
    swap = true;
  }
  let error = 2 * dy - dx; // Начальная ошибка
  for (let i = 0; i <= dx; i++) {
    if (error >= 0) {
      y += sy;
      error = error - 2 * dx;
    }
    x += sx;

    if (swap)
      points.push({
        x: y,
        y: x,
        fill: `rgba(0,0,0,${Math.abs(error) / 2 / dx + 0.5})`,
      });
    else
      points.push({
        x: x,
        y: y,
        fill: `rgba(0,0,0,${Math.abs(error) / 2 / dx + 0.5})`,
      });
    if (swap)
      points.push({
        x: y + sy,
        y: x,
        fill: `rgba(0,0,0,${1 - (Math.abs(error) / 2 / dx + 0.5)})`,
      });
    else
      points.push({
        x: x,
        y: y + sy,
        fill: `rgba(0,0,0,${1 - (Math.abs(error) / 2 / dx + 0.5)})`,
      });
    error = error + 2 * dy;
  }
  return points;
};

export default drawSegmentVoo;
