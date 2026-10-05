import { describe, test, expect, vi } from 'vitest';
import { logger } from '../../src/middleware/logger.js';
import { errorHandler } from '../../src/middleware/errorHandler.js';

describe('Middleware Unit Tests (Logger & ErrorHandler)', () => {
  
  test('logger middleware ควรทำงานและเรียก next()', () => {
    const req = { method: 'GET', originalUrl: '/test', ip: '127.0.0.1' };
    const res = { 
      statusCode: 200, 
      on: vi.fn((event, callback) => {
        if (event === 'finish') callback(); // จำลองเหตุการณ์ finish ทันที
      }) 
    };
    const next = vi.fn();

    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('errorHandler middleware ควรจัดการ error และตอบกลับ 500 หรือตามสถานะ', () => {
    const err = new Error('Test Error');
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

});