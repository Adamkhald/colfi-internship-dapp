"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


import React from 'react'

const Doghnutchart = ({accounts}:DoughnutChartProps) => {
    const data = {
        datasets : [
            {
                label: 'Banks',
                data: [10000,2500,180],
                backgroundColor: ['#E91E63','#f75423ff', '#be2300ff']
            }
        ],
        labels: ['BNP', 'Société Générale', 'Crédit Agricole'],
    }
  return (
    
    <Doughnut 
        data={data}
        options = {{
            cutout: '55%' ,
            plugins: {
                legend: {
                    display : false
                }
            },
        }}
     />
  )
}

export default Doghnutchart