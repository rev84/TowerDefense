var Rotate = (function(degree) {
    this.degree = degree === void undefined ? 0 : degree;
});

Rotate.prototype.Clone = function(){
    return new Rotate(this.degree);
};

Rotate.prototype.GetDegree = function(){
    return Rotate.NormalizeDegree(this.degree);
};

Rotate.prototype.GetRadian = function(){
    return Rotate.NormalizeRadian(Rotate.ToRadian(this.degree));
};

Rotate.prototype.SetDegree = function(degree){
    this.degree = Rotate.NormalizeDegree(degree);
};

Rotate.prototype.SetRadian = function(radian){
    this.degree = Rotate.ToDegree(radian);
};

Rotate.NormalizeDegree = function(degree){
    if (degree + 180 < 0) {
        degree += (Math.floor(((degree+180)/360)*(-1))+1)*360;
    }
    else if (degree + 180 >= 360) {
        degree = ((degree+180) % 360) - 180;
    }
    
    return degree;
};

Rotate.NormalizeRadian = function(radian){
    if (radian + Math.PI < 0) {
        radian += (Math.floor(((radian+Math.PI)/(Math.PI*2))*(-1))+1)*(Math.PI*2);
    }
    else if (radian + Math.PI >= Math.PI*2) {
        radian = ((radian+Math.PI) % (Math.PI*2)) - Math.PI;
    }
    
    return radian;
};

Rotate.ToRadian = function(degree) {
    return Rotate.NormalizeDegree(degree) * (Math.PI / 180);
};
Rotate.ToDegree = function(radian) {
    return Rotate.NormalizeRadian(radian) / (Math.PI / 180);
};



