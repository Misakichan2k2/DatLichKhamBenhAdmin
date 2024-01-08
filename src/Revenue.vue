<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const chartDataDay = ref();
const chartOptionsDay = ref();

const chartDataMonth = ref();
const chartOptionsMonth = ref();

const setChartData = (revenueData) => {
  return {
    datasets: [
      {
        label: "Income",
        data: revenueData,
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

console.log(chartDataDay);
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/dailyRevenue");
    const revenueData = response.data;
    chartDataDay.value = setChartData(revenueData);
    chartOptionsDay.value = setChartOptions();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  try {
    const response = await axios.get(
      "http://localhost:3000/api/monthlyRevenue"
    );
    const revenueData = response.data;
    chartDataMonth.value = setChartData(revenueData);
    chartOptionsMonth.value = setChartOptions();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <div class="card">
    <TabView>
      <TabPanel header="Thống kê theo ngày">
        <div class="w-full bg-white border-round-bottom pt-4 shadow-1">
          <div class="flex justify-content-center h-20rem">
            <Chart
              type="bar"
              :data="chartDataDay"
              :options="chartOptionsDay"
              class="flex justify-content-center bg-white p-2 h-full align-items-center"
              style="width: 32rem"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Thống kê theo tháng">
        <div class="w-full bg-white border-round-bottom pt-4 shadow-1">
          <div class="flex justify-content-center h-20rem">
            <Chart
              type="bar"
              :data="chartDataMonth"
              :options="chartOptionsMonth"
              class="flex justify-content-center bg-white p-2 h-full align-items-center"
              style="width: 32rem"
            />
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<style scoped>
.selected-item {
  background-color: white;
  font-weight: 600;
  border-bottom: none;
}
.deselect-item {
  background-color: rgb(248, 248, 248);
  color: var(--surface-800);
}

.deselect-item:hover {
  background-color: var(--surface-200);
  color: var(--blue-600);
}
</style>
