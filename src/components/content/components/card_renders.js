import { html } from 'lit-element';
import green_pin from '../../../img/green@3x.png';
import orange_pin from '../../../img/orange@3x.png';
import { t } from '../../../translations';

export const render_working_columns = (chart_1_value, language) => {
  return html`
    <div class="d-md-flex working_columns__container">
      <div class="working_columns">
        <div class="working_columns__chart_container">
          <canvas id="chart_1"></canvas>
        </div>
        <div class="working_columns__number__container">
          <div class="working_columns__number">
            <div>
              <img src="${green_pin}" alt="" />
              <p class="fs-30 fw-600">${chart_1_value}%</p>
            </div>
          </div>
          <div class="working_columns__divider mt-2"></div>
          <p class="text-center mt-3 working_columns__description">
            ${chart_1_value}% ${t['of_the_columns_is_in_operation'][language]}
          </p>
        </div>
      </div>
    </div>
  `;
};

export const render_columns_number = (n, language) => {
  return html`
    <div class="d-md-flex columns_number__container">
      <div>
        <p class="columns_number__container__number fw-600">${n}</p>
        <div class="columns_number__container__divider mt-2"></div>
        <p class="columns_number__container__description fs-16 mt-3">
          ${t['current_number_of_columns'][language]}
        </p>
      </div>
    </div>
  `;
};

export const render_plug_types = plug_types => {
  return html`
    <div class="d-md-flex chart_plugs__container">
      <div class="chart_plugs">
        <div class="chart_plugs__chart_container">
          <canvas id="chart_2"></canvas>
        </div>
      </div>
      <div class="plug_list_names">
        ${plug_types.map(o => {
          return html`
            <div
              id="${o.replace(/\s/g, '')}"
              class="plug_list_names__name c${o
                .replace('-', '_')
                .toLowerCase()
                .replace(/\s/g, '')}"
            >
              ${o}
            </div>
          `;
        })}
      </div>
    </div>
  `;
};

export const render_utilized_columns = props => {
  return html`
    <div class="d-md-flex chart_utilized__container">
      <div class="chart_utilized">
        <div class="number__container">
          <div class="number">
            <div>
              <img src="${orange_pin}" alt="" />
              <p class="fs-30 fw-600">${props.chart_3_value}%</p>
            </div>
          </div>
        </div>
        <div class="chart_utilized__chart_container">
          <canvas id="chart_3"></canvas>
        </div>
      </div>
      <div class="chart_utilized__description">
        <p>
          ${t['percentage_of_columns_used_in_real_time'][props.language]}
        </p>
      </div>
    </div>
  `;
};
