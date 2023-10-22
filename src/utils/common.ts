import Cropper from 'cropperjs'
import { isEmpty, isNull, isString, isUndefined, pickBy } from 'lodash-es'
import type { FilterNegativeQueryOptions } from '@/types'

export function isExternalLink(url: string) {
  const pattern = /^(https?:\/\/)/i
  return pattern.test(url)
}

export function isBlank(value: unknown) {
  return isString(value) && isEmpty(value)
}

export function objToQueryStr(obj: object) {
  const queryStr = new URLSearchParams()
  for (const key in obj)
    queryStr.append(key, obj[key as keyof object])
  return `${queryStr.toString()}`
}

export function filterNegativeQuery<T extends Record<string, any>>(obj: T, options?: FilterNegativeQueryOptions<T>) {
  const defaultOptions: FilterNegativeQueryOptions<T> = { empty: true }
  options = { ...defaultOptions, ...options }
  let newObj: Partial<T> = { ...obj }
  if (options.blank || options.empty)
    newObj = pickBy(newObj, (val, k) => options!.excludes?.includes(k) || !isBlank(val)) as Partial<T>
  if (options.null || options.empty)
    newObj = pickBy(newObj, (val, k) => options!.excludes?.includes(k) || !isNull(val)) as Partial<T>
  if (options.undef || options.empty)
    newObj = pickBy(newObj, (val, k) => options!.excludes?.includes(k) || !isUndefined(val)) as Partial<T>
  return newObj
}

/* 裁剪图片 */
export function cropImage(file: File, options?: { style: Partial<CSSStyleDeclaration> }): Promise<File | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.src = url
    img.onload = async () => {
      window.$dialog.create({
        title: '裁剪头像',
        showIcon: false,
        autoFocus: false,
        content: () => h(
          'div',
          { class: 'image__cropper', style: { width: '420px', height: '420px', ...options?.style } as CSSStyleDeclaration },
        ),
        style: { width: 'auto' },
        negativeText: '取消',
        positiveText: '确认',
        onPositiveClick: handleCommitCrop,
        onNegativeClick: () => resolve(null),
      })
      await nextTick()
      const el = document.querySelector('.image__cropper')
      el?.appendChild(img)
      const cropper = new Cropper(img, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        background: false,
        movable: false,
        zoomable: false,
        minCropBoxWidth: 60,
        minCropBoxHeight: 60,
      })
      function handleCommitCrop() {
        cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(new File([blob!], file!.name, { ...file, type: blob!.type }))
        })
      }
    }
  })
}
