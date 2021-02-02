import { html, LitElement } from 'lit-element';
import {
  get_available_stations_percentage,
  get_number_of_stations,
  get_plug_type_distribution,
  get_plugs_with_state_and_echargingstation,
  get_use_percentage,
  get_charging_stations_access_types,
  get_stations_access_distribution
} from './api/integreen-life';
import { Content } from './components/content';
import {
  card2_painter,
  card3_painter,
  card1_painter
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
    this.get_use_percentage = get_use_percentage.bind(this);
    this.get_available_stations_percentage = get_available_stations_percentage.bind(this);
    this.get_number_of_stations = get_number_of_stations.bind(this);
    this.get_plug_type_distribution = get_plug_type_distribution.bind(this);
    this.get_plugs_with_state_and_echargingstation = get_plugs_with_state_and_echargingstation.bind(this);
    /** Card renderers */
    this.card1_painter = card1_painter.bind(this);
    this.card2_painter = card2_painter.bind(this);
    this.card3_painter = card3_painter.bind(this);
    /** Observed values */
    this.stations_operational_percentage = 0;
    this.stations_operational_count = 0;
    this.number_of_stations = 0;
    this.number_of_plugs = 0;
    this.station_access_distribution = 0;
    this.card1_loading_percentage = 0;
    this.card2_loading_percentage = 0;
    this.card3_loading_percentage = 0;
    this.plug_types = [];
    this.access_types = [];

    this.station_state_labels = [
      "NOT_OPERATIONAL",
      "OPERATIONAL_IN_USE",
      "OPERATIONAL_NOT_IN_USE"
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
    await this.get_number_of_stations();
    
    this.access_types = await get_charging_stations_access_types();
    this.station_access_distribution = await get_stations_access_distribution(this.bz, this.access_types);

    await this.get_plug_type_distribution();

    await this.get_available_stations_percentage();
    await this.get_use_percentage();

    /** Card 1 */
    await this.card1_painter();

    /** Card 2 */
    await this.card2_painter();

    /** Card 3 */
    await this.card3_painter();
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
