import { useState, useEffect } from 'react'
import styled from 'styled-components'
import './transaction.css'
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
`;

const HelperContainer = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #6e37f0;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const Transaction = ({accessToken}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date_time_transaction: '',
    title: '',
    amount: 0.0,
    origin_financial_entity: '',
    origin_name: '',
    origin_account: '',
    receipt_number: '',
  });

  const [financialEntities, setFinancialEntities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/accounting/financial_entities/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setFinancialEntities(data);
    })
    .catch((error) => console.error('Error fetching financial entities:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(formData);

    try {
      const response = await fetch('http://localhost:8000/api/accounting/transaction/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Transaction created successfully!', response.json().data);
        setFormData({
          date_time_transaction: '',
          title: '',
          amount: 0.0,
          origin_financial_entity: '',
          origin_name: '',
          origin_account: '',
          receipt_number: '',
        });
      } else {
        console.error('Failed to create transaction');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="app_transaction">
        <h1>Registrar Transacción</h1>
        <br />
        <br />
        <FormContainer>
            <Column>
                <Label>Fecha y Hora: <span style={{color: 'red'}}>*</span></Label>
                <Input type="datetime-local" name="date_time_transaction" value={formData.date_time_transaction} onChange={handleInputChange} required/>

                <Label>Título:</Label>
                <Input type="text" name="title" value={formData.title} onChange={handleInputChange} />

                <Label>Monto: <span style={{color: 'red'}}>*</span></Label>
                <Input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required />
            </Column>

            <Column>
                <Label>Entidad Financiera Origen: <span style={{color: 'red'}}>*</span></Label>
                <Select name="origin_financial_entity" value={formData.origin_financial_entity} onChange={handleInputChange} required >
                  <option value="">Selecciona una opción</option>
                  {financialEntities.map((entity) => (
                    <option key={entity.id} value={entity.id}>
                      {entity.name}
                    </option>
                  ))}
                </Select>

                <Label>Cliente Origen:</Label>
                <Input type="text" name="origin_name" value={formData.origin_name} onChange={handleInputChange} />

                <Label>Cuenta Origen:</Label>
                <Input type="text" name="origin_account" value={formData.origin_account} onChange={handleInputChange} />

                <Label>Número Comprobante:</Label>
                <Input type="text" name="receipt_number" value={formData.receipt_number} onChange={handleInputChange} />
            </Column>

            <HelperContainer>
                <p style={{textAlign : "right"}}>Los campos marcados con <span style={{color: 'red'}}>*</span> son obligatorios.</p>
            </HelperContainer>
            <ButtonContainer>
                <Button type="submit" onClick={(e) => handleSubmit(e)}>Registrar</Button>
            </ButtonContainer>

          
        </FormContainer>

    </div>
    
  )
}

export default Transaction
