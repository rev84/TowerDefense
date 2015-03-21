var Scale = (function(x, y) {
    this.x = x === void undefined ? 0 : x;
    this.y = y === void undefined ? 0 : y;
});
Scale.prototype.Clone = function(){
    return new Scale(this.x, this.y);
};