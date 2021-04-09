import React from 'react';
import { ReactComponent as UploadPlaceholder } from 'core/assets/images/upload-placeholder.svg';
import './styles.scss';

const ImageUpload = () => {
    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input 
                        type="file"
                        id="upload"
                        hidden
                    />
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    As imagens devem ser JPG ou PNG e não devem ultrapassar <strong>5 MB</strong>.
                </small>
            </div>
            <div className="col-6">
                <UploadPlaceholder/>
            </div>
           
        </div>
    )
}

export default ImageUpload