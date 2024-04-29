import { IModalConfigLoader, IModalConfigProps } from '../interfaces/Modal'
import { IOption } from '@interfaces/global/Option'
import { IConfigurationFile } from '@interfaces/model/configurations/Configurations'

export interface DefaultConfigurationProps extends Partial<Omit<IConfigurationFile, 'configStatus'>> {
  configStatus?: string;
  fileList: Array<IOption>;
}

export interface IModalConfigurationResult {
  configId?: string;
  fileId: string;
  fileTime?: string;
  order: number;
}

export interface IUserModal {
  'default': IModalConfigLoader<DefaultConfigurationProps, IModalConfigurationResult>;
  'state': IModalConfigLoader<IConfigurationFile, IConfigurationFile>;
}

const configurationModal: IUserModal = {
  default: ({ configId, ...props }, action): IModalConfigProps => {
    const modalAction: string = !configId ? 'Create' : 'Update'
    const config: IModalConfigProps = {
      reservedData: {
        configId
      },
      fields: [
        {
          elementType: 'select',
          label: 'File',
          defaultValue: props.file?.fileId ? props.file?.fileId : '',
          name: 'fileId',
          options: props.fileList,
          validation: {
            required: true,
            message: 'File is required'
          }
        },
        {
          elementType: 'input',
          type: 'text',
          label: 'File time',
          defaultValue: props.fileTime,
          placeHolder: 'hh:mm:ss',
          name: 'fileTime',
          validation: {
            required: false,
            regex: /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
            message: 'Invalid file time'
          }
        },
        {
          elementType: 'input',
          label: 'Order',
          type: 'number',
          defaultValue: props.order ? props.order.toString() : '',
          name: 'order',
          validation: {
            required: true,
            regex: /^[1-9]\d*$/,
            message: 'order is invalid'
          }
        }

      ],
      title: `${modalAction} configuration file`,
      action: {
        name: `${modalAction}`,
        action
      },
      cancel: {
        name: 'Cancel'
      }
    }
    if (configId) delete config.fields[3]
    return config
  },
  state: (props, action): IModalConfigProps => {
    return {
      reservedData: {
        ...props
      },
      fields: [
        {
          elementType: 'text',
          text: `Are you sure you want to update configuration file`,
          name: 'configStatus',
          validation: {
            required: false
          }
        }
      ],
      title: `Update configuration file`,
      action: {
        name: 'Update',
        action
      },
      cancel: { name: 'Cancel' }
    }
  }

}

export default configurationModal
