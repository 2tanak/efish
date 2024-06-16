<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingAnalyticManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <div class="card__content-header">
                <div class="content__title">
                  <div class="content__title--element">
                    <div class="content__title--text">
                     СВЕДЕНИЯ О РЫБОПЕРЕРАБАТЫВАЮЩИХ ПРЕДПРИЯТИЯХ
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__content--body">
                <div class="table__block--content">
				
               
			   
			     <div class="table__block--filter">
                    <div class="table__filter--left">
                      <div class="search-main">
                        <div class="row">
                          <div class="col-md-4">
                           
                            <div class="table__filter--search">
                              <label class="search__label">
                                <input
                                  type="text"
                                  value=""
                                  name="filter_search"
                                  v-model="v_model_name_search"
								  placeholder="Поиск по наименованию"
                                />

                                <button>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M20.9999 21L16.6499 16.65"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </label>
                            </div>
                            <!-----tsble-filter-search------>
                          </div>
                          <!-----col------>

                          <div class="col-md-4">
                           

                            <div class="table__filter--search">
                              <label class="search__label">
                                <input
                                  type="text"
                                  v-model="v_model_iin_search"
								   placeholder="Поиск по ИИН/БИН"
                                />

                                <button>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M20.9999 21L16.6499 16.65"
                                      stroke="#52A5FC"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </label>
                            </div>
                            <!-----search------>
                          </div>
                          <!-----col------>
						  
						  <div class='col-md-4'>
						  
						   <div class="calendar">
							
                              <quarter
                                :title="''"
								ref="quarter"
                                :placeholder="'Выбрать квартал'"
                                :inputYears="true"
								:allOptions="true"
                                v-on:update:modelValue="quarter_value = $event"
                              >
                              </quarter>
							   </div>
                            </div>
                        </div>
                        <!-----row------>
						
						
						  <div class="row mt-3">
						  
                          <div class="col-md-4">
                           
                            
                             
                              <region
							  ref="region"
                              :name="'region_id'"
                              v-on:update:modelValue="
                              v_model_region_search = $event
                              "
							  :allOptions="false"
							  :multiple="multiple"
                              :title="''"
                              :placeholder="'Поиск по региону'"
                            >
                            </region>

                          </div>
                          <!-----col------>

                          <div class="col-md-4">
                           
                              <pond
							  :key="render"
                              :multiple="multiple"
                              :title="''"
                              :required="true"
							  :allOptions="false"
							  ref="pond"
                              
                              :placeholder="'Водоем'"
                              v-on:update:modelValue="
                              v_model_pond_search = $event
                              "
                            >
                            </pond>
                          
                            
                          </div>
						  
						  
						  
						  
                          <!-----col------>
						  
						  <div class='col-md-4'>
						       <fish
                                :required="true"
                                :multiple="multiple"
                                name="fish"
                                :placeholder="$t('placeholder.choose')"
                                v-on:update:modelValue="v_model_fish_search = $event"
                            ></fish>
						 
                            </div>
                        </div>
                        <!-----row------>
						
						
						
						
						
						
						
						
						

                        
                      </div>
                      <!-----search-main------>
                    </div>
                  </div>
			   
			   
			   
			   
			   
			   
			   

                  <v-data-table
                    class="table__analytic"
                    :headers="[
                      // { text: 'Id', value: 'id', sortable: false, width: '40px'  },
                      {
                        text: 'Наименование областей',
                        value: 'region_name',
                        width: '20vw',
                        sortable: false,
                      },
                      { text: 'Лимит (тонн)', value: 'limit', sortable: false },
                      {
                        text: 'Освоение (тонн)',
                        value: 'mastering',
                        sortable: false,
                      },
                      { text: '%', value: 'percentage', sortable: false },
					/*
                      {
                        text: this.$t('headers.action'),
                        value: 'action',
                        align: 'center',
                        sortable: false,
                        width: '200px',
                      },
					  */
                      ,
                    ]"
                    :items="filteredlist"
                    hide-default-footer
                    :loading="false"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 30, 40, 50],
                    }"
                  >
                    <template v-slot:item.limit="{ item }" aria-label="Id">
                      {{ item.sum_of_payment_plan }}
                    </template>

                    <template v-slot:item.mastering="{ item }" aria-label="Id">
                      {{ item.sum_of_payment_fact }}
                    </template>

                    <template v-slot:item.percentage="{ item }" aria-label="Id">
                      {{ item.percentage }}
                    </template>

                    <template v-slot:item.action="{ item }">
                      <router-link
                        :to="
                          '/' +
                          $i18n.locale +
                          '/account/reporting-analytics/' +
                          1 +
                          `/${item.region_id}`
                        "
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                            stroke="#5ABB5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </router-link>
                      <!-----------------
                      <a class="tb__table--btn tb__table--list" :href="'https://api.efish.airweb.kz/api/v1/subject/pdf/1?id='+item.id" target="_blank" download
                        v-tooltip.top-center="{ content: 'Скачать', class: ['tooltip__btn'] }">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M16.3821 11.9272V14.9272C16.3821 15.3251 16.224 15.7066 15.9427 15.9879C15.6614 16.2692 15.2799 16.4272 14.8821 16.4272H4.38208C3.98426 16.4272 3.60272 16.2692 3.32142 15.9879C3.04012 15.7066 2.88208 15.3251 2.88208 14.9272V11.9272"
                            stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M5.88208 8.17725L9.63208 11.9272L13.3821 8.17725" stroke="#52A5FC" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M9.63208 11.9272V2.92725" stroke="#52A5FC" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        </svg>
                      </a>
                    ------------------>
                    </template>

                    <v-alert slot="no-results" :value="true" color="error">
                      {{ $t("system_message.search") }}
                    </v-alert>
                  </v-data-table>

             
					
					</div>
				  
                </div>
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

import { api } from "@/boot/axios";
import quarter from "@/components/components/Inputs/quarter";
import Region from "@/components/components/Inputs/region";
import Pond from "@/components/components/Inputs/pond";
import Fish from "@/components/components/Inputs/fish";

export default {
  components: {
    quarter,Region,Pond,Fish
  },
  data() {
    return {
	  v_model_name_search: [],
      v_model_region_search: [],
      v_model_pond_search: [],
      v_model_iin_search: "",
	  multiple:true,
	  v_model_fish_search:"",
	  render:0,
      quarter_value: "",
      inputYears: null,
      viewType: "table",
	  analytic: null,
      applicationsLimit: [],
      modalTo: false,
      modalFrom: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      filter: {
        limit: null,
        region: null,
        range_to: null,
        range_from: null,
        user: null,
      },

      errorMessage: {
        status: null,
        text: null,
      },
      message: {
        status: null,
        text: null,
      },
    };
  },
  computed: {
    ...mapGetters(['_getRegionList']),
	filteredlist() {
		
	 let region=[];
	 let pond=[];
	 let arr =[];
      if(
	   this.v_model_pond_search.length > 0 || 
       this.v_model_region_search.length > 0
	  ){
		  
	
	  const data = [...this.analytic?.data];
	
	 if(this.v_model_pond_search.length > 0){
		  pond = data.filter(e=>{
				if(e.farms?.length){
					return e.farms.find(v =>{
					if(v.farm_id){
					 //e['search']=e.region_name;
					return this.v_model_pond_search.includes(v.farm_id);
					}
				})
			   }
			 });
	        }
			
			
		if(this.v_model_region_search.length > 0){
		    region = data.filter(e=>{
				//e['search']=e.region_name;
				return this.v_model_region_search.includes(e.region_id);
			});
		}
	  
       let filter_collect = [...region,...pond];
	   
	  if(this.v_model_region_search.length > 0){
		    filter_collect = filter_collect.filter(e=>{
				//e['search']=e.region_name;
				return this.v_model_region_search.includes(e.region_id);
			});
		}
		  
		  if(this.v_model_pond_search.length > 0){
		  filter_collect = filter_collect.filter(e=>{
				if(e.farms?.length){
					return e.farms.find(v =>{
					if(v.farm_id){
					 //e['search']=e.region_name;
					return this.v_model_pond_search.includes(v.farm_id);
					}
				})
			   }
			 });
	        }
			
			//убираем дубликаты
		   return filter_collect;
	
	  
	   }
		return this.analytic?.data;
	},
    formList() {
      let list = {
        region: this._getRegionList,
      };
      if (!this.filter.limit) {
        list = {
          region: [],
        };
      }
      return list;
    },
  },
  methods: {
    ...mapActions(['_fetchRegionList']),
    apiGetAnalyticsFile(typeFile) {
      let { limit, ...params } = this.filter;
      if (this.filter.limit) {
        params.limit = this.filter.limit.id;
      }
      if (this.filter.region) {
        params.region = this.filter.region.id;
      }
      if (this.filter.user) {
        params.user = this.filter.user.id;
      }
      params.type = typeFile;
      api
        .get("analytics/1rh/regions", {
          responseType: "arraybuffer",
          params: params,
        })
        .then((response) => {
          let fileURL = window.URL.createObjectURL(new Blob([response.data]), {
            type: response.headers["content-type"],
          });
          let fileLink = document.createElement("a");
          fileLink.href = fileURL;
          const extensions = {
            "application/vnd.ms-excel": "xlsx",
            "application/pdf": "pdf",
          };
          const contentType = response.headers["content-type"];
          const extension = extensions[contentType];
          const filename = "reporting." + extension;

          fileLink.setAttribute("download", filename);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(() => {});
    },
    apiGetAnalytics() {
		
      this.analytic = null;
	  /*
      let { limit, ...params } = this.filter;
      if (this.filter.limit) {
        params.limit = this.filter.limit.id;
      }
      if (this.filter.region) {
        params.region = this.filter.region.id;
      }
      if (this.filter.user) {
        params.user = this.filter.user.id;
      }
      this.analytic = [];
      */
      api
        .get("https://api.efish.airweb.kz/api/v1/o/list/1")
        .then((response) => {
          if (response.data) {
            this.analytic = response.data;
          }
        }).catch(()=>{});
    },
    apiGetLimitList() {
      api
        .get("limit/list", {
          params: {
            status: "active",
          },
        })
        .then((response) => {
          if (response.data) {
            this.applicationsLimit = response.data.data;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error?.response?.status == 500) {
              this.errorMessage.status = 500;
              this.errorMessage.text = this.$t("system_message.500");
            }
            if (error?.response?.status == 401) {
              this.errorMessage.status = 401;
              this.errorMessage.text = error.response.data.error_message;
              this.$router.push("/" + this.$i18n.locale + "/login");
            }
            if (error?.response?.status == 422) {
              this.errorMessage.status = 422;
              this.errorMessage.text = error.response.data.error_message;
            }
            if (error?.response?.status == 403) {
              this.errorMessage.status = 403;
              this.errorMessage.text = error?.response?.data?.message;
            }
          }
        });
    },
  },
  beforeMount() {
    //this._fetchRegionList();
    this.apiGetAnalytics();
    //this.apiGetLimitList();
  },
};
</script>

<style>

.reporting-btn .input-btn.form__line--btn{
	background:#52A5FC;
	width: 250px;
    height: 47px;
    padding:0;
    justify-content:center;
	transition:background 1s;
}

</style>
