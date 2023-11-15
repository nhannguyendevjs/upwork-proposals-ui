import { AfterViewInit, Component } from '@angular/core'
import ApexCharts from 'apexcharts'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.#initCharts();
  }

  #initCharts() {
    const chart1Options = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands'
          },
        },
      },
    }
    const chart2Options = {
      series: [
        {
          name: 'value',
          data: [5, 15, 10, 21, 31, 40, 28, 51, 42, 109, 100, 99],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2023-01-01T00:00:00.000Z',
          '2023-02-01T00:00:00.000Z',
          '2023-03-01T00:00:00.000Z',
          '2023-04-01T00:00:00.000Z',
          '2023-05-01T00:00:00.000Z',
          '2023-06-01T00:00:00.000Z',
          '2023-07-01T00:00:00.000Z',
          '2023-08-01T00:00:00.000Z',
          '2023-09-01T00:00:00.000Z',
          '2023-10-01T00:00:00.000Z',
          '2023-11-01T00:00:00.000Z',
          '2023-12-01T00:00:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    }

    const chart3Options = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2017-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2019-09-19T02:30:00.000Z',
          '2020-09-19T03:30:00.000Z',
          '2021-09-19T04:30:00.000Z',
          '2022-09-19T05:30:00.000Z',
          '2023-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    }

    const chart1 = new ApexCharts(document.querySelector('#chart1'), chart1Options)
    const chart2 = new ApexCharts(document.querySelector('#chart2'), chart2Options)
    const chart3 = new ApexCharts(document.querySelector('#chart3'), chart3Options)

    chart1.render()
    chart2.render()
    chart3.render()
  }
}
