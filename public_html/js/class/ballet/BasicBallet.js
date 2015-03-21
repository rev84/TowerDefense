var BasicBallet = function(translate, rotate, scale, speed) {
    this.obj = $('<span>');
    this.translate = translate;
    this.rotate    = rotate;
    this.scale     = scale;
    this.speed     = speed;
    this.colCount  = 0;
    
    this.Initialize();
};

BasicBallet.collisionLimit = 3;

BasicBallet.prototype.Initialize = function() {
    this.colCount = BasicBallet.collisionLimit;
    this.obj.addClass('ballet ballet_basic').css({display:"none"});
    $('#field').append(this.obj);
};

BasicBallet.prototype.Run = function() {

    
    var xMin = 0;
    var xMax = Config.width;
    var yMin = 0;
    var yMax = Config.height;
    
    // 新しい位置
    var newT = Translate.GetPos(this.translate, this.rotate.GetRadian(), this.speed);
    // 回転を考慮した弾の端の座標
    var origin = new Translate(newT.x+(0.5*this.scale.x), newT.y+(0.5*this.scale.y));
    var point = [
        new Translate(newT.x, newT.y),
        new Translate(newT.x, newT.y+this.scale.y),
        new Translate(newT.x+this.scale.x, newT.y),
        new Translate(newT.x+this.scale.x, newT.y+this.scale.y)
    ];
    var left = null; var right = null; var top = null; var bottom = null;
    for (var i = 0; i < point.length; i++) {
        var p = Translate.Spin(point[i], origin, this.rotate.GetRadian());
        if (left   === null || p.x < left  ) left   = p.x;
        if (right  === null || p.x > right ) right  = p.x;
        if (top    === null || p.y < top   ) top    = p.y;
        if (bottom === null || p.y > bottom) bottom = p.y;
    }
    
    // 反射
    if (left < xMin) {
        newT.x = Math.abs(left - newT.x);
        this.rotate.SetDegree(180 - this.rotate.GetDegree());
        this.colCount--;
    }
    else if (right > xMax) {
        newT.x = xMax - (right - newT.x);
        this.rotate.SetDegree(180 - this.rotate.GetDegree());
        this.colCount--;
    }
    if (top < yMin) {
        newT.y = Math.abs(top - newT.y);
        this.rotate.SetDegree(this.rotate.GetDegree() * (-1));
        this.colCount--;
    }
    else if (bottom > yMax) {
        newT.y = yMax - (bottom - newT.y);
        this.rotate.SetDegree(this.rotate.GetDegree() * (-1));
        this.colCount--;
    }
    this.translate = newT;
    
    return this.colCount >= 0;
};

BasicBallet.prototype.Draw = function() {
    this.obj.css({
        left:this.translate.x,
        top:this.translate.y,
        transform: "rotate("+Rotate.NormalizeDegree(90+this.rotate.GetDegree())+"deg)",
        display:"inline",
        width:this.scale.x,
        height:this.scale.y
    });
};

BasicBallet.prototype.Remove = function() {
    this.obj.remove();
};
