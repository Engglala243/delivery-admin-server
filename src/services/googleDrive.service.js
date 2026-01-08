const { drive } = require('../config/googleDrive');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

const uploadFile = async (fileBuffer, fileName, mimeType) => {
  try {
    // Check if Google Drive is configured
    if (!process.env.GOOGLE_DRIVE_REFRESH_TOKEN || process.env.GOOGLE_DRIVE_REFRESH_TOKEN === 'YOUR_REFRESH_TOKEN_HERE') {
      throw new ApiError(500, 'Google Drive not configured. Please set GOOGLE_DRIVE_REFRESH_TOKEN in .env file');
    }
    
    if (!process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.GOOGLE_DRIVE_FOLDER_ID === 'YOUR_FOLDER_ID_HERE') {
      throw new ApiError(500, 'Google Drive folder not configured. Please set GOOGLE_DRIVE_FOLDER_ID in .env file');
    }

    logger.info(`Uploading file: ${fileName}`);
    
    const response = await drive.files.create({
      requestBody: {
        name: `${Date.now()}_${fileName}`,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
      },
      media: {
        mimeType,
        body: fileBuffer
      }
    });

    // Make file publicly accessible
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;
    logger.info(`File uploaded successfully: ${fileUrl}`);
    
    return fileUrl;
  } catch (error) {
    logger.error('Google Drive upload error:', error);
    
    if (error.statusCode) {
      throw error; // Re-throw ApiError
    }
    
    if (error.message.includes('invalid_grant')) {
      throw new ApiError(500, 'Google Drive authentication failed. Please check refresh token.');
    }
    
    if (error.message.includes('File not found')) {
      throw new ApiError(500, 'Google Drive folder not found. Please check folder ID.');
    }
    
    throw new ApiError(500, `File upload failed: ${error.message}`);
  }
};

const deleteFile = async (fileId) => {
  try {
    await drive.files.delete({ fileId });
    logger.info(`File deleted: ${fileId}`);
  } catch (error) {
    logger.error('File deletion failed:', error);
    throw new ApiError(500, 'File deletion failed');
  }
};

module.exports = { uploadFile, deleteFile };