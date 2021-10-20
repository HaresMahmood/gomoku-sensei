var turn = "black";

$(".box").click(function () {
  if ($(this).find(".piece").length === 0){ 
    var piece = `<div class="piece ${turn}-piece"></div>`;
    
    $(this).append(piece);
  }
  
  turn = turn == "black" ? "white" : "black";
});