//pass "{...this.state.keyMap}"
//will return angle that ship should face
const updateShipAngle = (keyMap) => {
    let angle = 0;
    if(keyMap.w){
        angle += 0;
        if(keyMap.d){
            angle += 45;
        }
        if(keyMap.a){
            angle += 315;
        }
        return angle;
    }
    if(keyMap.a){
        angle += 270;
        if(keyMap.s){
            angle -= 45;
        }
        if(keyMap.w){
            angle -= 45;
        }
        return angle;
    }
    if(keyMap.s){
        angle += 180;
        if(keyMap.d){
            angle -= 45;
        }
        if(keyMap.a){
            angle -= 45;
        }
        return angle;
    }
    if(keyMap.d){
        angle += 90;
        if(keyMap.w){
            angle += 45;
        }
        if(keyMap.s){
            angle -= 45;
        }
        return angle;
    }
}

export default updateShipAngle