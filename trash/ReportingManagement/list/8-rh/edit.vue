<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack :title="$t('reporting.title')" :subtitle="$t('reporting.reports.8-rh')" />
              <div class="card__content--body">
                <form method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('inputs.region') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <region
                          :required="true"
                          :modelValue="formApp.region_id"
                          :confinesValue="userRegions"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.region_id = $event"
                        ></region>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          {{ $t('inputs.kato') }}
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <kato
                          :required="true"
                          :modelValue="formApp.kato_id"
                          :categoryValue="formApp.region_id"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="formApp.kato_id = $event"
                        ></kato>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Наименование водоема /участка и (или) рыбоводного хозяйства
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'reservoir_name'"
                          :required="true"
                          :modelValue="formApp.reservoir_name"
                          v-on:update:modelValue="formApp.reservoir_name = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Основной и вторичный вид деятельности (указать код ОКЭД)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'primary_activity'"
                          :required="true"
                          :modelValue="formApp.primary_activity"
                          v-on:update:modelValue="formApp.primary_activity = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Выращиваемые виды</div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-12">
                            <fish
                              :required="true"
                              :multiple="true"
                              name="fish"
                              :modelValue="formApp.fish"
                              :placeholder="$t('placeholder.choose')"
                              v-on:update:modelValue="formApp.fish = $event"
                            ></fish>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-6">
                            <TextInput
                              :type="'number'"
                              :name="'fish_etc_count'"
                              :title="'Рыб и других водных животных'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.fish_etc_count"
                              v-on:update:modelValue="formApp.fish_etc_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :type="'number'"
                              :name="'crustaceans_count'"
                              :title="'Ракообразных'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.crustaceans_count"
                              v-on:update:modelValue="formApp.crustaceans_count = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Объем выращенной рыбы и других водных животных
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          class="mb-2"
                          :title="'План выращивания по видам, тонн'"
                          :name="'growing_plan_by_species'"
                          :required="true"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="formApp.growing_plan_by_species"
                          v-on:update:modelValue="formApp.growing_plan_by_species = $event"
                        ></TextInput>

                        <fishTonTenge
                          :title="'Фактически выращено по видам тонн / тыс. тенге'"
                          :name="'actually_grown_by_species'"
                          :modelValue="formApp.actually_grown_by_species"
                          v-on:update:modelValue="formApp.actually_grown_by_species = $event"
                        ></fishTonTenge>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Производственная мощность (тонн в год)</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'productive_capacity'"
                          :required="true"
                          :modelValue="formApp.productive_capacity"
                          v-on:update:modelValue="formApp.productive_capacity = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Год образования рыбоводного хозяйства (постройки производственной базы)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'year_of_establishment_of_the_fish_farm'"
                          :required="true"
                          :modelValue="formApp.year_of_establishment_of_the_fish_farm"
                          v-on:update:modelValue="
                            formApp.year_of_establishment_of_the_fish_farm = $event
                          "
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Источник рыбопосадочного материала</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInputRepeater
                          :name="'source_of_fish_seed'"
                          :required="true"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="formApp.source_of_fish_seed"
                          v-on:update:modelValue="formApp.source_of_fish_seed = $event"
                        ></TextInputRepeater>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Источник водоснабжения</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'source_of_water_supply'"
                          :required="true"
                          :modelValue="formApp.source_of_water_supply"
                          v-on:update:modelValue="formApp.source_of_water_supply = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Параметры по типам рыбоводного хозяйства</div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'otrh_area'"
                              :title="'ОТРХ площадь (гектар)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.otrh_area"
                              v-on:update:modelValue="formApp.otrh_area = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'cage_area'"
                              :title="'Площадь садков (метр куб)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.cage_area"
                              v-on:update:modelValue="formApp.cage_area = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'uzv_area'"
                              :title="'У З В (метр куб)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.uzv_area"
                              v-on:update:modelValue="formApp.uzv_area = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'pond_area'"
                              :title="'Площадь прудов (гектар)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.pond_area"
                              v-on:update:modelValue="formApp.pond_area = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'enclosed_area'"
                              :title="'Отгороженные участки и заливы'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.enclosed_area"
                              v-on:update:modelValue="formApp.enclosed_area = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'pool_area'"
                              :title="'Бассейны (кв. метр)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.pool_area"
                              v-on:update:modelValue="formApp.pool_area = $event"
                            ></TextInput>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'other_area'"
                              :title="'Другие (гектар или метр куб)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.other_area"
                              v-on:update:modelValue="formApp.other_area = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Объем выращенного рыбопосадочного материала (объем каждого по отдельности)
                          тыс. штук
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row">
                          <div class="col-lg-4">
                            <TextInput
                              type="number"
                              :title="'Личинок'"
                              :name="'larvae_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.larvae_count"
                              v-on:update:modelValue="formApp.larvae_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              type="number"
                              :title="'Сеголеток'"
                              :name="'fry_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.fry_count"
                              v-on:update:modelValue="formApp.fry_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              type="number"
                              :title="'Годовиков'"
                              :name="'yearlings_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.yearlings_count"
                              v-on:update:modelValue="formApp.yearlings_count = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Затраты на рыбопасодочный материал (тыс. тенге)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          type="number"
                          :name="'fish_material_cost'"
                          :required="true"
                          :placeholder="$t('placeholder.quantity')"
                          :modelValue="formApp.fish_material_cost"
                          v-on:update:modelValue="formApp.fish_material_cost = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Объем выращенного ремонтно-маточного поголовья
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Штук'"
                              :type="'number'"
                              :name="'repair_material_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.repair_material_count"
                              v-on:update:modelValue="formApp.repair_material_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Тыс. тенге'"
                              :type="'number'"
                              :name="'repair_material_cost'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.repair_material_cost"
                              v-on:update:modelValue="formApp.repair_material_cost = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Затраты на приобретение в отчетном периоде ремонтно-маточного стада
                          (тыс.тенге)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'purchase_of_broodstock_cost'"
                          :required="true"
                          :modelValue="formApp.purchase_of_broodstock_cost"
                          v-on:update:modelValue="formApp.purchase_of_broodstock_cost = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Затраты на разработку РБО (тыс. тенге)</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'rbo_development_cost'"
                          :required="true"
                          :modelValue="formApp.rbo_development_cost"
                          v-on:update:modelValue="formApp.rbo_development_cost = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Затраты на приобретение лекарственных препаратов (тыс. тенге)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'purchase_of_medicines_cost'"
                          :required="true"
                          :modelValue="formApp.purchase_of_medicines_cost"
                          v-on:update:modelValue="formApp.purchase_of_medicines_cost = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Затраты на комбикорма (тыс. тенге)</div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'feed_cost'"
                          :required="true"
                          :modelValue="formApp.feed_cost"
                          v-on:update:modelValue="formApp.feed_cost = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Затраты на электроэнергию для выращивания рыбы и других водных животных
                          (тыс. тенге)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'electricity_cost'"
                          :required="true"
                          :modelValue="formApp.electricity_cost"
                          v-on:update:modelValue="formApp.electricity_cost = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Затраты на минеральные удобрения для выращивания рыбы и других водных
                          водных животных (тыс. тенге)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'mineral_fertilizers_cost'"
                          :required="true"
                          :modelValue="formApp.mineral_fertilizers_cost"
                          v-on:update:modelValue="formApp.mineral_fertilizers_cost = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">Объем экспортированной рыбы</div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Тон'"
                              :type="'number'"
                              :name="'exported_fish_volume'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.exported_fish_volume"
                              v-on:update:modelValue="formApp.exported_fish_volume = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Тыс. тенге'"
                              :type="'number'"
                              :name="'exported_fish_cost'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.exported_fish_cost"
                              v-on:update:modelValue="formApp.exported_fish_cost = $event"
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Затраты при инвестиционных вложениях (тыс. тенге)
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'investment_cost'"
                          :required="true"
                          :modelValue="formApp.investment_cost"
                          v-on:update:modelValue="formApp.investment_cost = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Среднегодовая численность работников занятых
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'В выращивании'"
                              :type="'number'"
                              :name="'cultivation_workers_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.cultivation_workers_count"
                              v-on:update:modelValue="formApp.cultivation_workers_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'В переработке рыбы'"
                              :type="'number'"
                              :name="'fish_processing_workers_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.fish_processing_workers_count"
                              v-on:update:modelValue="
                                formApp.fish_processing_workers_count = $event
                              "
                            ></TextInput>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!---------------
                  ////////////////<br>
                  ////////////////<br>
                  ////////////////<br>
------------------>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Месячная заработная плата работников в разрезе должностей тыс. тенге
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <div class="row mb-2">
                          <div class="col-lg-6">
                            <TextInput
                              :title="'В выращивании'"
                              :type="'number'"
                              :name="'mounth_growing'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.mounth_growing"
                              v-on:update:modelValue="formApp.mounth_growing = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'В переработке рыбы'"
                              :type="'number'"
                              :name="'mounth_receil'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="formApp.mounth_receil"
                              v-on:update:modelValue="formApp.mounth_receil = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <employeeAdd
                          :name="'number1'"
                          :disabled="statusPage == 'show'"
                          :modelValue="formApp.employees"
                          v-on:update:modelValue="formApp.employees = $event"
                        ></employeeAdd>

                        <hr class="reporting__hr reporting__hr--min" />
                      </div>
                    </div>
                  </div>

                  <!------------------
                  ////////////////<br>
                  ////////////////<br>
                  ////////////////<br>
---------------------->

                  <hr class="reporting__hr" />

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Банковские реквизиты рыбоводного хозяйства
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'bank_details'"
                          :required="true"
                          :modelValue="formApp.bank_details"
                          v-on:update:modelValue="formApp.bank_details = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-line">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="reporting__title">
                          Фамилия, имя, отчество (при его наличии) руководителя
                        </div>
                      </div>
                      <div class="col-xl-5">
                        <TextInput
                          :name="'head_full_name'"
                          :required="true"
                          :modelValue="formApp.head_full_name"
                          v-on:update:modelValue="formApp.head_full_name = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <div class="reporting-btn">
                    <div class="reporting-wrapper">
                      <button type="submit" class="input-btn form__line--btn">
                        {{ $t('button.save') }}
                      </button>
                    </div>
                  </div>

                  <!-------------------
                  <div class="reporting-btn">
                    <div class="reporting-wrapper">
                      <button class="input-btn form__line--btn" v-if="statusPage == 'create' || statusPage == 'edit'">
                        {{ $t('button.save') }}
                      </button>
                      <a class="input-btn form__line--btn" @click="$modal.show('modal_head')"  v-if="statusPage == 'show'">
                        {{ $t('button.ecp') }}
                      </a>
                      <router-link :to="'/'+ $i18n.locale +'/account/reporting/2-rh/' + $route.params.id + '/edit'" class="input-btn form__line--btn form__line--btn-black" v-if="statusPage == 'show'">
                        {{ $t('button.edit') }}
                      </router-link>
                    </div>
                  </div>
-------------->
                </form>

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
                          {{ $t('reporting.ecp_text') }}
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
                                {{ $t('button.ecp') }}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </modal>
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
import { convertObjectToFormData } from '@/formData';

import TextInput from '@/components/components/Inputs/TextInput.vue';
import Region from '@/components/components/Inputs/region';
import Kato from '@/components/components/Inputs/kato';
import Fish from '@/components/components/Inputs/fish';
import TextInputRepeater from '@/components/components/Inputs/TextInputRepeater.vue';
import FishTonTenge from '@/components/components/Inputs/fishTonTenge';
import EmployeeAdd from '@/components/components/Inputs/employeeAdd';

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  name: 'ReportEdit8',
  components: {
    HeaderBack,
    FishTonTenge,
    TextInputRepeater,
    Fish,
    EmployeeAdd,
    Kato,
    Region,
    TextInput,
  },
  props: {
    statusPage: {
      type: String,
      default: 'create',
    },
  },
  validations: {},
  data() {
    return {
      formApp: {
        report_year: '',

        mounth_growing: '',
        mounth_receil: '',
        employees: [],
        fish: null,

        region_id: null,
        kato_id: null,
        reservoir_name: '',
        primary_activity: '',
        fish_etc_count: '',
        crustaceans_count: '',
        growing_plan_by_species: '',
        actually_grown_by_species: [
          {
            fish_id: '',
            weight: '',
            cost: '',
          },
        ],
        productive_capacity: '',
        year_of_establishment_of_the_fish_farm: '',
        source_of_fish_seed: [
          {
            seed_name: '',
          },
        ],
        source_of_water_supply: '',
        otrh_area: '',
        cage_area: '',
        uzv_area: '',
        pond_area: '',
        enclosed_area: '',
        pool_area: '',
        other_area: '',
        larvae_count: '',
        fry_count: '',
        yearlings_count: '',
        fish_material_cost: '',
        repair_material_count: '',
        repair_material_cost: '',
        purchase_of_broodstock_cost: '',
        rbo_development_cost: '',
        purchase_of_medicines_cost: '',
        feed_cost: '',
        electricity_cost: '',
        mineral_fertilizers_cost: '',
        exported_fish_volume: '',
        exported_fish_cost: '',
        investment_cost: '',
        cultivation_workers_count: '',
        fish_processing_workers_count: '',
        bank_details: '',
        head_full_name: '',
      },
      id: null,

      userRegions: null,

      // formApp: {
      //   region: null,
      //   kato: null,
      //   fish: null,

      //   pond: [],
      //   fishTonTenge: [],
      //   employees: [],

      //   number1: '',
      //   number2: '',
      //   number3: '',
      // },
    };
  },
  computed: {
    isFullFilled() {
      return this.statusPage === 'edit' || this.statusPage === 'show';
    },
  },
  watch: {
    '$store.state.userObject': {
      immediate: true,
      handler: function () {
        this.apiGetUserRegions();
      },
    },
  },
  methods: {
    apiGetUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        let array = [];
        this.$store.state.userObject.regions.find((element) => {
          array.push(element.region_id);
        });
        this.userRegions = array;
      }
    },

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
        const dataEcp = JSON.parse(e.data);
        if (dataEcp.responseObject) {
          //this.onSubmit();
        }
      };
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');

        let data = this.formApp;

        for (let key in data) {
          if (data[key] == null) delete data[key];
        }

        if (Array.isArray(this.formApp.source_of_fish_seed)) {
          this.formApp.source_of_fish_seed = this.formApp.source_of_fish_seed.map((el) => ({
            seed_name: el.value,
          }));
        }

        let formData = convertObjectToFormData(data);

        // formData.append('user_id', this.$store.state.userObject.id);

        if (this.statusPage === 'edit') {
          formData.append('_method', 'PUT');
          formData.append('id', this.id);
        }

        formData.append(
          'report_year',
          new Date().getTime().toLocaleString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        );

        api
          .post('/subject/store/8', formData)
          .then(() => {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/8-rh' });
          })
          .catch((error) => {
            if (error?.response?.status == 500) {
              this.errorMessage.status = 500;
              this.errorMessage.text = this.$t('system_message.500');
            } else {
              this.errorMessage.errors = error.response.data.errors;
              Object.keys(this.errorMessage.errors).forEach((key) => {
                this.$set(this.$v.formApp[key], 'errorMessage', this.errorMessage.errors[key][0]);
              });
              this.$v.formApp.$touch();
              this.$v.$touch();
              this.errorMessage.text = error?.response?.data?.message;
            }
          })
          .finally(() => {
            document.querySelector('.preloader').classList.remove('active');
          });
      }
    },

    async showDetailManagment() {
      try {
        const { data } = await api.get(`subject/show/8/${this.$route.params.id}`);
        this.id = data.data.id;
        this.formApp = {
          ...this.formApp,
          ...data.data,
        };
      } catch (error) {}
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  beforeMount() {
    this.showDetailManagment();
  },
};
</script>

<style scoped></style>
