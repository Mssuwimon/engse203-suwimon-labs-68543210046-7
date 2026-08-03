# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: สุวิมนต์ ไชยเดช
- รหัสนักศึกษา: 68543210046-7
- Section: ENGSE203 Computer Programming for Software Engineer (Sec1)

## URLs

- Repository: TODO
- Pull Request: TODO
- GitHub Pages: TODO

## Component Tree

# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: สุวิมนต์ ไชยเดช
- รหัสนักศึกษา: 68543210046-7
- Section: ENGSE203 Computer Programming for Software Engineer (Sec1)

## URLs

- Repository: 
- Pull Request: 
- GitHub Pages: 

## Component Tree

App
├── AppHeader
├── SummaryPanel
├── RequestForm
├── FilterBar
└── RequestList
    └── RequestCard

State Owner

App
- requests
- statusFilter

RequestForm
- formData
- errors
- feedback

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

TODO: อธิบายว่าใคร owns requests/filter/form state, props ไหลลงตรงไหน และ callback ไหลกลับตรงไหน

## Test Evidence

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | Initial requests และ summary แสดงผลถูกต้อง | PASS | evidence/tc01.png |
| TC-02 Controlled input | ทุก field สามารถเปลี่ยนค่าผ่าน state ได้ | PASS | evidence/tc02.png |
| TC-03 Invalid | ไม่สามารถ submit ข้อมูลไม่ครบได้ และแสดง validation error | PASS | evidence/tc03.png |
| TC-04 Valid add | เพิ่มคำร้องใหม่ได้ summary อัปเดต และฟอร์มรีเซ็ต | PASS | evidence/tc04.png |
| TC-05 Filter | กรองข้อมูลตามสถานะได้ถูกต้อง | PASS | evidence/tc05.png |
| TC-06 All | แสดงข้อมูลทุกสถานะได้ถูกต้อง | PASS | evidence/tc06.png |
| TC-07 Empty | แสดงข้อความเมื่อไม่มีรายการคำร้อง | PASS | evidence/tc07.png |
| TC-08 Delete | ลบรายการตาม id ได้ถูกต้อง | PASS | evidence/tc08.png |
| TC-09 Mobile | แสดงผลที่ความกว้าง 375px โดยไม่มี horizontal scroll | PASS | evidence/tc09.png |
| TC-10 Keyboard | Focus state และ keyboard navigation ใช้งานได้ | PASS | evidence/tc10.png |
| TC-11 Build | npm run build และ npm run preview สำเร็จ | PASS | evidence/tc11.png |
| TC-12 Pages | GitHub Pages แสดงผลและโหลด asset ได้ถูกต้อง | PASS | evidence/tc12.png |
## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: TODO

## Week 03 → Week 04 Reflection

TODO: เปรียบเทียบ DOM mutation กับ State-driven UI 3–5 ประโยค

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้”



## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

App เป็น state owner หลักของระบบ โดยจัดเก็บ requests และ statusFilter

RequestForm จัดเก็บ formData, errors และ feedback สำหรับจัดการข้อมูลในฟอร์ม

Props ถูกส่งจาก App ไปยัง Component ย่อย ได้แก่

- SummaryPanel รับ summary
- FilterBar รับ statusFilter และ onFilterChange
- RequestList รับ filteredRequests และ onDeleteRequest
- RequestForm รับ onAddRequest

Callback ถูกส่งจาก Component ย่อยกลับไปยัง App เพื่อแก้ไข state

- onAddRequest ใช้เพิ่มคำร้องใหม่
- onDeleteRequest ใช้ลบคำร้อง
- onFilterChange ใช้เปลี่ยนตัวกรองสถานะ

แนวทางนี้ทำให้ UI เปลี่ยนแปลงตาม state โดยไม่ต้องจัดการ DOM โดยตรง

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | Initial requests และ summary แสดงผลถูกต้อง | PASS | evidence/tc01.png |
| TC-02 Controlled input | ทุก field สามารถเปลี่ยนค่าผ่าน state ได้ | PASS | evidence/tc02.png |
| TC-03 Invalid | ไม่สามารถ submit ข้อมูลไม่ครบได้ และแสดง validation error | PASS | evidence/tc03.png |
| TC-04 Valid add | เพิ่มคำร้องใหม่ได้ summary อัปเดต และฟอร์มรีเซ็ต | PASS | evidence/tc04.png |
| TC-05 Filter | กรองข้อมูลตามสถานะได้ถูกต้อง | PASS | evidence/tc05.png |
| TC-06 All | แสดงข้อมูลทุกสถานะได้ถูกต้อง | PASS | evidence/tc06.png |
| TC-07 Empty | แสดงข้อความเมื่อไม่มีรายการคำร้อง | PASS | evidence/tc07.png |
| TC-08 Delete | ลบรายการตาม id ได้ถูกต้อง | PASS | evidence/tc08.png |
| TC-09 Mobile | แสดงผลที่ความกว้าง 375px โดยไม่มี horizontal scroll | PASS | evidence/tc09.png |
| TC-10 Keyboard | Focus state และ keyboard navigation ใช้งานได้ | PASS | evidence/tc10.png |
| TC-11 Build | npm run build และ npm run preview สำเร็จ | PASS | evidence/tc11.png |
| TC-12 Pages | GitHub Pages แสดงผลและโหลด asset ได้ถูกต้อง | PASS | evidence/tc12.png |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation: `evidence/tc03.png`
- Empty State: `evidence/tc07.png`

## Week 03 → Week 04 Reflection


ใน Lab 3 มีการจัดการ DOM โดยตรงด้วย JavaScript ทำให้ต้องเลือก element และแก้ไขข้อมูลบนหน้าเว็บด้วยตนเอง

ใน Lab 4 ใช้ React และ State-driven UI ซึ่งทำให้หน้าจอเปลี่ยนแปลงตามค่า state อัตโนมัติ

การใช้ useState ช่วยลดความซับซ้อนในการจัดการข้อมูลและลดความผิดพลาดจากการแก้ไข DOM โดยตรง

Props และ callback ช่วยให้ component สามารถสื่อสารกันได้อย่างเป็นระบบ และทำให้โครงสร้างโปรแกรมดูแลรักษาได้ง่ายขึ้น

## AI / External Resource Disclosure


ใช้ Microsoft Copilot และ ChatGPT เพื่อช่วยอธิบายแนวคิด React ได้แก่ useState, Props, Callback, Controlled Form, Validation และการแก้ไขข้อผิดพลาดระหว่างการพัฒนา

ผู้จัดทำได้ตรวจสอบ ทดสอบ และปรับแก้โค้ดด้วยตนเองก่อนส่งงาน โดยใช้ npm run check, npm run build และการทดสอบตาม Test Cases ที่กำหนด