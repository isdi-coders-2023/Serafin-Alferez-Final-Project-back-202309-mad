import { Request, Response } from 'express';

import multer from 'multer';
import { FileInterceptor } from './file.interceptor';

jest.mock('multer');
describe('Given...', () => {
  // Given
  const midlewareMock = jest.fn();
  const single = jest.fn().mockReturnValue(midlewareMock);
  multer.diskStorage = jest
    .fn()
    .mockImplementation(({ filename }) => filename('', '', () => {}));
  (multer as unknown as jest.Mock).mockReturnValue({ single });

  describe('When we instantiate', () => {
    const interceptor = new FileInterceptor();
    // When

    test('Then it should be...', () => {
      interceptor.singleFileStore()({} as Request, {} as Response, jest.fn());
      expect(multer.diskStorage).toHaveBeenCalled();
      expect(single).toHaveBeenCalled();
      expect(midlewareMock).toHaveBeenCalled();

      // Then
    });
  });
});
