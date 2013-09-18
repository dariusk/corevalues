/* global sharing */
var adjs = [];

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

function generate(nounPlural, verb) {
  var generatedText = adjs.pick().humanize() + '. ' + adjs.pick().humanize() + '. ' + adjs.pick().humanize() + '.';
  $('#content').html(generatedText);
}

function getWords(suppressGenerate) {
  $.when(
    $.ajax({
      url: 'http://api.wordnik.com/v4/words.json/randomWords?minCorpusCount=10000&minDictionaryCount=5&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&hasDictionaryDef=true&includePartOfSpeech=adjective&limit=1000&maxLength=22&api_key='+key.API_KEY,
      async: false,
      dataType:'json'
    })
  ).done(function(adj) {
    adjs = $.map(adj, function(el) { return el.word; });
    if (!suppressGenerate) {
      generate();
    }
  });
}

$('#generate').click(function() { generate(); });
getWords();
