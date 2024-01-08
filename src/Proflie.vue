<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import axios from "axios";

const toast = useToast();
const passwordVisible = ref(false);
const password = ref(null);
const newPassword = ref(null);
const confirmPassword = ref(null);

const profile = ref({
  image: "",
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  birthDate: "",
  address: "",
  point: "",
});

const genderType = ref([
  {
    code: "1",
    name: "Nam",
  },
  {
    code: "0",
    name: "Nữ",
  },
]);

const id = ref(5);

onMounted(async () => {
  try {
    const response = await axios.get(
      // `http://localhost:3000/getProfile/${id.value}`
      // `http://localhost:3000/getProfile`
      `http://localhost/userInfo_be/db.php`
    );

    if (response.status === 200) {
      const userData = response.data;

      profile.value = {
        name: userData?.HOTEN || "",
        email: userData?.EMAIL || "",
        phoneNumber: userData?.SDT || "",
        gender: userData?.GIOITINH || "",
        birthDate: userData?.NGAYSINH || "",
        address: userData?.DIACHI || "",
        point: userData?.TICHDIEM || "",
      };
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("User not found");
      // Handle the case where the user is not found
    } else {
      console.error("Error fetching user profile:", error);
    }
  }
});

// Save profile changes
const onClickSave = async () => {
  try {
    const response = await axios.get(
      // `http://localhost:3000/getProfile/${id.value}`
      "http://localhost/userInfo_be/db.php"
    );
    const userData = response.data;

    if (
      userData.HOTEN === profile.value.name &&
      userData.SDT === profile.value.phoneNumber &&
      userData.GIOITINH === profile.value.gender &&
      userData.NGAYSINH === profile.value.birthDate &&
      userData.DIACHI === profile.value.address
    ) {
      console.log("No changes detected");
    } else {
      await axios.post(profile.value);
      toast.add({
        severity: "success",
        summary: "Lưu thành công",
        detail: "Thông tin đã thay đổi",
        life: "3000",
      });
    }
  } catch (error) {
    console.error("Error saving user profile:", error);
    toast.add({
      severity: "error",
      summary: "Lưu thất bại",
      detail: "Đã xảy ra lỗi khi lưu thông tin",
      life: "3000",
    });
  }
};

const onClickChangePassword = async () => {
  try {
    const response = await axios.post("/apiendpoint", {
      currentPassword: password.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    });

    if (response.data.success) {
      toast.add({
        severity: "success",
        summary: "Đổi mật khẩu thành công",
        detail: "Mật khẩu đã được cập nhật",
        life: "3000",
      });

      password.value = null;
      newPassword.value = null;
      confirmPassword.value = null;
      passwordVisible.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Đổi mật khẩu thất bại",
        detail: response.data.error || "Có lỗi xảy ra khi đổi mật khẩu",
        life: "3000",
      });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    toast.add({
      severity: "error",
      summary: "Đổi mật khẩu thất bại",
      detail: error.response.data.error || "Có lỗi xảy ra khi đổi mật khẩu",
      life: "3000",
    });
  }
};

const onUpload = (event) => {
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (e) => {
    profile.value.image = e.target.result;
  };
};
</script>

<template>
  <div class="surface-hover p-3 h-screen">
    <!-- Trang thông tin cá nhân -->
    <div class="bg-white mx-8 shadow-1 p-4">
      <div class="flex flex-column gap-3">
        <div class="flex justify-content-center">
          <span class="font-semibold uppercase text-2xl">
            Thông tin cá nhân
          </span>
        </div>

        <div class="flex justify-content-center">
          <hr class="w-11" />
        </div>
      </div>

      <div
        class="flex flex-column lg:flex-row gap-8 pt-3 align-items-center justify-content-center"
      >
        <!-- Ảnh  -->
        <div class="flex flex-column gap-3 relative">
          <div class="w-15rem h-15rem">
            <img
              :src="profile.image"
              class="w-full h-full border-circle"
              style="object-fit: cover"
            />
          </div>
          <!-- File upload -->
          <div
            class="flex flex-column gap-2 absolute bottom-0 border-circle"
            style="margin-left: 11rem; height: 50px; width: 2.5rem"
            for="upload"
          >
            <div
              class="bg-white relative overflow-hidden flex align-items-center text-600 justify-content-center w-3rem h-10rem border-1 border-dashed border-circle"
            >
              <div class="flex flex-column text-center">
                <i style="font-size: 1.2rem" class="pi pi-camera" />
                <input
                  type="file"
                  style="top: -5rem"
                  accept="image/*"
                  class="absolute bottom-0 left-0 right-0 cursor-pointer"
                  @change="onUpload"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- thông tin -->
        <div class="flex flex-column gap-2">
          <div class="flex gap-5 text-base align-items-center">
            <span class="w-8rem font-semibold">Họ và tên</span>
            <InputText v-model="profile.name" class="h-1 w-8 pl-2" />
          </div>

          <div class="flex gap-5 text-base align-items-center">
            <span class="w-8rem font-semibold">Email</span>
            <InputText v-model="profile.email" class="h-1 w-8 pl-2" />
          </div>

          <div class="flex gap-5 text-base align-items-center">
            <span class="w-8rem font-semibold">Số điện thoại</span>
            <InputText v-model="profile.phoneNumber" class="h-1 w-8 pl-2" />
          </div>

          <!-- Gender -->
          <div class="flex gap-5 text-base align-items-center h-2rem">
            <span class="w-8rem font-semibold">Giới tính</span>
            <div v-for="gender in genderType" :key="gender.code">
              <RadioButton
                v-model="profile.gender"
                :inputId="gender?.code"
                :name="gender?.name"
                :value="gender?.code"
              />
              <label class="ml-2">{{ gender?.name }}</label>
            </div>
          </div>

          <!-- Birth Date -->
          <div class="flex gap-5 text-base align-items-center">
            <span class="w-8rem font-semibold">Ngày sinh</span>
            <div class="w-20rem">
              <Calendar
                inputClass="pl-2"
                v-model="profile.birthDate"
                dateFormat="dd/mm/yy"
                showIcon
                class="w-full"
              />
            </div>
          </div>

          <!-- address -->
          <div class="flex gap-5 text-base align-items-center card">
            <span class="w-8rem font-semibold">Địa chỉ</span>
            <Textarea
              v-model="profile.address"
              autoResize
              rows="1"
              class="pl-2 w-20rem"
            />
          </div>

          <!-- point -->
          <div class="flex gap-5 text-base align-items-center">
            <span class="w-8rem font-semibold">Tích điểm</span>
            <InputText v-model="profile.point" disabled class="h-1 w-8 pl-2" />
          </div>

          <!-- Thay đỏi mật khẩu -->
          <div class="flex gap-5 text-base align-items-center">
            <span class="w-8rem font-semibold">Mật khẩu</span>
            <Button
              label="Thay đổi mật khẩu"
              outlined
              class="h-1 w-8"
              @click="passwordVisible = !passwordVisible"
            />
          </div>

          <!-- Save Button -->
          <div class="card flex justify-content-end mt-3">
            <Button
              v-tooltip="{
                value: 'Confirm to proceed',
                showDelay: 1000,
                hideDelay: 300,
              }"
              label="Lưu thay đổi"
              class="w-full h-1"
              @click="onClickSave"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog Change Password -->
  <Dialog
    v-model:visible="passwordVisible"
    modal
    :style="{ width: '30rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <span class="font-semibold text-lg w-full text-center"
        >Thay đổi mật khẩu</span
      >
    </template>
    <hr />

    <div class="flex flex-column gap-3">
      <div class="flex align-items-center">
        <span class="w-11rem">
          Mật khẩu hiện tại <span class="text-red-500">*</span>
        </span>
        <Password
          v-model="password"
          :feedback="false"
          toggleMask
          class="h-2rem"
        />
      </div>

      <div class="flex align-items-center">
        <span class="w-11rem">
          Mật khẩu mới <span class="text-red-500">*</span>
        </span>
        <Password v-model="newPassword" toggleMask class="h-2rem" />
      </div>

      <div class="flex align-items-center">
        <span class="w-11rem">
          Xác nhận mật khẩu <span class="text-red-500">*</span>
        </span>
        <Password v-model="confirmPassword" toggleMask class="h-2rem" />
      </div>
    </div>

    <div class="flex justify-content-end gap-2 py-3">
      <div class="card flex justify-content-center">
        <Button
          label="Hủy"
          @click="passwordVisible = false"
          outlined
          class="w-5rem"
        />
      </div>
      <div class="card flex justify-content-center">
        <Button label="Lưu" @click="onClickChangePassword" class="w-5rem" />
      </div>
    </div>
  </Dialog>

  <Toast />
</template>

<style scoped></style>
