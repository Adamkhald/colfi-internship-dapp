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
                data: [2100,1400,1600],
                backgroundColor: ['#4169E1','#0000CD', '#000080']
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