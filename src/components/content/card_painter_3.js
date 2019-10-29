let current_type_hover = '';

export async function card_painter_3() {
  this.load_perc_3 = 0;
  await this.get_plugs_type_distribution();
  this.load_perc_3 = 100;

  let ctx_2 = this.shadowRoot.getElementById('chart_2').getContext('2d');
  new Chart(ctx_2, {
    type: 'doughnut',
    data: {
      labels: ['Type2Mennekes', 'Type2 - 230Vac', 'Type2 - 400Vac', 'Type 3A', 'CHAdeMO'],
      datasets: [
        {
          data: this.chart_2_value,
          backgroundColor: ['#4285F4', '#DE7000', '#EF80FF', '#97BE0E', '#E6040E']
        }
      ]
    },
    options: {
      tooltips: {
        custom: tooltip => {
          if (tooltip.opacity > 0) {
          } else {
            const all_dom_labels = this.shadowRoot.querySelectorAll('.plug_list_names__name');
            for (let i = 0; i < all_dom_labels.length; i++) {
              const element = all_dom_labels[i];
              element.classList.remove('disabled', 'active');
            }
          }
          return null;
        },
        callbacks: {
          label: (tooltipItem, data) => {
            const all_dom_labels = this.shadowRoot.querySelectorAll('.plug_list_names__name');
            for (let i = 0; i < all_dom_labels.length; i++) {
              const element = all_dom_labels[i];
              element.classList.add('disabled');
            }
            const prev_dom_label = this.shadowRoot.getElementById(current_type_hover);
            if (prev_dom_label) {
              prev_dom_label.classList.remove('active');
            }
            current_type_hover = data.labels[tooltipItem.index].replace(/\s/g, '');
            const dom_label = this.shadowRoot.getElementById(current_type_hover);
            if (dom_label) {
              dom_label.classList.add('active');
              dom_label.classList.remove('disabled');
            }
          }
        },
        enabled: false
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
