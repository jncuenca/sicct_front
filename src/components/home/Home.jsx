import './home.css'
import accounting from '../../assets/accounting.jpg'

const Home = () => {
  return (
    <div className="app_home">
        <div className="app_home_text">
            <h1>Sistema Integrado de Cobranzas y Conciliación de Transferencias Bancarias</h1>
        </div>
        <div className="app_home_img">
            <img src={accounting} alt="accounting" />
        </div>
    </div>
  )
}

export default Home