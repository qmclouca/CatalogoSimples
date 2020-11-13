import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { makeRequest } from './../../../../../core/utils/request';


type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: 'Computador',
        price: '',
        category: 'eletrônicos',
        description: ''
    });
    
    
    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setFormData(data => ({ ...data, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://static.netshoes.com.br/produtos/console-playstation-5-ps5-sony/14/D32-2445-014/D32-2445-014_zoom1.jpg?ts=1602777382&ims=544x',
            categories: [{id : formData.category}]
        }
       makeRequest({url:'/products', method:'POST', data:payload})
        .then(() => {
            setFormData({name: '', category: '', price: '', description: ''});
        });
    }


    return (
        <form onSubmit={handleSubmit}>
        <BaseForm title="CADASTRAR UM PRODUTO">
            
            <div className = "row">
                <div className="col-6">
                    <input 
                    value={formData.name}
                    name="name"
                    type="text" 
                    className="form-control mb-5"
                    onChange={handleOnChange}
                    placeholder="Nome do Produto"
                    />
                    <select
                        value={formData.category}
                        className="form-control mb-5" onChange={handleOnChange}
                        name="category"
                    >
                        <option value="1">Livros</option>
                        <option value="3">Computadores</option>
                        <option value="2">Eletrônicos</option>
                    </select>
                    <input 
                    name="price"
                    value={formData.price}
                    type="text" 
                    className="form-control"
                    onChange={handleOnChange}
                    placeholder="Preço"
                    />
                </div>
                <div className="col-6">
                    <textarea  
                        name="description"
                        value={formData.description} 
                        onChange={handleOnChange}
                        className="form-control"
                        cols={30} 
                        rows={10} 
                    />
                </div>
            </div>
        </BaseForm>
        </form>
    )
}

export default Form;