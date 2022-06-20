import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private ticketService: TicketService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  employesResData: any[] = [];
  employesResLabel: any[] = [];

  ticketMoisData: any[] = [];

  moyenneDate : any []= []

  statuts: any[] = [];
  manuels: any = [];
  feedBacks : any[] = []
  nbrEmp : any
  nbrDep : any
  nbrTicket : any

  ngOnInit(): void {
    this.ticketService.afficherStat().subscribe((res) => {
      if(res){
        for (const emp of res.notes) {
          this.employesResLabel.push(emp._id.nomEmp + ' ' + emp._id.prenomEmp);
          this.employesResData.push(emp.count);
        }
  
        for (let i = 1; i <= 12; i++) {
          let number = this.verify(res.ticketParMois, i);
          if (number != -1) {
            this.ticketMoisData.push(number);
          } else {
            this.ticketMoisData.push(0);
          }
        }
  
        for (const manuel of res.manuels) {
          this.manuels.push(manuel.count);
        }
  
  
  
        this.moyenneDate = res.moyenneDate ;
        this.feedBacks = res.feedBacks 
        this.statuts = res.statuts;
        this.nbrDep = res.departement ; 
        this.nbrEmp = res.employe ;
        this.nbrTicket = res.ticket
      }
      
    });
  }

  verify(array: any, i: number) {
    for (const element of array) {
      if (element._id == i) return element.number;
    }
    return -1;
  }

  lineChartData: ChartDataSets[] = [
    {
      data: this.employesResData,
      label: 'Tickets',
    },
  ];
  lineChartLabels: Label[] = this.employesResLabel;
  lineChartColor: Color[] = [
    {
      borderColor: '',
      backgroundColor: '#0D836C',
    },
  ];
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
  // ***********************

  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartColor: Color[] = [
    {
      backgroundColor: ['#2980B9', '#ffa600', '#ff6361      '],
    },
  ];
  pieChartLabels: Label[] = [['Admin'], ['Assistant'], 'Client'];
  pieChartData: SingleDataSet = this.manuels;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  // ************************
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartColor: Color[] = [
    {
      borderColor: '',
      backgroundColor: '#0D836C',
    },
  ];
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: this.ticketMoisData, label: 'Les ticket par mois' },
  ];
}
