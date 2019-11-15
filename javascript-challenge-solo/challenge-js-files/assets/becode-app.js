/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 
Your name :     
Date :  
Contact information : 
What does this script do ? 
...
*/

// Récupération des données//
let data = []
const tabFirst = document.getElementById("table1")

let year = tabFirst.getElementsByTagName("tr")[1].getElementsByTagName("th");
yearData = []

let countryData = tabFirst.getElementsByTagName("tr")
countryData = []

let donneeData = tabFirst.querySelectorAll("tr")
donneeData = [...donneeData]



for (let i = 2; i < year.length; i++) {
    let content = year[i].innerHTML;
    yearData.push(content);
}


for( let i=2; i < donneeData.length; i++){
    data.push(donneeData[i].textContent);  
}

for( let i=0; i < data.length; i++){
    data[i] = data[i].replace(/\s+/g, ' ').trim();
   data[i] = data[i].split(" ");
   data[i].shift();
for(let l = 1; l < data[i].length; l++){
    data[i][l] = data[i][l].replace(",", ".");
    parseFloat(data[i][l]);
}
}

for(i = 0; i < data.length; i++){
    countryData.push(data[i][0]);
    data[i].shift();
}
console.log(yearData)
console.log(countryData)
console.log(data)


//Création du graphique//
data = data[4]
const w = 700
const h = 500

const svg = d3.select("caption")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              .style("background-color", "white");

const min = d3.min(data, d => d);
const max = d3.max(data, d => d);
const extent = d3.extent(data, d => d);

const y = d3.scaleLinear()
            .domain([0, max])
            .range([0, 400]);

const x = d3.scaleBand()
            .domain(yearData)
            .range([0, 700])


              svg.selectAll("rect")
                 .data(data)
                 .enter()
                 .append("rect")
                 .attr("fill", "grey")
                 .attr("width", 30)
                 .attr("height", (d, i)=> y(d))
                 .attr('x', function (d,i){return x(yearData[i])})
                 .attr("y", (d, i) => h - y(d))
                 
                 
                 
                 

              


              
              
              









