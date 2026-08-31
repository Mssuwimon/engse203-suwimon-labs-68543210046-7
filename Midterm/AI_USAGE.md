# AI Usage Log – สอบกลางภาค

ชื่อ-รหัส: สุวิมนต์ ไชยเดช 68543210046-7

บันทึกทุกครั้งที่ใช้ AI ระหว่างสอบ

| เวลา | งาน (B1/B2/B3/B4) | ถาม AI ว่าอะไร | ได้คำตอบส่วนไหน | แก้เอง/ตรวจสอบอย่างไร |
|------|------|------|------|------|
| 09:30 | B1 | ช่วยหาสาเหตุ Warning ใน React | แนะนำเพิ่ม key={request.id} ใน RequestList | แก้โค้ดและตรวจ Console ว่า Warning หาย |
| 09:45 | B1 | ช่วยตรวจ Summary นับ pending ผิด | พบว่า pending ไปนับ completed | แก้เงื่อนไขและทดสอบตัวเลขใน Summary |
| 10:00 | B1 | ช่วยตรวจ Filter สถานะทำงานผิด | พบว่าใช้ !== แทน === | แก้โค้ดและทดลองกรองสถานะ |
| 10:15 | B1 | ช่วยหาเหตุผลที่เปลี่ยน URL แล้วข้อมูลไม่เปลี่ยน | พบว่าขาด requestId ใน dependency array | เพิ่ม requestId และทดสอบหน้า Detail |
| 10:30 | B1 | ช่วยตรวจการลบข้อมูล | พบว่า setRequests(requests) ใช้ข้อมูลเดิม | เปลี่ยนเป็น setRequests(nextRequests) และทดสอบลบ |
| 10:45 | B1 | ช่วยตรวจ Reset Demo Data แล้วหน้าพัง | พบว่าต้อง await resetRequests() | แก้ handleReset และทดสอบใหม่ |
| 11:00 | B2 | ขอคำแนะนำเพิ่ม Search Input | แนะนำเพิ่ม state และ input ค้นหา | เพิ่ม searchText state และทดสอบพิมพ์ข้อความ |
| 11:15 | B2 | ช่วยเขียนเงื่อนไขค้นหาผู้แจ้งและรายละเอียด | ใช้ requesterName และ details ในการกรอง | ทดสอบคำค้น "ห้อง" ตามโจทย์ |
| 11:30 | B2 | ช่วยรวม Search กับ Status Filter | แนะนำใช้ matchStatus && matchSearch | ทดสอบ completed + ห้อง |
| 11:45 | B3 | ช่วยเพิ่มปุ่ม ทำเสร็จ | แนะนำเพิ่มปุ่มใน RequestCard | ทดสอบการแสดงผลตามสถานะ |
| 12:00 | B3 | ช่วยเชื่อม updateRequestStatus | แนะนำสร้าง handleMarkDone | อัปเดตสถานะและตรวจ Summary |
| 12:15 | B4 | ช่วยสร้าง PriorityBadge Component | แนะนำสร้าง PriorityBadge.jsx | ทดสอบ urgent/normal |
| 12:30 | B4 | ช่วยทำ Edge Case ค่าไม่รู้จัก | แนะนำแสดงข้อความ "ไม่ระบุ" | ทดสอบด้วย priority="high" |