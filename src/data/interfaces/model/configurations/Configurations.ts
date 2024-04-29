import { IFile } from '../files/Files'
import { IScreen } from '../screens/Screens'

export interface IConfigurationFile {
  configId: string;
  fileRepeat: boolean;
  configStatus: boolean;
  fileTime: string;
  order: number;
  file: IFile
}

export type ICreateConfiguration = Pick<IConfigurationFile, 'configStatus' | 'order'> & {
  fileId: string;
  fileTime?: string;
}

export type IUpdateConfiguration = Partial<ICreateConfiguration>;

export interface IConfigurationSocketResponse extends Pick<IScreen, 'screenId'> {
  config: IConfigurationFile;
  isDelete?: boolean;
}

export type IConfigurationStorage = {
  state: boolean;
  errorCounter: number;
  screenId: string;
  list: Map<string, IConfigurationFile>;
}

export interface IConfigurationFilesModel {
  ConfigurationFilesStorage: IConfigurationStorage;
  createConfiguration: (config: ICreateConfiguration) => Promise<void>;
  readConfiguration: (screenId: string) => Promise<void>;
  updateConfiguration: (configId: string, config: IUpdateConfiguration) => Promise<void>;
  updateConfigurationState: (configId: string, configStatus: boolean) => Promise<void>
  deleteConfiguration: (configId: string) => Promise<void>;
  clenaStorage: () => void;
}
