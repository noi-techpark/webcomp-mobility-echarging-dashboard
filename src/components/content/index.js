import { html } from 'lit-element';
import { Card } from '../card';
import {
  card1_renderer,
  card2_renderer,
  card3_renderer
} from './card_renderers';
import { t } from '../../translations';

export function Content() {
  return html`
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              ${Card({
                load_perc: this.card1_loading_percentage,
                refresh_function: this.card1_painter,
                title: t['charging_station_access'][this.language],
                content: card1_renderer({
                  station_states: this.station_state_labels,
                  language: this.language,
                  number_of_stations: this.stations_operational_count,
                  big: true
                })
              })}
              ${Card({
                load_perc: this.card2_loading_percentage,
                refresh_function: this.card2_painter,
                title: t['type_of_plugs'][this.language],
                content: card2_renderer(this.plug_types, this.number_of_plugs),
                big: true
              })}
              ${Card({
                load_perc: this.card3_loading_percentage,
                refresh_function: this.card3_painter,
                title: t['charging_station_access'][this.language],
                content: card3_renderer({
                  access_types: this.access_types,
                  language: this.language,
                  number_of_stations: this.number_of_stations
                })
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
