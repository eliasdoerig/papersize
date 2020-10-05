(function(document) {
    const d = document.getElementById('output');
    const canvas = document.getElementById('output_canvas');
    const minMargin = 10 * 2;

    let paperWidthInput = document.getElementById('paperWidth');
    paperWidthInput.addEventListener('change', (e) => {
        paperWidth = e.target.value;
        changeHtml();
    });
    let paperHeightInput = document.getElementById('paperHeight');
    paperHeightInput.addEventListener('change', (e) => {
        paperHeight = e.target.value;
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

    let paperWidth = paperWidthInput.value;
    let paperHeight = paperHeightInput.value;
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
        let w = Math.floor((paperWidth-minMargin)/printWidth);
        let h = Math.floor((paperHeight-minMargin)/printHeight);
        const ctx = canvas.getContext('2d');
        canvas.width = paperWidth;
        canvas.height = paperHeight;
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(0, 0, paperWidth, paperHeight);
        ctx.setTransform(1, 0, 0, 1, (paperWidth-printWidth*w)/2, (paperHeight-printHeight*h)/2);
        for(let y = 0; y < h; y++){
            for(let x = 0; x < w; x++){
                ctx.strokeRect(x * printWidth, y * printHeight, printWidth, printHeight);
            }
        }
      }

    function calcItems(){
        let w = Math.floor((paperWidth-minMargin)/printWidth);
        let h = Math.floor((paperHeight-minMargin)/printHeight);
        return w * h;
    }

    changeHtml();

})(document);