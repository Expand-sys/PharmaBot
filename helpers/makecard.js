const canvasAPP = require('canvas');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

async function makeCard(type, img, texttop, textbottom){
  var background = await canvasAPP.loadImage('./action.png')
  if(type == "s" || type == "S"){
    background = await canvasAPP.loadImage('./status.png')
  }
  if(textbottom[0]==' '){
    textbottom = textbottom.slice(1, textbottom.length)
  }
  const canvas = await canvasAPP.createCanvas(background.width, background.height)
  const ctx = await canvas.getContext('2d')
  await ctx.drawImage(background, 0, 0)
  const font1 = "40px sans-serif";
  const font2 = "8px sans-serif";
  const pic = await canvasAPP.loadImage(img)
  ctx.drawImage(pic,200,220,360,360)
  ctx.font = applyText(canvas, texttop);
  ctx.textBaseline = "top";
  ctx.fillStyle = '#ffffff';
  ctx.fillText(texttop, canvas.width/3.25, 60)
  ctx.font = '16pt sans-serif'
  let x = canvas.width/4;
  let maxWidth = 400;
  let y = 620
  let line = '';
  let lineHeight = 25;
  for(var n = 0; n < textbottom.length; n++) {
          var testLine = line + textbottom[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = textbottom[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
      ctx.fillText(line, x, y);
    }
  const buffer = canvas.toBuffer('image/png')
  return buffer
};


module.exports = {
  makeCard
}
