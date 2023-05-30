// SPDX-FileCopyrightText: 2021 NOI Techpark <digital@noi.bz.it>
// SPDX-FileCopyrightText: 2021 STA <info@sta.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html, LitElement } from 'lit-element';
import {
  get_station_status_distribution,
  get_plug_type_distribution,
  get_stations_access_distribution
} from './api/integreen-life';
import { Content } from './components/content';
import {
  card1_painter,
  card2_painter,
  card3_painter,
  card4_painter,
} from './components/content/card_painters';
import { Header } from './components/header';
import { observed_properties } from './observed_properties';
import style__buttons from './scss/buttons.scss';
import style from './scss/main.scss';
import style__typography from './scss/typography.scss';
import utilities from './scss/utilities.scss';
import { getStyle } from './utilities';

class EMobilityDashboard extends LitElement {
  constructor() {
    super();
    this.Header = Header.bind(this);
    this.Content = Content.bind(this);
    this.get_station_status_distribution = get_station_status_distribution.bind(this);
    this.get_stations_access_distribution = get_stations_access_distribution.bind(this);
    this.get_plug_type_distribution = get_plug_type_distribution.bind(this);
    /** Card renderers */
    this.card1_painter = card1_painter.bind(this);
    this.card2_painter = card2_painter.bind(this);
    this.card3_painter = card3_painter.bind(this);
    this.card4_painter = card4_painter.bind(this);
    /** Observed values */
    this.number_of_stations = 0;
    this.number_of_plugs = 0;
    this.card1_loading_percentage = 0;
    this.card2_loading_percentage = 0;
    this.card3_loading_percentage = 0;
    this.card4_loading_percentage = 0;
    this.plug_types = [];
    this.access_types = [];
    this.station_access_distribution = [];
    this.station_status_distribution = [];
    this.plug_type_distribution = [];
    this.plug_status_distribution = [];

    this.state_labels = [
      "OPERATIONAL_IN_USE",
      "OPERATIONAL_NOT_IN_USE",
      "NOT_OPERATIONAL",
      "UNKNOWN"
    ]

    /* Parameters */
    const userLanguage = window.navigator.userLanguage || window.navigator.language;
    this.language = userLanguage.split('-')[0];
    this.bz = false;
  }

  static get properties() {
    return observed_properties;
  }

  async firstUpdated() {
    /** Card 1 */
    await this.card1_painter();

    /** Card 2 */
    await this.card2_painter();

    /** Card 3 */
    await this.card3_painter();

    /** Card 4 */
    await this.card4_painter();
  }

  render() {
    return html`
      <style>
        ${getStyle(style)}
        ${getStyle(utilities)}
        ${getStyle(style__typography)}
        ${getStyle(style__buttons)}
      </style>
      <div class="e_mobility_dasboard">
        ${Header(this.language)} ${this.Content()}
      </div>
    `;
  }
}

if (!window.customElements.get('e-mobility-dashboard-widget')) {
  window.customElements.define('e-mobility-dashboard-widget', EMobilityDashboard);
}
