<template>
  <div
    class="wrap__content"
    v-bind:class="{
      'wrap__content--preloader':
        !_getRegionList || !applicationsPond || !applicationsDistrict || !applicationsKato,
    }"
  >
    <v-preloader
      v-if="!_getRegionList || !applicationsPond || !applicationsDistrict || !applicationsKato"
      :message="errorMessage"
    ></v-preloader>

    <div
      class="container"
      v-if="_getRegionList && applicationsPond && applicationsDistrict && applicationsKato"
    >
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__page--back">
                    <a @click="$router.go(-1)">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.125 5.25L7.875 10.5L13.125 15.75"
                          stroke="#52A5FC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                  <div class="content__title--element">
                    <div class="content__title--text">Добавление нового отчета</div>
                    <div class="content__title--subtext">
                      Сведения о деятельности егерских служб пользователей животного мира,
                      осуществляющих охрану рыбохозяйственных водоемов и (или) участков
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <form method="POST">
                  <!-- @submit.prevent="onSubmit" -->

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Наименование региона</div>
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
                            v-if="formList.region.length == 1"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              :value="formList.region[0].name"
                              disabled
                              placeholder="Наименование"
                            />
                            <input type="hidden" name="region_id" :value="formList.region[0].id" />
                          </div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.name
                                ? 'input--error'
                                : '',
                            ]"
                            v-else
                          >
                            <multiselect
                              required=""
                              v-model="regionValue"
                              :options="formList.region"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите регион"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
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
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Код местонахождения по КАТО (классификатор административно-территориальных
                        объектов)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.c_kato
                                ? 'input--error'
                                : '',
                            ]"
                            v-if="formList.kato.length == 1"
                          >
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              :value="formList.kato[0].name"
                              disabled
                              placeholder="КАТО"
                            />
                            <input type="hidden" name="c_kato" :value="formList.kato[0].name" />
                          </div>
                          <div
                            class="form__line--input"
                            :class="[
                              errorMessage.messages && errorMessage.messages.c_kato
                                ? 'input--error'
                                : '',
                            ]"
                            v-else
                          >
                            <multiselect
                              required=""
                              v-model="katoValue"
                              :options="formList.kato"
                              :preserve-search="true"
                              track-by="id"
                              label="name"
                              placeholder="Выберите КАТО"
                              class="multiselect__check"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">{{
                                option.values[0].value
                              }}</template>
                              <template slot="noResult">{{ $t('components.not_found') }}</template>
                            </multiselect>
                          </div>
                          <div
                            class="input-required"
                            v-if="errorMessage.messages && errorMessage.messages.c_kato"
                          >
                            <p v-for="massage in errorMessage.messages.c_kato">{{ massage }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Наименование водоема /участка и (или) рыбоводного хозяйства
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Основной и вторичный вид деятельности (указать код ОКЭД)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Выращиваемые виды</div>
                    </div>
                    <div class="form__line--right">
                      <div class="quota-fish__line">
                        <div class="quota-fish__wrapper">
                          <div class="row align-items-center">
                            <div class="col-xl-6">
                              <div class="form__line--title">Рыб и других водных животных</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="form__line--title">Ракообразных</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Объем выращенной рыбы и других водных животных
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="quota-fish__line">
                        <div class="quota-fish__wrapper">
                          <div class="row align-items-center">
                            <div class="col-xl-6">
                              <div class="form__line--title">План выращивания по видам, тонн</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="form__line--title">
                                Фактически выращено по видам тонн / тыс. тенге
                              </div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Производственная мощность (тонн в год)</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Год образования рыбоводного хозяйства (постройки производственной базы)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Источник рыбопосадочного материала</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Источник водоснабжения</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Параметры по типам рыбоводного хозяйства</div>
                    </div>
                    <div class="form__line--right">
                      <div class="quota-fish__line">
                        <div class="quota-fish__wrapper">
                          <div class="row align-items-center">
                            <div class="col-xl-6">
                              <div class="form__line--title">ОТРХ площадь (гектар)</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="form__line--title">Площадь садков (метр куб)</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>

                            <div class="col-lg-12"><br /></div>

                            <div class="col-xl-6">
                              <div class="form__line--title">У З В (метр куб)</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="form__line--title">Площадь прудов (гектар)</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>

                            <div class="col-lg-12"><br /></div>

                            <div class="col-xl-6">
                              <div class="form__line--title">Отгороженные участки и заливы</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="form__line--title">Бассейны (кв. метр)</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>

                            <div class="col-lg-12"><br /></div>

                            <div class="col-xl-6">
                              <div class="form__line--title">Другие (гектар или метр куб)</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Объем выращенного рыбопосадочного материала (личинок, сеголеток, годовиков)
                        (объем каждого по отдельности) тыс. штук
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Затраты на рыбопасодочный материал (тыс. тенге)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Объем выращенного ремонтно-маточного поголовья, штук/ тыс. тенге
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Затраты на приобретение в отчетном периоде ремонтно-маточного стада (тыс.
                        тенге)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Затраты на разработку РБО (тыс. тенге)</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Затраты на приобретение лекарственных препаратов (тыс. тенге)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">Затраты на комбикорма (тыс. тенге)</div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Затраты на электроэнергию для выращивания рыбы и других водных животных
                        (тыс. тенге)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Затраты на минеральные удобрения для выращивания рыбы и других водных
                        животных (тыс. тенге)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Объем экспортированной рыбы, тонн/ тыс. тенге
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Затраты при инвестиционных вложениях (тыс. тенге)
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Среднегодовая численность работников занятых
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="quota-fish__line">
                        <div class="quota-fish__wrapper">
                          <div class="row align-items-center">
                            <div class="col-xl-6">
                              <div class="form__line--title">В выращивании</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                            <div class="col-xl-6">
                              <div class="form__line--title">В переработке рыбы</div>
                              <div class="form__line--input">
                                <input
                                  type="text"
                                  class="input-linck"
                                  required=""
                                  placeholder="Количество"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Месячная заработная плата работников в разрезе должностей тыс. тенге
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Банковские реквизиты рыбоводного хозяйства
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form__line">
                    <div class="form__line--left">
                      <div class="form__line--title">
                        Фамилия, имя, отчество (при его наличии) руководителя
                      </div>
                    </div>
                    <div class="form__line--right">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="form__line--input">
                            <input
                              type="text"
                              class="input-linck"
                              required=""
                              placeholder="Количество"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form__line">
                    <div class="form__line--right">
                      <div class="input__row">
                        <div class="block__row--left">
                          <a class="input-btn form__line--btn" @click="$modal.show('modal_head')">
                            <!-- v-if="applications.status != 'active' && applications.status != 'deleted'" -->
                            Подписать ЭЦП
                          </a>
                        </div>
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

                  <modal
                    class="modal__block modal__block--middle modal__block--success"
                    name="modal_head"
                    :width="550"
                    :min-width="550"
                    height="auto"
                  >
                    <div class="modal__block--wrapper">
                      <div class="modal__block--close" @click="$modal.hide('modal_head')">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.5 7.5L7.5 22.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.5 7.5L22.5 22.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div class="modal__wrapper">
                        <div class="modal__header">
                          <div class="modal__title">
                            Для сохранения журнала, необходимо подтверждение электронно цифровой
                            подписью
                          </div>
                        </div>

                        <div class="modal__content">
                          <div class="modal__form">
                            <div class="block__row">
                              <div class="block__row--left">
                                <a class="block__item block__item--green" @click="saveElement">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 9.99996C18.3334 5.39746 14.6025 1.66663 10 1.66663C5.39752 1.66663 1.66669 5.39746 1.66669 9.99996C1.66669 14.6025 5.39752 18.3333 10 18.3333Z"
                                      stroke="#5ABB5E"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M7.5 10L9.16667 11.6667L12.5 8.33337"
                                      stroke="#5ABB5E"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  Подписать ЭЦП
                                </a>
                              </div>
                              <div class="block__row--right">
                                <a
                                  class="block__item block__item--blue"
                                  @click="$modal.hide('modal_head')"
                                >
                                  {{ $t('button.cancel') }}
                                </a>
                              </div>
                            </div>
                            <div
                              class="form__block--line form__messages"
                              v-if="message.status"
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
                            <div
                              class="form__block--line form__messages"
                              v-if="errorMessage.text"
                              :class="{
                                'form__messages--error': errorMessage.status != 200,
                                'form__messages--success': errorMessage.status == 200,
                              }"
                            >
                              <label class="form__block--input">
                                <span class="form__block--title">
                                  {{ errorMessage.text }}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </modal>
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
import { mapGetters, mapActions } from 'vuex';

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

      applicationsUser: null,

      regionValue: null,
      applicationsPond: null,
      pondValue: null,
      applicationsDistrict: null,
      districtValue: null,

      applicationsKato: null,
      katoValue: null,

      form: {
        name: '',
        region_id: '',
        type: '',
        t_water: '',
        t_animal: '',
        t_district: '',
        c_kato: '',
        begin_date: '',
        begin_report_date: '',
        total_protocol: '',
      },
      name: '',

      mejList: [],
      resList: [],
      mestsList: [],

      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },

      typeValue: null,
      type: [
        {
          name: 'Рыбохозяйственные водоемы и (или) участки международного значения',
          type: 'mej',
        },
        {
          name: 'Рыбохозяйственные водоемы и (или) участки республиканского значения',
          type: 'res',
        },
        {
          name: 'Рыбохозяйственные водоемы и (или) участки местного значения',
          type: 'mests',
        },
      ],

      dataEcp: null,
      formData: null,
    };
  },
  computed: {
    ...mapGetters(['_getRegionList']),
    formList() {
      let region = [];
      let district = [];
      let pond = [];
      let kato = [];

      region = this._getRegionList.filter((element) => {
        if (this.applicationsUser) {
          return this.applicationsUser.region.find((e) => {
            if (e.id == element.id) {
              element.value = e.value;
              return true;
            }
          });
        } else {
          return true;
        }
      });

      pond = this.applicationsPond.filter((element) => {
        if (this.applicationsUser) {
          return this.applicationsUser.pond.find((e) => {
            if (e.id == element.id) {
              element.value = e.value;
              return true;
            }
          });
        } else {
          return true;
        }
      });

      district = this.applicationsDistrict.filter((element) => {
        if (this.applicationsUser) {
          /*let dist = this.applicationsUser.region.find(e=>{
            if (e.id == element.values[0].parent_id) {
              element.value = e.value;
              return true;
            }
          });
          return dist;*/
          return this.applicationsUser.pond.find((e) => {
            let dist = element.links.find((d) => {
              if (e.id == d.item_id && element.id == d.catalog_id) {
                return true;
              }
            });
            return dist;
          });
        } else {
          return true;
        }
      });

      kato = this.applicationsKato.filter((element) => {
        if (this.applicationsUser) {
          return this.applicationsUser.region.find((e) => {
            if (e.id == element.values[0].parent_id) {
              element.value = e.value;
              return true;
            }
          });
        } else {
          return true;
        }
      });

      let list = {
        region: region,
        district: district,
        pond: pond,
        kato: kato,
      };
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    saveElement() {
      if (this.$configFile.active) return this.onSubmit();
      this.ecp = false;
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
      let ecpData = {
        path: null,
        owner: null,
        data: null,
      };
      websocket.onopen = () => {
        ready = true;
        handle();
      };
      websocket.onclose = (e) => {
        if (e.wasClean) {
        } else {
          if (this.$i18n.locale == 'kz')
            alert('NCYLayer бағдарламасы іске қосылғандығына көз жеткізіңіз');
          if (this.$i18n.locale == 'ru') alert('Убедитесь, что программа NCALayer запущена');
          if (this.$i18n.locale == 'en') alert('Make sure that the NCALayer program is running');

          //setErrormodal(true);
          setTimeout(() => {
            //setErrormodal(false);
          }, 5000);
        }
      };
      function handle() {
        if (!ready) {
          alert('Убедитесь, что программа NCALayer запущена');
        } else {
          const data = {
            module: 'kz.gov.pki.knca.commonUtils',
            method: 'signXml',
            args: [
              'PKCS12',
              'SIGNATURE',
              '<login><sessionid>caacda70-fd36-45ed-8d94-45a88890f83a</sessionid></login>',
              '',
              '',
            ],
          };
          websocket.send(JSON.stringify(data));
        }
      }
      websocket.onmessage = (e) => {
        const data1 = JSON.parse(e.data);
        ecpData.data = data1.responseObject;
        this.dataEcp = data1.responseObject;
        if (data1.responseObject) {
          this.onSubmit();
        }
      };
    },

    onSubmit() {
      let region = null;
      let pond = null;
      let kato = null;
      let messages = {};
      let validation = true;
      const formData = new FormData();
      if (this.regionValue) {
        formData.append('region_id', this.regionValue.id);
        region = this.regionValue.id;
      } else {
        formData.append('region_id', this.formList.region[0].id);
        region = this.formList.region[0].id;
      }
      /*if(this.form.name == '') {
        validation = false;
        messages.name = [];
        messages.name.push(this.$t('system_message.required_message'));
      }
      formData.append('name', this.form.name);
      if(!this.typeValue) {
        validation = false;
        messages.type = [];
        messages.type.push(this.$t('system_message.required_message'));
      } else {
        formData.append('type', this.typeValue.type);
      }*/
      if (this.pondValue) {
        formData.append('t_water', this.pondValue.id);
        pond = this.pondValue.id;
      } else if (this.formList.pond.length == 1) {
        formData.append('t_water', this.formList.pond[0].id);
        pond = this.formList.pond[0].id;
      } else {
        validation = false;
        messages.t_water = [];
        messages.t_water.push(this.$t('system_message.required_message'));
      }
      formData.append('t_water', pond);

      //formData.append('t_animal', this.form.t_animal);

      let district = null;
      if (this.districtValue) {
        formData.append('t_district', this.districtValue.id);
        district = this.districtValue.id;
      } else if (this.formList.district.length == 1) {
        formData.append('t_district', this.formList.district[0].id);
        district = this.formList.district[0].id;
      } else {
        validation = false;
        messages.t_district = [];
        messages.t_district.push(this.$t('system_message.required_message'));
      }
      formData.append('t_district', district);

      if (this.katoValue) {
        formData.append('c_kato', this.katoValue.id);
        kato = this.katoValue.id;
      } else {
        formData.append('c_kato', this.formList.kato[0].id);
        kato = this.formList.kato[0].id;
      }

      formData.append('begin_date', this.form.begin_date);
      if (this.form.begin_date == '') {
        validation = false;
        messages.begin_date = [];
        messages.begin_date.push(this.$t('system_message.required_message'));
      }
      formData.append('begin_report_date', this.form.begin_report_date);
      if (this.form.begin_report_date == '') {
        validation = false;
        messages.begin_report_date = [];
        messages.begin_report_date.push(this.$t('system_message.required_message'));
      }
      formData.append('total_protocol', this.form.total_protocol);
      if (this.form.total_protocol == '') {
        validation = false;
        messages.total_protocol = [];
        messages.total_protocol.push(this.$t('system_message.required_message'));
      }

      /// Удалить --------------------------

      this.form.name = 'Test';
      formData.append('type', 'mej');

      /// Удалить --------------------------

      if (validation == false) {
        this.$modal.hide('modal_head');
        this.errorMessage.messages = messages;
        return false;
      }
      api
        .post('/report/add', {
          name: this.form.name,
          index: 8,
          region_id: region,
        })
        .then((response) => {
          this.applicationSubmit = response.data;

          formData.append('report_fish_id', response.data.id);

          api
            .post('/report/add/indextwo', formData)
            .then((response) => {
              this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/' + 2 });
            })
            .catch((error) => {
              if (error?.response?.status == 500) {
                this.errorMessage.status = 500;
                this.errorMessage.text = this.$t('system_message.500');
              }
              if (error?.response?.status == 401) {
                this.errorMessage.status = 401;
                this.errorMessage.text = error?.response?.data?.message;
                this.$router.push('/' + this.$i18n.locale + '/login');
              }
              if (error?.response?.status == 422) {
                this.errorMessage.status = 422;
                this.errorMessage.text = error?.response?.data?.message;
              }
              this.errorMessage.messages = error.response.data.errors;
              this.$modal.hide('modal_head');
              return false;
            });
        })
        .catch((error) => {
          if (error?.response?.status == 500) {
            this.errorMessage.status = 500;
            this.errorMessage.text = this.$t('system_message.500');
          }
          if (error?.response?.status == 401) {
            this.errorMessage.status = 401;
            this.errorMessage.text = error?.response?.data?.message;
            this.$router.push('/' + this.$i18n.locale + '/login');
          }
          if (error?.response?.status == 422) {
            this.errorMessage.status = 422;
            this.errorMessage.text = error?.response?.data?.message;
          }
          this.$modal.hide('modal_head');
          this.errorMessage.messages = error.response.data.errors;
        });
    },

    apiGetUserRegions() {
      api
        .get('/user/region')
        .then((response) => {
          if (response.data) {
            this.applicationsUser = response.data;
          }
        })
        .catch((error) => {
          if (error.response) {
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
          }
        });
    },

    apiGetPondList() {
      api
        .get('catalog/' + 3 + '/entry/all')
        .then((response) => {
          if (response.data) {
            response.data.find((element) => {
              element.name = element.values[0].value;
            });
            this.applicationsPond = response.data;
          }
        })
        .catch((error) => {
          if (error.response) {
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
          }
        });
    },
    apiGetKatoList() {
      api
        .get('catalog/' + 12 + '/entry/all')
        .then((response) => {
          if (response.data) {
            response.data.find((element) => {
              element.name = element.values[0].value;
            });
            this.applicationsKato = response.data;
          }
        })
        .catch((error) => {
          if (error.response) {
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
          }
        });
    },
    apiGetDistrictList() {
      api
        .get('catalog/' + 13 + '/entry/all')
        .then((response) => {
          if (response.data) {
            response.data.find((element) => {
              element.name = element.values[0].value;
            });
            this.applicationsDistrict = response.data;
          }
        })
        .catch((error) => {
          if (error.response) {
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
          }
        });
    },
  },
  beforeMount() {
    this._fetchRegionList();
    this.apiGetDistrictList();
    this.apiGetPondList();
    this.apiGetKatoList();
    this.apiGetUserRegions();
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push('/ru/login');
    }
  },
};
</script>
