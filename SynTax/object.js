var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]);

var i = 0;
while(i < members.length) {
  console.log('arrayloop : ' + members[i]);
  i = i + 1;
}

var roles = {
  'programmer' : 'egoing',
  'designer' : 'k8805',
  'manger' : ' hoya'
}
console.log(roles.designer);

for(var name in roles) {
  console.log('object : ' + name + ' : ' + roles[name]);
}
