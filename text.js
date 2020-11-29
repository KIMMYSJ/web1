export class Text{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left= '0';
        this.canvas.style.top='0';
        //document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

    }

    setText(str, density, stageWidth, stageHeight){
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        const myText = str;
        var fontWidth = 700;
        var fontSize = 800;
        const fontName = 'Hind';

        if(stageHeight<960 || stageWidth < 1400){
            fontWidth = 350;
            fontSize = 400;
        }
        if
        (stageHeight<400 || stageWidth <700){
            fontWidth = 350/2;
            fontSize = 200;
        }

        //캔버스 공간 비우기
        this.ctx.clearRect(0,0,stageWidth,stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        
        this.ctx.fillStyle = `rgba(0,0,0,0.3)`;
        this.ctx.textBaseline = `middle`;
        const fontPos = this.ctx.measureText(myText);
        
        // fontHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;
        // actualHeight = actualBoundingBoxAscent + actualBoundingBoxDescent;
        //fontHeight is the bounding box height regardless of the string being rendered. 
        //actualHeight is specific to the string being rendered.
         this.ctx.fillText(
            myText,
            (stageWidth-fontPos.width)/2,
            fontPos.actualBoundingBoxAscent +
            fontPos.actualBoundingBoxDescent +
            ((stageHeight-fontSize)/2) 
        );
        

        return this.dotPos(density,stageWidth,stageHeight);
    }
    
    dotPos(density,stageWidth,stageHeight){
        const imageData =this.ctx.getImageData(
            0,0,stageWidth,stageHeight
        ).data;
        //A Uint8ClampedArray representing a one-dimensional 
        //array containing the data in the RGBA order, with integer values between 0 and 255 (included).
        const particles = []; 
        let i = 0;
        let width = 0;
        let pixel;

        var den = density;

        
        for (let height = 0; height <stageHeight; height +=density){
            i++;
            const slide = (i % 2) == 0;
            width = 0;
            if(slide == 1){


                
                width +=6;
            }
        

            for(width; width < stageWidth; width +=density){
                pixel = imageData[((width + (height * stageWidth)) * 4 )- 1];
                if(pixel != 0
                    && width >0 
                    &&width<stageWidth 
                    &&height >0
                    && height < stageHeight){
                    particles.push({ 
                    x: width,
                    y: height,
                    });
                }
               
            }
        }

        return particles; 
    }
}
