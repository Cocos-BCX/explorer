<template>
  <div class="highcharts-container" :options="options"></div>
</template>
<script>
import Highcharts from "highcharts/highstock";
export default {
  props: ["options", "styles"],
  name: "highcharts",
  data() {
    return {
      chart: null
    };
  },
  watch: {
    options(newValue, oldValue) {
      this.options = newValue;
      this.initChart();
    },
    deep: true
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.$nextTick(
        () =>
          (this.chart = new Highcharts.Chart(this.$el, {
            credits: {
              enabled: false
            },
            chart: {
              type: "area"
              // backgroundColor: "rgba(53,139,244,0.1)"
            },
            title: {
              text: this.options.title || "",
              align: "left",
              style: {
                fontSize: "12px"
              }
            },
            color: this.options.color || ["rgba(53,139,244,0.1)"],
            subtitle: {},
            xAxis: {
              categories: this.options.categories,
              title: {
                text: this.options.xtitle || ""
              }
            },
            yAxis: {
              title: {
                text: this.options.ytitle || ""
              },
              labels: {
                // formatter: function() {
                //   return this.value / 1000 + 'k'
                // }
              }
            },
            tooltip: {
              // head + 每个 point + footer 拼接成完整的 table
              headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}' +
                (this.options.yCompany || "") +
                "</b></td></tr>",
              footerFormat: "</table>",
              shared: true,
              useHTML: true
            },
            plotOptions: {
              area: {
                fillOpacity: 0.19
              }
            },
            series: this.options.series || "",
            legend: {
              enabled: false
            }
          }))
      );
      //  this.$el.style.width = (this.styles.width || 800) + 'px'
      //  this.$el.style.height = (this.styles.height || 400) + 'px'
      //  this.chart = new Highcharts.Chart(this.$el, this.options);
    }
  }
};
</script>