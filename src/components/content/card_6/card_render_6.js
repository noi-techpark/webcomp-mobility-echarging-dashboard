import { html } from 'lit-html';
import { t } from '../../../translations';
import green_pin from '../../../img/green@3x.png';

export const card_render_6 = (chart_6_value, language) => {
  return html`
    <div class="d-md-flex working_columns__container mt-md-4">
      <div class="working_columns">
        <div class="working_columns__chart_container">
          <canvas id="chart_6"></canvas>
        </div>
        <div class="working_columns__number__container">
          <div class="working_columns__number">
            <div>
              <img src="${green_pin}" alt="" />
              <p class="fs-30 fw-600">${chart_6_value}%</p>
            </div>
          </div>
          <div class="working_columns__divider mt-2"></div>
          <p class="text-center mt-3 working_columns__description">
            ${chart_6_value}% ${t['of_the_plugs_is_in_operation'][language]}
          </p>
        </div>
      </div>
    </div>
  `;
};
