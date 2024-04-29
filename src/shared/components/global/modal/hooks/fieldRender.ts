import { useCallback, useState } from 'react'
import { IField, IFieldProps } from '../interfaces/Field'
import { IFormData, IModalLiveDataCondition, IModalRenderCondition, IWachEvent } from '../interfaces/Modal'
import { IOption } from '@interfaces/global/Option'

export interface IFieldRender {
  render: boolean;
  enable: boolean;
  evaluateCondition: (conditionType: keyof Pick<IField, 'renderIf' | 'enableIf'>, formData: IFormData, name?: string) => void;
  checkField: (formData: IFormData, watchEvent: IWachEvent) => void;
  liveData?: Array<IOption>
  liveSearching?: boolean;
}

export interface IFieldRenderProps extends Pick<IFieldProps, 'setValue'> {
  element: Partial<Pick<IField, 'enableIf'|'renderIf'|'name' >> & Partial<Record<'liveData', IModalLiveDataCondition>>
}

export const useFieldRender = ({ element, setValue }: IFieldRenderProps): IFieldRender => {
  const [render, setRender] = useState<boolean>(element.renderIf === undefined)
  const [enable, setEnable] = useState<boolean>(element.enableIf === undefined)
  const [liveSearching, setLiveSearching] = useState<boolean>(false)
  const [liveData, setLiveData] = useState<IOption[] | undefined>(undefined)

  const evaluateCondition = useCallback(
    (conditionType: keyof Pick<IField, 'renderIf'|'enableIf'>, formData: IFormData, name?: string) => {
      if (!name) return
      if (conditionType === 'renderIf' && render) return
      if (conditionType === 'enableIf' && enable) return
      if (!element[conditionType]) return
      if (element[conditionType] && Object.keys(element[conditionType] as object).length === 0) return

      const conditionList: Array<string> = Object.keys(element[conditionType] as object)
      const targetField: string = formData[name]

      if (conditionList.includes(name)) {
        const status: boolean = (element[conditionType] as IModalRenderCondition)[name].includes(targetField)
        if (conditionType === 'renderIf') setRender(status)
        if (conditionType === 'enableIf') setEnable(status)
      }
    }, [element, enable, render, setRender, setEnable])

  const liveDataAction = useCallback(
    async (field: string | Array<any>, formData: IFormData) => {
      if (typeof field === 'string' && element.liveData?.action) {
        const options = element.liveData.action(field, formData)
        return options ?? []
      }
      return [] as IOption[]
    }, [element.liveData]
  )

  const checkField = useCallback(
    async (formData: IFormData, { name }: IWachEvent) => {
      if (!name) return
      const targetField: string = formData[name]

      if (element?.liveData && name === element.liveData?.condition) {
        if (targetField) {
          setLiveSearching(true)
          const options: Array<IOption> = await liveDataAction(targetField, formData)
          if (liveData && JSON.stringify(liveData) !== JSON.stringify(options)) { setValue(element.name as string, options) }
          setLiveData(options)
          setLiveSearching(false)
        }
      }
    }, [element.liveData, element.name, liveData, liveDataAction, setValue]
  )

  return {
    render,
    enable,
    checkField,
    liveData,
    liveSearching,
    evaluateCondition
  }
}
