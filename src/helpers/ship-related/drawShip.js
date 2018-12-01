    //draws the ship. Used as a utility function by other dmoveShip()

    const drawShip = (ctx, state) => {
        const shipPosition = state.shipPosition; 
        const shipAngle = state.shipAngle;
        const shipIMG = state.shipIMG;
            ctx.save(); 
 
            // move the origin to shipposition   
            ctx.translate(shipPosition.x, shipPosition.y); 
            
            // now move across and down half the 
            ctx.translate(25,25); 
            
            // rotate around this point
            ctx.rotate(shipAngle * Math.PI/180); 
            
            // then draw the image back and up
            ctx.drawImage(shipIMG, -25, -25); 
            
            // and restore the co-ordinate system to its default
            // top left origin with no rotation
            ctx.restore();
         
    }

export default drawShip;