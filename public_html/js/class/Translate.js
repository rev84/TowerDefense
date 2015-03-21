var Translate = (function(x,y) {
    this.x = x === void undefined ? 0 : x;
    this.y = y === void undefined ? 0 : y;
});

Translate.prototype.Clone = function(){
    return new Translate(this.x, this.y);
};

// 2点間の距離
Translate.GetLength = function (t1, t2) {
    return Math.sqrt(Math.pow(t2.x - t1.x, 2) + Math.pow(t2.y - t1.y, 2));
};

// 点tからradianにlength移動した時の座標
Translate.GetPos = function(t, radian, length) {
    var x = Math.cos(radian) * length;
    var y = Math.sin(radian) * length;

    return new Translate(t.x + x, t.y + y);
};

// t1を、t2を中心にdegree度回転させた座標
Translate.Spin = function (t1, t2, radian) {
    var x = t1.x - t2.x;
    var y = t1.y - t2.y;
    
    return new Translate(
        x*Math.cos(radian) - y*Math.sin(radian) + t2.x,
        x*Math.sin(radian) + y*Math.cos(radian) + t2.y
    );
};
































