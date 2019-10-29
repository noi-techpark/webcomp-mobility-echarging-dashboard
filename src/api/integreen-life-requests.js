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

async function request__get_plugs_details(bz) {
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
  return reponse.data;
}

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
