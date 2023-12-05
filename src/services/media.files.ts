/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import createDebug from 'debug';
import { ImgData } from '../types/img.data.js';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('FP:media-files')

export class MediaFiles {
  constructor() {
    cloudinary.config({
      // eslint-disable-next-line camelcase
      cloud_name:'drv1kbmgi' ,
      api_key: '682145767354333' ,
      api_secret: 'ltzrN2IoZT3hMFcHJShLAn3YyFI' ,

      secure: true, 
    });
    debug('Instance created')
  }

  async uploadImage(imagePath: string) {
    try {
      const uploadApiResponse = await cloudinary.uploader.upload(imagePath, {
      use_filename: true,
      unique_filename: false,
      overwrite: true
   });

      const imgData: ImgData = {
        url: uploadApiResponse.url,
        publicId: uploadApiResponse.public_id,
        size: uploadApiResponse.bytes,
        height: uploadApiResponse.height,
        width: uploadApiResponse.width,
        format: uploadApiResponse.format
      }
      return imgData;
   } catch (err) {
      const error = (err as {error: Error}).error as Error
      throw new HttpError(406, 'Not Acceptable', error.message);
    }
  }
}
