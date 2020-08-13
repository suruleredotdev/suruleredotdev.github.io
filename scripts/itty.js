/*
	© 2018 Nicholas Jitkoff

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var HEAD_TAGS = "PGJhc2UgdGFyZ2V0PSJfdG9wIj4K";
var HEAD_TAGS_EXTENDED =
  "PG1ldGEgY2hhcnNldD0idXRmLTgiPjxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgiPjxiYXNlIHRhcmdldD0iX3RvcCI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj5ib2R5e21hcmdpbjowIGF1dG87cGFkZGluZzoxMnZtaW4gMTB2bWluO21heC13aWR0aDozNWVtO2xpbmUtaGVpZ2h0OjEuNWVtO2ZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxzYW5zLXNlcmlmO3dvcmQtd3JhcDogYnJlYWstd29yZDt9PC9zdHlsZT4g";
var main = function() {
  var hash = window.location.hash.substring(1);
  if (hash.length < 3) {
    location.href = "/edit";
  } else {
    var iframe = document.getElementById("iframe");
    var link = document.getElementById("edit");
    var preamble = undefined;

    var slashIndex = hash.indexOf("/");
    var title = hash.substring(0, slashIndex);
    document.title = title.length
      ? decodeURIComponent(title.replace(/_/g, " "))
      : location.hostname;

    hash = hash.substring(slashIndex + 1);
    var editable = hash.charAt(0) == "?";
    if (editable) {
      hash = hash.substring(1);
    }
    if (hash.indexOf("data:") != 0) {
      var compresHEAD_TAGS_EXTENDED;
      preamble = HEAD_TAGS_EXTENDED;
      hash =
        "data:text/html;charset=utf-8;" +
        (compressed ? "bxze64," : "base64,") +
        hash;
    } else if (hash.indexOf("data:text/html;") == 0) {
      preamble = HEAD_TAGS;
    }

    var isIE = navigator.userAgent.match(/rv:11/);
    var isEdge = navigator.userAgent.match(/Edge\//);
    if ((isEdge || isIE) && location.href.length == 2083) {
      document.getElementById("warning").innerHTML =
        'Edge only supports shorter URLs (maximum 2083 bytes).<br>Larger sites may require a different browser.<br><a href="http://reference.bitty.site">Learn more</a>';
    }
    decompressDataURI(hash, preamble, function(hash) {
      if (!hash) return;
      dataToString(hash, function(content) {
        var doc = iframe.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.close();
      });
    });
  }
};
// THIS IS DISABLED WHEN USING IT AS A LIBRARY
// window.onhashchange = window.onload = main;

var BASE64_MARKER = ';base64,';
var LZMA64_MARKER = ';bxze64,';

function compressDataURI(dataURI, callback) {
  var base64Index = dataURI.indexOf(BASE64_MARKER);
  var base64 = dataURI.substring(base64Index + BASE64_MARKER.length);
  stringToZip(base64ToByteArray(base64), function(result) {
    callback(dataURI.substring(0, base64Index) + LZMA64_MARKER + result)    
  })
}

function base64ToByteArray(base64) {
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));
  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

function stringToZip(string, callback) {
  LZMA.compress(string, 9, function(result, error) {
    if (error) console.error(error);
    var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));
    return callback(base64String);
  });
}

function decompressDataURI(dataURI, preamble, callback) {
  var base64Index = dataURI.indexOf(LZMA64_MARKER);
  if (base64Index > 0) {
    var base64 = dataURI.substring(base64Index + LZMA64_MARKER.length);
    zipToString(base64, function(result) {
      stringToData(result, function(data) {
        if (!data) return callback(undefined);
        callback(dataURI.substring(0, base64Index) + BASE64_MARKER + (preamble || '') + data.split(',')[1])
      })
    })
  } else {
    callback(dataURI)
  }
}

function zipToString(data, callback) {
  var array = base64ToByteArray(data); 
  LZMA.decompress(array, function(result, error) {
    if (!(typeof result === 'string')) result = new Uint8Array(result)
    if (error) console.error(error);
    callback(result);
  });
}

function stringToData(string, callback) {
  if (!string.length) return callback("");
  var a = new FileReader();
  a.onload = function(e) { callback(e.target.result.replace()) }
  a.readAsDataURL(new Blob([string], {encoding:"UTF-8",type:"text/html;charset=UTF-8"}));
}

function dataToString(data, callback) {
  var blob = dataURItoBlob(data)
  var reader = new FileReader();
  reader.onload = function(e) { callback(reader.result) }
  reader.readAsText(blob);
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var arrayBuffer = new ArrayBuffer(byteString.length);
  var _ia = new Uint8Array(arrayBuffer);
  for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
  }
  var dataView = new DataView(arrayBuffer);
  var blob = new Blob([dataView.buffer], { type: mimeString });
  return blob;
}
