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

    let paperSize = paperSizes.B1;
    let printWidth = printWidthInput.value;
    let printHeight = printHeightInput.value;
    let printRun = 1;

    function changeHtml(){
        drawOnCanvas();
        let p_s = calcItems();
        d.innerHTML = `Pieces/sheet: ${p_s} <br>`;
        let s = Math.ceil(printRun/(p_s));
        d.innerHTML += `You need ${s} ${s == 1 ? 'sheet' : 'sheets'}`;
    }

    function drawOnCanvas(){
        let w = Math.floor((paperSize[0]-minMargin)/printWidth);
        let h = Math.floor((paperSize[1]-minMargin)/printHeight);
        const ctx = canvas.getContext('2d');
        canvas.width = paperSize[0];
        canvas.height = paperSize[1];
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(0, 0, paperSize[0], paperSize[1]);
        ctx.setTransform(1, 0, 0, 1, (paperSize[0]-printWidth*w)/2, (paperSize[1]-printHeight*h)/2);
        for(let y = 0; y < h; y++){
            for(let x = 0; x < w; x++){
                ctx.strokeRect(x * printWidth, y * printHeight, printWidth, printHeight);
            }
        }
      }

    function calcItems(){
        let w = Math.floor((paperSize[0]-minMargin)/printWidth);
        let h = Math.floor((paperSize[1]-minMargin)/printHeight);
        return w * h;
    }

    changeHtml();

})(document);