/**
 * Wrapper around api requests with the purpouse to refine data
 */

import {
  request__get_stations_details,
  request_at_least_one_plug_used,
  request__get_plugs_details,
  request_plug_types
} from './integreen-life-requests';

import countBy from 'lodash/countBy';

export async function get_available_stations_percentage() {
  const stations_active = await request__get_stations_details(this.bz);
  let number_of_stations = stations_active.length;
  let number_of_working = stations_active.filter(o => o.smetadata.state === 'ACTIVE').length;
  const perc_available_stations = (number_of_working * 100) / number_of_stations;
  this.chart_1_value = parseInt(perc_available_stations);
  return perc_available_stations;
}

export async function get_number_of_stations() {
  const stations_all = await request__get_stations_details(this.bz);
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
  this.chart_3_value = distribution_percentage;
}

export async function get_use_percentage() {
  const used = await request_at_least_one_plug_used(this.bz);
  this.chart_4_value = parseInt((used.length * 100) / this.number_of_stations);
  return undefined;
}

export async function get_stations_access_distribution(bz, access_types) {
  let distribution_percentage = [];
  const stations_details = await request__get_stations_details(bz);
  const tot_stations = stations_details.length;

  const only_accessType = stations_details.map(o => {
    return o.smetadata.accessType;
  });
  let count_by_type = countBy(only_accessType);

  access_types.map(type => {
    const perc = (count_by_type[type] * 100) / tot_stations;
    distribution_percentage.push(perc);
  });

  return distribution_percentage;
}
