const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Mở menu" : "Đóng menu");
  mobileNav.classList.toggle("open", !isOpen);
});

mobileNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở menu");
    mobileNav.classList.remove("open");
  }
});

const zaloDialog = document.querySelector(".zalo-dialog");

document.querySelectorAll("[data-open-zalo]").forEach((button) => {
  button.addEventListener("click", () => zaloDialog.showModal());
});

document.querySelector(".dialog-close").addEventListener("click", () => zaloDialog.close());
zaloDialog.addEventListener("click", (event) => {
  if (event.target === zaloDialog) zaloDialog.close();
});

const fleetVehicles = [
  {
    image: "assets/fleet-5seat.webp",
    alt: "Dàn xe 5 chỗ đời mới tiện nghi",
    label: "Xe 5 Chỗ Đời Mới",
    title: "Dàn Xe 5 Chỗ Êm Ái & Hiện Đại",
    description: "Phù hợp ghép lẻ khách, đi công tác, đưa đón sân bay nhanh chóng",
    features: [
      "Dàn xe Sedan/SUV 5 chỗ đời mới sạch sẽ, không mùi hôi.",
      "Trang bị điều hòa tự động 2 vùng làm mát sâu, ghế da êm ái.",
      "Không gian cabin yên tĩnh, tạo cảm giác thoải mái suốt chuyến đi.",
      "Nước uống, khăn lạnh được phục vụ hoàn toàn miễn phí.",
    ],
    button: "Đặt Xe 5 Chỗ Ngay",
  },
  {
    image: "assets/fleet-7seat.webp",
    alt: "Dàn xe 7 chỗ rộng rãi cốp lớn",
    label: "Xe 7 Chỗ Rộng Rãi",
    title: "Không Gian Thoải Mái Cho Cả Gia Đình",
    description: "Lựa chọn lý tưởng cho nhóm khách, gia đình và chuyến đi nhiều hành lý",
    features: [
      "Xe 7 chỗ gầm cao rộng rãi, phù hợp cho gia đình và nhóm bạn.",
      "Khoang hành lý lớn, thuận tiện mang theo vali và đồ dùng cá nhân.",
      "Nội thất sạch sẽ, ghế ngồi thoải mái trên hành trình dài.",
      "Đón trả tận nơi theo lịch trình đã hẹn.",
    ],
    button: "Đặt Xe 7 Chỗ Ngay",
  },
  {
    image: "assets/fleet-vip.webp",
    alt: "Xe sang VIP trọn gói đối tác",
    label: "Xe VIP Trọn Gói",
    title: "Dịch Vụ Xe Sang VIP Bao Xe Trọn Gói",
    description: "Tiện nghi tối đa, bảo mật, thích hợp đưa đón VIP, đối tác, sự kiện lớn",
    features: [
      "Các dòng xe Sedan sang trọng hạng D hoặc SUV cỡ lớn đẳng cấp.",
      "Trải nghiệm êm ái tuyệt đối, không gian riêng tư, bảo mật thông tin.",
      "Phục vụ trọn gói đi tỉnh đường dài, đi công tác có lái xe phục vụ riêng.",
      "Đón đúng giờ cam kết, phục vụ tiêu chuẩn VIP đẳng cấp nhất.",
    ],
    button: "Đặt Xe VIP Ngay",
  },
];

const fleetImage = document.querySelector("#fleet-image");
const fleetLabel = document.querySelector("#fleet-label");
const fleetTitle = document.querySelector("#fleet-title");
const fleetDescription = document.querySelector("#fleet-description");
const fleetFeatures = document.querySelector("#fleet-features");
const fleetButton = document.querySelector(".fleet-details .button");
const fleetDots = [...document.querySelectorAll(".fleet-dot")];

fleetDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const vehicle = fleetVehicles[index];
    fleetImage.src = vehicle.image;
    fleetImage.alt = vehicle.alt;
    fleetLabel.textContent = vehicle.label;
    fleetTitle.textContent = vehicle.title;
    fleetDescription.textContent = vehicle.description;
    fleetFeatures.replaceChildren(
      ...vehicle.features.map((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        return item;
      }),
    );
    fleetButton.firstChild.textContent = `${vehicle.button} `;
    fleetDots.forEach((item, itemIndex) => {
      const isSelected = itemIndex === index;
      item.classList.toggle("active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
  });
});
