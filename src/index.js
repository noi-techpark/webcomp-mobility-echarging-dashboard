import { html, LitElement } from 'lit-element';
import {
  get_available_stations_percentage,
  get_number_of_stations,
  get_plugs_type_distribution,
  request__get_use_percentage
} from './api/integreen-life';
import { card_painter_1 } from './components/content/card_painter_1';
import { card_painter_2 } from './components/content/card_painter_2';
import { card_painter_3 } from './components/content/card_painter_3';
import { card_painter_4 } from './components/content/card_painter_4';
import { Content } from './components/content/index.js';
import { Header } from './components/header/index.js';
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
    this.request__get_use_percentage = request__get_use_percentage.bind(this);
    this.get_available_stations_percentage = get_available_stations_percentage.bind(this);
    this.get_number_of_stations = get_number_of_stations.bind(this);
    this.get_plugs_type_distribution = get_plugs_type_distribution.bind(this);
    /** Card renders */
    this.card_painter_1 = card_painter_1.bind(this);
    this.card_painter_2 = card_painter_2.bind(this);
    this.card_painter_3 = card_painter_3.bind(this);
    this.card_painter_4 = card_painter_4.bind(this);
    /** Observed values */
    this.chart_1_value = 0;
    this.number_of_stations = 0;
    this.chart_3_value = 0;
    this.load_perc_1 = 0;
    this.load_perc_2 = 0;
    this.load_perc_3 = 0;
    this.load_perc_4 = 0;
    /* Parameters */
    const userLanguage = window.navigator.userLanguage || window.navigator.language;
    this.language = userLanguage.split('-')[0];
    this.bz = false;
  }

  static get properties() {
    return observed_properties;
  }

  async firstUpdated() {
    /** Chart 1 */
    await this.card_painter_1();

    /** Second card */
    await this.card_painter_2();

    /** Chart 2 */
    await this.card_painter_3();

    /** Chart 3 */
    await this.card_painter_4();
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
        ${Header()} ${this.Content()}
      </div>
    `;
  }
}

if (!window.customElements.get('e-mobility-dashboard-widget')) {
  window.customElements.define('e-mobility-dashboard-widget', EMobilityDashboard);
}
