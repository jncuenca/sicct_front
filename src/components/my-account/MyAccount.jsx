import './my-account.css'

const MyAccount = ({ user }) => {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Mi cuenta</h1>
      <br />
      <div className="user-details-container">
        <div className="column">
          <div className="label">Usuario:</div>
          <div className="value">{user && user.username}</div>

          <div className="label">Nombre:</div>
          <div className="value">{user && user.first_name}</div>

          <div className="label">Apellido:</div>
          <div className="value">{user && user.last_name}</div>
        </div>

        <div className="column">
          <div className="label">Roles:</div>
          <div className="value">
            {user && user.groups.map((group, index) => (
              <span key={index} className="group-item">
                {group}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
    
  );
}

export default MyAccount