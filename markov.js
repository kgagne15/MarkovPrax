/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    //creates new map
    let chains = new Map();

    //for each word in this.words, it will set the next word to either the next word or null
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i]
      let nextWord = this.words[i + 1] || null;
      //if chains contains a word, get word and push nextWord
      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } 
      //else set word to nextWord
      else {
        chains.set(word, [nextWord])
      }
      
    }
  }
  //what is static?
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    //pick a random key to begin
    let keys = Array.from(this.chains.keys())
    let key = MarkovMachine.choice(keys);
    let out = [];

    //while out.length is less than numWords input and key is not null, push key to out
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    //returns output with words joined on space
    return out.join(" ");
  }
}

module.exports = { MarkovMachine };