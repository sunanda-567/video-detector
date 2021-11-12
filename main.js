objects=[];
video="";
status="";
function preload()
{ 
video=createVideo('video.mp4');
video.hide();
}

function setup()
{
canvas=createCanvas(450,350);
canvas.center();
}

function start()
{
objectdetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status:detecting objects";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw()
{
image(video, 0, 0, 450, 350);
if(status !="")
{
    objectdetector.detect(video, gotresult);

     for(i =0; i <objects.length; i++ )
     {
         document.getElementById("status").innerHTML="Status : objects detected";
         document.getElementById("no_of_objects").innerHTML="No. of objects detected are-" + objects.length;

         fill("#8a224d");

         percent=floor(objects[i].confidence * 100);

         text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
         noFill();
         stroke("#8a224d");
         rect(objects[i].x, objects[i].y,  objects[i].width,  objects[i].height);
     }
}
}

function gotresult(error, results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);

    objects=results;
}