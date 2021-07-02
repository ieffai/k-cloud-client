import axios from "axios";
import { hideLoader, showLoader } from "../reducers/appReducer";
import { addFile, deleteFileAction, setFiles } from "../reducers/fileReducer";
import { addUploadFile, changeUploadFile, showUploader } from "../reducers/uploadReducer";
import { API_URL } from "../config";
import { getUser } from "./user";

const api = axios.create({
    baseURL: 'http://localhost:5000/api/files',
       
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    
});
  
  
export function getFiles(dirId, sort) {

    return async dispatch => {
        try {
            dispatch(showLoader());
            let path = '';
            if (dirId) {
                path = `?parent=${dirId}`
            }
            if (sort) {
                path = `?sort=${sort}`
            }
            if (dirId && sort) {
                path = `?parent=${dirId}&sort=${sort}`
            }
            
            const response = await axios.get(`${API_URL}api/files/${path}`, 
                {    
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                }
            );
            dispatch(setFiles(response.data));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(hideLoader());
        }
    }
}
export function createDir(dirId, name) {
    return async dispatch => {
        try {
           const response = await axios.post(`${API_URL}api/files/`,
                {
                    name,
                    parent: dirId,
                    type: 'dir'
                },
                {    
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                },
            );
           dispatch(addFile(response.data));
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    
}
export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {name: file.name, progress: 0, id: Date.now()};
            dispatch(showUploader());
            dispatch(addUploadFile(uploadFile));
           const response = await axios.post(`${API_URL}api/files/upload`,
                formData,  
                {    
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                },       
                {
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable 
                        ? progressEvent.total 
                        : progressEvent.target.getResponseHeader('content-length') 
                        || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        if (totalLength) {
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                            dispatch(changeUploadFile(uploadFile));
                        }
                    }
                }
            );
           dispatch(addFile(response.data));
           dispatch(getUser());
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    
}

export async function downloadFile(file) {
    api.get(`/download/?id=${file._id}`, {
        responseType: 'blob'
      })
      .then(data => {
            const blob = data.data;
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove()
        }).catch(e => console.log(e));

}
export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await api.delete(`?id=${file._id}`);
            dispatch(deleteFileAction(file._id));
            dispatch(getUser());
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
}
export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/files/search?search=${search}`,
            {    
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            }
            );
            dispatch(setFiles(response.data));
        } catch (error) {
            alert(error?.response?.data?.message);
        } finally {
            dispatch(hideLoader());
        }
    }
}
