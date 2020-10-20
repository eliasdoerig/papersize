(function(document) {
    const paperSizes = {
        B1: [1000, 700],
        B2: [700, 500],
        C2: [640, 460],
        A3plus: [450, 320],
        A3: [420, 297],
        A4: [297, 210]
    }
    const d = document.getElementById('output');
    const canvas = document.getElementById('output_canvas');
    const minMargin = 10 * 2;

    let paperWidthInput = document.getElementById('paperSize');
    paperWidthInput.addEventListener('change', (e) => {
        paperSize = paperSizes[e.target.value];
        console.log(`Paper size: ${paperSize.join(', ')}`);
        changeHtml();
    });
    let printWidthInput = document.getElementById('printWidth');
    printWidthInput.addEventListener('change', (e) => {
        printWidth = e.target.value;
        changeHtml();
    });
    let printHeightInput = document.getElementById('printHeight');
    printHeightInput.addEventListener('change', (e) => {
        printHeight = e.target.value;
        changeHtml();
    });
    let printRunInput = document.getElementById('printRun');
    printRunInput.addEventListener('change', (e) => {
        printRun = e.target.value;
        changeHtml();
    });

    let paperSize = paperSizes.B2;
    let printWidth = printWidthInput.value;
    let printHeight = printHeightInput.value;
    let printRun = 1;

    function changeHtml(){
        drawOnCanvas();
        let p_s = calcItems();
        let p_s_tot = p_s[0] * p_s[1];
        d.innerHTML = `Pieces/sheet: ${p_s_tot} <br>`;
        let s = Math.ceil(printRun/(p_s_tot));
        d.innerHTML += `You need ${s} ${s == 1 ? 'sheet' : 'sheets'}`;
    }

    function drawOnCanvas(){
        const pixelRatio = window.devicePixelRatio
        
        const items = calcItems();
        const w = items[0];
        const h = items[1];

        const paperW = paperSize[0] * pixelRatio
        const paperH = paperSize[1] * pixelRatio
        let printW = 0, printH = 0;

        if(items[2]){
            //if true rotate
             printH = printWidth * pixelRatio
             printW = printHeight * pixelRatio
        }else{
            //else normal
             printW = printWidth * pixelRatio
             printH = printHeight * pixelRatio
        }
                
        const ctx = canvas.getContext('2d');
        canvas.width = paperW;
        canvas.height = paperH;
        canvas.style.width = `${paperW/pixelRatio}px`;
        canvas.style.height = `${paperH/pixelRatio}px`;
        ctx.strokeStyle = '#000000';
        ctx.strokeWeight= pixelRatio;
        ctx.setTransform(1, 0, 0, 1, (paperW-printW*w)/2, (paperH-printH*h)/2);
        for(let y = 0; y < h; y++){
            for(let x = 0; x < w; x++){
                ctx.strokeRect(x * printW, y * printH, printW, printH);
            }
        }
      }

    function calcItems(){
        //normal
        let h = Math.floor((paperSize[0]-minMargin)/printWidth);
        let w = Math.floor((paperSize[1]-minMargin)/printHeight);
        //rotate
        let hr = Math.floor((paperSize[0]-minMargin)/printHeight);
        let wr = Math.floor((paperSize[1]-minMargin)/printWidth);

        if(h * w > hr * wr){
            return [h, w, false];
        }
        return [hr, wr, true];
    }

    changeHtml();

})(document);