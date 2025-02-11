# Community Application

## การติดตั้งและการใช้งาน

1. Clone โปรเจค
```bash
git clone <repository-url>
cd <project-directory>
```

2. ติดตั้ง Dependencies
```bash
npm install
# หรือ
yarn install
```

3. ตั้งค่า Environment Variables
สร้างไฟล์ `.env.local` และกำหนดค่าต่างๆ ดังนี้:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5002
```

4. รันโปรเจคในโหมด Development
```bash
npm run dev
# หรือ
yarn dev
```

## โครงสร้างโปรเจค (Project Structure)

โปรเจคถูกแบ่งออกเป็นโฟลเดอร์หลักๆ ดังนี้:

### `app/`
- โฟลเดอร์หลักของ Next.js 13+ App Router
- จัดการ Routing และ Layout หลักของแอพพลิเคชั่น
- ประกอบด้วย:
  - `page.tsx`: หน้าหลักของแอพ
  - `providers.tsx`: Global providers (React Query, Theme, etc.)

### `components/`
- เก็บ React Components ทั้งหมดของแอพพลิเคชั่น
- แบ่งเป็นหมวดหมู่:
  - `common/`: Components ที่ใช้ซ้ำได้ทั่วไป (buttons, inputs, modals)
  - `layout/`: Components สำหรับ layout (AuthGuard, MainLayout)
  - Feature-specific components: Components เฉพาะสำหรับแต่ละฟีเจอร์

### `constants/`
- เก็บค่าคงที่ต่างๆ ที่ใช้ในแอพพลิเคชั่น
- ตัวอย่างเช่น:
  - API endpoints
  - Error codes
  - Route paths
  - Configuration values

###  `hooks/`
- Custom React Hooks สำหรับ logic ที่ใช้ซ้ำ
- ประกอบด้วย:
  - Authentication hooks
  - Data fetching hooks (React Query)
  - Utility hooks (useDebounce, useBreakpoint)
  - Error handling hooks

### `modules/`
- แยกโค้ดตาม Business Domains
- แต่ละ module ประกอบด้วย:
  - Components เฉพาะของ module
  - Hooks เฉพาะของ module
  - Logic ที่เกี่ยวข้อง
- ช่วยให้โค้ดเป็นระเบียบและ scale ได้ดี

### `services/`
- จัดการการเชื่อมต่อกับ Backend APIs
- แยกตาม Domain:
  - `auth.service.ts`: Authentication endpoints
  - `post.service.ts`: Post-related endpoints
  - `comment.service.ts`: Comment-related endpoints
- ใช้ Axios สำหรับ HTTP requests

###  `stores/`
- จัดการ Global State ด้วย Zustand
- แยกเป็น stores ต่างๆ:
  - `authStore.ts`: Authentication state
  - `modalStore.ts`: Modal management
  - `searchStore.ts`: Search-related state

### `types/`
- TypeScript type definitions
- ประกอบด้วย:
  - API Request/Response types
  - Common interfaces
  - Utility types

###  `utils/`
- Utility functions ที่ใช้ทั่วทั้งแอพ
- ตัวอย่างเช่น:
  - Error handling
  - String formatting
  - Class name utilities


## สถาปัตยกรรมของแอปพลิเคชัน

แอปพลิเคชันถูกพัฒนาด้วย Next.js และมีการจัดโครงสร้างดังนี้:

### โครงสร้างหลัก
- **Services Layer**: จัดการการเรียก API และการติดต่อกับ Backend
  - ใช้ Axios สำหรับการทำ HTTP requests
  - มีการจัดการ Interceptors สำหรับการจัดการ Authentication
  - แยก Service ตาม Domain (auth, post, comment, community)

- **State Management**:
  - ใช้ Zustand สำหรับการจัดการ Global State
  - มีการจัดเก็บข้อมูล Authentication ใน Local Storage
  - ใช้ React Query สำหรับการจัดการ Server State

- **Error Handling**:
  - มีระบบจัดการ Error แบบรวมศูนย์
  - แยกประเภท Error ตามรหัส HTTP Status
  - มีการแสดงผล Error ผ่าน Toast notifications

### Custom Hooks
1. `useCheckAuth`: จัดการการตรวจสอบสถานะการ Authentication
2. `useDebounce`: จัดการการหน่วงเวลาสำหรับการ Search
3. `useBreakpoint`: จัดการ Responsive Design
4. `useErrorHandler`: จัดการ Error handling แบบรวมศูนย์
5. `usePostManagement`: จัดการการทำงานเกี่ยวกับโพสต์

## Libraries และ Packages ที่ใช้

### Core Libraries
- **Next.js**: Framework หลักในการพัฒนา
- **React**: Library สำหรับสร้าง UI
- **TypeScript**: ใช้สำหรับเพิ่ม Type Safety

### State Management
- **Zustand**: จัดการ Global State
  - ง่ายต่อการใช้งาน
  - รองรับ TypeScript
  - มี Middleware สำหรับจัดการ Persistence

- **@tanstack/react-query**: จัดการ Server State และ Caching
    - Cache ข้อมูลแบบอัตโนมัติโดยใช้ Query Key
    - กำหนดเวลา Cache ได้ผ่าน staleTime และ cacheTime
    - ลดการเรียก API ซ้ำๆ โดยใช้ข้อมูลจาก Cache
    - รองรับการ Invalidate Cache เมื่อข้อมูลมีการอัพเดท
  
  - **การจัดการ Background Updates**:
    - Auto-refetching เมื่อ User กลับมาที่แท็บ
    - Polling อัตโนมัติ (refetchInterval)
    - Retry และ Error Boundaries อัตโนมัติ

### UI และ Styling
- **Tailwind CSS**: CSS Framework
  - ใช้สำหรับ Responsive Design
  - Utility-first CSS

- **DaisyUI**: Component Library สำหรับ Tailwind CSS
  - ให้ Components พื้นฐานที่สวยงาม
  - มี Theme system ในตัว
  - ลดเวลาในการเขียน CSS
  - Customizable ได้ง่าย

- **react-toastify**: แสดง Notifications
  - ใช้แสดง Success/Error messages
  - Customizable

### Type Checking
- **TypeScript**: เพิ่มความปลอดภัยในการเขียนโค้ด
  - Type Safety
  - Better IDE Support
  - Enhanced Code Documentation

## การจัดการ Authentication

ระบบ Authentication ใช้ JWT Token โดย:
1. เก็บ Token ใน Zustand Store และ Local Storage
2. ใช้ Axios Interceptor เพื่อแนบ Token ในทุก Request
3. มีระบบตรวจสอบ Token และ Redirect อัตโนมัติ
4. รองรับการ Logout และล้าง Cache