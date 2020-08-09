const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

  // Init word 
  let randomWord;

  // score 
  let score = 0;

  // init time
  let time = 10;

  let difficulty = localStorage.getItem('difficulty')!== null? 
  localStorage.getItem('difficulty') : 'medium'; 
  
  // Set Difficulty 
  difficultySelect.value = localStorage.getItem('difficulty')!== null? 
  localStorage.getItem('difficulty') : 'medium'; 
  
  // Focus on text on start 
  text.focus();

  // Start Counting Down 
  const timeInterval = setInterval(updateTime,1000);

  // Generate Randome Word from Array
  function getRandomeWord(){
    return words[Math.floor(Math.random() * words.length)];
  }

   // Add Word To Dom
   function addWordToDom(){
       randomWord = getRandomeWord();
       word.innerHTML = randomWord;
   }

   // Update Score
   function updateScore(){
       score++;
       scoreEl.innerHTML= score;
   }

   // update time 
   function updateTime(){
     time--;
     timeEl.innerHTML = time +'s';
     if(time===0){
            clearInterval(timeInterval);
            //end game
            gameOver();
     }
   }

   // Game Over 
   function gameOver(){
       endgameEl.innerHTML = `
       <h1> Time Ran Out</h1>
       <p> Your final score is ${score}</p>
       <button onclick="location.reload()">Realod</button>`;
    endgameEl.style.display ='flex';
    }
   addWordToDom();

   // Event listeners
   text.addEventListener('input',e =>{
       const insertTedTex = e.target.value;
       
       if(insertTedTex === randomWord){
         addWordToDom();

         updateScore();
         
         // clear 
         e.target.value = '';
         
        if(difficulty === 'hard'){
           time+=2;
        }else if(difficulty === 'medium'){
           time+=4
        }else{
            time+=6;
        }

         updateTime();
       }
   });

   // Setting btn click


   settingsBtn.addEventListener('click', () =>{
       settings.classList.toggle('hide');
   });


   //setting select 
   settingsForm.addEventListener('change', e =>{
       difficulty = e.target.value;
       localStorage.setItem('difficulty',difficulty);
   })
