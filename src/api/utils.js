// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// SPDX-FileCopyrightText: 2020 - 2021 STA <info@sta.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const NINJA_BASE_PATH = process.env.NINJA_BASE_PATH;
const BZ_ONLY_FILTER = 'scoordinate.bbi.(10.380587,46.219386,12.479683,47.097544)';
const DEFAULT_PARAMS = 'distinct=true&shownull=false&offset=0&limit=-1&origin=webcomp-mobility-echarging-dashboard';

export const fetch_options = {
  method: 'GET',
  headers: new Headers({
    Accept: 'application/json'
  })
};

export function fetch_url(call, select, where, bz) {
  const _where = bz ? where + "," + BZ_ONLY_FILTER : where;
  return `${NINJA_BASE_PATH}/${call}?select=${select}&where=${_where}&${DEFAULT_PARAMS}`;
}


function __safe_zero(num) {
  if (num === null || num == undefined || isNaN(num))
    return 0;
  return num;
}

export function make_percentage(value, count) {
  const perc = (value * 100) / count;
  return __safe_zero(perc);
}