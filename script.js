window.onload = function () {
  let bheem_audio = new Audio("Chota bheem.mp3");
  let witch_audio = new Audio("Chota Bheem - Witch ! Dialogue.mp3");
  let kalia_audio = new Audio("Chotta Bheem - Evil Laugh Sound.mp3");
  let reveal_audio = new Audio("mixkit-arrow-shot-through-air-2771.wav");
  let baller_audio = new Audio("Listion stump sound.mp3");
  let background_audio = new Audio("Aylex - Too Hot.mp3");
  let hover_audio = new Audio("mixkit-tech-break-fail-  2947.wav");
  let click_audio = new Audio("mixkit-plastic-bubble-click-1124.wav")//for click sound
  var size = 10;
  let count = 0;//check whether kalia\_score\-determine function is runned
  var ballers = 11;
  var kalia_score = 0;
  let music_count = 0;//check whether user clicked the music button
  document.getElementById("music").addEventListener("click", function music_handle() {
    if (music_count == 0) { background_audio.currentTime = 3; background_audio.loop = true; background_audio.play(); music_count++; }
    else { background_audio.pause(); background_audio.currentTime = 0; music_count = 0; }
  });
  document.getElementById("board_size").addEventListener("click", function () { click_audio.play(); });
  document.getElementById("level_setter").addEventListener("click", function () { click_audio.play(); });
  document.getElementById("start").addEventListener("click", function () { click_audio.play(); });
  document.getElementById("newgame").addEventListener("click", function () { click_audio.play(); });
  document.getElementById("music").addEventListener("click", function () { click_audio.play(); });
  document.getElementById("start").onclick = function () {
    let w = document.getElementById("board_size")
    size = w.options[w.selectedIndex].value;
    let level_setter_element = document.getElementById("level_setter");
    let difficulty = level_setter_element.options[level_setter_element.selectedIndex].value;//gets the selection 
    //console.log(size);
    if (!(isNaN(size)) && !(isNaN(difficulty))) {//verifies the validity of selection
      document.getElementById("test").style.display = "none"; count = 0;
      kalia_score_determine();
    }
    if (isNaN(size) || isNaN(difficulty)) {//verifies the validity of selection
      let x = document.getElementById("test");
      x.style.color = "#bf3030";
      x.innerHTML = "abe select to kar";
      //count++;
    }
    function kalia_score_determine() {//set kalia's score
      //if (!(isNaN(difficulty))) {
      document.getElementById("test").style.display = "none"; count = 0;
      let logitics_factor_2 = 0.175;
      let logitics_factor_0 = 0.115;
      let logitics_factor_1 = 0.235;
      let logitics_factor_3 = 0.375;
      let max_score = size * size - ballers;
      count++;
      if (difficulty == 0) {
        kalia_score = max_score * logitics_factor_0;
        kalia_score = parseInt(Math.random() * kalia_score);
      }
      if (difficulty == 1) {
        kalia_score = max_score * logitics_factor_2;
        kalia_score = parseInt(Math.random() * ((max_score * logitics_factor_1) - kalia_score) + kalia_score);
      }
      if (difficulty == 2) {
        kalia_score = max_score * logitics_factor_3;
        kalia_score = parseInt(Math.random() * (kalia_score - (max_score * 0.285)) + max_score * 0.285);
      }
      //}
      /*if (isNaN(difficulty)) {
        let x = document.getElementById("test");
        x.style.color = "#bf3030";
        x.innerHTML = "abe select to kar";
      }*/
    }
    //document.getElementById("test").innerHTML=w.options[w.selectedIndex].value;
    if (count == 1) {
      thegod(kalia_score);
      //background_audio.pause();
      //background_audio.currentTime = 0;
      document.getElementById("start").style.display = "none";
    }
  };
  function thegod(kalia_score) {
    //var ballers = 11;
    var bheem_score = 0;
    document.getElementById("score2").innerHTML = kalia_score;
    let board = document.getElementById("board");
    var showallballer_called = 1; //this will check if showallballer function invoked or not
    //making the board
    for (let i = 0; i < size; i++) {
      let row = document.createElement('tr')
      for (let j = 0; j < size; j++) {
        let block = document.createElement('td')
        block.dataset.row = i;
        block.dataset.col = j;
        block.dataset.isballer = 0;
        row.appendChild(block);
      }
      board.appendChild(row);
    }
    //now lessgo to fix the ballers positions
    //*function baller_place(){    //*to fix baller error
    var baller_palced = 0;
    while (baller_palced < ballers) {
      let i = Math.floor(Math.random() * size);
      let j = Math.floor(Math.random() * size);
      let placmentblock = board.querySelector(`[data-row="${i}"][data-col="${j}"]`);
      let x = parseInt(placmentblock.getAttribute('data-isballer'));
      if (x === 0) {//if the i,j block is baller already or not.
        placmentblock.setAttribute('data-isballer', 1);
        baller_palced++;
      }
    }
    //*}
    //now lessgo to reavel them
    function showallballer(x) {
      for (let i = 0; i < ballers; i++) {
        let baller_block = board.querySelector(`[data-isballer="1"]`);
        baller_block.style.backgroundSize = "contain";
        baller_block.style.backgroundImage = "url('./cricketball.svg')";
        baller_block.setAttribute('data-isballer', 2);
        showallballer_called = 0;
      }
      if (x == 0) {  //lost
        document.getElementById("thegod").style.backgroundImage = "url('series_8.jpg')";
        board.removeEventListener("click", reveal);
        document.getElementById("teams").innerHTML = "Kalia Won, Better Luck Next Time!"
        // *kalia_audio.play();
      }
      if (x == 1) { //win
        document.getElementById("thegod").style.backgroundSize = "cover";
        let bg_rnd = Math.random() * 2;
        if (bg_rnd == 0) document.getElementById("thegod").style.backgroundImage = "url('series_6.jpg')";
        else document.getElementById("thegod").style.backgroundImage = "url('Bheem_the_fighter.jpg')";
        //*document.getElementById("teams").style.color = 'black';
        board.removeEventListener("click", reveal);
        document.getElementById("teams").innerHTML = "Bheem Won, Nice Job!"
        bheem_audio.play();
        if (music_count == 1) background_audio.pause();
      }
      if (x == 2) { //draw
        document.getElementById("thegod").style.backgroundImage = "url('wp9141271-mighty-little-bheem-wallpapers.jpg')";
        board.removeEventListener("click", reveal);
        document.getElementById("teams").innerHTML = "Ahh!,So Close, Nvm Nice Try!"
        //*document.getElementById("heading").style.color = 'rgb(51,79,131)';
      }
      showallballer_called = 0;
    }
    function reveal(event) {
      let block_clicked = event.target;
      let x = parseInt(block_clicked.getAttribute('data-isballer'));
      //*if(bhim_scor<kalia_score){
      if (x === 0) {
        block_clicked.style.backgroundSize = "contain";
        block_clicked.style.backgroundImage = "url('./otherone.png')";
        bheem_score++;
        document.getElementById("score1").innerHTML = bheem_score;
        block_clicked.setAttribute('data-isballer', -1);
        reveal_audio.play();
        if (bheem_score > kalia_score) {
          showallballer(1);
        }
      }
      //*}
      //*else
      else if (x != -1) {
        if (bheem_score == kalia_score) {
          showallballer(2);
          baller_audio.currentTime = 0.1;
          if (music_count == 1) background_audio.pause();
          baller_audio.play();
          setTimeout(function () {
            witch_audio.play();
          }, 1000);
        }
        else {
          showallballer(0);
          baller_audio.currentTime = 0.1;
          if (music_count == 1) background_audio.pause();
          baller_audio.play();
          setTimeout(function () {
            kalia_audio.play();
          }, 1000);
        }
      }
    }
    board.addEventListener("click", reveal);//click calls reveal function
    function just_for_style() {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          let style_block = board.querySelector(`[data-row="${i}"][data-col="${j}"]`);
          style_block.style.backgroundSize = "contain";
          style_block.style.backgroundImage = "url('./cricketground.png')";
          let x = parseInt(style_block.getAttribute('data-isballer'));//*baller fixing error
          let clicked = false;
          style_block.onclick = function () {
            clicked = true;
          }
          style_block.onmouseover = function () {
            hover_audio.currentTime = 0.2;
            hover_audio.play();
            if (!clicked && showallballer_called == 1) {
              style_block.style.backgroundImage = "url('./cricketgroundhover.png')";
            }
            style_block.style.borderColor = 'rgb(83, 94, 65)';
          }
          style_block.onmouseout = function () {
            //hover_audio.pause();
            if (!clicked && showallballer_called == 1) {
              style_block.style.backgroundImage = "url('./cricketground.png')";
            }
            style_block.style.borderColor = 'rgb(99, 173, 75)';
          }
        }
      }
    }
    just_for_style();
  }
}