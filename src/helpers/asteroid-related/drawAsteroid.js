//draws the Asteroid. Used as a utility function by other dmoveAsteroid()


const drawAsteroid = (ctx, asteroid) => {
	const asteroidIMG = asteroid.asteroidIMG
	const asteroidPosition = asteroid.position
	ctx.drawImage(asteroidIMG, asteroidPosition.x, asteroidPosition.y)
}

export default drawAsteroid