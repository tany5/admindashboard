import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, Label, MultiDataSet, ThemeService } from 'ng2-charts';
import { AdmindashboardService } from './admindashboard.service'
import * as Chart from 'chart.js';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-super-admindashboard',
  templateUrl: './super-admindashboard.component.html',
  styleUrls: ['./super-admindashboard.component.scss']
})
export class SuperAdmindashboardComponent implements OnInit {



  studentCount = 0;
  questionCount = 0;
  testCount = 0;
  productCount = 0;
  allProduct: any = []
  searchText: any
  orderHistory: any = []

  searchStudent: any


  barPercentage: any

  public barChartOptions: ChartOptions = {
  
    responsive: true,
     legend: { 
        labels: { fontColor: '#000'},
        
      },
    scales: {
      yAxes: [{       
        ticks: {
          beginAtZero: true,
          fontColor: '#000'
        }
      }],
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    animation: {
      onComplete: function () {
        const chartInstance = this.chart,
          ctx = chartInstance.ctx;

        const fontSize = 16;
        const fontStyle = '600';
        const fontFamily = 'Open Sans';
        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#000';

        this.data.datasets.forEach(function (dataset, i) {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            if (dataset.data[index] != 0) {
              const data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 0);
            }
          });
        });
      }
    }

  };

  public colors = [
    { backgroundColor: "#3a7afe", fontColor: '#ffffff' },
    { backgroundColor: "green" },
    { backgroundColor: "blue" },
    { backgroundColor: "yellow" }
  ];

  public colors2 = [
    { backgroundColor: "#fff" },
    { backgroundColor: "#fff" },
    { backgroundColor: "#fff" },
    { backgroundColor: "#fff" }
  ];

  data: any = []
  weekData: any = []
  yearData:  any = []
  showCanvas: boolean = false
  month: string
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  selectedLastDate: any

  public barChartWeekLabels: Label[] = [];
  public barChartYearLabels: Label[] = [];

  public barChartLegend: any = { legend: { display: true, labels: { fontColor: '#fff' } } }
  public barChartPlugins = [pluginDataLabels];

  barChartData: ChartDataSets[] = []
  barChartWeekData: ChartDataSets[] = []
  barChartYearData: ChartDataSets[] = []

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutLiveClassChartLabels: Label[] = [];
  public doughnutLiveClassChartData: MultiDataSet = [];

  public doughnutChartColors: Color[] = [{
    backgroundColor: ['#f1c40f', '#2ecc71', '#e74c3c', '#3a7afe', '#ff9650', '#39f9d6', '#a8823a','#00aa5a', '#84898b', '#382933', '#120078', '#39311d', '#30475e', '#52057b', '#52057b', '#d789d7', '#133b5c', '#290001']
   }];
  year: any = [2018, 2019, 2020, 2021]

  date = new Date();
  currentYear = (this.date.getFullYear()).toString();
  currentMonth = (this.date.getMonth() + 1).toString();
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  campaignThree: FormGroup;

  today: any // This date will be used for the min date  
  dateFilterFn: any


  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,   
    legend: { position: 'right' }
  //   tooltips: {
  //     callbacks: {
  //         labelColor: function(tooltipItem, chart) {
  //             return {
  //                 borderColor: 'rgb(255, 0, 0)',
  //                 backgroundColor: 'rgb(255, 0, 0)',
  //                 fontColor:'rgb(255,255,255)'
  //             };
  //         },
  //         labelTextColor: function(tooltipItem, chart) {
  //             return '#543453';
  //         }
  //     }
  // }
  };
  currentDougnutYear    = (this.date.getFullYear()).toString();
   currentDougnutMonth  = (this.date.getMonth() + 1).toString();

   currentLiveClassDougnutYear    = (this.date.getFullYear()).toString();
   currentLiveClassDougnutMonth  = (this.date.getMonth() + 1).toString();


  

  constructor(private service: AdmindashboardService, private _formbuilder: FormBuilder, private themeService: ThemeService) {

    this.currentMonth.toString()
    this.currentYear.toString()

    this.currentDougnutMonth.toString()
    this.currentDougnutYear.toString()

    this.currentLiveClassDougnutMonth.toString()
    this.currentLiveClassDougnutYear.toString()

   

    this.service.getStudentCount().subscribe(
      (res) => {
        this.studentCount = res['student_list'].length
      })

    this.service.getQuestionCount().subscribe(
      (res) => {
        this.questionCount = res['question_count']
      })

    this.service.geTestCount().subscribe(
      (res) => {
        this.testCount = res['test_count']
      })

    this.service.getProductCount().subscribe(
      (res) => {
        this.productCount = res['product_count']
      })

    this.service.geAllProduct().subscribe(
      (res) => {
        this.allProduct = res['product_list']
      })

    this.service.orderHistory().subscribe(
      (res) => {
        this.orderHistory = res['order_history_details']
      })

    this.service.getStudentByMonth((this.currentMonth), this.currentYear).subscribe(
      (res) => {
        this.data = []
        for (let i = 0; i < res['student_month'].length; i++) {

          this.data.push(res['student_month'][i]['student_count'])
          this.month = (i + 1).toString()
          this.barChartLabels.push('Day ' + this.month)
        }
        this.barChartData = [
          { data: this.data, label: 'Student Count' }
        ];

        this.showCanvas = true

      })

      this.service.generateDougnutChart().subscribe(
        (res)=> {
         
          this.doughnutChartData = []
          this.doughnutChartLabels = []
          for(var i=0; i<res['dougnut_chart'].length; i++) {
            this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
            this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])            
          }

          //doughnutChartData
      })


      this.service.generateVideoCLassChart().subscribe(
        (res)=> {
         console.log(res)
          this.doughnutLiveClassChartData = []
          this.doughnutLiveClassChartLabels = []
          for(var i=0; i<res['dougnut_chart'].length; i++) {
            this.doughnutLiveClassChartData.push(res['dougnut_chart'][i]['count'])
            this.doughnutLiveClassChartLabels.push(res['dougnut_chart'][i]['product_name'])            
          }

          //doughnutChartData
      })


  }


  get sortData() {
    return this.orderHistory.sort((a, b) => {
      return <any>new Date(b.created_date) - <any>new Date(a.created_date);
    });
  }

  ngOnInit(): void {

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = this._formbuilder.group({
      start: new Date(year, month, 1),
      end: new Date(year, month, 7)
    })

    this.campaignTwo = this._formbuilder.group({
      start: new Date(year, month, 1),
      end: new Date(year, month, 7)
    })

    this.campaignThree = this._formbuilder.group({
      start: new Date(year, month, 1),
      end: new Date(year, month, 7)
    })

    this.dateFilterFn = (date: Date) => ![0, 7].includes(date.getDay());




  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }





  removeChar(string) {
    var res = string.substring(0, 20);
    return res + ' ...'
  }

  removeProductChar(string) {
    var res = string.substring(0, 30);
    return res + ' ...'
  }

  getStudentValueByMonth(month) {

    this.showCanvas = false
    this.currentMonth = month

    this.data = []
    this.barChartLabels = []

    this.service.getStudentByMonth((this.currentMonth), this.currentYear).subscribe(
      (res) => {
        console.log(res['student_month'])
        for (let i = 0; i < res['student_month'].length; i++) {

          this.data.push(res['student_month'][i]['student_count'])
          this.month = (i + 1).toString()
          this.barChartLabels.push('Day ' + this.month)
        }
        this.barChartData = [
          { data: this.data, label: 'Student Count' }
        ];
        console.log(this.barChartData)
        this.showCanvas = true

      })
  }

  getStudentValueByYear(year) {


    this.showCanvas = false
    this.currentYear = year

    this.data = []
    this.barChartLabels = []

    this.service.getStudentByMonth((this.currentMonth), this.currentYear).subscribe(
      (res) => {
        console.log(res['student_month'])
        for (let i = 0; i < res['student_month'].length; i++) {

          this.data.push(res['student_month'][i]['student_count'])
          this.month = (i + 1).toString()
          this.barChartLabels.push('Day ' + this.month)
        }
        this.barChartData = [
          { data: this.data, label: 'Student Count' }
        ];
        console.log(this.barChartData)
        this.showCanvas = true

      })
  }


  returnString(string) {
    return string.toString()
  }


  selectStartDate(start) {
    this.showCanvas = false
    this.weekData = []
    this.barChartWeekLabels = []
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    var days = 6; // Days you want to subtract
    var todate = new Date(start);
    var lastDate = new Date(todate.getTime() + (days * 24 * 60 * 60 * 1000));

    this.campaignOne.reset()

    this.campaignOne.setValue({
      start: todate,
      end: lastDate
    })

    var lastDayVal = this.campaignOne.get('end').value
    var startDayVal = this.campaignOne.get('start').value

    var fromDate = startDayVal.getFullYear() + '-' + (startDayVal.getMonth() + 1) + '-' + startDayVal.getDate()
    var toDate = lastDayVal.getFullYear() + '-' + (lastDayVal.getMonth() + 1) + '-' + lastDayVal.getDate()


    this.service.getStudentByWeek(fromDate, toDate).subscribe(
      (res) => {
        this.weekData = []
        this.barChartWeekLabels = []
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        for (let i = 0; i < res['student_week'].length; i++) {
          this.weekData.push(res['student_week'][i]['student_count'])
          var d = new Date(res['student_week'][i]['created_date']);
          var n = weekday[d.getDay()];
          this.barChartWeekLabels.push(n)
        }
        this.barChartWeekData = [
          { data: this.weekData, label: 'Student Count' }
        ];

        this.showCanvas = true
      })
  }

  getWeekData() {
    
    this.showCanvas = false
    var days = 7; // Days you want to subtract
    var todate = new Date();
    var lastDate = new Date(todate.getTime() - (days * 24 * 60 * 60 * 1000));

    var fromDate = todate.getFullYear() + '/' + (todate.getMonth() + 1) + '/' + todate.getDate()
    var toDate = lastDate.getFullYear() + '/' + (lastDate.getMonth() + 1) + '/' + lastDate.getDate()

    this.service.getStudentByWeek(fromDate, toDate).subscribe(
      (res) => {
        this.weekData = []
        this.barChartWeekLabels =[]
        this.showCanvas = false
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";


        for (let i = 0; i < res['student_week'].length; i++) {
          this.weekData.push(res['student_week'][i]['student_count'])
          var d = new Date(res['student_week'][i]['created_date']);
          var n = weekday[d.getDay()];
          this.barChartWeekLabels.push(n)
        }
        this.barChartWeekData = [
          { data: this.weekData, label: 'Student Count' }
        ];
        this.showCanvas = true


      })
  }


  getYearData() {
    var todate = new Date();
    var year = todate.getFullYear()
    this.showCanvas = false
    this.service.getStudentByYear(year).subscribe(
      (res) => {
        
        this.yearData = []
        this.barChartYearData = []
        this.barChartYearLabels = []
        for (let i = 0; i < res['student_year'].length; i++) {          
          this.yearData.push(res['student_year'][i]['student_count'])
          this.barChartYearLabels.push(res['student_year'][i]['created_date'])
        }
        this.barChartYearData = [
          { data: this.yearData, label: 'Student Count' }
        ];

        
        this.showCanvas = true
      })
  }



  getStudentValueByOnlyYear(year) {
    this.showCanvas = false    
    this.service.getStudentByYear(year).subscribe(
      (res) => {
       
        this.yearData = []
        this.barChartYearData = []
        this.barChartYearLabels = []
        for (let i = 0; i < res['student_year'].length; i++) {         
          this.yearData.push(res['student_year'][i]['student_count'])
          this.barChartYearLabels.push(res['student_year'][i]['created_date'])
        }
        this.barChartYearData = [
          { data: this.yearData, label: 'Student Count' }
        ];       
        this.showCanvas = true
      })

  }


  




  selectDongutStartDate(start) {
    this.showCanvas = false
    this.weekData = []
    this.barChartWeekLabels = []
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    var days = 6; // Days you want to subtract
    var todate = new Date(start);
    var lastDate = new Date(todate.getTime() + (days * 24 * 60 * 60 * 1000));

    this.campaignTwo.reset()
    

    this.campaignTwo.setValue({
      start: todate,
      end: lastDate
    })

    

    var lastDayVal = this.campaignTwo.get('end').value
    var startDayVal = this.campaignTwo.get('start').value

    

    var fromDate = startDayVal.getFullYear() + '-' + (startDayVal.getMonth() + 1) + '-' + startDayVal.getDate()
    var toDate = lastDayVal.getFullYear() + '-' + (lastDayVal.getMonth() + 1) + '-' + lastDayVal.getDate()


    this.service.generateWeekDougnutChart(fromDate, toDate).subscribe(
      (res)=> {
        console.log(res)
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])
          console.log(this.doughnutChartData)
        }

        //doughnutChartData
    })
  }

 


  getStudentDougnutValueByOnlyYear(year) {    
    this.service.generateYearDougnutChart(year).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })
  }


  getDougnutWeekData() {

    var days = 7; // Days you want to subtract
    var todate = new Date();
    var lastDate = new Date(todate.getTime() - (days * 24 * 60 * 60 * 1000));

    var fromDate = todate.getFullYear() + '-' + (todate.getMonth() + 1) + '-' + todate.getDate()
    var toDate = lastDate.getFullYear() + '-' + (lastDate.getMonth() + 1) + '-' + lastDate.getDate()


    this.service.generateWeekDougnutChart(fromDate, toDate).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })

  }



  getDougnutWeekData2() {

    var days = 7; // Days you want to subtract
    var todate = new Date();
    var lastDate = new Date(todate.getTime() - (days * 24 * 60 * 60 * 1000));

    var fromDate = todate.getFullYear() + '-' + (todate.getMonth() + 1) + '-' + todate.getDate()
    var toDate = lastDate.getFullYear() + '-' + (lastDate.getMonth() + 1) + '-' + lastDate.getDate()


    this.service.generateVideoCLassWeekDougnutChart(fromDate, toDate).subscribe(
      (res)=> {
       console.log(res)     

        this.doughnutLiveClassChartData = []
        this.doughnutLiveClassChartLabels = []

        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutLiveClassChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutLiveClassChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })

  }




  selectDougnutStartDate(start) {
    this.showCanvas = false
    this.weekData = []
    this.barChartWeekLabels = []
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    var days = 6; // Days you want to subtract
    var todate = new Date(start);
    var lastDate = new Date(todate.getTime() + (days * 24 * 60 * 60 * 1000));

    this.campaignTwo.reset()
    this.campaignThree.reset()

    this.campaignTwo.setValue({
      start: todate,
      end: lastDate
    })

    

    var lastDayVal = this.campaignTwo.get('end').value
    var startDayVal = this.campaignTwo.get('start').value

    var fromDate = startDayVal.getFullYear() + '-' + (startDayVal.getMonth() + 1) + '-' + startDayVal.getDate()
    var toDate = lastDayVal.getFullYear() + '-' + (lastDayVal.getMonth() + 1) + '-' + lastDayVal.getDate()


    this.service.generateWeekDougnutChart(fromDate, toDate).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })
  }




  getDougnutYearData() {
    const today = new Date();   
    const year = today.getFullYear();
    
    this.service.generateYearDougnutChart(year).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })

  }


  getDougnutMonthlyData() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.service.generateMonthDougnutChart(month, year).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })

  }


  getStudentDougnutValueByMonth(month) {   
    this.currentDougnutMonth = month
    this.currentDougnutYear = this.currentDougnutYear
    this.service.generateMonthDougnutChart(this.currentDougnutMonth, this.currentDougnutYear).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })

  }

  getStudentDougnutValueByYear(year) {
    this.currentDougnutMonth = this.currentDougnutMonth
    this.currentDougnutYear = year
    this.service.generateMonthDougnutChart(this.currentDougnutMonth, this.currentDougnutYear).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })

  }



  getDougnutallData() {
    this.service.generateDougnutChart().subscribe(
      (res)=> {
       
        this.doughnutChartData = []
        this.doughnutChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutChartLabels.push(res['dougnut_chart'][i]['product_name'])          
        }
        //doughnutChartData
    })

  }



  getDougnutVideoMonthlyData() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.service.generateVideoCLassMonthDougnutChart(month, year).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutLiveClassChartData = []
        this.doughnutLiveClassChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutLiveClassChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutLiveClassChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })

  }


  getDouVideognutallData() {

     this.service.generateVideoCLassChart().subscribe(
      (res)=> {
       
        this.doughnutLiveClassChartData = []
        this.doughnutLiveClassChartLabels = []
        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutLiveClassChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutLiveClassChartLabels.push(res['dougnut_chart'][i]['product_name'])          
        }
        //doughnutChartData
    })

  }



  selectDougnutStartDate2(start) {
    this.showCanvas = false
    this.weekData = []
    this.barChartWeekLabels = []
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    var days = 6; // Days you want to subtract
    var todate = new Date(start);
    var lastDate = new Date(todate.getTime() + (days * 24 * 60 * 60 * 1000));

    this.campaignThree.reset()

    this.campaignThree.setValue({
      start: todate,
      end: lastDate
    })

    var lastDayVal = this.campaignThree.get('end').value
    var startDayVal = this.campaignThree.get('start').value

    var fromDate = startDayVal.getFullYear() + '-' + (startDayVal.getMonth() + 1) + '-' + startDayVal.getDate()
    var toDate = lastDayVal.getFullYear() + '-' + (lastDayVal.getMonth() + 1) + '-' + lastDayVal.getDate()


    this.service.generateVideoCLassWeekDougnutChart(fromDate, toDate).subscribe(
      (res)=> {
       console.log(res)
        this.doughnutLiveClassChartData = []
        this.doughnutLiveClassChartLabels = []

        for(var i=0; i<res['dougnut_chart'].length; i++) {
          this.doughnutLiveClassChartData.push(res['dougnut_chart'][i]['count'])
          this.doughnutLiveClassChartLabels.push(res['dougnut_chart'][i]['product_name'])
          
        }

        //doughnutChartData
    })
  }




 

}
