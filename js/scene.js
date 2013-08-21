/**
 * @author Jeff Risberg
 * @since August 2013
 */
var HN= {};

(function() {

  var director;  
  var gradient;
  var buttons;
  var scene1, scene2, scene3
  
  function start() {
    width = window.innerWidth;
    height = window.innerHeight * 0.75;   
  
    director = new CAAT.Director().initialize(
       width, height, document.getElementById('_c6'));   
 
    new CAAT.ImagePreloader().loadImages(
        [ {id:'ship',     url:'resource/ship.png'},
          {id:'target',   url:'resource/target.png'},
          {id:'buttons',  url:'resource/buttons.png'} ],      
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

    // create a vertical gradient to apply to text.
    gradient = director.ctx.createLinearGradient(0,0,0,director.canvas.height);
    gradient.addColorStop(0, '#ffff00');
    gradient.addColorStop(0.5, '#00ffff');
    gradient.addColorStop(1, 'blue');
   
    // an image of 2 rows by 3 columns
    buttons = new CAAT.Foundation.SpriteImage().initialize(
              director.getImage('buttons'), 2, 3);
    
    // set up Scene1
    {
      scene1 = director.createScene();
      scene1.setFillStyle(gradient);
  
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
      createFooter(scene1); 
    }
     
    // set up scene2
    {
      scene2 = director.createScene();
      
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
      
      createFooter(scene2); 
    }
    
    director.setScene(0);
    
    CAAT.loop(30);        
    };
    
    /**
     * Set up the footer, which has two buttons and a bottom edge.
     */
    function createFooter(scene) {
      var height = director.canvas.height;
      var width  = director.canvas.width;
      
      var b1 = new CAAT.Foundation.Actor().setAsButton(
          buttons.getRef(), 0, 1, 2, 0, function(button) {
              // run when clicked
              director.setScene(0);
          }
      ).
      setLocation(0, height-70);
      scene.addChild( b1 );
     
      var b2 = new CAAT.Foundation.Actor().setAsButton(
          buttons.getRef(), 3, 4, 5, 0, function(button) {
              // run when clicked
              director.setScene(1);
          }
      ).
      setLocation(1.5*buttons.singleWidth, height-70);      
      scene.addChild( b2 );
      
      var bottomEdge = new CAAT.ShapeActor().
            setShape( CAAT.ShapeActor.prototype.SHAPE_RECTANGLE ).
            setFillStyle( 'black' ).
            setBounds( 0, height-10, width/2, 10);
 
      scene.addChild( bottomEdge );
    };

  window.addEventListener( "load", start, false );
})();