$( document ).ready(function() {
    var speed=4000;
    var spawnSpeed=1000;
    var spawner;
    var score=0;
    var scoreTimer;
    var scoreCard=$('.score-card');
    var vehiles=['blue.jpeg','red.jpeg','white.jpeg','green.jpeg','yellow.jpeg','gray.jpeg','ambulance.jpeg','fire.jpeg','truck.jpeg','police.jpeg'];
    function getVehicle(){
        var randomVehicleIndex=Math.floor(Math.random()*10);
        randomVehicle=vehiles[randomVehicleIndex];
        return "images/"+randomVehicle;
    }
    function getTrack(){
        var randomTrack=Math.floor(Math.random()*3)+1;
        return randomTrack;
    }
    function scoreBoard(){
        scoreTimer=setInterval(function(){
            score++;
            scoreCard.html(score+"-"+speed);
            if(score==500){
                speed=speed-1000;
                spawnSpeed=spawnSpeed-250;
            }
            else if(score==1000){
                speed=speed-1000;
                spawnSpeed=spawnSpeed-100;
            }
            else if(score==2000){
                speed=speed-1000;
                spawnSpeed=spawnSpeed-100;
            }
        },100);
        

    }
    function spawnToTrack(){
        var vehicleObject=document.createElement('img');
        var objPath=getVehicle();
        $(vehicleObject).attr('id','controller');
        $(vehicleObject).attr('src',objPath);
        var track="#t-"+getTrack();
        $(track).append(vehicleObject);
        move(vehicleObject);
    }
    function move(obj){
        $(obj).animate({bottom: '-100px'},speed,function(){
            $(obj).remove();
        }); 
        setInterval(function(){
            var target=$(obj);
            var myCar=$("#myCar");
            var hit=overlaps(target,myCar);
            if(hit){
                alert("crashed");
            }
        },100);
    }
    var overlaps = (function () {
        function getPositions( elem ) {
            var pos, width, height;
            pos = $( elem ).position();
            width = $( elem ).width();
            height = $( elem ).height();
            return [ [ pos.left, pos.left + width ], [ pos.top, pos.top+height ] ];
        }
        function getPositionMyCar( elem ) {
            var pos, width, height;
            pos = $( elem ).position();
            width = $( elem ).width();
            height = $( elem ).height();
            return [ [ pos.left, pos.left + width ], [ pos.top, pos.top] ];
        }
        function comparePositions( p1, p2 ) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }
    
        return function ( a, b ) {
            var pos1 = getPositions( a ),
                pos2 = getPositionMyCar( b );
                hit =comparePositions( pos1[0], pos2[0]) && comparePositions( pos1[1], pos2[1]);
                if(hit)
                    return true;
                else
                    return false;
        };
    })();
    function spawnTimer(){
       spawner= setInterval(function(){ spawnToTrack() },spawnSpeed);
    }
    function pausePlay(){
        var count=0;
        $("#controller").dequeue();
        $("#controller").each(function(){
            count++;
        });
        clearInterval(spawner);

    }

    function changeTrack(direction){
        var myCar=$("#myCar");
        var currentTrack=myCar.parent();
        if(direction==37 && currentTrack.attr('id')!='t-3'){
            var trackno=currentTrack.attr('id').split('-').pop();
            trackno++;
            var newTrack="#t-"+trackno;
            $(myCar).remove();
            $(newTrack).append(myCar);
        }
        if(direction==39 && currentTrack.attr('id')!='t-1'){
            var trackno=currentTrack.attr('id').split('-').pop();
            trackno--;
            var newTrack="#t-"+trackno;
            $(myCar).remove();
            $(newTrack).append(myCar);
        }
    }
    spawnTimer();
    scoreBoard();
    $(document).keydown(function(e){
        switch (e.which){
        case 37:    //left arrow key
            changeTrack(39);
            break;
        case 38:    //up arrow key
            break;
        case 39:    //right arrow key
            changeTrack(37);
            break;
        case 40:    //bottom arrow key
            break;
        }
        e.preventDefault();
    });
    
});