import { createSlice } from '@reduxjs/toolkit';

export interface FileStatus {
  fileInfo: {
    name: string;
    size: number;
    // Add any other relevant file information here
  };
  status: string; 
  abortController: AbortController;
}

export interface FileStatusState {
  fileStatusList: FileStatus[];
}

const initialState: FileStatusState = {
  fileStatusList: [],
};

const fileStatusSlice = createSlice({
  name: 'fileStatus',
  initialState,
  reducers: {
    addFileStatus: (state, action) => {
      const { fileInfo, status, abortController } = action.payload;
      const existingFileIndex = state.fileStatusList.findIndex((item) =>
        item.fileInfo ? item.fileInfo.name === fileInfo.name : false
      );
      if (existingFileIndex !== -1) {
        // Update the existing entry
        state.fileStatusList[existingFileIndex].status = status;
        state.fileStatusList[existingFileIndex].abortController = abortController;

      } else {
        // Add a new entry
        state.fileStatusList.push({ fileInfo: fileInfo, status, abortController });
      }
    },
    clearFileStatus: (state) => {
      state.fileStatusList = [];
    },
  },
  
});

export const { addFileStatus, clearFileStatus } = fileStatusSlice.actions;
export default fileStatusSlice.reducer;
