<script setup>
import { ref } from "vue";

const information = ref([
  {
    id: 1,
    image: "/images/nature.jpg",
    name: "HÀ MINH THU",
    detail:
      "Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM. Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM.",
  },
  {
    id: 2,
    image: "/images/nature2.jpg",
    name: "VŨ ĐỨC TÙNG",
    detail:
      "Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM. Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM.",
  },
  {
    id: 3,
    image: "/images/nature3.jpg",
    name: "VŨ TÙNG DƯƠNG",
    detail:
      "Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM. Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM.",
  },
  {
    id: 4,
    image: "/images/nature4.jpg",
    name: "HÀ TIẾN TIỆP",
    detail:
      "Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM. Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM.",
  },
  {
    id: 5,
    image: "/images/nature.jpg",
    name: "HÀ MINH THU",
    detail:
      "Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM. Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM.",
  },
  {
    id: 6,
    image: "/images/nature2.jpg",
    name: "VŨ ĐỨC TÙNG",
    detail:
      "Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM. Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM.",
  },
  {
    id: 7,
    image: "/images/nature3.jpg",
    name: "VŨ TÙNG DƯƠNG",
    detail:
      "Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM. Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM.",
  },
  {
    id: 8,
    image: "/images/nature4.jpg",
    name: "HÀ TIẾN TIỆP",
    detail:
      "Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM. Nguyên trưởng khoa nắm chỉnh răng viện RHM trung ương. Nguyên trưởng bộ môn nắm chỉnh răng, Đại học RHM.",
  },
]);

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<template>
  <div class="relative">
    <div style="height: 32rem" class="image">
      <img
        src="../public/images/background2.jpg"
        class="h-full w-full"
        style="object-fit: cover"
      />
    </div>

    <div class="absolute top-0 left-0 right-0">
      <div class="pt-8 pl-7 h-25rem flex flex-column gap-6">
        <div class="text-container1" style="width: 43rem">
          <p class="text-blue-800 text-3xl font-semibold">ĐỘI NGŨ BÁC SĨ</p>
          <div class="horizontal-line1"></div>
        </div>

        <div class="text-container2 text center text-lg" style="width: 43rem">
          <p style="font-weight: 425">
            Minh Thu hiểu rằng mỗi chẩn đoán, kế hoạch điều trị sẽ quyết định
            đến nụ cười và khuôn mặt của mỗi khách hàng. Các bác sĩ sẽ luôn nỗ
            lực không ngừng, kiên định với phương châm đặt chất lượng điều trị
            lên hàng đầu, bảo tồn tối đa cùng mục tiêu phát triển bền vững về
            chuyên môn, tận tâm trong dịch vụ.
          </p>
          <div class="horizontal-line2"></div>
        </div>
        <hr class="w-10rem" />
      </div>
      <div class="card">
        <Carousel
          :value="information"
          :numVisible="4"
          :numScroll="1"
          :responsiveOptions="responsiveOptions"
          circular
          :autoplayInterval="5000"
        >
          <template #item="slotProps">
            <div
              class="w-17rem flex flex-column p-5 gap-4 shadow-1 hover:shadow-3 surface-overlay"
            >
              <div class="flex flex-column gap-2">
                <div class="flex justify-content-center">
                  <div class="w-15rem h-15rem">
                    <img
                      :src="slotProps.data.image"
                      class="w-full h-full"
                      style="object-fit: cover"
                    />
                  </div>
                </div>

                <div class="flex flex-column gap-2">
                  <span class="text-xl">{{ slotProps.data.name }}</span>
                  <span class="text-700 text-lg">BÁC SĨ</span>
                </div>

                <div class="line-height-3">
                  <div
                    class="overflow-hidden md:overflow-auto h-15rem text-lg flex flex-column"
                  >
                    <span>{{ slotProps.data.detail }}</span>
                  </div>
                </div>
              </div>

              <div class="card flex gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-button font-bold hover:bg-blue-700 w-8rem h-3rem justify-content-center"
                  style="text-decoration: none"
                  >XEM THÊM</a
                >
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-container1 {
  position: relative;
  text-align: center;
}

.horizontal-line1 {
  position: absolute;
  top: 3rem;
  left: 10rem;
  right: 10rem;
  border-top: 3px solid #000;
}

.text-container2 {
  position: relative;
  text-align: center;
}

.horizontal-line2 {
  position: absolute;
  top: 7rem;
  left: 10rem;
  right: 10rem;
  border-top: 3px solid #000;
}

.image img:hover {
  opacity: 0.5;
}
</style>
