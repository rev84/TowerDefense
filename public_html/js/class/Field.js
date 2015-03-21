var Field = {
    loopTimer: false,
    isEnableAdd : true,
    ballets : [],
    cannons : [],
    addBallets:[],
    getSecFunc:null,
    fpsStack:[],
    
    Initialize : function() {
        $('#field').css({
            width: Config.width,
            height:Config.height
        });
        Field.SetSecFunc();
        Field.GameStart();
    },
    
    GameStart:function(){
        if (false === Field.loopTimer) {
            Field.loopTimer = setTimeout(Field.Run, 1000/Config.fps);
        }
    },
    GameStop:function(){
        if (false !== Field.loopTimer) {
            clearTimeout(Field.loopTimer);
            Field.loopTimer = false;
            fpsStack = [];
        }
    },
    
    Run:function(){
        Field.StackFps();
        
        var newCannons = [];
        Field.cannons.forEach(function(v){
            if (v.Run()) {
                v.Draw();
                newCannons.push(v);
            }
            else {
                v.Remove();
            }
        });
        Field.cannons = newCannons;
        
        var newBallets = [];
        Field.ballets.forEach(function(v){
            if (v.Run()) {
                v.Draw();
                newBallets.push(v);
            }
            else {
                v.Remove();
            }
        });
        Field.addBallets.forEach(function(v){ newBallets.push(v); });
        Field.addBallets = [];
        Field.ballets = newBallets;
        
        // FPS出力
        $('#fps').html(''+Field.StackFps()+' fps');
        
        if (false !== Field.loopTimer) {
            Field.loopTimer = setTimeout(Field.Run, 1000/Config.fps);
        }
    },
    
    AddBallet:function(b){
        Field.addBallets.push(b);
    },
    
    AddCannon:function(c){
        Field.cannons.push(c);
    },
    
    GetFps:function(){
        var count = Field.fpsStack.length;
        var startSec = Field.fpsStack[0];
        var endSec = Field.fpsStack[count-1];
        return Math.round(10*count/(endSec-startSec))/10;
    },
    StackFps:function(){
        Field.fpsStack.push(Field.getSecFunc());
        while (Field.fpsStack.length > Config.fps) {
            Field.fpsStack.shift();
        }
        return Field.GetFps();
    },
    SetSecFunc:function(){
        if (window.performance.now) {
            Field.getSecFunc = function(){
                return window.performance.now()/1000;
            };
        }
        else {
            Field.getSecFunc = function(){
                return +new Date()/1000;
            };
        }
    }
};
