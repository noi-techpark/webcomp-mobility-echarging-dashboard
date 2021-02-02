import { html } from 'lit-element';
import green_pin from '../../img/green@3x.png';
import orange_pin from '../../img/orange@3x.png';
import { t } from '../../translations';

export const card1_renderer = props => {
  return html`
    <div class="d-md-flex chart_plugs__container">
      <div class="chart_plugs">
        <div class="chart_plugs__chart_container">
          <canvas id="chart_station_states"></canvas>
        </div>
      </div>
      <div class="plug_list_names">
        ${props.station_states.map(o => {
          return html`
            <div
              id="${o.replace(/\s/g, '')}"
              class="plug_list_names__name c${o
                .replace('-', '_')
                .toLowerCase()
                .replace(/\s/g, '')}"
            >
              ${t['station_states'][o] ? t['station_states'][o][props.language].toUpperCase() : "UNKNOWN"}
            </div>
          `;
        })}
      </div>
    </div>
  `;
};


export const card2_renderer = (plug_types, n) => {
  return html`
    <div class="d-md-flex chart_plugs__container">
      <div class="chart_plugs">
        <div class="chart_plugs__chart_container">
          <canvas id="chart_plug_types"></canvas>
        </div>
        <div class="number__container">
          <div class="number">
            <div>
              <img src="${orange_pin}" alt="" />
              <p class="fs-30 fw-600">${n}</p>
            </div>
          </div>
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

export const card3_renderer = props => {
  return html`
    <div class="d-md-flex chart_plugs__container">
      <div class="chart_plugs">
        <div class="chart_plugs__chart_container">
          <canvas id="chart_access_types"></canvas>
        </div>
        <div class="number__container">
          <div class="number">
            <div>
              <img src="${green_pin}" alt="" />
              <p class="fs-30 fw-600">${props.number_of_stations}</p>
            </div>
          </div>
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
