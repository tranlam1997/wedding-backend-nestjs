// require('dotenv').config() dung cai nay neu su dung process.env.XXX
import fs from 'fs'
import S3 from 'aws-sdk/clients/s3'

export const bucketName = "springsocialstorage"
const region = "ap-southeast-1"
const accessKeyId = "AKIAVA2D7TWXKTZIUH5T"
const secretAccessKey = "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"

export const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
export function uploadFile(file: { path: fs.PathLike; filename: any }) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }

  return s3.upload(uploadParams).promise()
}

// uploads a file to s3
export function uploadBuffer(buffer: any, key: any) {
  const uploadParams = {
    Bucket: bucketName,
    Body: buffer,
    Key: key,
  }

  return s3.upload(uploadParams).promise()
}
// uploads a file to s3
export function uploadBufferImageBase64(buffer: any, key: any) {
  const uploadParams = {
    Bucket: bucketName,
    Body: buffer,
    Key: key,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  }

  return s3.upload(uploadParams).promise()
}

// downloads a file from s3
export function getFileStream(fileKey: any) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
