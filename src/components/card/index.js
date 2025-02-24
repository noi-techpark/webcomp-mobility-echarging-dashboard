// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// SPDX-FileCopyrightText: 2020 - 2021 STA <info@sta.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from 'lit-element';
import loader_img from '../../img/loader@2x.png';
import reload_img from '../../img/reload@2x.png';
/**
 *
 * @param {Number} load_perc - 0 to 100, Percentage of the content loaded for the card
 */
export function Card({ load_perc, refresh_function, title, content, big }) {
  return html`
    <div class="col-12 col-lg-6">
      <div class="card ${big ? 'big' : ''} mb-4">
        <div class="card__header">
          <h3 class="fs-h4">${title}</h3>
          <div>
            ${load_perc === 100
              ? html`
                  <img @click="${() => refresh_function()}" class="card__reload_icon" src="${reload_img}" alt="" />
                `
              : ''}
          </div>
        </div>
        <div class="card__divider"></div>
        <div class="card__body">
          ${content}
          ${load_perc !== 100
            ? html`
                <div class="card__loader">
                  <div class="row">
                    <div class="col-12">
                      <img class="card__loader_spinner" src="${loader_img}" alt="" />
                    </div>
                    <div class="col-12 text-center">
                      <p class="mt-3 fs-30 fw-600">
                        ${load_perc}%
                      </p>
                    </div>
                  </div>
                </div>
              `
            : ''}
        </div>
      </div>
    </div>
  `;
}
