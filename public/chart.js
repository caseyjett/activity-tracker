const xlabels = [];
let ylabels = [0, 0, 0, 0]; //If I add more activities, I'll need to add 0 and then a line within the getData for loop

chartIt(); 


async function chartIt() {
await  getData(); 
const ctx = document.getElementById('chart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: xlabels,
        datasets: [{
            label: 'Fitness Activity',
            data: ylabels,
            backgroundColor:[
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'],
            borderWidth: 1
            }]
        }
    });
}

async function getData() {
    const response = await fetch('/all'); 
    const data = await response.json(); 
    console.log(data); 

    
    for (let i = 0; i < data.length; i++) {
        if (!xlabels.includes(data[i].activity)) {
            xlabels.push(data[i].activity);      
        }
        if (data[i].activity === 'trapeze') {
            ylabels[0] += 1;   
        }
        if (data[i].activity === 'running') {
            ylabels[1] += 1;   
        }
        if (data[i].activity === 'silks') {
            ylabels[2] += 1;   
        }
        if (data[i].activity === 'yoga') {
            ylabels[3] += 1;   
        }
    }
    console.log(ylabels)
}
