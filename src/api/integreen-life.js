/**
 * Wrapper around api requests with the purpouse to refine data
 */

import countBy from 'lodash/countBy';
import {
  request_plug_types,
  request__get_plugs_details,
  request__get_stations_details,
  request__get_stations_active_count,
  request_at_least_one_plug_used_active_count,
} from './integreen-life-requests';

export async function get_available_stations_percentage() {
  const stations_active = await request__get_stations_details(this.bz);
  const number_of_stations = stations_active.length;
  const stations_operational_count = stations_active.filter(o => o["smetadata.state"] === 'ACTIVE').length;
  const stations_operational_percentage = (stations_operational_count * 100) / number_of_stations;
  this.stations_operational_percentage = parseInt(stations_operational_percentage, 10);
  this.stations_operational_count = stations_operational_count;
  return stations_operational_percentage;
}

export async function get_number_of_stations() {
  this.number_of_stations = await request__get_stations_active_count(this.bz);
}

export async function get_plug_type_distribution() {
  const plugs_details = await request__get_plugs_details({ bz: this.bz, outlets: true });
  const plug_types = await request_plug_types();
  this.plug_types = [...plug_types];
  const only_outlets = plugs_details.map(o => {
    return o["smetadata.outlets"];
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
  this.plug_type_distribution = distribution_percentage;
  this.number_of_plugs = tot_outlets;
}

export async function get_use_percentage() {
  const used_length = await request_at_least_one_plug_used_active_count(this.bz);
  this.stations_used_percentage = parseInt((used_length * 100) / this.number_of_stations, 10);
}

export async function get_stations_access_distribution() {
  const distribution_percentage = [];
  const stations_details = await request__get_stations_details(this.bz);
  const tot_stations = stations_details.length;

  const only_accessType = stations_details.map(o => {
    return o["smetadata.accessType"];
  });
  const count_by_type = countBy(only_accessType);

  const access_types = only_accessType.filter((v, i, a) => a.indexOf(v) === i);

  access_types.map(type => {
    const perc = (count_by_type[type] * 100) / tot_stations;
    distribution_percentage.push(perc);
    return false;
  });

  this.access_types = access_types;
  this.station_access_distribution = distribution_percentage;
}
