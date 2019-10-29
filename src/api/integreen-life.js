const BASE_PATH = 'https://ipchannels.integreen-life.bz.it/emobility/rest/';
const NINJA_BASE_PATH = 'https://ipchannels.integreen-life.bz.it/ninja/api/v2';
const BASE_PATH_PLUGS = 'https://ipchannels.integreen-life.bz.it/emobility/rest/plugs/';
import _ from 'lodash';

const fetch_options = {
  method: 'GET',
  headers: new Headers({
    Accept: 'application/json'
  })
};

const PLUG_STATES = {
  used: 'USED',
  free: 'FREE'
};

const STATION_STATES = {
  active: 'ACTIVE',
  available: 'AVAILABLE',
  fault: 'FAULT',
  temporaryunavailable: 'TEMPORARYUNAVAILABLE',
  unavailable: 'UNAVAILABLE',
  unknown: 'UNKNOWN',
  undefined: 'undefined'
};

/** STATIONS DETAILS */

async function request__get_stations_details(bz) {
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
      : // : await fetch(BASE_PATH + 'get-station-details', fetch_options);
        await fetch(
          NINJA_BASE_PATH +
            '/flat/EChargingStation?limit=-1&offset=0&where=sactive.eq.true&shownull=false&distinct=true',
          fetch_options
        );

    response_all = await response_all.json();
    response_active = await response_active.json();

    return [response_all.data, response_active.data];
  } catch (e) {}
}

export async function get_available_stations_percentage() {
  let sum,
    number_of_stations,
    number_of_active = 0;
  // if (this.bz) {
  const [stations_all, stations_active] = await request__get_stations_details(this.bz);
  // console.log(stations_all);

  number_of_stations = stations_all.length;
  number_of_active = stations_active.length;
  sum = number_of_active;
  // } else {
  //   const stations = await request__get_stations_details(this.bz);
  //   const grouped_stations_by_state = _.groupBy(stations, 'state');
  //   number_of_stations = stations.length;
  //   number_of_active = grouped_stations_by_state[STATION_STATES.active].length;
  //   const number_of_available = grouped_stations_by_state[STATION_STATES.available].length;
  //   sum = number_of_active + number_of_available;
  // }
  const perc_available_stations = (sum * 100) / number_of_stations;
  this.chart_1_value = parseInt(perc_available_stations);
  return perc_available_stations;
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

export async function get_number_of_stations() {
  let number_of_stations = 0;
  // if (this.bz) {
  const [stations_all, stations_active] = await request__get_stations_details(this.bz);
  number_of_stations = stations_all.length;
  // } else {
  //   const stations = await request__get_stations_details(this.bz);
  //   number_of_stations = stations.length;
  // }
  this.number_of_stations = number_of_stations;
}

/** PLUG DETAILS */

async function request__get_plugs_details(bz) {
  // let response = await fetch(BASE_PATH_PLUGS + 'get-station-details', fetch_options);
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

export async function get_plugs_type_distribution() {
  // this.load_perc_3 = this.load_perc_3 + 30;
  // const plugs_details = await request__get_plugs_details();
  // let tot_outlets = 0;
  // let exctracted_outlet_types = [];
  // this.load_perc_3 = this.load_perc_3 + 10;
  // plugs_details.map(details => {
  //   tot_outlets += details.outlets.length;
  //   details.outlets.map(outlet => {
  //     exctracted_outlet_types.push(outlet.outletTypeCode);
  //   });
  // });
  // this.load_perc_3 = this.load_perc_3 + 10;
  // const distribution_numbers = {};
  // _.values(_.groupBy(exctracted_outlet_types)).map(d => {
  //   distribution_numbers[d[0]] = d.length;
  // });
  // this.load_perc_3 = this.load_perc_3 + 10;
  // const ordered_values = ['Type2Mennekes', 'Type2 - 230Vac', 'Type2 - 400Vac', 'Type 3A', 'CHAdeMO'];
  // let distribution_percentage = [];
  // this.load_perc_3 = this.load_perc_3 + 10;
  // ordered_values.map(type => {
  //   const perc = (distribution_numbers[type] * 100) / tot_outlets;
  //   distribution_percentage.push(perc);
  // });
  // this.load_perc_3 = this.load_perc_3 + 20; // 90%
  // this.chart_2_value = distribution_percentage;
}

export async function request__get_use_percentage() {
  const used = await at_least_one_plug_used(this.bz);
  this.chart_3_value = parseInt((used.length * 100) / this.number_of_stations);
  return undefined;
}
