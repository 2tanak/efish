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
              <HeaderBack :title="getReportTitle" :subtitle="$t('reporting.reports.8-rh')" />
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
                          :modelValue="form.region_id"
                          :confinesValue="getUserRegions"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="form.region_id = $event"
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
                          :modelValue="form.kato_id"
                          :categoryValue="form.region_id"
                          :placeholder="$t('placeholder.choose')"
                          v-on:update:modelValue="form.kato_id = $event"
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
                          :modelValue="form.reservoir_name"
                          v-on:update:modelValue="form.reservoir_name = $event"
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
                          :modelValue="form.primary_activity"
                          v-on:update:modelValue="form.primary_activity = $event"
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
                              :modelValue="form.fish"
                              :placeholder="$t('placeholder.choose')"
                              v-on:update:modelValue="form.fish = $event"
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
                              :modelValue="form.fish_etc_count"
                              v-on:update:modelValue="form.fish_etc_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :type="'number'"
                              :name="'crustaceans_count'"
                              :title="'Ракообразных'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.crustaceans_count"
                              v-on:update:modelValue="form.crustaceans_count = $event"
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
                          :modelValue="form.growing_plan_by_species"
                          v-on:update:modelValue="form.growing_plan_by_species = $event"
                        ></TextInput>

                        <fishTonTenge
                          :title="'Фактически выращено по видам тонн / тыс. тенге'"
                          :name="'actually_grown_by_species'"
                          :modelValue="form.actually_grown_by_species"
                          v-on:update:modelValue="form.actually_grown_by_species = $event"
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
                          :modelValue="form.productive_capacity"
                          v-on:update:modelValue="form.productive_capacity = $event"
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
                          :modelValue="form.year_of_establishment_of_the_fish_farm"
                          v-on:update:modelValue="
                            form.year_of_establishment_of_the_fish_farm = $event
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
                          :modelValue="form.source_of_fish_seed"
                          v-on:update:modelValue="form.source_of_fish_seed = $event"
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
                          :modelValue="form.source_of_water_supply"
                          v-on:update:modelValue="form.source_of_water_supply = $event"
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
                              :modelValue="form.otrh_area"
                              v-on:update:modelValue="form.otrh_area = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'cage_area'"
                              :title="'Площадь садков (метр куб)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.cage_area"
                              v-on:update:modelValue="form.cage_area = $event"
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
                              :modelValue="form.uzv_area"
                              v-on:update:modelValue="form.uzv_area = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'pond_area'"
                              :title="'Площадь прудов (гектар)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.pond_area"
                              v-on:update:modelValue="form.pond_area = $event"
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
                              :modelValue="form.enclosed_area"
                              v-on:update:modelValue="form.enclosed_area = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              type="number"
                              :name="'pool_area'"
                              :title="'Бассейны (кв. метр)'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.pool_area"
                              v-on:update:modelValue="form.pool_area = $event"
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
                              :modelValue="form.other_area"
                              v-on:update:modelValue="form.other_area = $event"
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
                              :modelValue="form.larvae_count"
                              v-on:update:modelValue="form.larvae_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              type="number"
                              :title="'Сеголеток'"
                              :name="'fry_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.fry_count"
                              v-on:update:modelValue="form.fry_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-4">
                            <TextInput
                              type="number"
                              :title="'Годовиков'"
                              :name="'yearlings_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.yearlings_count"
                              v-on:update:modelValue="form.yearlings_count = $event"
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
                          :modelValue="form.fish_material_cost"
                          v-on:update:modelValue="form.fish_material_cost = $event"
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
                              :modelValue="form.repair_material_count"
                              v-on:update:modelValue="form.repair_material_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Тыс. тенге'"
                              :type="'number'"
                              :name="'repair_material_cost'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.repair_material_cost"
                              v-on:update:modelValue="form.repair_material_cost = $event"
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
                          :modelValue="form.purchase_of_broodstock_cost"
                          v-on:update:modelValue="form.purchase_of_broodstock_cost = $event"
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
                          :modelValue="form.rbo_development_cost"
                          v-on:update:modelValue="form.rbo_development_cost = $event"
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
                          :modelValue="form.purchase_of_medicines_cost"
                          v-on:update:modelValue="form.purchase_of_medicines_cost = $event"
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
                          :modelValue="form.feed_cost"
                          v-on:update:modelValue="form.feed_cost = $event"
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
                          :modelValue="form.electricity_cost"
                          v-on:update:modelValue="form.electricity_cost = $event"
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
                          :modelValue="form.mineral_fertilizers_cost"
                          v-on:update:modelValue="form.mineral_fertilizers_cost = $event"
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
                              :modelValue="form.exported_fish_volume"
                              v-on:update:modelValue="form.exported_fish_volume = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'Тыс. тенге'"
                              :type="'number'"
                              :name="'exported_fish_cost'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.exported_fish_cost"
                              v-on:update:modelValue="form.exported_fish_cost = $event"
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
                          :modelValue="form.investment_cost"
                          v-on:update:modelValue="form.investment_cost = $event"
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
                              :modelValue="form.cultivation_workers_count"
                              v-on:update:modelValue="form.cultivation_workers_count = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'В переработке рыбы'"
                              :type="'number'"
                              :name="'fish_processing_workers_count'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.fish_processing_workers_count"
                              v-on:update:modelValue="form.fish_processing_workers_count = $event"
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
                              :modelValue="form.mounth_growing"
                              v-on:update:modelValue="form.mounth_growing = $event"
                            ></TextInput>
                          </div>
                          <div class="col-lg-6">
                            <TextInput
                              :title="'В переработке рыбы'"
                              :type="'number'"
                              :name="'mounth_receil'"
                              :required="true"
                              :placeholder="$t('placeholder.quantity')"
                              :modelValue="form.mounth_receil"
                              v-on:update:modelValue="form.mounth_receil = $event"
                            ></TextInput>
                          </div>
                        </div>

                        <employeeAdd
                          :name="'employees'"
                          :disabled="statusPage == 'show'"
                          :modelValue="form.employees"
                          v-on:update:modelValue="form.employees = $event"
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
                          :modelValue="form.bank_details"
                          v-on:update:modelValue="form.bank_details = $event"
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
                          :modelValue="form.head_full_name"
                          v-on:update:modelValue="form.head_full_name = $event"
                        ></TextInput>
                      </div>
                    </div>
                  </div>

                  <hr class="reporting__hr" />

                  <ReportManageFormButtons :edit="!isNotEditable" :report="'8-rh'" />
                </form>

                <ReportManageModal
                  :ecp="true"
                  :errorMessage="errorMessage"
                  :message="message"
                  @accept="saveElement"
                  @close="$modal.hide('modal_head')"
                />
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
import ReportManageModal from '@/components/reporting-management/ReportManageModal.vue';
import ReportManageFormButtons from '@/components/reporting-management/ReportManageFormButtons.vue';

export default {
  name: 'ReportPage8',
  components: {
    FishTonTenge,
    TextInputRepeater,
    Fish,
    EmployeeAdd,
    ReportManageModal,
    ReportManageFormButtons,
    Kato,
    Region,
    TextInput,
    HeaderBack,
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
      form: {
        report_year: '',
        surrender_date: '',
        user_id: '',

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
      errorMessage: {
        status: null,
        messages: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
      dataEcp: null,
    };
  },
  computed: {
    getReportTitle() {
      if (this.statusPage == 'show') return this.$t('reporting.title');
      else if (this.statusPage == 'edit') return 'Редактирование отчета';
      return 'Добавление нового отчета';
    },
    isNotEditable() {
      return this.statusPage == 'show';
    },
    isFullFilled() {
      return this.statusPage === 'edit' || this.statusPage === 'show';
    },
    getUserRegions() {
      if (this.$store.state.userObject && this.$store.state.userObject.regions) {
        return this.$store.state.userObject.regions.map((element) => {
          return element.region_id;
        });
      }
      return [];
    },
  },
  methods: {
    saveElement() {
      if (this.$configFile.active) return this.sendEcpKey();
      const websocket = new WebSocket('wss://127.0.0.1:13579/');
      var ready = null;
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
        this.dataEcp = data1.responseObject;
        if (data1.responseObject) {
          this.sendEcpKey();
        }
      };
    },
    sendEcpKey() {
      const formData = new FormData();
      formData.append('xml', this.dataEcp || this.$configFile.xml);
      document.querySelector('.preloader').classList.add('active');
      api
        .post(`subject/sign/8/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/account/reporting/8-rh' });
          }
        })
        .catch((e) => {})
        .finally(() => {
          document.querySelector('.preloader').classList.remove('active');
        });
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        document.querySelector('.preloader').classList.add('active');

        let data = this.form;
        for (let key in data) {
          if (data[key] == null) delete data[key];
        }

        if (Array.isArray(this.form.source_of_fish_seed)) {
          this.form.source_of_fish_seed = this.form.source_of_fish_seed.map((el) => ({
            seed_name: el.value,
          }));
        }

        let formData = convertObjectToFormData(data);

        if (this.statusPage == 'edit') {
          formData.append('_method', 'PUT');
        }

        api
          .post(
            `/subject/store/8${this.statusPage === 'edit' ? `/${this.$route.params.id}` : ''}`,
            formData,
          )
          .then(() => {
            this.$router.push('/ru/account/reporting/8-rh');
          })
          .catch((err) => {})
          .finally(() => {
            document.querySelector('.preloader').classList.remove('active');
          });
      }
    },
    async showDetailManagment() {
      if (this.isFullFilled) {
        try {
          const { data } = await api.get(`subject/show/8/${this.$route.params.id}`);
          this.form = {
            ...this.form,
            ...data.data,
          };
        } catch (error) {}
      }
    },
  },
  beforeCreate() {
    if (!localStorage.token) this.$router.push('/ru/login');
  },
  async beforeMount() {
    await this.showDetailManagment();
  },
};
</script>

<style scoped></style>
