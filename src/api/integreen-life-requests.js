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
          `${NINJA_BASE_PATH}/flat/EChargingStation?limit=-1&offset=0&where=sactive.eq.true,scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)&shownull=false&distinct=true`,
          fetch_options
        )
      : await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingStation?limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true`,
          fetch_options
        );

    const response = await request.json();

    return response.data;
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
        `${NINJA_BASE_PATH}/flat/EChargingStation,EChargingPlug?limit=-1&offset=0&where=sactive.eq.true,scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)&shownull=false&distinct=true`,
        fetch_options
      )
    : await fetch(
        `${NINJA_BASE_PATH}/flat/EChargingStation,EChargingPlug?limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true`,
        fetch_options
      );

  const response = await request.json();

  if (outlets) {
    return response.data.filter(o => Boolean(o.smetadata.outlets));
  }

  return response.data;
}

/**
 * return the plugs with at least one plug
 * @param {boolean} bz
 */
export async function request_at_least_one_plug_used(bz) {
  try {
    const request = bz
      ? await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingPlug/echarging-plug-status/latest?select=pcode&limit=-1&offset=0&where=sactive.eq.true,mvalue.eq.0,scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)&shownull=false&distinct=true`,
          fetch_options
        )
      : await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingPlug/echarging-plug-status/latest?select=pcode&limit=-1&offset=0&where=sactive.eq.true,mvalue.eq.0&shownull=false&distinct=true`,
          fetch_options
        );
    const reponse = await request.json();
    return reponse.data;
  } catch (e) {
    return undefined;
  }
}

/* Plug types */

export async function request_plug_types() {
  try {
    const request = await fetch(
      `${NINJA_BASE_PATH}/flat/EChargingPlug?limit=-1&offset=0&select=smetadata.outlets&where=sactive.eq.true&shownull=false&distinct=true`,
      fetch_options
    );
    const reponse = await request.json();
    const unique = Array.from(new Set(reponse.data.map(o => o['smetadata.outlets'][0].outletTypeCode))).filter(
      v => v !== 'UNKNOWN'
    );
    return unique;
  } catch (e) {
    return undefined;
  }
}

/* Charging stations access types */

export async function request_charging_stations_access_types() {
  try {
    const request = await fetch(
      `${NINJA_BASE_PATH}/flat/EChargingStation?limit=-1&offset=0&select=smetadata.accessType&where=sactive.eq.true&shownull=false&distinct=false`,
      fetch_options
    );
    const reponse = await request.json();
    const unique = Array.from(new Set(reponse.data.map(o => o['smetadata.accessType'])));

    return unique;
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
