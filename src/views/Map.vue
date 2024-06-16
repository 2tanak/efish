<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col">
            <div id="chartdiv" class="chartdiv"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api, urlApi, apiSecond } from '@/boot/axios';
import am4geodata_kazakhstan from '@amcharts/amcharts4-geodata/kazakhstanLow';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { MOCK_REGIONS } from '@/mockData.js';

am4core.useTheme(am4themes_animated);
export default {
  name: 'Index',
  data() {
    return {
      fetchedRegions: [],
      regionsData: [],
      mobileStatus: false,
      denIsActive: true,
      data: [
        { name: 'Карагандинская область', id: 'KZ-KAR' },
        { name: 'Алматинская область', id: 'KZ-ALM' },
        { name: 'Мангистауская область', id: 'KZ-MAN' },
        { name: 'Кызылординская область', id: 'KZ-KZY' },
        { name: 'Павлодарская область', id: 'KZ-PAV' },
        { name: 'Жамбылская область', id: 'KZ-ZHA' },
        { name: 'Акмолинская область', id: 'KZ-AKM' },
        { name: 'Атырауская область', id: 'KZ-ATY' },
        { name: 'Костанайская область', id: 'KZ-KUS' },
        { name: 'Северо-Казахстанская область', id: 'KZ-SEV' },
        { name: 'Восточно-Казахстанская область', id: 'KZ-VOS' },
        { name: 'Туркестанская область', id: 'KZ-YUZ' },
        { name: 'Западно-Казахстанская область', id: 'KZ-ZAP' },
        { name: 'Актюбинская область', id: 'KZ-AKT' },
      ],
      regions: [
        {
          region_name:
            '\u0417\u0430\u043f\u0430\u0434\u043d\u043e-\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '3.6%',
          count: 4,
        },
        {
          region_name:
            '\u041f\u0430\u0432\u043b\u043e\u0434\u0430\u0440\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '9.01%',
          count: 10,
        },
        {
          region_name:
            '\u0410\u043b\u043c\u0430\u0442\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '1.8%',
          count: 2,
        },
        {
          region_name:
            '\u0416\u0430\u043c\u0431\u044b\u043b\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '0.9%',
          count: 1,
        },
        {
          region_name:
            '\u0410\u043a\u043c\u043e\u043b\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '16.22%',
          count: 18,
        },
        {
          region_name:
            '\u041a\u0430\u0440\u0430\u0433\u0430\u043d\u0434\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '13.51%',
          count: 15,
        },
        {
          region_name:
            '\u0421\u0435\u0432\u0435\u0440\u043e-\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '15.32%',
          count: 17,
        },
        {
          region_name:
            '\u0412\u043e\u0441\u0442\u043e\u0447\u043d\u043e-\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '6.31%',
          count: 7,
        },
        {
          region_name:
            '\u0410\u043a\u0442\u044e\u0431\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c',
          percentage: '14.41%',
          count: 16,
        },
      ],
    };
  },
  methods: {
    fetchRegions() {
      this.fetchedRegions = MOCK_REGIONS;
      this.getRegions();
      // api
      //   .get('guest/regions', {})
      //   .then((response) => {
      //     this.fetchedRegions = response.data;
      //     this.getRegions();
      //   })
      //   .catch((error) => {
      //   });
    },
    getRegions() {
      let regions = this.fetchedRegions;

      this.regionsData = [];
      regions.forEach((item) => {
        for (let region of this.data) {
          let color;
          let val;
          if (item.entry.links) {
            val = item.entry.links.length;
          } else {
            val = 0;
          }

          // if (val < 5) {
          //     color = am4core.color('#52A5FC')
          // }
          if (0 < val) {
            color = am4core.color('#52A5FC');
          }
          if (10 < val) {
            color = am4core.color('#207DDE');
          }
          if (region.name == item.value) {
            // if(region.name=='Восточно-Казахстанская область') {
            //     alert(val);
            // }
            this.regionsData.push({
              id: region.id,
              name: item.value,
              value: val + '\n',
              fill: color,
            });
          }
        }
      });
      if (this.regionsData) {
        this.getCountryGraphic();
      }
    },
    getWaters(waters) {
      let result = '';

      for (let index = 0; index < waters.length; index++) {
        result = result + waters[index].waters.value + ',';
      }
      return result;
    },
    mobileActive(status) {
      this.mobileStatus = status;
    },

    getCountryGraphic() {
      let map = null;
      if (map) {
        map.dispose();
      }

      map = am4core.create('chartdiv', am4maps.MapChart);
      if (map.logo) {
        map.logo.disabled = true;
      }
      map.geodata = am4geodata_kazakhstan;
      // map.geodataSource.url = '../assets/file/kazGeo.json'

      map.projection = new am4maps.projections.Mercator();
      map.height = '100%';
      map.width = '100%';
      map.maxHeight = 900;

      map.align = 'center';
      map.maxZoomLevel = 1;
      map.chartContainer.wheelable = false;
      map.seriesContainer.events.disableType('doublehit');
      map.chartContainer.background.events.disableType('doublehit');

      map.seriesContainer.draggable = false;
      map.seriesContainer.resizable = false;

      if (map.logo) {
        map.logo.disabled = true;
      }

      let polygonSeries = new am4maps.MapPolygonSeries();
      let series = new am4maps.MapSeries();

      polygonSeries.data = this.regionsData;
      // Configure series
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipHTML = '{name} \nКоличество водоемов: {value}  ';
      polygonTemplate.propertyFields.fill = 'fill';

      // polygonTemplate.strokeWidth = 0
      // Create hover state and set alternative fill color
      let hoverState = polygonTemplate.states.create('hover');
      hoverState.properties.fill = am4core.color('#ca9e67');

      polygonSeries.useGeodata = true;

      let imageSeries = map.series.push(new am4maps.MapImageSeries());

      let imageSeriesTemplate = imageSeries.mapImages.template;
      // let circle = imageSeriesTemplate.createChild(am4core.Circle)
      // circle.radius = 6
      // circle.fill = am4core.color('white')
      // circle.stroke = am4core.color('#F4F4F4')
      // circle.strokeWidth = 1
      // circle.nonScaling = true
      // circle.tooltipText = '{title} : {value}'
      // let hs = polygonSeries.mapPolygons.template.states.create(
      //     'hover'
      // )
      // hs.properties.fill = am4core.color('#ca9e67')
      imageSeriesTemplate.propertyFields.latitude = 'latitude';
      imageSeriesTemplate.propertyFields.longitude = 'longitude';
      // map.panBehavior = 'rotateLongLat'

      //poligans svg label
      polygonSeries.calculateVisualCenter = true;

      let labelTemplate = imageSeries.mapImages.template.createChild(am4core.Label);
      labelTemplate.horizontalCenter = 'middle';
      labelTemplate.verticalCenter = 'middle';
      labelTemplate.fontSize = 4;
      labelTemplate.nonScaling = true;
      labelTemplate.interactionsEnabled = false;

      polygonSeries.events.on('inited', function () {
        for (let polygon of polygonSeries.mapPolygons) {
          let label = imageSeries.mapImages.create();
          let state = polygon.dataItem.dataContext;

          label.latitude = polygon.visualLatitude;
          label.longitude = polygon.visualLongitude;
          label.children.getIndex(0).text = state;
        }
      });
      map.series.push(polygonSeries);

      //end
    },
  },
  watch: {},
  mounted() {
    this.fetchRegions();
  },
};
</script>
