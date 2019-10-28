import { html } from 'lit-element';
import { Card } from '../card';
import {
  render_working_columns,
  render_plug_types,
  render_utilized_columns,
  render_columns_number
} from './components/card_renders';
import { t } from '../../translations';

export function Content() {
  return html`
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              ${Card({
                load_perc: this.load_perc_1,
                refresh_function: this.card_painter_1,
                title: t['columns_in_operation'][this.language],
                content: render_working_columns(this.chart_1_value, this.language)
              })}
              ${Card({
                load_perc: this.load_perc_2,
                refresh_function: this.card_painter_2,
                title: t['number_of_columns'][this.language],
                content: render_columns_number(this.number_of_stations, this.language)
              })}
              ${Card({
                load_perc: this.load_perc_3,
                refresh_function: this.card_painter_3,
                title: t['type_of_plugs'][this.language],
                content: render_plug_types()
              })}
              ${Card({
                load_perc: this.load_perc_4,
                refresh_function: this.card_painter_4,
                title: t['columns_used'][this.language],
                content: render_utilized_columns({ chart_3_value: this.chart_3_value, language: this.language })
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
