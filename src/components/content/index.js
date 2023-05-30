// SPDX-FileCopyrightText: 2021 NOI Techpark <digital@noi.bz.it>
// SPDX-FileCopyrightText: 2021 STA <info@sta.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from 'lit-element';
import { Card } from '../card';
import { card_renderer } from './card_renderers';
import green_pin from '../../img/green@3x.png';
import orange_pin from '../../img/orange@3x.png';
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
                title: t['charging_station_status'][this.language],
                content: card_renderer({
                  canvas_id: "chart_station_states",
                  states: this.state_labels,
                  language: this.language,
                  translations: t['states'],
                  pin: green_pin
                })
              })}
              ${Card({
                load_perc: this.card3_loading_percentage,
                refresh_function: this.card3_painter,
                title: t['charging_station_access'][this.language],
                content: card_renderer({
                  canvas_id: "chart_access_types",
                  states: this.access_types,
                  language: this.language,
                  translations: t['access_to_stations'],
                  pin: green_pin
                })
              })}
              ${Card({
                load_perc: this.card2_loading_percentage,
                refresh_function: this.card2_painter,
                title: t['type_of_plugs'][this.language],
                big: true,
                content: card_renderer({
                  canvas_id: "chart_plug_types",
                  states: this.plug_types,
                  number: this.number_of_plugs,
                  translations: false,
                  pin: orange_pin
                })
              })}
              ${Card({
                load_perc: this.card4_loading_percentage,
                refresh_function: this.card4_painter,
                title: t['outlet_status'][this.language],
                big: true,
                content: card_renderer({
                  canvas_id: "chart_outlet_states",
                  states: this.state_labels,
                  language: this.language,
                  translations: t['states'],
                  pin: orange_pin
                })
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}


/*
<!--


-->
*/
