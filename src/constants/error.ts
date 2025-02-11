export const ERROR_CODES = {
    VALIDATION: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    SERVER_ERROR: 'SERVER_ERROR',
    CLIENT_ERROR: 'CLIENT_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    NOT_FOUND: 'NOT_FOUND',
} as const;

export const ERROR_MESSAGES = {
    VALIDATION: 'ข้อมูลไม่ถูกต้อง',
    UNAUTHORIZED: 'กรุณาเข้าสู่ระบบใหม่',
    FORBIDDEN: 'คุณไม่มีสิทธิ์เข้าถึง',
    SERVER_ERROR: 'เกิดข้อผิดพลาดจากระบบ กรุณาลองใหม่อีกครั้ง',
    CLIENT_ERROR: 'เกิดข้อผิดพลาด',
    UNKNOWN_ERROR: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
    NETWORK_ERROR: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อ',
    NOT_FOUND: 'ไม่พบข้อมูลที่ต้องการ',
} as const;