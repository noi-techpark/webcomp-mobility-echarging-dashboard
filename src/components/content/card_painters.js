// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// SPDX-FileCopyrightText: 2020 - 2021 STA <info@sta.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Chart from 'chart.js';
import { t } from '../../translations';

const state_color_mapper = {
  NOT_OPERATIONAL: '#e6040e',
  OPERATIONAL_IN_USE: '#97be0e',
  OPERATIONAL_NOT_IN_USE: '#4285f4',
  UNKNOWN: '#cccccc'
};


function drawNumber(tooltipItems, data, number) {
  let activeItem = data.datasets[0].distrib[tooltipItems.index]
  let color = data.datasets[0].backgroundColor[tooltipItems.index]
  number.innerHTML = `<span style='border-bottom: 3px solid ${color ? color : "#e2e2e2"}'>${activeItem[0]}/${activeItem[1]}</span>`;
  return ` ${activeItem[0]} / ${activeItem[1]}  (${parseInt(activeItem[2])}%)`;
}

export async function card1_painter() {
  this.card1_loading_percentage = 0;
  await this.get_station_status_distribution();
  let percentages = this.station_status_distribution.map(o => o[2])
  this.card1_loading_percentage = 100;

  let ctx = this.shadowRoot.getElementById('chart_station_states').getContext('2d');
  let number = this.shadowRoot.getElementById('chart_station_states_number');
  number.innerHTML = this.station_status_distribution[0][1];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: this.state_labels.map(o => t['states'][o] ? t['states'][o][this.language].toUpperCase() : "UNKNOWN"),
      datasets: [
        {
          data: percentages,
          backgroundColor: this.state_labels.map(o => state_color_mapper[o]),
          distrib: this.station_status_distribution
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
            return drawNumber(tooltipItems, data, number);
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
  console.log(this.plug_type_distribution)
  let percentages = this.plug_type_distribution.map(o => o[2])
  this.card2_loading_percentage = 100;

  let ctx = this.shadowRoot.getElementById('chart_plug_types').getContext('2d');
  let number = this.shadowRoot.getElementById('chart_plug_types_number');
  number.innerHTML = this.plug_type_distribution[0][1];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: this.plug_types,
      datasets: [
        {
          data: percentages,
          backgroundColor: this.plug_types.map(o => plugs_color_mapper[o]),
          distrib: this.plug_type_distribution
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
            return drawNumber(tooltipItems, data, number)
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
  let percentages = this.station_access_distribution.map(o => o[2])
  this.card3_loading_percentage = 100;

  let ctx = this.shadowRoot.getElementById('chart_access_types').getContext('2d');
  let number = this.shadowRoot.getElementById('chart_access_types_number');
  number.innerHTML = this.station_access_distribution[0][1];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: this.access_types.map(o => t['access_to_stations'][o] ? t['access_to_stations'][o][this.language].toUpperCase() : "UNKNOWN"),
      datasets: [
        {
          data: percentages,
          backgroundColor: this.access_types.map(o => access_color_mapper[o]),
          distrib: this.station_access_distribution
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
            return drawNumber(tooltipItems, data, number)
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


export async function card4_painter() {
  this.card4_loading_percentage = 0;
  await this.get_station_status_distribution();
  let percentages = this.station_status_distribution.map(o => o[2])
  this.card4_loading_percentage = 100;

  let ctx = this.shadowRoot.getElementById('chart_outlet_states').getContext('2d');
  let number = this.shadowRoot.getElementById('chart_outlet_states_number');
  number.innerHTML = this.plug_status_distribution[0][1];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: this.state_labels.map(o => t['states'][o] ? t['states'][o][this.language].toUpperCase() : "UNKNOWN"),
      datasets: [
        {
          data: percentages,
          backgroundColor: this.state_labels.map(o => state_color_mapper[o]),
          distrib: this.plug_status_distribution
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
            return drawNumber(tooltipItems, data, number)
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

const station_accessibility_color_mapper = {
  NOT_SURVEYED: '#cccccc',
  ACCESSIBLE: '#97be0e',
  NOT_ACCESSIBLE: '#e6040e'
};

export async function card5_painter() {
  this.card5_loading_percentage = 0;
  await this.get_station_accessibility_distribution();

  const accessibility_labels = ['NOT_SURVEYED', 'ACCESSIBLE', 'NOT_ACCESSIBLE'];

  const distrib = Array.isArray(this.station_accessibility_distribution) ? this.station_accessibility_distribution : [];

  const normalizedDistrib =
    distrib.length >= 3
      ? [distrib[0], distrib[1], distrib[2]]
      : [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ];

  this.station_accessibility_distribution = normalizedDistrib;

  const percentages = accessibility_labels.map((_, idx) => this.station_accessibility_distribution[idx][2]);

  this.card5_loading_percentage = 100;

  const canvas = this.shadowRoot.getElementById('chart_station_accessibility');
  const ctx = canvas.getContext('2d');

  const number = this.shadowRoot.getElementById('chart_station_accessibility_number');
  number.innerHTML = this.station_accessibility_distribution[0][1];

  // Destroy previous chart instance if it exists (prevents stacking on refresh)
  if (this._chart_station_accessibility) {
    this._chart_station_accessibility.destroy();
  }

  this._chart_station_accessibility = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: accessibility_labels.map(o =>
        t['survey_status'][o] ? t['survey_status'][o][this.language].toUpperCase() : 'UNKNOWN'
      ),
      datasets: [
        {
          data: percentages,
          backgroundColor: accessibility_labels.map(o => station_accessibility_color_mapper[o]),
          distrib: this.station_accessibility_distribution
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
            return drawNumber(tooltipItems, data, number);
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
