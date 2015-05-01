'use strict';

/*******************

Example URL for request: https://spreadsheets.google.com/feeds/list/YOUR_SHEET_ID/SHEET_INDEX/public/values?alt=json
It's important to use that URL format - some other endpoints google offers do not provided the auto prefixed gsx$ properties on which this function relies.
SHEET_INDEX is 1 based (I know, right?)

param o: the response json (object) returned from your google sheet request

********************/

function googleSheetExtract(o) {
  
  if(typeof(o) !== 'object') {
    throw new Error('Argument 1 must be an object');
  }
  
  if(typeof(o.feed) === 'undefined') {
    throw new Error('Provided object does not contain the feed item');
  }
  
  if(typeof(o.feed.entry) === 'undefined') {
    throw new Error('Provided object does not contain the feed.entry item');
  }
    
  var out = [];
  var _row = {};
  var row = {};
  
  for(var i in o.feed.entry) {
    _row = o.feed.entry[i];
    row = {};
    
    for(var k in _row) {
      k.substring(0,4) === 'gsx$' ? row[k.substring(4)] = _row[k].$t : null;
    }
    
    out.push(row);
  }
  return out;
}