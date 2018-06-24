function isOverlap(objOne, objTwo) {
    var offsetOne = objOne.offset();
    var offsetTwo = objTwo.offset();
    var x1 = offsetOne.left;
    var y1 = offsetOne.top;
    var x2 = x1 + objOne.width();
    var y2 = y1 + objOne.height();

    var x3 = offsetTwo.left;
    var y3 = offsetTwo.top;
    var x4 = x3 + objTwo.width();
    var y4 = y3 + objTwo.height();

    var zx = Math.abs(x1 + x2 - x3 - x4);
    var x = Math.abs(x1 - x2) + Math.abs(x3 - x4);
    var zy = Math.abs(y1 + y2 - y3 - y4);
    var y = Math.abs(y1 - y2) + Math.abs(y3 - y4);
    return (zx <= x && zy <= y);
}
