export async function card_painter_4() {
  this.load_perc_4 = 0;

  await this.get_use_percentage();

  let ctx_3 = this.shadowRoot.getElementById('chart_4').getContext('2d');
  let gradient = ctx_3.createLinearGradient(0, 0, 0, 30);
  gradient.addColorStop(0, '#DE7000');
  gradient.addColorStop(1, '#F1A900');

  new Chart(ctx_3, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [this.chart_4_value, 100 - this.chart_4_value],
          backgroundColor: [gradient, '#f0f1f1']
        }
      ]
    },
    options: {
      tooltips: {
        enabled: false
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

  this.load_perc_4 = 100;
}
