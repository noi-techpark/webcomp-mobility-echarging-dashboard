import {
  request__get_stations_details,
  at_least_one_plug_used,
  request__get_plugs_details,
  request_plug_types
} from './integreen-life-requests';

import countBy from 'lodash/countBy';

export async function get_available_stations_percentage() {
  const [stations_all, stations_active] = await request__get_stations_details(this.bz);
  let number_of_stations = stations_all.length;
  let number_of_working = stations_active.filter(o => o.smetadata.state === 'ACTIVE').length;
  const perc_available_stations = (number_of_working * 100) / number_of_stations;
  this.chart_1_value = parseInt(perc_available_stations);
  return perc_available_stations;
}

export async function get_number_of_stations() {
  const [stations_all] = await request__get_stations_details(this.bz);
  let number_of_stations = stations_all.length;
  this.number_of_stations = number_of_stations;
}

export async function get_plugs_type_distribution() {
  const plugs_details = await request__get_plugs_details({ bz: this.bz, outlets: true });
  const plug_types = await request_plug_types();
  this.plug_types = [...plug_types];
  const only_outlets = plugs_details.map(o => {
    return o.smetadata.outlets;
  });
  let count_by_type = countBy(only_outlets.flat(), o => {
    return o.outletTypeCode;
  });
  const tot_outlets = only_outlets.flat().length;
  let distribution_percentage = [];
  plug_types.map(type => {
    const perc = (count_by_type[type] * 100) / tot_outlets;
    distribution_percentage.push(perc);
  });
  this.chart_2_value = distribution_percentage;
}

export async function request__get_use_percentage() {
  const used = await at_least_one_plug_used(this.bz);
  this.chart_3_value = parseInt((used.length * 100) / this.number_of_stations);
  return undefined;
}
