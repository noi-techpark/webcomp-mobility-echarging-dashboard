/**
 * Wrapper around api requests with the purpouse to refine data
 */

import countBy from 'lodash/countBy';
import {
  request_at_least_one_plug_used,
  request_plugs_with_state_and_echargingstation,
  request_plug_types,
  request__get_plugs_details,
  request__get_stations_details
} from './integreen-life-requests';

export async function get_available_stations_percentage() {
  const stations_active = await request__get_stations_details(this.bz);
  const number_of_stations = stations_active.length;
  const number_of_working = stations_active.filter(o => o.smetadata.state === 'ACTIVE').length;
  const perc_available_stations = (number_of_working * 100) / number_of_stations;
  this.chart_1_value = parseInt(perc_available_stations, 10);
  return perc_available_stations;
}

export async function get_number_of_stations() {
  const stations_all = await request__get_stations_details(this.bz);
  const number_of_stations = stations_all.length;
  this.number_of_stations = number_of_stations;
}

export async function get_plugs_type_distribution() {
  const plugs_details = await request__get_plugs_details({ bz: this.bz, outlets: true });
  const plug_types = await request_plug_types();
  this.plug_types = [...plug_types];
  const only_outlets = plugs_details.map(o => {
    return o.smetadata.outlets;
  });
  const count_by_type = countBy(only_outlets.flat(), o => {
    return o.outletTypeCode;
  });
  const tot_outlets = only_outlets.flat().length;
  const distribution_percentage = [];
  plug_types.map(type => {
    const perc = (count_by_type[type] * 100) / tot_outlets;
    distribution_percentage.push(perc);
    return false;
  });
  this.chart_3_value = distribution_percentage;
}

export async function get_use_percentage() {
  const used = await request_at_least_one_plug_used(this.bz);
  this.chart_4_value = parseInt((used.length * 100) / this.number_of_stations, 10);
  return undefined;
}

export async function get_stations_access_distribution(bz, access_types) {
  const distribution_percentage = [];
  const stations_details = await request__get_stations_details(bz);
  const tot_stations = stations_details.length;

  const only_accessType = stations_details.map(o => {
    return o.smetadata.accessType;
  });
  const count_by_type = countBy(only_accessType);

  access_types.map(type => {
    const perc = (count_by_type[type] * 100) / tot_stations;
    distribution_percentage.push(perc);
    return false;
  });

  return distribution_percentage;
}

export async function get_plugs_with_state_and_echargingstation() {
  const plugs_data = await request_plugs_with_state_and_echargingstation(this.bz);
  const number_of_plugs = plugs_data.length;
  const number_of_working = plugs_data.filter(o => o.mvalue > 0).length;
  const perc_working_plugs = (number_of_working * 100) / number_of_plugs;
  this.chart_6_value = parseInt(perc_working_plugs, 10);
}
