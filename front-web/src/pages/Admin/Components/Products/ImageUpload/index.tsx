import React from 'react';
import { ReactComponent as UploadPlaceholder } from 'core/assets/images/upload-placeholder.svg';
import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';

const ImageUpload = () => {
    const uploadImage = (selectedImage: File) => {
        //montar o form data
        const payload = new FormData();
        payload.append('file', selectedImage)
        makePrivateRequest({
            url:'/products/image', 
            method: 'POST',
            data: payload
        })
        .then(() => {
            console.log('arquivo enviado com sucesso');
        })
        .catch(() => {
            console.log('Erro ao enviar arquivo');
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];
       
        if (selectedImage) {
            //upload image
            uploadImage(selectedImage);
        }
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input 
                        type="file"
                        id="upload"
                        accept="image/png, image/jpeg"
                        onChange={handleChange}
                        hidden
                    />
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    As imagens devem ser JPG ou PNG e não devem ultrapassar <strong>5 MB</strong>.
                </small>
            </div>
            <div className="col-6 upload-placeholder">
                <UploadPlaceholder/>
                <div className="upload-progress-container">
                    <div className="upload-progress">

                    </div>

                </div>
            </div>
           
        </div>
    )
}

export default ImageUpload