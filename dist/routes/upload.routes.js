"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadRoutes = createUploadRoutes;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config");
const auth_middleware_1 = require("../middleware/auth.middleware");
const response_helpers_1 = require("../utils/response-helpers");
const http_status_1 = require("../types/http-status");
const error_codes_1 = require("../types/error-codes");
// Configure Cloudinary if credentials are present
if (config_1.config.cloudinary.cloudName &&
    config_1.config.cloudinary.apiKey &&
    config_1.config.cloudinary.apiSecret) {
    cloudinary_1.v2.config({
        cloud_name: config_1.config.cloudinary.cloudName,
        api_key: config_1.config.cloudinary.apiKey,
        api_secret: config_1.config.cloudinary.apiSecret,
        secure: true,
    });
}
// Multer memory storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB maximum
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files (JPEG, PNG, WebP, AVIF) are allowed'));
        }
    },
});
function createUploadRoutes() {
    const router = (0, express_1.Router)();
    router.post('/', auth_middleware_1.authenticateAdmin, (req, res, next) => {
        upload.single('file')(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res
                        .status(http_status_1.HTTP_STATUS.BAD_REQUEST)
                        .json((0, response_helpers_1.createBadRequestResponse)('Image file size exceeds 5MB limit'));
                    return;
                }
                res
                    .status(http_status_1.HTTP_STATUS.BAD_REQUEST)
                    .json((0, response_helpers_1.createBadRequestResponse)(err.message));
                return;
            }
            else if (err instanceof Error) {
                res
                    .status(http_status_1.HTTP_STATUS.BAD_REQUEST)
                    .json((0, response_helpers_1.createBadRequestResponse)(err.message));
                return;
            }
            next();
        });
    }, async (req, res) => {
        const file = req.file;
        if (!file) {
            res
                .status(http_status_1.HTTP_STATUS.BAD_REQUEST)
                .json((0, response_helpers_1.createBadRequestResponse)('No image file provided in request'));
            return;
        }
        // Configure Cloudinary
        cloudinary_1.v2.config({
            cloud_name: config_1.config.cloudinary.cloudName,
            api_key: config_1.config.cloudinary.apiKey,
            api_secret: config_1.config.cloudinary.apiSecret,
            secure: true,
        });
        try {
            const folder = req.query['folder'] || 'infinite7_impex/categories';
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream({
                    folder,
                    resource_type: 'image',
                }, (error, result) => {
                    if (error || !result) {
                        reject(error || new Error('Upload to Cloudinary failed'));
                    }
                    else {
                        resolve({
                            secure_url: result.secure_url,
                            public_id: result.public_id,
                        });
                    }
                });
                stream.end(file.buffer);
            });
            const result = await uploadPromise;
            res.status(http_status_1.HTTP_STATUS.OK).json((0, response_helpers_1.createSuccessResponse)({
                url: result.secure_url,
                publicId: result.public_id,
            }, 'Image uploaded successfully'));
        }
        catch (uploadError) {
            console.error('Cloudinary upload error details:', uploadError);
            const message = uploadError?.message ||
                (uploadError instanceof Error ? uploadError.message : 'Failed to upload image to Cloudinary');
            res
                .status(http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json((0, response_helpers_1.createFailureResponse)(message, error_codes_1.ERROR_CODES.SERVER_ERROR));
        }
    });
    return router;
}
//# sourceMappingURL=upload.routes.js.map