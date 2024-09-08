import { Component, OnInit } from '@angular/core';
import { DonutService } from '../../service/donut.service';
import { donutModel } from '../../model/donutModel';
import { Observable } from 'rxjs';
declare var google:any;

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrl: './chartjs.component.css'
})
export class ChartjsComponent implements OnInit{
 /*   constructor(private donutService:DonutService){}
  ngOnInit(): void {
    var dataDonut=this.donutService.getData();
     console.log("data"+dataDonut)
    google.charts.load("current", {packages:["corechart"]});
    this.buidChart(dataDonut);
  }
  buidChart(dataDonut :donutModel[]){
    var renderchart=(chart:any)=>{
      // var data = google.visualization.arrayToDataTable([
      //   ['Task', 'Hours per Day'],
      //   ['Work',     11],
      //   ['Eat',      2],
      //   ['Commute',  2],
      //   ['Watch TV', 2],
      //   ['Sleep',    7]
      // ]);
      var donutChartItem=[];
      donutChartItem.push(['Task', 'Hours per Day'],)
      dataDonut.forEach(item=>{
        donutChartItem.push([ item.nomAlarme,item.nomBreOcurence])
      })
      var data = google.visualization.arrayToDataTable(donutChartItem)
      var options = {
        pieHole: 0.4,
        legend:'bottom',
        width:300,
        height:300
      };
      chart().draw(data,options);
    }
    var donutChart =()=>new google.visualization.PieChart(document.getElementById('donutchart')); 
    var callback=()=>renderchart(donutChart);
    google.charts.setOnLoadCallback(callback);
  }
  */
  constructor(private donutService: DonutService) { }

  ngOnInit(): void {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => {
      this.donutService.getData().subscribe(dataDonut => {
        console.log(dataDonut)
        this.buildChart(dataDonut);
      });
    });
  }

  buildChart(dataDonut: any[]): void {
    const donutChart = new google.visualization.PieChart(document.getElementById('donutchart'));
    const donutChartItem = [['Task', 'Hours per Day']];
    dataDonut.forEach(item => {
      donutChartItem.push([item[0], item[1]]);
    });
    const data = google.visualization.arrayToDataTable(donutChartItem);
    const options = {
      pieHole: 0.4,
      legend: 'bottom',
      width: 300,
      height: 300
    };
    donutChart.draw(data, options);
  }
}
