import React from 'react';
import Chart from 'react-apexcharts';

interface VacancyProps {
    vacants: number;
    totalUnits: number;
}

export function Vacancy({vacants, totalUnits}: VacancyProps) {
    const occupied = totalUnits - vacants;
    const series = [occupied, vacants];
    const options = {
        labels: ['Occupied', 'Vacant'],
        chart: {
            type: 'donut'
        },
        legend: {
            position: 'bottom'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <div>
            <Chart options={options} series={series} type="donut" width="380" />
        </div>
    );
}
