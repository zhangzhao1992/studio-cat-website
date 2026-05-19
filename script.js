const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const leadForm = document.querySelector("[data-lead-form]");
const formStatus = document.querySelector("[data-form-status]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-gallery]").forEach((item) => {
  item.addEventListener("click", () => {
    const src = item.getAttribute("data-gallery");
    if (!src || !lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener("click", () => lightbox?.close());

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

const buildMailto = (data) => {
  const subject = encodeURIComponent("STUDIO CAT 官网合作需求");
  const body = encodeURIComponent(
    [
      `姓名：${data.get("name") || ""}`,
      `公司/品牌：${data.get("company") || ""}`,
      `电话/微信：${data.get("phone_or_wechat") || ""}`,
      `邮箱：${data.get("email") || ""}`,
      `项目类型：${data.get("project_type") || ""}`,
      `期望排期：${data.get("timeline") || ""}`,
      "",
      `项目需求：${data.get("message") || ""}`,
    ].join("\n"),
  );

  return `mailto:29998953@qq.com?cc=291397250@qq.com&subject=${subject}&body=${body}`;
};

const rememberLeadLocally = (data) => {
  const lead = Object.fromEntries(data.entries());
  lead.created_at = new Date().toISOString();

  try {
    const key = "studio-cat-leads";
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    saved.push(lead);
    localStorage.setItem(key, JSON.stringify(saved.slice(-50)));
  } catch {
    // Local storage is only a browser-side backup; the email endpoint remains primary.
  }
};

leadForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(leadForm);

  if (data.get("_honey")) return;

  rememberLeadLocally(data);

  const submitButton = leadForm.querySelector("button[type='submit']");
  submitButton?.setAttribute("disabled", "true");
  if (formStatus) formStatus.textContent = "正在提交，请稍候。";

  try {
    const response = await fetch(leadForm.dataset.endpoint || "", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    if (!response.ok) {
      throw new Error("Submit failed");
    }

    leadForm.reset();
    if (formStatus) {
      formStatus.textContent = "已收到留言，我们会尽快与您联系。";
    }
  } catch {
    if (formStatus) {
      formStatus.textContent = "网络提交暂时没有成功，正在为您打开邮件发送方式。";
    }
    window.location.href = buildMailto(data);
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});
