import { fetch_options } from './utils';

const NINJA_BASE_PATH = 'https://ipchannels.integreen-life.bz.it/ninja/api/v2';

export async function request__get_stations_details(bz) {
  try {
    let response_all = bz
      ? await fetch(
          NINJA_BASE_PATH +
            '/flat/EChargingStation?limit=-1&offset=0&where=sactive.eq.true%2Cscoordinate.bbi.(11.27539%2C46.444913%2C11.432577%2C46.530384)&shownull=false&distinct=true',
          fetch_options
        )
      : await fetch(
          NINJA_BASE_PATH +
            '/flat/EChargingStation?limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true',

          fetch_options
        );
    let response_active = bz
      ? await fetch(
          NINJA_BASE_PATH +
            '/flat/EChargingStation?limit=-1&offset=0&where=sactive.eq.true%2Cscoordinate.bbi.(11.27539%2C46.444913%2C11.432577%2C46.530384)&shownull=false&distinct=true',

          fetch_options
        )
      : await fetch(
          NINJA_BASE_PATH +
            '/flat/EChargingStation?limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true',
          fetch_options
        );

    response_all = await response_all.json();
    response_active = await response_active.json();

    return [response_all.data, response_active.data];
  } catch (e) {}
}

/** PLUG DETAILS */

/**
 * return the stations with plugs details
 * @param {{bz?: boolean, outlet?: boolean> param0
 */
export async function request__get_plugs_details({ bz, outlets }) {
  let request = bz
    ? await fetch(
        NINJA_BASE_PATH +
          '/flat/EChargingStation,EChargingPlug?limit=-1&offset=0&where=sactive.eq.true%2Cscoordinate.bbi.(11.27539%2C46.444913%2C11.432577%2C46.530384)&shownull=false&distinct=true',
        fetch_options
      )
    : await fetch(
        NINJA_BASE_PATH +
          '/flat/EChargingStation,EChargingPlug?limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true',
        fetch_options
      );

  let reponse = await request.json();

  console.info(bz);

  if (outlets) {
    return reponse.data.filter(o => Boolean(o.smetadata.outlets));
  } else {
    return reponse.data;
  }
}

/**
 * return the plugs with at least one plug
 * @param {boolean} bz
 */
export async function at_least_one_plug_used(bz) {
  try {
    const request = bz
      ? await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingPlug/echarging-plug-status?select=pcode&limit=-1&offset=0&where=sactive.eq.true,mvalue.eq.0,scoordinate.bbi.(11.27539%2C46.444913%2C11.432577%2C46.530384)&shownull=false&distinct=true`,
          fetch_options
        )
      : await fetch(
          `${NINJA_BASE_PATH}/flat/EChargingPlug/echarging-plug-status?select=pcode&limit=-1&offset=0&where=sactive.eq.true,mvalue.eq.0&shownull=false&distinct=true`,
          fetch_options
        );
    const reponse = await request.json();
    return reponse.data;
  } catch (e) {}
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
  } catch (e) {}
}
