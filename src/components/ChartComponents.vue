<template>
  <div>
    <apexchart
      width="700"
      type="area"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { useAppStore } from '../store/app.js'

const storeApp = useAppStore()

const chartOptions = {
  chart: {
    id: "qweresafsef",
    toolbar: {
      show: false
    },
  },
  xaxis: {
    type: 'datetime',
    categories: storeApp.state.analyticData.map((row) => row.date),
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  markers: {
    size: 5,
    hover: {
      size: 9
    }
  },
  tooltip: {
    intersect: true,
    shared: false
  },
  title: {
    text: 'Аналитика по визитам',
    style: {
      fontSize:  '16px',
      fontWeight:  '400',
    }
  },
}
const series = [
  {
    name: "Visits",
    data: storeApp.state.analyticData.map((row) => row.visits)
  }
]
</script>

