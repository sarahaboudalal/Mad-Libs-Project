/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

 const REGEX = /(?<word>\w+)(?<pos>\[[nva]\])?(?<punctuation>[\.,])?/;

 const POS_FULL_WORD = {
   n : "noun",
   v : "verb",
   a : "adjective",
 }
 
 function posFunction(param){
   let nRegex = /[[n]]/;
   let vRegex = /[[v]]/;
   let aRegex = /[[a]]/;
   if (nRegex.test(param) === true){
     return nRegex = POS_FULL_WORD["n"]
   } else if (vRegex.test(param) == true) {
     return vRegex = POS_FULL_WORD.v
   } else if (aRegex.test(param)){
     return aRegex = POS_FULL_WORD.a
   }
 }
 
 function parseStory(rawStory) {
   // Your code here.
   const rawWords = rawStory.split(" ")
   const results = [];
 
   for (let i = 0; i < rawWords.length; i++){
     const rawWord = rawWords[i];
     const groups = REGEX.exec(rawWord).groups
 
     results.push(
       {
         word: groups.word,
         pos: groups.pos ? posFunction(groups.pos) : undefined,
         punc: groups.punctuation,
       }
     )
   }
   return results; 
 }
 
 
 
 /**
  * All your other JavaScript code goes here, inside the function. Don't worry about
  * the `then` and `async` syntax for now.
  *
  * NOTE: You should not be writing any code in the global namespace EXCEPT
  * declaring functions. All code should either:
  * 1. Be in a function.
  * 2. Be in .then() below.
  *
  * You'll want to use the results of parseStory() to display the story on the page.
  */
 getRawStory()
 .then(parseStory)
 .then((processedStory) => {
   console.log(processedStory);
   const madlibsEdit = document.querySelector('.madLibsEdit')
   const madlibsPrev = document.querySelector('.madLibsPreview')
   
   for (let x = 0; x < processedStory.length; x++){
     let getWord = processedStory[x].word
     // console.log(getWord)
    
     if (processedStory[x].pos){
       const output = document.createElement('span')
       const placeholder = processedStory[x].pos;
       // console.log(placeholder)
       output.innerText = " " + placeholder;
       output.classList.add("spanOutput")
       madlibsPrev.appendChild(output)
 
       const input = document.createElement('input')
       input.placeholder = placeholder;
       input.maxLength = 20;
       input.classList.add("editInput")
       madlibsEdit.appendChild(input)
       input.setAttribute("placeholder", processedStory[x].pos)
     // input.oninput = () => {
     //   output.innerText = input.value;
     // }
       input.addEventListener('input', (e) => {
         
         if(input.value.length > 0){
           input.style.backgroundColor = "rgb(84, 240, 181)"
           output.innerText = " " + e.target.value
         } else {
           input.style.backgroundColor = "rgba(255, 255, 255, 0.6)"
           output.innerText = " " + placeholder;
         }
       })
     input.addEventListener('keydown', (e) => {
       if (e.keyCode == 13 ) { //13 means "enter"
         let nextInput = input
   
         if (!nextInput) { // iterates when there is a next input box through enter. Wriitng it this way is easier bc it is the default condition that we look for for our purpose. 
   
           
           return nextInput.focus()
         }
       }
     })
     //   if(e.keyCode === 13){
     //     console.log(e)
     //     let next = input.nextElementSibling;
     //     if(next != null){
     //       console.log(next);
     //       if (next.nodeName === 'INPUT'){
           
     //       next.focus();
     //      }
     //     } else {
     //       alert ('Done!')
     //     }
     //   }
     // })
       if(processedStory[x].punc !== undefined){
         const punctuationOutput = document.createElement("span")
         punctuationOutput.innerText = processedStory[x].punc
         madlibsPrev.appendChild(punctuationOutput)
   
         const punctuationInput = document.createElement("span")
         punctuationInput.innerText = processedStory[x].punc
         madlibsEdit.appendChild(punctuationInput)
       }
 
   } else {
     
     const outputWord = document.createElement("span")
     outputWord.innerText = " " + processedStory[x].word
     madlibsPrev.appendChild(outputWord)
     
     const inputWord = document.createElement("span")
     inputWord.innerText = " " + processedStory[x].word
     madlibsEdit.appendChild(inputWord)
     
     if(processedStory[x].punc !== undefined){
       const punctuationOutput = document.createElement("span")
       punctuationOutput.innerText = processedStory[x].punc
       madlibsPrev.appendChild(punctuationOutput)
 
       const punctuationInput = document.createElement("span")
       punctuationInput.innerText = processedStory[x].punc
       madlibsEdit.appendChild(punctuationInput)
     }}
      }})