import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import ModalButtons from './ModalButtons'

const UploadImageViewer = ({ file }: any) => {
  const [upImg, setUpImg] = useState<any>()
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState<any>({ unit: '%', width: 20, aspect: 16 / 9 })
  const [completedCrop, setCompletedCrop] = useState<any>(null)

  const onSend = () => {
    alert('work suka')
    // dispatch(fetchUpdateAvatar())
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    const reader = new FileReader()
    reader.addEventListener('load', () => setUpImg(reader?.result))
    reader.readAsDataURL(file)
  }, [file])

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image: any = imgRef.current
    const canvas: any = previewCanvasRef.current
    const crop: any = completedCrop

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio

    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )
  }, [completedCrop])

  return (
    <>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
      <ModalButtons successBtn={onSend} />
    </>
  )
}

export default UploadImageViewer
