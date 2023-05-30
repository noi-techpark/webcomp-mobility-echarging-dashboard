// SPDX-FileCopyrightText: 2021 NOI Techpark <digital@noi.bz.it>
// SPDX-FileCopyrightText: 2021 STA <info@sta.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  fetch_options,
  fetch_url,
} from './utils';

/**
 * return the stations details
 */
export async function request_station_active_details(bz) {
  try {
    const url = fetch_url(
      "flat/EChargingStation", 
      "scode,smetadata.state,smetadata.accessType", 
      "sactive.eq.true", 
      bz
    );
    const request = await fetch(url, fetch_options);
    const response = await request.json();
    return response.data;
  } catch (e) {
    console.log(e)
    return undefined;
  }
}

/** PLUG DETAILS */

/**
 * return the stations with plugs details
 * @param {{bz?: boolean, outlet?: boolean}} param0
 */
export async function request_plug_details({ bz, outlets }) {
  try {
    const url = fetch_url(
      "flat/EChargingStation,EChargingPlug", 
      "scode,smetadata.outlets", 
      "sactive.eq.true,pactive.eq.true", 
      bz
    );
    const request = await fetch(url, fetch_options);
    const response = await request.json();
    if (outlets) {
      return response.data.filter(o => Boolean(o["smetadata.outlets"]));
    }
    return response.data;
  } catch (e) {
    console.log(e)
    return undefined;
  }
}

/* Plug types */
export async function request_plug_types(bz) {
  try {
    const url = fetch_url(
      "flat/EChargingPlug", 
      "smetadata.outlets.0.outletTypeCode", 
      "sactive.eq.true,smetadata.outlets.0.outletTypeCode.neq.UNKNOWN",
      bz
    );
    const request = await fetch(url, fetch_options);
    const response = await request.json();
    const response_array = Array.from(new Set(response.data.map(o => o["smetadata.outlets.0.outletTypeCode"])));
    return response_array;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function request_station_states(bz) {
  // not all stations have status measurements.
  // since the measurement API does not return stations without measurement, we have to do two calls
  const plugs_status = await request_plug_status(bz);
  const plugs = await request_plugs(bz)
  const plugs_with_status = plugs.map(p => ({...p, mvalue: plugs_status[p.scode]}));
  return plugs_with_status;
}

async function request_plug_status(bz) {
  try {
    const url = fetch_url(
      "flat/EChargingPlug/echarging-plug-status/latest", 
      "scode,mvalue", 
      "sactive.eq.true,pactive.eq.true", 
      bz
    );
    const request = await fetch(url, fetch_options);
    const response = await request.json();
    const status_by_plug = Object.fromEntries(response.data.map(e => [e.scode, e.mvalue]));
    return status_by_plug;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

async function request_plugs(bz) {
  try {
    const url = fetch_url(
      "flat/EChargingPlug", 
      "pcode,scode,pmetadata.state,smetadata.outlets", 
      "sactive.eq.true,pactive.eq.true", 
      bz
    );
    const request = await fetch(url, fetch_options);
    const response = await request.json();
    return response.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}