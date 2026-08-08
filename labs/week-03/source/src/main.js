const form = document.querySelector("#request-form");
const status = document.querySelector("#form-status");
const details = document.querySelector("#details-count");
// TODO 1: query preview/status/list elements
const previewName = document.querySelector("#preview-name");
const previewType = document.querySelector("#preview-type");
const previewDetails = document.querySelector("#preview-details");
const requestList = document.querySelector("#request-list");
let total = 0;
let pending = 0;
let approved = 0;
const count = {
  total: document.querySelector("#total-count"),
  pending: document.querySelector("#pending-count"),
  approved: document.querySelector("#approved-count"),
};

// TODO 2: readForm()
function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}
// TODO 3: renderPreview(data)
function renderPreview(data) {
  const requesterName = (data.requesterName || "").trim();
  const requestType = data.requestType || "";
  const detailsContent = (data.details || "").trim();

  previewName.textContent = requesterName || "ยังไม่ระบุชื่อ";
  previewType.textContent = requestType || "ยังไม่เลือกประเภท";
  previewDetails.textContent = detailsContent || "ยังไม่มีรายละเอียด";
  details.textContent = `${(data.details || "").length} ตัวอักษร`; // ป้องกัน error ถ้า details เป็น undefined
}
// TODO 4: validate(data)
function validate(data) {
  const errors = {};

  if ((data.requesterName || "").trim().length < 2) {
    errors.requesterName = "กรุณากรอกชื่อผู้ขอรับบริการ";
  }

  if (!data.requestType) {
    errors.requestType = "กรุณาเลือกประเภทคําขอ";
  }

  if ((data.details || "").trim().length < 10) {
    errors.details = "กรุณาอธิบายอย่างน้อย 10 ตัวอักษร";
  }

  return errors;
}
// TODO 5: renderErrors(errors)
function renderErrors(errors) {
  for (const name of ["requesterName", "requestType", "details"]) {
    const field = form.elements[name];
    // const field = document.querySelector(`[name="${name}"]`);
    const output = document.querySelector(`#${name}-error`);
    const message = errors[name] ?? "";

    output.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
  }
}

form.addEventListener("input", (event) => {
  // currentTarget คือ form; target คือ input/select/textarea ที่เปลี่ยน
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  renderPreview(data);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit(event.currentTarget);
});

// TODO 6: input and submit listeners
function handleSubmit(form) {
  const data = readForm(form);
  const errors = validate(data);
  renderErrors(errors);
  if (Object.keys(errors).length > 0) {
    renderStatus("invalid", "กรุณาตรวจสอบข้อมูลที่ระบุ");
    return;
  }
  addRequest(data);
  renderStatus("success", "บันทึกคําขอเรียบร้อย");
  form.reset();
  renderPreview(readForm(form));
}

function renderStatus(state, message) {
  status.dataset.state = state;
  status.textContent = message;
}

function addRequest(data) {
  const item = document.createElement("li");
  const title = document.createElement("strong");
  const details = document.createElement("span");
  title.textContent = `${data.requesterName} • ${data.requestType}`;
  details.textContent = data.details;

  const approveBtn = document.createElement("button");
  approveBtn.textContent = "Approve";
  approveBtn.type = "button"; // เพื่อป้องกันไม่ให้ทำงานเป็น Submit

  approveBtn.addEventListener("click", () => {
    pending--; // ลดจำนวนที่รอดำเนินการ
    approved++; // เพิ่มจำนวนที่อนุมัติแล้ว (อิงตามชื่อตัวแปร "append" ในโค้ดเดิมของคุณ)

    // อัปเดตตัวเลขบนหน้าจอ (เรียกฟังก์ชันสำหรับอัปเดต DOM)
    updateStage();

    // ปิดการใช้งานปุ่มหลังจากกดแล้ว เพื่อไม่ให้กดซ้ำได้
    approveBtn.disabled = true;
    approveBtn.remove();
    item.classList.add("approved");
  });

  item.append(title, details, approveBtn);
  requestList.prepend(item);
  total++;
  pending++;
  updateStage();
}

function updateStage() {
  count.total.textContent = total;
  count.pending.textContent = pending;
  count.approved.textContent = approved;
}

console.log("LAB 3 starter ready", form);
updateStage();
