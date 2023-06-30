
var candies= ["Red", "Blue","Green","Purple","Orange", "Yellow"];
var board=[];
var rows= 9;
var columns= 9;
var score= 0;
let r;
let c;

let currtile;
let othertile;

   window.onload= function(){
      startGame();
}  
   window.setInterval(function(){
         crushCandy () ;
         slideCandy () ;
         generateCandy() ;

   },100);


function randomcandy(){
         return candies[Math.floor(Math.random()*candies.length)];
}


 function startGame() {
              for(let r=0;r< rows;r++){
                let row=[];
                for(let c=0;c<columns; c++){
                    let tile =document.createElement("img");
                    tile.id= r.toString() +'-'+ c.toString() ;
                    tile.src= "Pictures/"+ randomcandy()+ ".png";
                    tile.addEventListener("dragstart",dragStart);
                    tile.addEventListener("dragover",dragOver);
                    tile.addEventListener("dragenter",dragEnter);
                    tile.addEventListener("dragleave",dragLeave);
                    tile.addEventListener("drop",dragDrop);
                    tile.addEventListener("dragend",dragEnd);

                    document.getElementById("board").append(tile);
                    row.push(tile); 


                }
                board.push(row);
              }
              console.log(board);

 }
 function dragStart(){
     currtile= this;
 }
 function dragOver(e) {
        e.preventDefault();
 }
 function dragEnter(e) {
    e.preventDefault();
}
function dragLeave(e) {
    e.preventDefault();
}
function dragDrop() {
    othertile= this;
}
function dragEnd() {

    if( currtile.src.includes("blank") || othertile.src.includes("blank")){
        return;
    }

        let currcoords= currtile.id.split("-");
        let r=parseInt(currcoords[0]);
        let c=parseInt(currcoords[1]);

        let othercoords= othertile.id.split("-");
        let r2=parseInt(othercoords[0]);
        let c2=parseInt(othercoords[1]);

        let moveleft= c2==c-1 && r==r2;
        let moveup=  c==c2 && r2==r-1 ;
        let movedown=  c==c2 && r2==r+1 ;
        let moveright=  c2==c+1  && r==r2;
         

        let isAdjacent = moveup ||movedown ||moveleft ||moveright ;
        
     if(isAdjacent){
       let currimg= currtile.src;
       let otherimg= othertile.src;
       currtile.src =otherimg;
       othertile.src =currimg;
       let validmove= checkValid();

       if(!validmove){
        let currimg= currtile.src;
       let otherimg= othertile.src;
       currtile.src =otherimg;
       othertile.src =currimg;
       }
    }

}
function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;

}

function crushThree() {
   
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "Pictures/blank.png";
                candy2.src = "Pictures/blank.png";
                candy3.src = "Pictures/blank.png";
                score += 30;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "Pictures/blank.png";
                candy2.src = "Pictures/blank.png";
                candy3.src = "Pictures/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}


function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "Pictures/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "Pictures/" + randomcandy() + ".png";
        }
    }
}