const fs = require('fs').promises;
const path = require('path');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

const uploadDir = path.join(process.cwd(), 'uploads');

const ensureUploadDir = async () => {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
    logger.info('Created uploads directory');
  }
};

const uploadFile = async (fileBuffer, fileName, mimeType) => {
  try {
    await ensureUploadDir();
    
    const uniqueFileName = `${Date.now()}_${fileName}`;
    const filePath = path.join(uploadDir, uniqueFileName);
    
    await fs.writeFile(filePath, fileBuffer);
    
    const fileUrl = `/uploads/${uniqueFileName}`;
    logger.info(`File saved locally: ${fileUrl}`);
    
    return fileUrl;
  } catch (error) {
    logger.error('Local file upload error:', error);
    throw new ApiError(500, `File upload failed: ${error.message}`);
  }
};

const deleteFile = async (fileName) => {
  try {
    const filePath = path.join(uploadDir, fileName);
    await fs.unlink(filePath);
    logger.info(`File deleted: ${fileName}`);
  } catch (error) {
    logger.error('File deletion failed:', error);
  }
};

module.exports = { uploadFile, deleteFile };