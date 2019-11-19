export async function card_painter_6() {
  this.load_perc_6 = 0;
  this.load_perc_6 = 10;

  await this.get_plugs_with_state_and_echargingstation();

  this.load_perc_6 = 30;

  const ctx_6 = this.shadowRoot.getElementById('chart_6').getContext('2d');
  const gradient = ctx_6.createLinearGradient(0, 0, 0, 30);
  gradient.addColorStop(0, '#DE7000');
  gradient.addColorStop(1, '#F1A900');

  new Chart(ctx_6, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [this.chart_6_value, 100 - this.chart_6_value],
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

  this.load_perc_6 = 100;
}
