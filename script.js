!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).snarkdown=n()}(this,function(){var e={"":["<em>","</em>"],_:["<strong>","</strong>"],"*":["<strong>","</strong>"],"~":["<s>","</s>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};function n(e){return e.replace(RegExp("^"+(e.match(/^(\t| )+/)||"")[0],"gm"),"")}function r(e){return(e+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}return function t(o,a){var c,s,l,g,u,p=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm,f=[],i="",d=a||{},m=0;function h(n){var r=e[n[1]||""],t=f[f.length-1]==n;return r?r[1]?(t?f.pop():f.push(n),r[0|t]):r[0]:n}function $(){for(var e="";f.length;)e+=h(f[f.length-1]);return e}for(o=o.replace(/^\[(.+?)\]:\s*(.+)$/gm,function(e,n,r){return d[n.toLowerCase()]=r,""}).replace(/^\n+|\n+$/g,"");l=p.exec(o);)s=o.substring(m,l.index),m=p.lastIndex,c=l[0],s.match(/[^\\](\\\\)*\\$/)||((u=l[3]||l[4])?c='<pre class="code '+(l[4]?"poetry":l[2].toLowerCase())+'"><code'+(l[2]?' class="language-'+l[2].toLowerCase()+'"':"")+">"+n(r(u).replace(/^\n+|\n+$/g,""))+"</code></pre>":(u=l[6])?(u.match(/\./)&&(l[5]=l[5].replace(/^\d+/gm,"")),g=t(n(l[5].replace(/^\s*[>*+.-]/gm,""))),">"==u?u="blockquote":(u=u.match(/\./)?"ol":"ul",g=g.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),c="<"+u+">"+g+"</"+u+">"):l[8]?c='<img src="'+r(l[8])+'" alt="'+r(l[7])+'">':l[10]?(i=i.replace("<a>",'<a href="'+r(l[11]||d[s.toLowerCase()])+'">'),c=$()+"</a>"):l[9]?c="<a>":l[12]||l[14]?c="<"+(u="h"+(l[14]?l[14].length:l[13]>"="?1:2))+">"+t(l[12]||l[15],d)+"</"+u+">":l[16]?c="<code>"+r(l[16])+"</code>":(l[17]||l[1])&&(c=h(l[17]||"--"))),i+=s,i+=c;return(i+o.substring(m)+$()).replace(/^\n+|\n+$/g,"")}});

var keyList = JSON.parse(localStorage.getItem('keyList'));
if (!keyList) {
  localStorage.setItem('keyList', JSON.stringify([]));
  keyList = JSON.parse(localStorage.getItem('keyList'));
}

for (let i = 0; i < keyList.length; i++) {
  var node = document.createElement('li');
  node.innerHTML = snarkdown(JSON.parse(localStorage.getItem(keyList[i])));
  
  AddButtons(node, keyList[i]);
  document.getElementById("myUL").appendChild(node);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  
  let markdownHTML = snarkdown(inputValue);
  var t = document.createElement("div");
  t.innerHTML = markdownHTML;

  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    var newId = keyList[keyList?.length - 1] + 1 || 0;
    keyList.push(newId);
    localStorage.setItem('keyList', JSON.stringify(keyList));
    localStorage.setItem(newId, JSON.stringify(inputValue));

    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  AddButtons(li, newId);
}

function AddButtons(li, index) {
  var spanClose = document.createElement("SPAN");
  var spanEdit = document.createElement("SPAN");
  var closeTxt = document.createTextNode("\u00D7");
  var editTxt = document.createTextNode("↩");

  spanClose.title = "Delete";
  spanClose.className = "close";
  spanClose.appendChild(closeTxt);
  li.appendChild(spanClose);

  spanClose.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";

    var id = keyList.splice(keyList.findIndex((e) => e === index),1);
    localStorage.setItem('keyList', JSON.stringify(keyList));
    localStorage.removeItem(id);
  }
  
  spanEdit.title = "Edit";
  spanEdit.className = "edit";
  spanEdit.appendChild(editTxt);
  li.appendChild(spanEdit);

  spanEdit.onclick = function() {
    var id = keyList.splice(keyList.findIndex((e) => e === index),1);
    localStorage.setItem('keyList', JSON.stringify(keyList));
    document.getElementById("myInput").value = JSON.parse(localStorage.getItem(id));
    localStorage.removeItem(id);
    var div = this.parentElement;
    div.style.display = "none";
  }
}