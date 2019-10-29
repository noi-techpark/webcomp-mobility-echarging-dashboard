import { request__get_stations_details, at_least_one_plug_used } from './integreen-life-requests';

export async function get_available_stations_percentage() {
  const [stations_all, stations_active] = await request__get_stations_details(this.bz);
  let number_of_stations = stations_all.length;
  let number_of_active = stations_active.length;
  let sum = number_of_active;
  const perc_available_stations = (sum * 100) / number_of_stations;
  this.chart_1_value = parseInt(perc_available_stations);
  return perc_available_stations;
}

export async function get_number_of_stations() {
  const [stations_all] = await request__get_stations_details(this.bz);
  let number_of_stations = stations_all.length;
  this.number_of_stations = number_of_stations;
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
