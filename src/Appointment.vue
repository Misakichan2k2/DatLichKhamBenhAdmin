<script setup>
import { ref } from "vue";

const orderVisible = ref(false);
const cancelVisible = ref(false);
const selectedCancelReason = ref(null);

const appointment = ref([
  {
    name: "Niềng răng",
    date: "09/01/2024",
    time: "1:30 PM",
    price: "5.231.000",
  },
  {
    name: "Nha khoa trẻ em",
    date: "10/01/2024",
    time: "9:00 AM",
    price: "5.231.000",
  },
]);

const services = ref([
  { name: "Niềng răng", code: "NR" },
  { name: "Cấy ghép Implant", code: "IM" },
  { name: "Răng thẩm mĩ", code: "TM" },
  { name: "Nha khoa tổng quát", code: "TQ" },
  { name: "Nha khoa trẻ em", code: "TE" },
]);

const cancelReasons = ref([
  { name: "Thay đổi kế hoạch", key: "plan" },
  { name: "Tôi không có nhu cầu khám nữa", key: "cancel" },
  { name: "Khác", key: "others" },
]);

// Lưu thông tin and Toast
const onClickSave = () => {
  console.log(appointment.value);
  orderVisible.value = false;
  toast.add({
    severity: "success",
    summary: "Chỉnh sửa thành công",
    detail: "Thông tin đã thay đổi",
    life: "3000",
  });
};
</script>

<template>
  <div class="surface-hover p-4 h-screen">
    <!-- Menu -->
    <div class="flex flex-column gap-5">
      <div class="bg-white mx-8 shadow-1 py-3">
        <div class="flex px-7 justify-content-between">
          <a href="#" class="text-lg cursor-pointer selected-item"
            >Lịch Đã Đặt</a
          >
          <a href="#" class="text-lg cursor-pointer deselect-item">
            Lịch Đã Hủy
          </a>
          <a href="#" class="text-lg cursor-pointer deselect-item"
            >Chưa Đánh Giá</a
          >
          <a href="#" class="text-lg cursor-pointer deselect-item">
            Đánh Giá Của Tôi
          </a>
        </div>
      </div>

      <!-- Content -->
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

          <div class="text-right text-blue-700">
            <span>Thành tiền:</span>
            <span class="underline vertical-align-top pl-2">đ</span>
            <span class="text-2xl">{{ order.price }}</span>
          </div>
          <div class="flex justify-content-center">
            <hr style="width: 65rem" />
          </div>

          <div class="flex gap-2 justify-content-end">
            <!-- Chỉnh sửa button -->
            <div class="flex gap-5 text-lg align-items-center">
              <Button
                label="Chỉnh sửa"
                class="w-8rem h-2rem"
                @click="orderVisible = !orderVisible"
              />
            </div>
            <!-- Hủy button -->
            <div class="flex gap-5 text-lg align-items-center">
              <Button
                label="Hủy Lịch"
                outlined
                class="w-6rem h-2rem"
                @click="cancelVisible = !cancelVisible"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog chỉnh sửa lịch hẹn -->
  <Dialog
    v-model:visible="orderVisible"
    modal
    :style="{ width: '28rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <span class="font-semibold w-full text-center">Chỉnh Sửa Lịch Hẹn</span>
    </template>
    <hr />
    <div class="pl-3">
      <div class="flex gap-5 pt-4">
        <div class="flex flex-column gap-3">
          <div class="flex align-items-center">
            <span class="w-11rem">
              Dịch vụ điều trị<span class="text-red-500">*</span>
            </span>
            <div class="card flex justify-content-center h-2rem">
              <Dropdown
                v-model="appointment[0].name"
                editable
                :options="services"
                optionLabel="name"
                placeholder="Chọn dịch vụ"
                class="w-full md:w-14rem"
              />
            </div>
          </div>

          <div class="flex align-items-center">
            <span class="w-11rem"
              >Ngày hẹn<span class="text-red-500">*</span>
            </span>
            <div class="w-14rem">
              <Calendar
                inputClass="h-2rem"
                v-model="appointment[0].date"
                dateFormat="dd/mm/yy"
                showIcon
                class="w-full"
              />
            </div>
          </div>

          <div class="flex align-items-center">
            <span class="w-11rem">
              Giờ hẹn<span class="text-red-500">*</span>
            </span>
            <div class="">
              <Calendar
                id="calendar-timeonly"
                v-model="appointment[0].time"
                timeOnly
                class="h-2rem"
              />
            </div>
          </div>

          <div class="flex gap-2 h-3rem justify-content-end">
            <div class="card flex justify-content-center">
              <Button
                label="Hủy"
                @click="orderVisible = false"
                outlined
                class="w-5rem h-2rem"
              />
            </div>
            <div class="card flex justify-content-center">
              <Button label="Lưu" @click="onClickSave" class="w-5rem h-2rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>

  <!-- Dialog Hủy lịch hẹn -->
  <Dialog
    v-model:visible="cancelVisible"
    modal
    :style="{ width: '21rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <span class="font-semibold w-full text-center">Hủy Lịch Hẹn</span>
    </template>
    <hr />
    <div class="pl-3">
      <div class="flex flex-column pt-3 px-2 gap-3">
        <span class="font-medium"> Lý do hủy: </span>
        <div class="flex flex-column gap-3">
          <div
            v-for="reason in cancelReasons"
            :key="reason.key"
            class="flex align-items-center"
          >
            <RadioButton
              v-model="selectedCancelReason"
              :inputId="reason.key"
              name="reason.name"
              :value="reason.key"
            />
            <label class="ml-2">{{ reason.name }}</label>
          </div>

          <div class="flex gap-2 h-3rem pr-3 justify-content-end">
            <div class="card flex justify-content-center">
              <Button
                label="Hủy"
                @click="cancelVisible = false"
                outlined
                class="w-5rem h-2rem"
              />
            </div>
            <div class="card flex justify-content-center">
              <Button
                label="Xác nhận"
                @click="onClickConfirm"
                class="w-6rem h-2rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>

  <Toast />
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
