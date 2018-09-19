$(document).ready(function(){
	var imageBeingRotated = false;
	var mouseStartAngle = false;
	var imageStartAngle = false;
	var isAfterStopRotate = false;
	var outterAngle  = 0;	//= $("#outter").data('checkAngle');
	var middleAngle = 0;	//= $("#middle").data('checkAngle');
	var innerAngle = 0; 	//= $("#inner").data('checkAngle');
	var circle = 0;
	alert("Spin the circles until the words come out.");
  $(initCircles);
	$(document).mouseup(stopRotate);
});


function initCircles(){
	
	
	$(".circle img").each(	function(index){
	//initiailize random  angle for each img
	
		var angle = Math.floor( Math.random() * 360  );
		
		$(this).css( 'transform', 'rotate(' + angle + 'deg)' );   
		$(this).css( '-moz-transform', 'rotate(' + angle + 'deg)' );   
		$(this).css( '-webkit-transform', 'rotate(' + angle + 'deg)' );
		$(this).css( '-o-transform', 'rotate(' + angle + 'deg)' );
		$(this).data('currentRotation', angle * Math.PI / 180 );
		
		//make the image rotatable
		$(this).mousedown( startRotate );
	
	});
};
function showLit(){
	
	if(isAfterStopRotate){
		
		if(outterAngle < 0){outterAngle = -outterAngle;}
		if(middleAngle < 0){middleAngle = -middleAngle;}
		if(innerAngle < 0){innerAngle = -innerAngle;}
		if(outterAngle >  6.28 || middleAngle > 6.28 || innerAngle > 6.28){
			outterAngle = outterAngle %6.28;
			middleAngle = middleAngle %6.28;
			innerAngle = innerAngle %6.28;
		}
		
		
		if(outterAngle >= 6.22 || outterAngle <= 0.78 && 
			middleAngle >= 6.22 || middleAngle <= 0.78&& 
			innerAngle >= 6.22 || innerAngle <= 0.78){
				$(".fade").animate({opacity: '0'});
    
 			 	setTimeout("document.location.href='https://luffy.ee.ncku.edu.tw/~E24056491/jump.html'", 2000);
			}
			isAfterStopRotate = false;
			return;
	} 
	else return;
}
function startRotate( e ) {

 
  // Track the image that we're going to rotate
	imageBeingRotated = this;
	
	if( this.id === 'outter' ){ circle = 1;}
	if( this.id === 'middle' ){circle = 2;}
	if( this.id === 'inner' ){circle = 3;}
	// Store the angle of the mouse at the start of the rotation
	var imageCenter = getImageCenter( imageBeingRotated );
	var mouseStartXFromCenter = e.pageX - imageCenter[0];
	var mouseStartYFromCenter = e.pageY - imageCenter[1];
	mouseStartAngle = Math.atan2( mouseStartYFromCenter, mouseStartXFromCenter );
	
	// Store the current rotation angle of the image at the start of the rotation
	imageStartAngle = $(imageBeingRotated).data('currentRotation');
	
	// Set up an event handler to rotate the image as the mouse is moved
	$(document).mousemove( rotateImage );
		// stop bubbling
	return false;
}
// stop rotating while mouse is up
function stopRotate( e ) {
 
  if ( !imageBeingRotated ) return;

  // Remove the event handler that tracked mouse movements during the rotation
  $(document).unbind( 'mousemove' );
	
	
  // Cancel the image rotation by setting imageBeingRotated back to false.
  imageBeingRotated = false;
  isAfterStopRotate = true;
  $(showLit);
  
  return false;
}
function rotateImage( e ) {

  // Exit if there is no image being rotated
  if ( !imageBeingRotated ) return;

  // Calculate the new mouse angle relative to the image center
  var imageCenter = getImageCenter( imageBeingRotated );
  var mouseXFromCenter = e.pageX - imageCenter[0];
  var mouseYFromCenter = e.pageY - imageCenter[1];
  var mouseAngle = Math.atan2( mouseYFromCenter, mouseXFromCenter );

  // Calculate the new rotation angle for the image
  var rotateAngle = mouseAngle - mouseStartAngle + imageStartAngle;
  
  outterAngle = rotateAngle;
  if(circle == 1 ){
	  outterAngle = rotateAngle;
  }
  if(circle == 2){
	  middleAngle = rotateAngle;
  }
  if(circle == 3){
	  innerAngle = rotateAngle;
  }
  
  
  
  // Rotate the image to the new angle, and store the new angle
  $(imageBeingRotated).css('transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).data('currentRotation', rotateAngle );
  
  return false;
}
function getImageCenter( image ) {

  // Rotate the image to 0 radians
  $(image).css('transform','rotate(0rad)');
  $(image).css('-moz-transform','rotate(0rad)');
  $(image).css('-webkit-transform','rotate(0rad)');
  $(image).css('-o-transform','rotate(0rad)');

  // Measure the image center
  var imageOffset = $(image).offset();
  var imageCenterX = imageOffset.left + $(image).width() / 2;
  var imageCenterY = imageOffset.top + $(image).height() / 2;

  // Rotate the image back to its previous angle
  var currentRotation = $(image).data('currentRotation');
  $(imageBeingRotated).css('transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + currentRotation + 'rad)');

  // Return the calculated center coordinates
  return Array( imageCenterX, imageCenterY );
}
