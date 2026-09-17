import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';
import { authenticateAdmin } from '../middleware/auth.middleware';
import {
  createSuccessResponse,
  createBadRequestResponse,
  createFailureResponse,
} from '../utils/response-helpers';
import { HTTP_STATUS } from '../types/http-status';
import { ERROR_CODES } from '../types/error-codes';

// Configure Cloudinary if credentials are present
if (
  config.cloudinary.cloudName &&
  config.cloudinary.apiKey &&
  config.cloudinary.apiSecret
) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true,
  });
}

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB maximum
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP, AVIF) are allowed'));
    }
  },
});

export function createUploadRoutes(): Router {
  const router = Router();

  router.post(
    '/',
    authenticateAdmin,
    (req: Request, res: Response, next: NextFunction): void => {
      upload.single('file')(req, res, (err: unknown) => {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            res
              .status(HTTP_STATUS.BAD_REQUEST)
              .json(createBadRequestResponse('Image file size exceeds 10MB limit'));
            return;
          }
          res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json(createBadRequestResponse(err.message));
          return;
        } else if (err instanceof Error) {
          res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json(createBadRequestResponse(err.message));
          return;
        }
        next();
      });
    },
    async (req: Request, res: Response): Promise<void> => {
      const file = req.file;
      if (!file) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(createBadRequestResponse('No image file provided in request'));
        return;
      }

      // Check Cloudinary configuration
      if (
        !config.cloudinary.cloudName ||
        !config.cloudinary.apiKey ||
        !config.cloudinary.apiSecret
      ) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
          createFailureResponse(
            'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in server/.env, or paste an image URL directly.',
            ERROR_CODES.SERVER_ERROR
          )
        );
        return;
      }

      try {
        const folder = (req.query['folder'] as string) || 'infinite7_impex/categories';

        const uploadPromise = new Promise<{ secure_url: string; public_id: string }>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder,
                resource_type: 'image',
              },
              (error, result) => {
                if (error || !result) {
                  reject(error || new Error('Upload to Cloudinary failed'));
                } else {
                  resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                  });
                }
              }
            );
            stream.end(file.buffer);
          }
        );

        const result = await uploadPromise;

        res.status(HTTP_STATUS.OK).json(
          createSuccessResponse(
            {
              url: result.secure_url,
              publicId: result.public_id,
            },
            'Image uploaded successfully'
          )
        );
      } catch (uploadError) {
        const message =
          uploadError instanceof Error
            ? uploadError.message
            : 'Failed to upload image to Cloudinary';
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json(createFailureResponse(message, ERROR_CODES.SERVER_ERROR));
      }
    }
  );

  return router;
}
