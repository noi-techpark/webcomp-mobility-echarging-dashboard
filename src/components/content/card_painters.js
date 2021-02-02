import Chart from 'chart.js';
import { t } from '../../translations';

const state_color_mapper = {
  NOT_OPERATIONAL: '#e6040e',
  OPERATIONAL_IN_USE: '#97be0e',
  OPERATIONAL_NOT_IN_USE: '#de7000'
}

export async function card1_painter() {
  this.card1_loading_percentage = 0;
  await this.get_number_of_stations();
  await this.get_use_percentage();
  await this.get_available_stations_percentage();
  this.card1_loading_percentage = 100;

  const data_mapper = {
    NOT_OPERATIONAL: 100 - this.stations_operational_percentage,
    OPERATIONAL_IN_USE: this.stations_used_percentage,
    OPERATIONAL_NOT_IN_USE: 100 - this.stations_used_percentage
  }

  let ctx_1 = this.shadowRoot.getElementById('chart_station_states').getContext('2d');

  new Chart(ctx_1, {
    type: 'doughnut',
    data: {
      labels: this.station_state_labels.map(o => t['station_states'][o] ? t['station_states'][o][this.language].toUpperCase() : "UNKNOWN"),
      datasets: [
        {
          data: this.station_state_labels.map(o => data_mapper[o]),
          backgroundColor: this.station_state_labels.map(o => state_color_mapper[o])
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
}


const plugs_color_mapper = {
  '700 bar small vehicles': 'green',
  Type2Mennekes: '#4285F4',
  CCS: 'purple',
  UNKNOWN: 'red',
  'Type2 - 230Vac': '#DE7000',
  'Type2 - 400Vac': '#EF80FF',
  CHAdeMO: '#E6040E',
  'Type 3A': '#97BE0E',
  Schuko: 'salmon'
};

export async function card2_painter() {
  this.card2_loading_percentage = 0;
  await this.get_plug_type_distribution();
  this.card2_loading_percentage = 100;

  let ctx_2 = this.shadowRoot.getElementById('chart_plug_types').getContext('2d');
  new Chart(ctx_2, {
    type: 'doughnut',
    data: {
      labels: this.plug_types,
      datasets: [
        {
          data: this.plug_type_distribution,
          backgroundColor: this.plug_types.map(o => plugs_color_mapper[o])
        }
      ]
    },
    options: {
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
      maintainAspectRatio: true,
      aspectRatio: 1,
      title: {
        display: false
      },
      cutoutPercentage: 80,
      animation: {
        animateScale: true,
        animateRotate: true
      },
      legend: {
        display: false
      }
    }
  });
}

const access_color_mapper = {
  PRIVATE: '#e6040e',
  PUBLIC: '#97be0e',
  PRIVATE_WITHPUBLICACCESS: '#de7000'
}

export async function card3_painter() {
  this.card3_loading_percentage = 0;
  await this.get_stations_access_distribution();
  this.card3_loading_percentage = 100;

  let ctx_3 = this.shadowRoot.getElementById('chart_access_types').getContext('2d');

  new Chart(ctx_3, {
    type: 'doughnut',
    data: {
      labels: this.access_types.map(o => t['access_to_stations'][o] ? t['access_to_stations'][o][this.language].toUpperCase() : "UNKNOWN"),
      datasets: [
        {
          data: this.station_access_distribution,
          backgroundColor: this.access_types.map(o => access_color_mapper[o])
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

}
