import { Component, OnInit } from '@angular/core';
import { DonutService } from '../service/donut.service';
import { donutModel } from '../model/donutModel';
declare var google:any;
@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrl: './graphe.component.css'
})
export class GrapheComponent implements OnInit{
  constructor(private donutService:DonutService){}
  ngOnInit(): void {
    var dataDonut=this.donutService.getData().subscribe(dataDonut=>{
      //console.log("data",dataDonut)
      this.drawChart(dataDonut)
    });
    google.charts.load("current", {packages:["corechart"]});
  }
   drawChart(dataDonut :donutModel[]) {
    var donutChartItem=[];
      donutChartItem.push(['Task', 'Hours per Day'],)
      dataDonut.forEach(item=>{
        donutChartItem.push([ item.name,item.occurence])
      })
      var data = google.visualization.arrayToDataTable(donutChartItem)
    var options = {
      pieHole: 0.4,
      legend:'bottom',
      width:300,
      height:300
    };
    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
      chart.draw(data,options)
  }
}
