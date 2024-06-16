<template>
  <div class="wrap__content">
    <!-- v-bind:class="{'wrap__content--preloader': !applications}"    <v-preloader v-if="!applications" :message="errorMessage"></v-preloader>     v-if="applications" -->

    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">Добавление нового отчета</div>
                    <div class="content__title--subtext">
                      Сведения о контрольно-инспекционной деятельности территориальных органов в
                      части охраны рыбных ресурсов
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST" @submit.prevent="onSubmit">
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование отчета</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.name
                                ? 'input--error'
                                : '',
                            ]"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              v-model="name"
                              value=""
                              placeholder="Наименование"
                            />
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.name"
                          >
                            <p v-for="massage in errorMessage.messages.name">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="modal__table--table">
                      <table class="table__limit table__reporting">
                        <thead>
                          <tr>
                            <td>№</td>
                            <td style="width: 500px">Наименование показателей</td>
                            <td>Количество (единица измерения)</td>
                            <td>За отчетный период</td>
                            <td>Сначала года</td>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>1</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[0][0].title }}</strong>
                            </td>
                            <td rowspan="8">{{ applicationTable[0][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[0][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[0][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr v-for="(item, index) in applicationTable[0]" v-if="index != 0">
                            <td>
                              <center>{{ item.number }}</center>
                            </td>
                            <td class="td__input">{{ item.title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input type="text" v-model="item.begin_year" class="input-linck" />
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <strong><center>2</center></strong>
                            </td>
                            <td>
                              <strong>{{ applicationTable[1][0].title }}</strong>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[1][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[1][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td rowspan="3"><center>2.1</center></td>
                            <td>{{ applicationTable[1][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[1][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[1][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>{{ applicationTable[1][2].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[1][2].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[1][2].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>{{ applicationTable[1][3].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[1][3].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[1][3].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>3</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[2][0].title }}</strong>
                            </td>
                            <td rowspan="9">{{ applicationTable[2][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[2][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[2][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr
                            v-for="(item, index) in applicationTable[2]"
                            v-if="index != 0 && item.number != '3.2.4'"
                          >
                            <td>
                              <center>{{ item.number }}</center>
                            </td>
                            <td class="td__input">{{ item.title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input type="text" v-model="item.begin_year" class="input-linck" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>3.2.4</center></td>
                            <td>{{ applicationTable[2][9].title }}</td>
                            <td>{{ applicationTable[2][9].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[2][9].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[2][9].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>4</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[3][0].title }}</strong>
                            </td>
                            <td rowspan="4">{{ applicationTable[3][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>4.1</center></td>
                            <td>{{ applicationTable[3][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>4.2</center></td>
                            <td>{{ applicationTable[3][2].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][2].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][2].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>4.3</center></td>
                            <td>{{ applicationTable[3][3].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][3].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][3].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>4.4</center></td>
                            <td>{{ applicationTable[3][4].title }}</td>
                            <td rowspan="8">{{ applicationTable[3][4].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][4].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[3][4].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>5</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[4][0].title }}</strong>
                            </td>
                            <td>{{ applicationTable[4][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[4][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[4][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>6</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[5][0].title }}</strong>
                            </td>
                            <td rowspan="4">{{ applicationTable[5][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>6.1</center></td>
                            <td>{{ applicationTable[5][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>6.2</center></td>
                            <td>{{ applicationTable[5][2].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][2].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][2].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>6.3</center></td>
                            <td>{{ applicationTable[5][3].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][3].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][3].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><center>6.4</center></td>
                            <td>{{ applicationTable[5][4].title }}</td>
                            <td>{{ applicationTable[5][4].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][4].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[5][4].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>7</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[6][0].title }}</strong>
                            </td>
                            <td rowspan="6">{{ applicationTable[6][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[6][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[6][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr v-for="(item, index) in applicationTable[6]" v-if="index != 0">
                            <td>
                              <center>{{ item.number }}</center>
                            </td>
                            <td class="td__input">{{ item.title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input type="text" v-model="item.begin_year" class="input-linck" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>8</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[7][0].title }}</strong>
                            </td>
                            <td rowspan="6">{{ applicationTable[7][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[7][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[7][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>9</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[8][0].title }}</strong>
                            </td>
                            <td rowspan="6">{{ applicationTable[8][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[8][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[8][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>10</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[9][0].title }}</strong>
                            </td>
                            <td rowspan="6">{{ applicationTable[9][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[9][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[9][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>11</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[10][0].title }}</strong>
                            </td>
                            <td rowspan="6">{{ applicationTable[10][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[10][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[10][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>12</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[11][0].title }}</strong>
                            </td>
                            <td rowspan="4">{{ applicationTable[11][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[11][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[11][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr v-for="(item, index) in applicationTable[11]" v-if="index != 0">
                            <td>
                              <center>{{ item.number }}</center>
                            </td>
                            <td class="td__input">{{ item.title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input type="text" v-model="item.begin_year" class="input-linck" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>13</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[12][0].title }}</strong>
                            </td>
                            <td rowspan="4">{{ applicationTable[12][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[12][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[12][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr
                            v-for="(item, index) in applicationTable[12]"
                            v-if="index != 0 && item.number != '13.4'"
                          >
                            <td>
                              <center>{{ item.number }}</center>
                            </td>
                            <td class="td__input">{{ item.title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="item.report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input type="text" v-model="item.begin_year" class="input-linck" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[12][4].number }}</center>
                            </td>
                            <td>{{ applicationTable[12][4].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[12][4].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[12][4].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[12][4].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>14</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[13][0].title }}</strong>
                            </td>
                            <td rowspan="4">{{ applicationTable[13][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[13][1].number }}</center>
                            </td>
                            <td>{{ applicationTable[12][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[13][2].number }}</center>
                            </td>
                            <td>{{ applicationTable[13][2].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][2].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][2].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[13][3].number }}</center>
                            </td>
                            <td>{{ applicationTable[13][3].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][3].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][3].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[13][4].number }}</center>
                            </td>
                            <td>{{ applicationTable[13][4].title }}</td>
                            <td>{{ applicationTable[13][4].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][4].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][4].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[13][5].number }}</center>
                            </td>
                            <td>{{ applicationTable[13][5].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][5].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][5].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][5].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[13][6].number }}</center>
                            </td>
                            <td>{{ applicationTable[13][6].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][6].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][6].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][6].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[13][7].number }}</center>
                            </td>
                            <td>{{ applicationTable[13][7].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][7].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][7].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[13][7].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>15</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[14][0].title }}</strong>
                            </td>
                            <td rowspan="3">{{ applicationTable[14][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[14][1].number }}</center>
                            </td>
                            <td>{{ applicationTable[14][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[14][2].number }}</center>
                            </td>
                            <td>{{ applicationTable[14][2].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][2].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][2].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[14][3].number }}</center>
                            </td>
                            <td>{{ applicationTable[14][3].title }}</td>
                            <td>{{ applicationTable[14][3].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][3].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][3].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[14][4].number }}</center>
                            </td>
                            <td>{{ applicationTable[14][4].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][4].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][4].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][4].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[14][5].number }}</center>
                            </td>
                            <td>{{ applicationTable[14][5].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][5].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][5].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][5].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[14][6].number }}</center>
                            </td>
                            <td>{{ applicationTable[14][6].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][6].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][6].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[14][6].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>16</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[15][0].title }}</strong>
                            </td>
                            <td>{{ applicationTable[15][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[15][1].number }}</center>
                            </td>
                            <td>{{ applicationTable[15][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][1].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[15][2].number }}</center>
                            </td>
                            <td>{{ applicationTable[15][2].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][2].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][2].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][2].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[15][3].number }}</center>
                            </td>
                            <td>{{ applicationTable[15][3].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][3].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][3].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[15][3].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td rowspan="2">
                              <center>
                                <strong>{{ applicationTable[16][0].number }}</strong>
                              </center>
                            </td>
                            <td>{{ applicationTable[16][0].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[16][0].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[16][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[16][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>{{ applicationTable[16][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[16][1].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[16][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[16][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td rowspan="2">
                              <center>
                                <strong>{{ applicationTable[17][0].number }}</strong>
                              </center>
                            </td>
                            <td>{{ applicationTable[17][0].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[17][0].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[17][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[17][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>{{ applicationTable[17][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[17][1].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[17][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[17][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>19</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[18][0].title }}</strong>
                            </td>
                            <td rowspan="5">{{ applicationTable[18][0].total_ed }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[18][1].number }}</center>
                            </td>
                            <td>{{ applicationTable[18][1].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][1].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][1].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[18][2].number }}</center>
                            </td>
                            <td>{{ applicationTable[18][2].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][2].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][2].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[18][3].number }}</center>
                            </td>
                            <td>{{ applicationTable[18][3].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][3].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][3].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <center>{{ applicationTable[18][4].number }}</center>
                            </td>
                            <td>{{ applicationTable[18][4].title }}</td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][4].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[18][4].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td class="td__input">
                              <center><strong>20</strong></center>
                            </td>
                            <td class="td__input">
                              <strong>{{ applicationTable[19][0].title }}</strong>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[19][0].total_ed"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[19][0].report_period"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                            <td class="td__input">
                              <div class="form__input--input">
                                <input
                                  type="text"
                                  v-model="applicationTable[19][0].begin_year"
                                  class="input-linck"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--right">
                      <div class="input__row">
                        <button class="input-btn form__line--btn">
                          {{ $t('button.save') }}
                        </button>
                      </div>

                      <div class="row">
                        <div class="col-xl-12">
                          <div
                            class="form__block--line form__messages"
                            v-if="message.text"
                            :class="{
                              'form__messages--error': message.status != 200,
                              'form__messages--success': message.status == 200,
                            }"
                          >
                            <label class="form__block--input">
                              <span class="form__block--title">
                                {{ message.text }}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/boot/axios';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      applications: null,
      applicationSubmit: null,

      applicationTable: [
        [
          {
            number: '1',
            title: 'Составлено протоколов о нарушении рыбоохранного законодательства, из них:',
            total_ed: 'Количество протоколов/ человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '1.1',
            title: 'за загрязнение водоемов',
            total_ed: 'Количество протоколов/ человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '1.2',
            title: 'за нарушение режима судоходства',
            total_ed: 'Количество протоколов/ человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '1.3',
            title: 'за незаконный лов рыбы',
            total_ed: 'Количество протоколов/ человек',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '2',
            title: 'Рассмотрено административных материалов инспекцией',
            total_ed: 'Количество протоколов/ человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '2.1',
            title: 'количество дел об административных правонарушениях, направленных в суд',
            total_ed: 'Количество протоколов/ человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '2.1',
            title: 'привлечено судом к административной ответственности',
            total_ed: 'Количество протоколов/ человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '2.1',
            title: 'в процессе рассмотрения в суде',
            total_ed: 'Количество протоколов/ человек',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '3',
            title:
              'Передано дел на нарушителей рыбоохранного законодательства в следственные органы, из них',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.1',
            title: 'возбуждено уголовных дел',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.1.1',
            title: 'направлено уголовных дел в суд',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.1.2',
            title: 'привлечено судом к уголовной ответственности',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.1.3',
            title: 'в процессе рассмотрения в суде',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.2',
            title:
              'отказано в возбуждении уголовного дела и рассмотрено по производству об административных правонарушениях, из них',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.2.1',
            title: 'инспекцией',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.2.2',
            title: 'судом',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.2.3',
            title: 'правоохранительным органом',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '3.2.4',
            title: 'безличные нарушения',
            total_ed: 'Дел',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '4',
            title: 'Нарушения допущены, всего',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '4.1',
            title: 'рыбодобывающими организациями',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '4.2',
            title: 'гражданами (физическими лицами)',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '4.3',
            title: 'должностными лицами',
            total_ed: 'Дел/человек',
            report_period: '',
            begin_year: '',
          },
          {
            number: '4.4',
            title: 'безличные нарушения дел',
            total_ed: 'Дел',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '5',
            title: 'Открыто нарушений совместно с сотрудниками правоохранительных органов',
            total_ed: '(количество) протоколов',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '6',
            title: 'Наложено штрафов всего, из них:',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '6.1',
            title:
              'по статье 383 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '6.2',
            title:
              'по статье 389 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '6.3',
            title:
              'по статье 811 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '6.4',
            title: 'направлено дел на принудительное взыскание',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '7',
            title: 'Взыскано штрафов',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '7.1',
            title: 'в добровольном порядке',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '7.1.1',
            title:
              'по статье 383 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '7.1.2',
            title:
              'по статье 389 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '7.1.3',
            title:
              'по статье 811 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '7.2',
            title: 'в принудительном порядке',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '8',
            title: 'Предъявлено за ущерб',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '9',
            title: 'Взыскано за ущерб',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '10',
            title: 'Взыскано сумма штрафа прошлых лет',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '11',
            title: 'Взыскано сумма иска прошлых лет',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '12',
            title: 'поступило средств от реализации конфискантов, всего',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '12.1',
            title: 'рыбы',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '12.2',
            title: 'икры',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
          {
            number: '12.3',
            title: 'транспортных и плавательных средств',
            total_ed: 'человек/тысяча тенге',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '13',
            title: 'Изъято у нарушителей, всего',
            total_ed: 'килограмм',
            report_period: '',
            begin_year: '',
          },
          {
            number: '13.1',
            title: 'рыбы частиковых видов',
            total_ed: 'килограмм',
            report_period: '',
            begin_year: '',
          },
          {
            number: '13.2',
            title: 'рыбы осетровых видов',
            total_ed: 'килограмм',
            report_period: '',
            begin_year: '',
          },
          {
            number: '13.3',
            title: 'икры осетровых видов',
            total_ed: 'килограмм',
            report_period: '',
            begin_year: '',
          },
          {
            number: '13.4',
            title: 'иных видов',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '14',
            title: 'Изъято у нарушителей орудий лова, транспортных и плавательных средств, всего',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
          {
            number: '14.1',
            title: 'неводов, волокуш, бредней',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
          {
            number: '14.2',
            title: 'сетей',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
          {
            number: '14.3',
            title: 'петель и другие',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
          {
            number: '14.4',
            title: 'транспортных и плавательных средств',
            total_ed: 'транспортных/плавательных средств',
            report_period: '',
            begin_year: '',
          },
          {
            number: '14.5',
            title: 'средства связи',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
          {
            number: '14.6',
            title: 'навигаторов',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
          {
            number: '14.7',
            title: 'эхолотов',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '15',
            title: 'Изъято бесхозных орудий лова, автомобильных и плавательных средств, всего',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
          {
            number: '15.1',
            title: 'сетей',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
          {
            number: '15.2',
            title: 'петель и другие',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
          {
            number: '15.3',
            title: 'транспортных и плавательных средств',
            total_ed: 'транспортных/плавательных средств',
            report_period: '',
            begin_year: '',
          },
          {
            number: '15.4',
            title: 'средства связи',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
          {
            number: '15.5',
            title: 'навигаторов',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
          {
            number: '15.6',
            title: 'эхолотов',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '16',
            title: 'Aгитационно-массовая работа',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
          {
            number: '16.1',
            title: 'выступление по радио',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
          {
            number: '16.2',
            title: 'выступление по телевидению',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
          {
            number: '16.3',
            title: 'опубликовано статей',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '17',
            title: 'количество актов составленных при проверке промысловых орудий лова',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
          {
            number: '17',
            title: 'при этом вскрыто нарушений',
            total_ed: 'штук',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '18',
            title: 'количество проверок водозаборов',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
          {
            number: '18',
            title: 'при этом вскрыто нарушений',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '19',
            title: 'Участие технических средств и инспекторов',
            total_ed: 'единиц',
            report_period: '',
            begin_year: '',
          },
          {
            number: '19.1',
            title: 'количество речных судов',
            total_ed: 'единиц',
            report_period: '',
            begin_year: '',
          },
          {
            number: '19.2',
            title: 'количество морских судов',
            total_ed: 'единиц',
            report_period: '',
            begin_year: '',
          },
          {
            number: '19.3',
            title: 'участие мотолодок',
            total_ed: 'единиц',
            report_period: '',
            begin_year: '',
          },
          {
            number: '19.4',
            title: 'количество участвовавших инспекторов',
            total_ed: 'единиц',
            report_period: '',
            begin_year: '',
          },
        ],
        [
          {
            number: '20',
            title: 'Организовано рыбоохранных постов',
            total_ed: '',
            report_period: '',
            begin_year: '',
          },
        ],
      ],

      name: '',

      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
    };
  },

  methods: {
    onSubmit(evt) {
      this.errorMessage = {
        status: null,
        messages: null,
        text: null,
      };
      this.message = {
        status: null,
        text: null,
      };
      // const formData = new FormData(evt.target);
      if (!this.applicationTable.length) {
        this.message = {
          status: '500',
          text: 'Таблица не заполнена',
        };
        return false;
      }

      api
        .post('/report/add', {
          name: this.name,
          index: 10,
        })
        .then((response) => {
          this.applicationSubmit = response.data;
          this.onSubmitList();
        })
        .catch((error) => {
          if (error?.response?.status == 500) {
            this.errorMessage.status = 500;
            this.errorMessage.text = this.$t('system_message.500');
          }
          if (error?.response?.status == 401) {
            this.errorMessage.status = 401;
            this.errorMessage.text = error.response.data.error_message;
            this.$router.push('/' + this.$i18n.locale + '/login');
          }
          if (error?.response?.status == 422) {
            this.errorMessage.status = 422;
            this.errorMessage.text = error.response.data.error_message;
          }
          this.errorMessage.messages = error.response.data.error_messages;
        });
    },

    onSubmitList() {
      this.applicationTable.find((element) => {
        element.find((elementItem) => {
          this.onSubmitTable(elementItem);
        });
      });

      this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/' + 10 });
    },

    onSubmitTable(element) {
      api
        .post('/report/add/indexten', {
          report_fish_id: this.applicationSubmit.id,
          title: element.title,
          total_ed: element.total_ed,
          report_period: element.report_period,
          begin_year: element.begin_year,
        })
        .then((response) => {
          return true;
        })
        .catch((error) => {
          if (error?.response?.status == 500) {
            this.errorMessage.status = 500;
            this.errorMessage.text = this.$t('system_message.500');
          }
          if (error?.response?.status == 401) {
            this.errorMessage.status = 401;
            this.errorMessage.text = error.response.data.error_message;
            this.$router.push('/' + this.$i18n.locale + '/login');
          }
          if (error?.response?.status == 422) {
            this.errorMessage.status = 422;
            this.errorMessage.text = error.response.data.error_message;
          }
          this.errorMessage.messages = error.response.data.error_messages;
          return false;
        });
    },
  },
  beforeMount() {},
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
