/**
 * @author Jeff Risberg
 * @since August 2013
 */
var HN= {};

(function() {

  var director;
  var scene;
  
  function start() {
    width = window.innerWidth;
    height = window.innerHeight;   
  
    director = new CAAT.Director().initialize(
       width, height, document.getElementById('_c6'));
    scene= director.createScene();
 
    new CAAT.ImagePreloader().loadImages(
        [ {id:'ship',     url:'resource/ship.png'} ],   // get only this image.       
         function( count, images ) {
            if ( count === images.length ) {
                director.setImagesCache(images);                 
               demo( images ); // Start the demo when all assets are loaded.
            }
         }
    );
  };
  
  function demo(img) {
    director.setImagesCache(img);

    //var shape= new CAAT.StarActor().
    //        initialize( 8, 30, 10 ).
    //        setLocation( 50,50 ).
    //        setSize(50,50).
    //        setFillStyle('#00f').
    //        setStrokeStyle('#0f0').
    //        setOutlined(true).
    //        setAlpha(.75).
    //        setPositionAnchor(0.5, 0.5);
    
    var shape = new CAAT.Actor().
            setBackgroundImage(director.getImage('ship')).
            setScale(0.5, 0.5).
            setPositionAnchor(0.5, 0.5);
     
    // add two rectangle shapes to the scene.
    scene.addChild(shape);
     
    // create a complex path
    var path= new CAAT.Path().
            beginPath(25,125).
            addLineTo( 425, 25, 'blue' ).
            addLineTo( 425,225, 'red' ).
            addLineTo( 325,225, 'red' ).
            addCubicTo( 125,200,  25,150,  25,125 ).
            endPath();
     
    // add an actor to show the path.
    var path_actor= new CAAT.PathActor().
            setPath(path).
            setBounds(0,0,director.width,director.height);
    scene.addChild( path_actor );
     
    // setup up a path traverser for the path.
    var path_behavior= new CAAT.PathBehavior().
            setPath( path ).
        // take 5 seconds to traverse the path
            setFrameTime(0,5000).
        // do it continuously, not just one time
            setCycle(true).
        // head the actor across the path to the next point.
            setAutoRotate( true );
     
    shape.addBehavior( path_behavior );
     
    CAAT.loop(30);        
    };

  window.addEventListener( "load", start, false );
})();