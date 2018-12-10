//uses ship Position to generate an asteroid to be thrown at that ship. dy and dx depend on the spawn position of the asteroid

//(shipPosition (duh), canvas height, canvas width, asteroidImg)
const asteroidGenerator = (shipPosition, cHeight, cWidth, asteroidIMG) => {

	const asteroid = {
		position: {
			x: 0,
			y: 0
		},
		direction: {
			dx: 0,
			dy: 0
		},
		incrementPosition: () => {
			//increments asteroid position for next redraw
			asteroid.position.x += asteroid.direction.dx
			asteroid.position.y += asteroid.direction.dy
		},
		insideAsteroid: (sx, sy) => {
			//this function will check if the ships position is inside of the asteroid
			//uses distance formula from the radius to determine if ship is within radius of the asteroid 
			//returns false if not inside asteroid
            
			//because position is drawn from the top left hand corner of the svg, I survey the area around the center of the circle by adjusting "position" 
			//of the asteroid to be centered
			const hitboxPositionX = asteroid.position.x + (asteroid.asteroidIMG.width/2)
			const hitboxPositionY = asteroid.position.y + (asteroid.asteroidIMG.height/2)
            
			const distance = Math.sqrt(Math.pow(sx -  hitboxPositionX, 2) + Math.pow(sy - hitboxPositionY, 2) )

			//50 is width of asteroid, the extra 5 is to account for being close to the asteroid
			return 55 >= distance
		},
		asteroidIMG: asteroidIMG,
		negateX: false,
		negateY: false
	}

	const walls = ["top", "bottom", "left", "right"]

	switch(walls[Math.floor(Math.random()* 4)]){
	case "top":
		asteroid.position.x = Math.random() * cWidth
		asteroid.position.y = -100
		break
	case "bottom":
		asteroid.position.x = Math.random() * cWidth
		asteroid.position.y = cHeight
		break
	case "left":
		asteroid.position.x = -100
		asteroid.position.y = Math.random() * cHeight
		break
	case "right":
		asteroid.position.x = cWidth
		asteroid.position.y = Math.random() * cHeight
		break
	default:
		return 0
	}

    
	//angle from the horizontal + adding randomness 
	const angle = Math.atan(Math.abs((shipPosition.y - asteroid.position.y))/Math.abs((shipPosition.x - asteroid.position.x))) 
    + ((Math.random()*20)*((-1)^Math.round(Math.random()))/360 )
    
	//minimum speed is 10 with up to 20
	const speed = Math.ceil(Math.random()*15) + 10
    
	asteroid.negateX = asteroid.position.x > shipPosition.x
	asteroid.negateY = asteroid.position.y > shipPosition.y    


	asteroid.direction.dx = Math.cos(angle) * speed 
	asteroid.direction.dy = Math.sin(angle) * speed
    
    
	if(asteroid.negateX){
		asteroid.direction.dx = asteroid.direction.dx * -1
	}

	if(asteroid.negateY){
		asteroid.direction.dy = asteroid.direction.dy * -1
	}

	return asteroid
}

export default asteroidGenerator