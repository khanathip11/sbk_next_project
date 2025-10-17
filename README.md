This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

------------------------------------------------------------------------------------------------------------------------------------------
## Overview
---------------------------------------------- 🧭 1. ภาพรวมโครงสร้างหลักของหน้า Overview ----------------------------------------------

โครงสร้างหลักประกอบด้วย 3 ส่วนใหญ่ ๆ ในไฟล์ HomePage.tsx
<Box> ──────────────── ทั้งหน้า Overview Layout
│
├── <Navbar />                // เมนูด้านซ้าย
├── <ComplaintMap />          // พื้นที่แผนที่กลางจอ (Mapbox)
└── <TaskSummary / TaskBoard / PreviewPanal />   // แผงขวา (Task Panel)

---------------------------------------------- ⚙️ 2. ลำดับการทำงานหลัก (Flow Step-by-Step) ----------------------------------------------
▶️ Step 1: เริ่มโหลดหน้า (HomePage.tsx)

State ที่สำคัญ:
const [collapsed, setCollapsed] = useState(true); // ย่อ/ขยาย Navbar
const [closeTask, SetCloseTask] = useState(false); // เปิด/ปิดแผง Task
const [selectedCard, setSelectedCard] = useState<CardItem | null>(null); // เลือกการ์ด

Layout จะกำหนดขนาด 3 ส่วนนี้แบบ responsive ด้วย MUI breakpoints (isLgUp, isXlUp)

| จาก            | ไป                  | วิธีสื่อสาร                               |
| -------------- | ------------------- | ----------------------------------------- |
| `Navbar`       | `HomePage`          | เปลี่ยนค่า `collapsed`                    |
| `HomePage`     | `ComplaintMap`      | ส่ง prop: `collapse`, `closeTask`         |
| `ComplaintMap` | `EmergencyNotifier` | ใช้ Modal เปิด/ปิด                        |
| `ComplaintMap` | `ComplaintOverview` | ส่งข้อมูล `cardsData` เพื่อคำนวณกราฟ      |
| `TaskSummary`  | `HomePage`          | toggle `closeTask` ผ่าน `SetCloseTask`    |
| `TaskBoard`    | `PreviewPanal`      | ใช้ `selectedCard` state (เมื่อคลิกการ์ด) |

▶️ Step 2: Navbar (ซ้ายมือ)
component: Navbar.tsx
แสดงเมนูนำทาง (Overview, Issue Management, Dashboard, ฯลฯ)
เมื่อคลิกเมนู จะเปลี่ยน route ไปยังหน้าที่เกี่ยวข้อง
สามารถ ย่อ/ขยาย ได้ด้วยการคลิกปุ่มลูกศร (เปลี่ยน state collapsed)
💡 ข้อมูลจาก Navbar
ไม่มีข้อมูลภายในที่ส่งออก แต่มีผลต่อ layout โดยตรงผ่าน prop collapsed
----------------------------------------------

▶️ Step 3: ComplaintMap (กลางจอ)

component: ComplaintMap.tsx
เป็น “หัวใจของ Overview” — รวม Mapbox, Filter, และ Emergency Notifier
ภายใน ComplaintMap มี 3 ส่วนย่อย:
MapboxMapComponent
แสดงแผนที่และ marker ของแต่ละ complaint
รับ prop networks (mock เป็น issue state)
ComplaintOverview + Filter
<ComplaintOverview /> → แสดงสรุปสถิติ เช่น
จำนวนเรื่องร้องเรียนแต่ละสถานะ
Pie chart (ProblemChart)
ปุ่มกรอง (FilterListIcon) → เปิด <ComplaintFilterBar />
<ComplaintFilterBar /> มี dropdown filter เช่น “ประเภทปัญหา”, “ภาค”, “จังหวัด” และปุ่มเปิด DatePicker (ComplaintDatePicker)
Emergency Notifier Modal
ปุ่มแดง “แจ้งเตือนเหตุการณ์ฉุกเฉิน”
เปิด modal → <EmergencyNotifier />
ภายในมี:
ด้านซ้าย: <EmergencyNotifierLeft /> → แบบฟอร์มสร้างข้อความ
กลาง: ปุ่ม “ร่างตัวอย่าง”
ด้านขวา: <EmergencyNotifierRight /> → Preview ข้อความแจ้งเตือนที่จะส่ง
มีปุ่ม “ส่งแจ้งเตือน” และ “ปิด” ใน preview
----------------------------------------------

Step 4: Task Panel (ฝั่งขวา)

ประกอบด้วย 3 component:
<TaskSummary />    // แถบด้านบน
<TaskBoard />      // การ์ดแต่ละรายการ
<PreviewPanal />   // แสดงรายละเอียดเมื่อเลือกการ์ด

(1) TaskSummary
แสดงจำนวน “Result” หรือ “Preview”
มีปุ่มลูกศร <ArrowForwardIosIcon> สำหรับเปิด/ปิด panel (toggle closeTask)

(2) TaskBoard
loop ผ่าน cardsData.map()
แสดงแต่ละ “เรื่องร้องเรียน” (ภาพ, หัวข้อ, สถานะ, คำอธิบาย)
เมื่อคลิก → setSelectedCard(card) → เปิดหน้า preview

(3) PreviewPanal
แสดงรายละเอียดของเรื่องร้องเรียนที่เลือก:
รูปภาพหัว (PreviewHeader)
รายละเอียด (PreviewDetailItem)
Timeline ของการดำเนินการ (PreviewIssueTimelineSection)
ปุ่มปิด (ไอคอน X) จะเรียก onBack() → setSelectedCard(null)
แล้วกลับไปที่รายการ TaskBoard เดิม


---------------------------------------------- 🔄 3. การเชื่อมโยงระหว่าง Components ----------------------------------------------
จาก	ไป	วิธีสื่อสาร
Navbar	HomePage	เปลี่ยนค่า collapsed
HomePage	ComplaintMap	ส่ง prop: collapse, closeTask
ComplaintMap	EmergencyNotifier	ใช้ Modal เปิด/ปิด
ComplaintMap	ComplaintOverview	ส่งข้อมูล cardsData เพื่อคำนวณกราฟ
TaskSummary	HomePage	toggle closeTask ผ่าน SetCloseTask
TaskBoard	PreviewPanal	ใช้ selectedCard state (เมื่อคลิกการ์ด)

---------------------------------------------- 🔁 4. Interaction Flow (User Journey) ----------------------------------------------

ต่อไปนี้คือ ลำดับเหตุการณ์แบบผู้ใช้จริง (Flow)

1️⃣ ผู้ใช้เปิดหน้า Overview
     └─ โหลด Navbar + Map + Task Panel
2️⃣ ผู้ใช้สามารถย่อ Navbar ได้ (เปลี่ยน state collapsed)
3️⃣ ผู้ใช้คลิก “Filter” เพื่อกรองข้อมูลบนแผนที่
     └─ เปิด ComplaintFilterBar
     └─ ถ้าคลิก “กำหนดเอง” → เปิด DatePicker
4️⃣ ผู้ใช้กด “แจ้งเตือนเหตุฉุกเฉิน”
     └─ เปิด EmergencyNotifier Modal
     └─ พิมพ์ข้อมูล แล้วกด “ร่างตัวอย่าง” → แสดง preview ทางขวา
5️⃣ ผู้ใช้ดูรายการร้องเรียนใน Task Panel
     └─ สามารถพับ/ขยาย panel ด้วยลูกศร
     └─ คลิกการ์ด → เปลี่ยนเป็นหน้ารายละเอียด (PreviewPanal)
     └─ คลิก X ใน Preview → กลับไปหน้ารายการ
6️⃣ การเปลี่ยน layout ทั้งหมดเป็น responsive
     └─ ปรับความกว้างตามจอ (ผ่าน useMediaQuery)

---------------------------------------------- 🧩 5. สรุป Flow Diagram (Text-based) ----------------------------------------------
[HomePage]
 ├── Navbar  ←→ setCollapsed()
 ├── ComplaintMap
 │     ├── ComplaintOverview + ProblemChart
 │     ├── ComplaintFilterBar → ComplaintDatePicker
 │     └── EmergencyNotifier (Left + Right)
 └── TaskPanel
       ├── TaskSummary → SetCloseTask()
       ├── TaskBoard → setSelectedCard(card)
       └── PreviewPanal ← selectedCard
------------------------------------------------------------------------------------------------------------------------------------------