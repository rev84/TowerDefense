$().ready(function(){
    $('#setBasicCannonInRandomPos').click(function(){
        var t = new Translate(Utility.rand(1, Config.width), Utility.rand(1, Config.height));
        var s = new Scale(10,10);
        var c = new BasicCannon(t, s);
        Field.AddCannon(c);
    });
    
    $('#fieldStart').click(function(){
        Field.GameStart();
    });
    $('#fieldStop').click(function(){
        Field.GameStop();
    });
    $('#goFrame').click(function(){
        Field.Run();
    });
    
    Field.Initialize();
});

