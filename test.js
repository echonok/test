const postsAddress = 'https://jsonplaceholder.typicode.com/posts';
const usersAddress = 'https://jsonplaceholder.typicode.com/users';

const httpGet = (address) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", address, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

const createData = (postsAddress, usersAddress) => {
  postsData = JSON.parse(httpGet(postsAddress));
  usersData = JSON.parse(httpGet(usersAddress));
  
  const someData = postsData.reduce((acc, elem) => {
    const { userId, id, title } = elem;
    
    const ourUser = usersData.filter(user => {
      return user.id === userId;
    });
    
    let someNote = {
      id: id,
      author: ourUser[0].name,
      title: title,
    };

    acc.push(someNote);
    return acc;
  }, []);

  return someData;
}

const getNumberOfChunks = (data) => {
  return numberOfChunk = (Math.ceil(data.length/30));
}

const drawTable = (data, page = 1, size = 30) => {

  const numberOfChunks = getNumberOfChunks(createData(postsAddress, usersAddress));

  const firstRecord = page * size - 30;
  const lastRecord = page * size;

  let html = '';
  html += '<tr>';
  for( let j in data[0] ) {
    html += '<th>' + j + '</th>';
  }
  html += '</tr>';
  for( let i = firstRecord; i < lastRecord; i++) {
    html += '<tr>';
    for( let j in data[i] ) {
      html += '<td>' + data[i][j] + '</td>';
    }
  }

  document.getElementById('container').innerHTML = '<table>' + html + '</table>';
  for (i = 1; i <= numberOfChunk; i++) { 
    let btn = document.createElement("button");
    let t = document.createTextNode(`${i}`);
    btn.appendChild(t);
    btn.id = `chunk${i}`;
    //btn.onclick = doFunction;
    document.body.appendChild(btn)
  }

  for (i = 1; i <= numberOfChunk; i++) { 
    //document.getElementById(`chunk${i}`).addEventListener("click", drawTable(data, numberOfChunk));
    //document.getElementById(`chunk${i}`).addEventListener("click", alert(`chunk${i}`));
    //document.getElementById(`chunk${i}`).addEventListener("click", doFunction);
  }

  //document.getElementById("chunk1").onclick = drawTable(data, i);

}

doFunction = (cry = 'aaa') => {
  alert(cry);
}

const fullData = createData(postsAddress, usersAddress);
const numberOfChunks = getNumberOfChunks(createData(postsAddress, usersAddress));

drawTable(fullData, 4);

//document.getElementById("chunk1").addEventListener("click", doFunction());
