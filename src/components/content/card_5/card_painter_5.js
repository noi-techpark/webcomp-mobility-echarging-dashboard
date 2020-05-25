import { request_charging_stations_access_types } from '../../../api/integreen-life-requests';
import { get_stations_access_distribution } from '../../../api/integreen-life';
import { t } from '../../../translations';

const color_mapper = {
  PRIVATE: '#e6040e',
  PUBLIC: '#97be0e',
  PRIVATE_WITHPUBLICACCESS: '#de7000'
}

export async function card_painter_5() {
  this.load_perc_5 = 0;

  this.access_types = await request_charging_stations_access_types();
  this.chart_5_value = await get_stations_access_distribution(this.bz, this.access_types);

  let ctx_5 = this.shadowRoot.getElementById('chart_5').getContext('2d');

  new Chart(ctx_5, {
    type: 'doughnut',
    data: {
      labels: this.access_types.map(o => t['access_to_stations'][o] ? t['access_to_stations'][o][this.language].toUpperCase() : "UNKNOWN"),
      datasets: [
        {
          data: this.chart_5_value,
          backgroundColor: this.access_types.map(o => color_mapper[o])
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        callbacks: {
          title: function(tooltipItems, data) {
            return `${data.labels[tooltipItems[0].index]}`;
          },
          label: function(tooltipItems, data) {
            return `${parseInt(data.datasets[0].data[tooltipItems.index])}%`;
          }
        }
      },
      hover: { mode: null },
      maintainAspectRatio: true,
      aspectRatio: 1,
      title: {
        display: false
      },
      cutoutPercentage: 80,
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });

  this.load_perc_5 = 100;
}
