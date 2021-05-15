let byDistrict = []
let districts = []



const groupByDistrict = data => {
  return d3.group(data, d => d.District)
}


const createGraph = (data, iter) => {
  const yScale = d3.scaleBand()
    .domain(data.map( datapoint => datapoint.Category))
    .rangeRound([0, 500])
    .padding(0.1)
  const xScale = d3.scaleLinear().domain([100, 0]).range([200, 0])

  const findLargestValue = () => {
    return Math.max( ...data.map( item => item.salesInNumber))
  }

  const graphContainer = d3.select(".graphsContainer")
    .append("div")
    .classed("graphContainer", true)
    .attr("id", `container${iter}`)

  const name = d3.select(`#container${iter}`)
    .append("p")
    .classed("districtName", true)
    .text(data[0].District)

  const svg = d3.select(`#container${iter}`)
    .append("svg")
    .attr("id", `graph${iter}`)

  const container = d3.select(`#graph${iter}`)
    .classed('container', true)
    .style('width', `${Math.ceil(findLargestValue()) * 2.2}px`)

  const bars = container
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('height', yScale.bandwidth())
    .attr('width', (data) =>  xScale(data.salesInNumber))
    .attr('y', data => yScale(data.Category))
    .attr('x',  0)
}

const createLabels = labelsArr => {
  const yScale = d3.scaleBand()
    .domain(labelsArr)
    .rangeRound([0, 500])
    .padding(0.1)

  const labelsContainer = d3.select(".graphsContainer")
    .append("div")
    .attr("id", `labelsContainer`)

  const container = d3.select(`#labelsContainer`)
    .classed('labelsContainer', true)

  const labels = container
    .selectAll('.label')
    .data(labelsArr)
    .enter()
    .append('button')
    .classed('label', true)
    .style('height', `${500 / labelsArr.length}px`)
    .text(data => data)
    //.on('click', data => sortDistrictsByCategory(data))
    .on('click', data => sortDistrictsByCategory(data.target.innerText))
}

const sortDistrictsByCategory = (category) => {
  byDistrict = byDistrict.sort( (a, b) => b.find(e => e.Category == category).salesInNumber -  a.find(e => e.Category == category).salesInNumber)

  d3.select(".graphsContainer").html("");

  createLabels (byDistrict[0].map(item => item.Category))
  districts.map( (dist, iter) => {
    createGraph(byDistrict[iter], iter)
  })
}

d3.csv("./data1.csv")
  .then( data => groupByDistrict(data) )
  .then( grouped => {
      districts = Array.from(grouped.keys())

      byDistrict = districts.map( district => {
        let districtArr = grouped.get(district)
        return (
          districtArr.map( category => {
            return {...category, salesInNumber: Number(category["This Year Sales"].slice(1)) / 10000 }
          })
        )
      })

      console.log(byDistrict)

      createLabels (byDistrict[0].map(item => item.Category))
      districts.map( (dist, iter) => {
        createGraph(byDistrict[iter], iter)
      })
  })


