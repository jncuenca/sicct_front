import { useState, useEffect } from 'react'
import './payments.css'

const Payments = ({ accessToken }) => {
  const [data, setData] = useState([]); 

  const [filtroPeriodo, setFiltroPeriodo] = useState(7);
  const [filtroTipoServicio, setFiltroTipoServicio] = useState('Todos');

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const verMas = async (url) => {
    setPopupVisible(true);

    fetch(`http://localhost:8000${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setPopupData(data);
    })
    .catch((error) => {
      console.error("Could not fetch transaction data", error);
    });
  };

  const closeModal = () => {
    setPopupVisible(false);
    setPopupData(null);
  };

  const changePage = (url, nuevaPagina) => {
    fetch(`http://localhost:8000${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setPaginaActual(nuevaPagina);  
      setNextPage(data.meta.next);
      setPreviousPage(data.meta.previous);      
      setData(data.data);
    }).catch((error) => {
      console.error('An error has occurred when fetching transactions', error);
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/accounting/transactions/?page=${paginaActual}&period=${filtroPeriodo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setTotalPaginas(data.meta.total_pages);      
      setNextPage(data.meta.next);
      setPreviousPage(data.meta.previous);      
      setData(data.data);
    }).catch((error) => {
      console.error('An error has occurred when fetching transactions', error);
    });
  }, []);

  const formatAmount = (amount) => {
    const formattedAmount = new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG' }).format(amount);
    return formattedAmount;
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  };

  const handleSearch = () => {
    const period = filtroPeriodo;
    const service = filtroTipoServicio;

    let url = `http://localhost:8000/api/accounting/transactions/?page=1&period=${period}`;
    if (service === "Transferencias Otros Bancos" || service === "Transferencias Internas") {
      url += `&service=${encodeURIComponent(service)}`;
    } 

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setTotalPaginas(data.meta.total_pages);      
      setNextPage(data.meta.next);
      setPreviousPage(data.meta.previous);      
      setData(data.data);
    }).catch((error) => {
      console.error('An error has occurred when fetching transactions', error);
    });

    setPaginaActual(1);
  }
  
  return (
    <div className="tabla-container">
      <h1 style={{textAlign:'center'}}>Sección de Cobros</h1>
      <br />
      <div className='busqueda'>
        <div className="filtros">
          <label>
            <span>Periodo:</span>
            <select value={filtroPeriodo} onChange={e => setFiltroPeriodo(parseInt(e.target.value))}>
              <option value={7}>7 días</option>
              <option value={15}>15 días</option>
              <option value={30}>30 días</option>
              <option value={60}>60 días</option>
              <option value={90}>90 días</option>
            </select>
          </label>
          <label>
            <span>Tipo de Servicio:</span>
            <select value={filtroTipoServicio} onChange={e => setFiltroTipoServicio(e.target.value)}>
            <option value="todos">Todos</option>
              <option value="Transferencias Internas">Transferencias Internas</option>
              <option value="Transferencias Otros Bancos">Transferencias Otros Bancos</option>
            </select>
          </label>
        </div>
        <div className='btn-buscar'>
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item.attributes.id}>
              <td>{formatDate(item.attributes.date_time_transaction)}</td>
              <td>{item.attributes.service}</td>
              <td>{formatAmount(item.attributes.amount)}</td>
              <td>
                <button onClick={() => verMas(item.links.self)}>Ver Más</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginacion">
        <button onClick={() => changePage(previousPage, paginaActual - 1)} disabled={paginaActual === 1}>Anterior</button>
        <span>{`Página ${paginaActual} de ${totalPaginas}`}</span>
        <button onClick={() => changePage(nextPage, paginaActual + 1)} disabled={paginaActual === totalPaginas}>Siguiente</button>
      </div>

      {popupVisible && (
        <div className="popup">
          {popupData ? (
            <div className="modal-content">
              <div className='title'>
                <h2>Detalles de la Transacción</h2>
              </div>
              <br />
              <hr />
              <br />
              <div className='fields'>
                <p><strong>Servicio:</strong> {popupData.service}</p>
                <p><strong>Fecha y Hora:</strong> {formatDate(popupData.date_time_transacion)}</p>
                <p><strong>Título:</strong> {popupData.title || 'No asignado'}</p>
                <p><strong>Monto:</strong> {formatAmount(popupData.amount.toFixed(2))}</p>
                <p><strong>Nro. de Comprobante:</strong> {popupData.receipt_number || 'No asignado'}</p>
                <p><strong>Entidad financiera de origen:</strong> {popupData.origin_finantial_entity || 'N/A'}</p>
                <p><strong>Cliente de origen:</strong> {popupData.origin_name || 'No asignado'}</p>
                <p><strong>Cuenta de origen:</strong> {popupData.origin_account || 'No asignado'}</p>
                <p><strong>Registrado por:</strong> {popupData.registered_by}</p>
                <p><strong>Fecha y hora de registro:</strong> {formatDate(popupData.date_time_registered)}</p>
              </div>
              <br />
              <hr />
              <br />
              <div className='btn-modal'>
                <button onClick={closeModal}>Cerrar</button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};


export default Payments
