// constants
import { PICTURE_ACCEPTED_UPLOAD_MIME } from "../constants"

// image size limit for user uploads
export const forceImageRestrictions = (size, type, max = 10) => {
  let correctFileType = false
  PICTURE_ACCEPTED_UPLOAD_MIME.forEach(acceptedFiletype => {
    if (acceptedFiletype === type) correctFileType = true
  })
  return new Promise((resolve, reject) => {
    if (size / 1000000 <= max && correctFileType) resolve()
    else reject()
  })
}
