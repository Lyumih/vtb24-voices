var dataset = [
  {
    value: 80,
    color: '#dc3912'
  },
  {
    value: 10,
    color: '#ff9900'
  },
  {
    value: 10,
    color: '#109618'
  },
];

var maxValue = 25;
var container = $('.container');

var addSector = function(data, startAngle, collapse) {
  var sectorDeg = 3.6 * data.value;
  var skewDeg = 90 + sectorDeg;
  var rotateDeg = startAngle;
  if (collapse) {
    skewDeg++;
  }

  var sector = $('<div>', {
    class: 'sector'
  }).css({
    background: data.color,
    transform: 'rotate(' + rotateDeg + 'deg) skewY(' + skewDeg + 'deg)'
  });
  container.append(sector);

  return startAngle + sectorDeg;
};

dataset.reduce(function(prev, curr) {
  return (function addPart(data, angle) {
    if (data.value <= maxValue) {
      return addSector(data, angle, false);
    }

    return addPart(
      {
        value: data.value - maxValue,
        color: data.color
      },
      addSector(
        {
          value: maxValue,
          color: data.color
        },
        angle,
        true
      )
    );
  })(curr, prev);
}, 0);
