

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
    data[i][l] = data[i][l].replace(":", "0");
    parseFloat(data[i][l]);
}
}

for(i = 0; i < data.length; i++){
    countryData.push(data[i][0]);
    data[i].shift();
}

function chooseCountry() {

let chosenCountry = d3.select("#selectmenu")
                      .property("value")

let find = countryData.findIndex(x => x == chosenCountry)
let indice = find
let myDataGraph = data[indice] //J'ai du refaire une nouvelle variable pour les données si non => gros bug




const margin = {top:80, right:20, bottom:120, left:50};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;


const svg = d3.select("caption")
              .append('svg')
              .attr("height", 500)
              .attr("width", 800)
              .style("background", 'white');



const graph = svg.append('g')
                 .attr('width', graphWidth)
                 .attr('height', graphHeight)
                 .attr('transform', `translate(${margin.left}, ${margin.top})`);

const groupeX = graph.append('g')
                     .attr('transform', `translate(0, ${graphHeight})`);
const groupeY = graph.append('g');

const min = d3.min(myDataGraph, d => d);
const max = d3.max(myDataGraph, d => d);



const y = d3.scaleLinear()
            .domain([0, max])
            .range([graphHeight, 0]);

const x = d3.scaleBand()
            .domain(yearData)
            .range([0, 680])
            .paddingInner(0.3)
            .paddingOuter(0.2);


const rects = graph.selectAll('rect')
                   .data(myDataGraph);
                 
                 

rects.attr('width', x.bandwidth())
     .attr('height', function(d){return graphHeight - y(d)})
     .attr('fill', 'teal')
     .attr('x', function(d){return x(d)})
     .attr('y', function(d){return y(d)});

rects.enter()
     .append('rect')
     .attr('width', x.bandwidth())
     .attr('height', function(d,i){return graphHeight - y(d)})
     .attr('fill', 'grey')
     .attr('x', function (d,i){return x(yearData[i])})
     .attr('y', function(d){return y(d)});
     
     
const axeX = d3.axisBottom(x)
const axeY = d3.axisLeft(y)

groupeX.call(axeX);
groupeY.call(axeY);


d3.select("#selected-dropdown").text("first")

d3.select("select")
  .on("change",function(d){
    var selected = d3.select("caption").node().value
    d3.select("#selected-dropdown").text(selected)
});

d3.select("#selectmenu").on("change", () => {
    svg.remove()
    chooseCountry()
});

}


const select = d3.select('caption')
                 .insert("select", "svg")
                 .attr("id", 'selectmenu')
                 .style("margin-left", "50px");
                


                 select.selectAll('option')
                 .data(countryData)
                 .enter()
                 .append('option')
                 .text(function (d){return d})
                 .attr("value", function(d){return d});

chooseCountry();







