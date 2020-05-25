import { html } from 'lit-html';
import { t } from '../../../translations';

export const card_render_5 = props => {
  return html`
    <div class="d-md-flex chart_plugs__container">
      <div class="chart_plugs">
        <div class="chart_plugs__chart_container">
          <canvas id="chart_5"></canvas>
        </div>
      </div>
      <div class="plug_list_names">
        ${props.access_types.map(o => {
          return html`
            <div
              id="${o.replace(/\s/g, '')}"
              class="plug_list_names__name c${o
                .replace('-', '_')
                .toLowerCase()
                .replace(/\s/g, '')}"
            >
              ${t['access_to_stations'][o] ? t['access_to_stations'][o][props.language].toUpperCase() : "UNKNOWN"}
            </div>
          `;
        })}
      </div>
    </div>
  `;
};
