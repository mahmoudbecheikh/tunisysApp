import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private ticketService: TicketService) {}

  employesResData: any[] = [];
  employesResLabel: any[] = [];


  ngOnInit(): void {
    this.ticketService.afficherStat().subscribe((res) => {
      for (const emp of res.notes) {
        this.employesResLabel.push(emp._id.nomEmp + ' ' + emp._id.prenomEmp);
        this.employesResData.push(emp.count);
      }
    });
  }
  lineChartData: ChartDataSets[] = [
    {
      data: this.employesResData,
      label: 'Tickets',
      // backgroundColor: ['#ff0000', '#8e5ea2', '#3cba9f', '#454545', '#c45850'],
      // hoverBackgroundColor: [
      //   '#ff0000',
      //   '#8e5ea2',
      //   '#3cba9f',
      //   '#454545',
      //   '#c45850',
      // ],
    },
  ];
  lineChartLabels: Label[] = this.employesResLabel;
  lineChartColor : Color[] = [
    {
      borderColor :'',
      backgroundColor : '#21618C'
    }
  ]
  lineChartOptions = {
    legend: { display: false },

    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    title: {
      display: true,
      text: 'La performance des agents',
      fontSize: 18,
    },
    responsive: true,
  };
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'horizontalBar';

  
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
}
