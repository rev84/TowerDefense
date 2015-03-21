var BasicCannon = function(translate, scale){
    this.obj = $('<span>');
    this.frameCount = 0;
    this.translate  = translate;
    this.scale = scale;
    
    this.Initialize();
};

BasicCannon.fireFrame = 60;

BasicCannon.prototype.Run = function(){
    this.frameCount--;
    if (this.frameCount <= 0) {
        this.Fire();
        this.frameCount = BasicCannon.fireFrame;
    }
    
    return true;
};

BasicCannon.prototype.Draw = function(){
    this.obj.css({
        left:this.translate.x,
        top:this.translate.y,
        display:"inline"
    });
};

BasicCannon.prototype.Fire = function(){
    var speed = 3;
    
    for (var d = 0; d < 360; d += 20) {
        var t = new Translate(this.translate.x+(this.scale.x/2), this.translate.y+(this.scale.y/2));
        var s = new Scale(9,16);
        var r = new Rotate(d);

        var b = new BasicBallet(t, r, s, speed);
        Field.AddBallet(b);
    }
    
};

BasicCannon.prototype.Initialize = function(){
    this.frameCount = BasicCannon.fireFrame;
    
    this.obj.addClass('cannon cannon_basic').html('■').css({display:"none"});
    $('#field').append(this.obj);
};

BasicBallet.prototype.Remove = function() {
    this.obj.remove();
};