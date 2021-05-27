import { html } from 'lit-element';

export const card_renderer = props => {
  return html`
    <div class="d-md-flex chart_plugs__container">
      <div class="chart_plugs">
        <div class="chart_plugs__chart_container">
          <canvas id="${props.canvas_id}"></canvas>
        </div>
        <div class="number__container">
          <div class="number">
            <div>
              <img src="${props.pin}" alt="" />
              <p class="fw-600" id='${props.canvas_id}_number'>${props.number}</p>
            </div>
          </div>
        </div>
        </div>
        <div class="plug_list_names">
          ${props.states.map(o => {
            return html`
              <div
                id="${o.replace(/\s/g, '')}"
                class="plug_list_names__name c${o
                  .replace('-', '_')
                  .toLowerCase()
                  .replace(/\s/g, '')}"
              >
                ${props.translations ?
                  (
                    props.translations[o]
                      ? props.translations[o][props.language].toUpperCase()
                      : "UNKNOWN"
                  )
                  : o
                }
              </div>
            `;
          })}
        </div>
      </div>
  `;
};
