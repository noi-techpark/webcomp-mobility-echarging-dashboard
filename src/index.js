import { html, LitElement } from 'lit-element';
import {
  get_available_stations_percentage,
  get_number_of_stations,
  get_plugs_type_distribution,
  get_plugs_with_state_and_echargingstation,
  get_use_percentage
} from './api/integreen-life';
import { Content } from './components/content';
import { card_painter_5 } from './components/content/card_5/card_painter_5';
import { card_painter_6 } from './components/content/card_6/card_painter_6';
import { card_painter_1 } from './components/content/card_painter_1';
import { card_painter_2 } from './components/content/card_painter_2';
import { card_painter_3 } from './components/content/card_painter_3';
import { card_painter_4 } from './components/content/card_painter_4';
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
    this.get_use_percentage = get_use_percentage.bind(this);
    this.get_available_stations_percentage = get_available_stations_percentage.bind(this);
    this.get_number_of_stations = get_number_of_stations.bind(this);
    this.get_plugs_type_distribution = get_plugs_type_distribution.bind(this);
    this.get_plugs_with_state_and_echargingstation = get_plugs_with_state_and_echargingstation.bind(this);
    /** Card renders */
    this.card_painter_1 = card_painter_1.bind(this);
    this.card_painter_2 = card_painter_2.bind(this);
    this.card_painter_3 = card_painter_3.bind(this);
    this.card_painter_4 = card_painter_4.bind(this);
    this.card_painter_5 = card_painter_5.bind(this);
    this.card_painter_6 = card_painter_6.bind(this);
    /** Observed values */
    this.chart_1_value = 0;
    this.number_of_stations = 0;
    this.chart_4_value = 0;
    this.chart_5_value = 0;
    this.chart_6_value = 0;
    this.load_perc_1 = 0;
    this.load_perc_2 = 0;
    this.load_perc_3 = 0;
    this.load_perc_4 = 0;
    this.load_perc_5 = 0;
    this.load_perc_6 = 0;
    this.plug_types = [];
    this.access_types = [];
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
    await this.card_painter_1();

    /** Card 2 */
    await this.card_painter_2();

    /** Card 3 */
    await this.card_painter_3();

    /** Card 4 */
    await this.card_painter_4();

    /** Card 5 */
    await this.card_painter_5();

    /** Card 6 */
    await this.card_painter_6();
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
