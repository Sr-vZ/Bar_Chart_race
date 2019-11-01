dataURL = 'https://gist.githubusercontent.com/johnburnmurdoch/2e5712cce1e2a9407bf081a952b85bac/raw/08cf82f5e03c619f7da2700d1777da0b5247df18/INTERBRAND_brand_values_2000_2018_decimalised.csv'
data = []
const delay = ms => new Promise(res => setTimeout(res, ms))
fetch(dataURL)
    .then(res => res.text())
    .then(text => {
        data = d3.csvParse(text)
        // console.log(d3.csvParse(text))
        //data = _.sortBy()
        for (i = 0; i < data.length; i++) {
            data[i]['year'] = parseFloat(data[i]['year'])
            data[i]['value'] = parseFloat(data[i]['value'])
            data[i]['lastValue'] = parseFloat(data[i]['lastValue'])
            data[i]['rank'] = parseInt(data[i]['rank'])
        }
        chartObj = drawChart()

        // console.log(chartObj)
        sorteddata = _.sortBy(data, ['year', 'rank'])

        years = _.uniq(_.map(sorteddata, 'year'))
        yearIndex = []
        for (i = 0; i < years.length; i++) {
            yearIndex[i] = sorteddata.findIndex(x => x.year === years[i])
        }

        for (let y = 0; y < yearIndex.length; y++) {
            // console.log(yearIndex[y])
            chartData = []
            chartLabel = []
            for (let i = 0; i < 20; i++) {
                // chartObj.data.datasets[0].data[i] = sorteddata[yearIndex[y] + i]['value']
                // chartObj.data.labels[i] = sorteddata[yearIndex[y] + i]['name']
                // await delay(5000)                    
                // requestAnimationFrame(() => {
                //     chartObj.update()
                // })
                // chartObj.update({
                //     // duration: 500,
                //     // easing: 'linear'
                // })
                // setInterval(chartObj.update(),500)
                chartData[i] = sorteddata[yearIndex[y] + i]['value']
                chartLabel[i] = sorteddata[yearIndex[y] + i]['name']
                setTimeout(() => {
                    chartObj.data.datasets[0].data[i] = sorteddata[yearIndex[y] + i]['value']
                    chartObj.data.labels[i] = sorteddata[yearIndex[y] + i]['name']
                    chartObj.data.datasets[0].label = years[y]
                    console.log(i, y)
                    // updateChart(chartObj, chartData, chartLabel)
                    chartObj.update()
                }, 3000)
            }
            
        }


        // setInterval(() => {

        // }, 200);





    })

function drawChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgba(255, 99, 132,.5)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {
            plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                    color: '#36A2EB'
                }
            }
        }
    })
    Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
        color: '#FE777B'
    })
    return chart
}

function updateChart(chartobj, data, labels) {
    for (i = 0; i < 10; i++) {
        chartObj.data.datasets[0].data[i] = data[i]
        chartObj.data.labels[i] = labels[i]
    }
    chartobj.update()
}