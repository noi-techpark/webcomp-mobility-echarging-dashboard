let current_type_hover = '';

const color_mapper = {
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

export async function card_painter_3() {
  this.load_perc_3 = 0;
  await this.get_plugs_type_distribution();
  this.load_perc_3 = 100;

  let ctx_2 = this.shadowRoot.getElementById('chart_2').getContext('2d');
  new Chart(ctx_2, {
    type: 'doughnut',
    data: {
      labels: this.plug_types,
      datasets: [
        {
          data: this.chart_3_value,
          backgroundColor: this.plug_types.map(o => color_mapper[o])
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
