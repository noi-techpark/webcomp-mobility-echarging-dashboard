// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// SPDX-FileCopyrightText: 2020 - 2021 STA <info@sta.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Wrapper around api requests with the purpouse to refine data
 */

import countBy from 'lodash/countBy';
import {
  request_plug_types,
  request_plug_details,
  request_station_active_details,
  request_station_states
} from './integreen-life-requests';
import {
  make_percentage
} from './utils';

const NOT_OPERATIONAL_STATES = [
  "TEMPORARYUNAVAILABLE",
  "FAULT",
]

const OPERATIONAL_STATES = [
  "ACTIVE",
  "AVAILABLE",
  "OCCUPIED"
]

export async function get_station_status_distribution() {
  const station_states = await request_station_states(this.bz);
  const station_states_sorted = station_states.sort((a, b) => {
    if (a.pcode < b.pcode)
      return -1;
    if (a.pcode > b.pcode)
      return 1;
    if (a.mvalue < b.mvalue)
      return -1;
    if (a.mvalue > b.mvalue)
      return 1;
    return (
      (a["pmetadata.state"] < b["pmetadata.state"])
      -
      (a["pmetadata.state"] > b["pmetadata.state"])
    );
  });

  let outlets_total = 0;
  let outlets_used = 0;
  let outlets_not_used = 0;
  let outlets_not_operational = 0;
  let outlets_unknown = 0;
  let total_plugs = 0;
  let total = 0;
  let used = 0;
  let not_used = 0;
  let not_operational = 0;
  let last_pcode = "";
  let curr_is_used = false;
  let unknown = 0;

  for (let key in station_states_sorted) {
    let rec = station_states_sorted[key];
    let curr_outlet_count = (rec["smetadata.outlets"] || rec["smetadata.connectors"] || []).length;

    total_plugs++;
    outlets_total += curr_outlet_count;

    if (rec["mvalue"] == 0) {
      curr_is_used = true;
    }

    if (rec["pcode"] != last_pcode) {
      total++;
    }

    const is_state_known = rec["mvalue"] >= 0;

    if (NOT_OPERATIONAL_STATES.includes(rec["pmetadata.state"])) {
      outlets_not_operational += curr_outlet_count;
      if (rec["pcode"] != last_pcode) {
        not_operational++;
      }
    } else if (OPERATIONAL_STATES.includes(rec["pmetadata.state"]) && is_state_known) {
      if (curr_is_used) {
        outlets_used += curr_outlet_count;
        if (rec["pcode"] != last_pcode) {
          used++;
        }
      } else {
        outlets_not_used += curr_outlet_count;
        if (rec["pcode"] != last_pcode) {
          not_used++;
        }
      }
    } else {
      outlets_unknown += curr_outlet_count;
      if (rec["pcode"] != last_pcode) {
        unknown++;
      }
    }
    curr_is_used = false;
    last_pcode = rec["pcode"];
  }

  this.station_status_distribution = [
    [used, total, make_percentage(used, total)],
    [not_used, total, make_percentage(not_used, total)],
    [not_operational, total, make_percentage(not_operational, total)],
    [unknown, total, make_percentage(unknown, total)]
  ]

  this.plug_status_distribution = [
    [outlets_used, outlets_total, make_percentage(outlets_used, outlets_total)],
    [outlets_not_used, outlets_total, make_percentage(outlets_not_used, outlets_total)],
    [outlets_not_operational, outlets_total, make_percentage(outlets_not_operational, outlets_total)],
    [outlets_unknown, outlets_total, make_percentage(outlets_unknown, outlets_total)]
  ]
}

export async function get_plug_type_distribution() {
  const plugs_details = await request_plug_details({ bz: this.bz, outlets: true }) || [];
  const plug_types = (await request_plug_types(this.bz)) || [];
  console.log("a",plug_types)

  const only_outlets = plugs_details.map(o => {
    return (o["smetadata.outlets"] ?? o["smetadata.connectors"]) ?? [];
  });
  const count_by_type = countBy(only_outlets.flat(), o => {
    return o.outletTypeCode || o.standard;
  });
  const tot_outlets = only_outlets.flat().length;
  let distribution_percentage = [];
  plug_types.forEach(type => {
    distribution_percentage.push(
      [
        count_by_type[type],
        tot_outlets,
        make_percentage(count_by_type[type], tot_outlets),
        type
      ]
    );
  });

  distribution_percentage = distribution_percentage
    .filter(e => e[0] > 0)
    .map(e => e[3] === '700 bar small vehicles' ? [...e.slice(0,3),'H2-Station: 700 bar small vehicles'] : e)
    .sort(([cnt1, tot, prc, type], [cnt2, tot2, prc2, type2]) => {
      if (type === 'OTHER')
        return 1;
      if (type2 === 'OTHER')
        return -1;
      else
        return cnt2 - cnt1
    });

  this.plug_types = distribution_percentage.map(e => e[3]);
  this.plug_type_distribution = distribution_percentage;
  this.number_of_plugs = tot_outlets;
}

export async function get_stations_access_distribution() {
  const distribution_percentage = [];
  const stations_details = await request_station_active_details(this.bz);
  const tot_stations = stations_details.length;

  const only_accessType = stations_details.map(o => {
    return o["smetadata.accessType"];
  });
  console.log(stations_details)
  console.log(only_accessType)
  const count_by_type = countBy(only_accessType);

  const access_types = only_accessType.filter((v, i, a) => a.indexOf(v) === i);

  access_types.map(type => {
    distribution_percentage.push(
      [
        count_by_type[type],
        tot_stations,
        make_percentage(count_by_type[type], tot_stations)
      ]
    );
    return false;
  });

  this.access_types = access_types;
  console.log(access_types)
  this.station_access_distribution = distribution_percentage;
  this.number_of_stations = tot_stations;
}
