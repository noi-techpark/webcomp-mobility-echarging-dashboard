import { fetch_options } from './utils';

/**
 * Just the basic api calls
 */

const NINJA_BASE_PATH = 'https://mobility.api.opendatahub.bz.it/v2';

/**
 * return the stations details
 * @param {{bz?: boolean, outlet?: boolean}} param0
 */
export async function request__get_stations_details(bz) {
  try {
    const request = bz
      ? await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingStation?select=scode,smetadata.state,smetadata.accessType&limit=-1&offset=0&where=sactive.eq.true,scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)&shownull=false&distinct=true`,
          fetch_options
        )
      : await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingStation?select=scode,smetadata.state,smetadata.accessType&limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true`,
          fetch_options
        );

    const response = await request.json();

    return response.data;
  } catch (e) {
    return undefined;
  }
}

/**
 * return the stations details
 * @param {{bz?: boolean, outlet?: boolean}} param0
 */
export async function request__get_stations_active_count(bz) {
  try {
    const request = bz
      ? await fetch(
        `${NINJA_BASE_PATH}/flat/EChargingStation?select=count(scode)&where=sactive.eq.true,scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)`,
        fetch_options
      )
      : await fetch(
        `${NINJA_BASE_PATH}/flat/EChargingStation?select=count(scode)&where=sactive.eq.true`,
        fetch_options
      );

    const response = await request.json();

    return response.data[0]["count(scode)"];
  } catch (e) {
    return undefined;
  }
}

/** PLUG DETAILS */

/**
 * return the stations with plugs details
 * @param {{bz?: boolean, outlet?: boolean}} param0
 */
export async function request__get_plugs_details({ bz, outlets }) {
  const request = bz
    ? await fetch(
        `${NINJA_BASE_PATH}/flat/EChargingStation,EChargingPlug?select=scode,smetadata.outlets&limit=-1&offset=0&where=sactive.eq.true,scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)&shownull=false&distinct=true`,
        fetch_options
      )
    : await fetch(
        `${NINJA_BASE_PATH}/flat/EChargingStation,EChargingPlug?select=scode,smetadata.outlets&limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true`,
        fetch_options
      );

  const response = await request.json();

  if (outlets) {
    return response.data.filter(o => Boolean(o["smetadata.outlets"]));
  }

  return response.data;
}

/**
 * return the plugs with at least one plug
 * @param {boolean} bz
 */
export async function request_at_least_one_plug_used_active_count(bz) {
  try {
    const request = bz
      ? await fetch(
        `${NINJA_BASE_PATH}/flat/EChargingPlug/echarging-plug-status/latest?select=count(pcode)&where=sactive.eq.true,mvalue.eq.0,scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)`,
        fetch_options
      )
      : await fetch(
        `${NINJA_BASE_PATH}/flat/EChargingPlug/echarging-plug-status/latest?select=count(pcode)&where=sactive.eq.true,mvalue.eq.0`,
        fetch_options
      );
    const reponse = await request.json();
    return reponse.data[0]["count(pcode)"];
  } catch (e) {
    return undefined;
  }
}

/* Plug types */

export async function request_plug_types() {
  try {
    const request = await fetch(
      `${NINJA_BASE_PATH}/flat/EChargingPlug?limit=-1&offset=0&select=smetadata.outlets.0.outletTypeCode&where=sactive.eq.true,smetadata.outlets.0.outletTypeCode.neq.UNKNOWN&shownull=false&distinct=true`,
      fetch_options
    );
    const response = await request.json();
    const response_array = Array.from(new Set(response.data.map(o => o["smetadata.outlets.0.outletTypeCode"])));
    return response_array;
  } catch (e) {
    return undefined;
  }
}

/* Charging stations access types */

export async function request_charging_stations_access_types() {
  try {
    const request = await fetch(
      `${NINJA_BASE_PATH}/flat/EChargingStation?limit=-1&offset=0&select=smetadata.accessType&where=sactive.eq.true&shownull=false&distinct=true`,
      fetch_options
    );
    const response = await request.json();
    const response_array = Array.from(new Set(response.data.map(o => o['smetadata.accessType'])));

    return response_array;
  } catch (e) {
    return undefined;
  }
}

/**
 *
 */

export async function request_plugs_with_state_and_echargingstation(bz) {
  try {
    const request = bz
      ? await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingPlug/echarging-plug-status/latest?select=scode,pcode,mvalue&limit=-1&offset=0&where=sactive.eq.true,scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)&shownull=false&distinct=true`,
          fetch_options
        )
      : await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingPlug/echarging-plug-status/latest?select=scode,pcode,mvalue&limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true`,
          fetch_options
        );
    const reponse = await request.json();
    return reponse.data;
  } catch (e) {
    return undefined;
  }
}
