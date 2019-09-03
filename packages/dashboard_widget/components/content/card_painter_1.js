export async function card_painter_1() {
  this.load_perc_1 = 0;
  this.load_perc_1 = 10;

  await this.get_available_stations_percentage();

  this.load_perc_1 = 30;

  let ctx_1 = this.shadowRoot.getElementById('chart_1').getContext('2d');
  let gradient = ctx_1.createLinearGradient(0, 0, 0, 30);
  gradient.addColorStop(0, '#DE7000');
  gradient.addColorStop(1, '#F1A900');

  new Chart(ctx_1, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [this.chart_1_value, 100 - this.chart_1_value],
          backgroundColor: [gradient, '#f0f1f1']
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      hover: { mode: null },
      maintainAspectRatio: false,
      title: {
        display: false
      },
      cutoutPercentage: 85,
      animation: {
        animateScale: true,
        animateRotate: true
      },
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI
    }
  });
  this.load_perc_1 = 100;
}
