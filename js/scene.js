/**
 * @author Jeff Risberg
 * @since August 2013
 */
var HN= {};

(function() {

  var director;
  var scene1, scene2;
  
  function start() {
    width = window.innerWidth;
    height = window.innerHeight;   
  
    director = new CAAT.Director().initialize(
       width, height, document.getElementById('_c6'));
    scene1 = director.createScene();
    scene2 = director.createScene();
 
    new CAAT.ImagePreloader().loadImages(
        [ {id:'ship',     url:'resource/ship.png'},
          {id:'target',   url:'resource/target.png'} ],      
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

    // set up Scene1
    if (true) {
      var ship = new CAAT.Actor().
              setBackgroundImage(director.getImage('ship')).
              setScale(0.5, 0.5).
              setPositionAnchor(0.5, 0.5);
      scene1.addChild(ship);
       
      // create a complex path
      var path = new CAAT.Path().
              beginPath(25,125).
              addLineTo( 425, 25, 'blue' ).
              addLineTo( 425,225, 'red' ).
              addLineTo( 325,225, 'red' ).
              addCubicTo( 125,200,  25,150,  25,125 ).
              endPath();
       
      // add an actor to show the path.
      var path_actor = new CAAT.PathActor().
              setPath(path).
              setBounds(0,0,director.width,director.height);
      scene1.addChild( path_actor );
       
      // setup up a path traverser for the path.
      var path_behavior = new CAAT.PathBehavior().
              setPath( path ).
          // take 5 seconds to traverse the path
              setFrameTime(0,5000).
          // do it continuously, not just one time
              setCycle(true).
          // head the actor across the path to the next point.
              setAutoRotate( true );
       
      ship.addBehavior( path_behavior );
    }
     
    // set up scene2
    if (true) {
      var target = new CAAT.Actor().
              setBackgroundImage(director.getImage('target')).
              setScale(0.5, 0.5).
              setPositionAnchor(0.5, 0.5);
      scene2.addChild(target);     
      
      // create a complex path
      var path = new CAAT.Path().
              beginPath(100,100).             
              addQuadricTo(300,0, 400,150).
              addQuadricTo(400,300, 300,300).
              addQuadricTo(50,300, 100,100).
              endPath();
              
      // add an actor to show the path
      var path_actor = new CAAT.PathActor().
              setPath(path).
              setBounds(0,0, director.width, director.height);
      scene2.addChild( path_actor );
      
      // setup up a path traverser for the path
      var path_behavior = new CAAT.PathBehavior().
              setPath( path ).
          // take 5 seconds to traverse the path
              setFrameTime(0,5000).
          // do it continuously, not just one time
              setCycle(true).
          // head the actor across the path to the next point.
              setAutoRotate( true );
       
      target.addBehavior( path_behavior );
    }
    
    director.setScene(1);
    
    CAAT.loop(30);        
    };

  window.addEventListener( "load", start, false );
})();