    //updates keymap in state, will set values to true or false on keydown and keyup 
    const adjustKeyMap = (event, keyMapInput) =>{
        if(event.type === "keydown"){
            const keyMap = {...keyMapInput}
            switch(event.key){
                case "w":
                    keyMap.w = true;
                    break;
                case "s":
                    keyMap.s = true;
                    break;
        
                case "a":
                    keyMap.a = true;
                    break;
                
                case "d":
                    keyMap.d = true;
                    break;
                default:
                    break;
            }
            return keyMap

        }else if(event.type === "keyup"){        
            const keyMap = {...keyMapInput}
            switch(event.key){
                case "w":
                    keyMap.w = false;
                    break;

                case "s":
                    keyMap.s = false;
                    break;
        
                case "a":
                    keyMap.a = false;
                    break;
                
                case "d":
                    keyMap.d = false;
                    break;
                default:
            }

            return keyMap;
        }
    }
export default adjustKeyMap