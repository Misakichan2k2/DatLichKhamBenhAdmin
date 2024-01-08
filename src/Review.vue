<script setup>
import { ref } from "vue";
//import { useField, useForm } from "vee-validate";

const reviewVisible = ref(false);
const rating = ref(null);
const rateDescription = ref(null);

const appointment = ref([
  {
    name: "Niềng răng",
    date: "09/01/2024",
    time: "13:30 PM",
    price: "5.231.000",
  },
  {
    name: "Nhổ răng sữa",
    date: "10/01/2024",
    time: "9:00 AM",
    price: "5.231.000",
  },
]);

// Lưu thông tin Toast
// const onClickConfirm = () => {
//   reviewVisible.value = false;
//   console.log(profile.value);
//   toast.add({
//     severity: "success",
//     summary: "Lưu thành công",
//     detail: "Thông tin đã thay đổi",
//     life: "3000",
//   });
</script>

<template>
  <div class="surface-hover p-4 h-screen">
    <div class="flex flex-column gap-3">
      <div class="bg-white mx-8 shadow-1 px-5 py-3">
        <div class="flex px-7 justify-content-between">
          <a href="#" class="text-lg cursor-pointer deselect-item">
            Lịch Đã Đặt
          </a>
          <a href="#" class="text-lg cursor-pointer deselect-item">
            Lịch Đã Hủy
          </a>
          <a href="#" class="text-lg cursor-pointer selected-item"
            >Chưa Đánh Giá</a
          >
          <a href="#" class="text-lg cursor-pointer deselect-item">
            Đánh Giá Của Tôi
          </a>
        </div>
      </div>

      <!-- Review Content -->
      <div v-for="order in appointment" :key="order.code">
        <div class="bg-white mx-8 shadow-1 p-5 flex flex-column gap-2">
          <div class="flex justify-content-center">
            <hr style="width: 65rem" />
          </div>
          <div class="flex flex-column gap-3">
            <span class="font-semibold text-lg">{{ order.name }}</span>
            <div class="flex flex-column gap-2 text-color-secondary">
              <span class="font-medium">Lịch đến khám:</span>
              <ul class="flex flex-column gap-2 ml-5">
                <li>Ngày: {{ order.date }}</li>
                <li>Thời gian: {{ order.time }}</li>
              </ul>
            </div>
          </div>

          <div class="flex justify-content-center">
            <hr style="width: 65rem" />
          </div>

          <!-- Button Đánh giá -->
          <div
            class="flex gap-5 text-lg justify-content-end align-items-center"
          >
            <Button
              label="Đánh giá"
              class="w-7rem h-3rem"
              @click="reviewVisible = !reviewVisible"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog Review -->
  <Dialog
    v-model:visible="reviewVisible"
    modal
    :style="{ width: '23rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <span class="font-semibold w-full text-center">Đánh giá lịch hẹn</span>
    </template>
    <hr />
    <div class="flex gap-5 py-4 justify-content-center">
      <div class="flex flex-column gap-3">
        <div class="flex gap-3 justify-content-center">
          <div>
            <span class="w-11rem font-semibold">Chất lượng dịch vụ</span>
          </div>
          <div class="card flex justify-content-center">
            <Rating v-model="rating" :cancel="false" />
          </div>
        </div>

        <!-- Textarea -->
        <div class="card flex justify-content-center">
          <span class="p-float-label">
            <Textarea v-model="rateDescription" rows="5" cols="30" />
            <label>Description</label>
          </span>
        </div>

        <div class="flex gap-2 justify-content-end">
          <div class="card flex justify-content-center">
            <Button
              label="Hủy"
              @click="reviewVisible = false"
              outlined
              class="w-5rem h-2rem"
            />
          </div>
          <div class="card flex justify-content-center">
            <Button label="Gửi" @click="onClickConfirm" class="w-6rem h-2rem" />
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.selected-item {
  color: var(--blue-700);
  text-decoration: underline;
  font-weight: 500;
}
.deselect-item {
  color: var(--blue-700);
  text-decoration: none;
}
.deselect-item:hover {
  color: var(--blue-700);
  font-weight: 500;
}
</style>
