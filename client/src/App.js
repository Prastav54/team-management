import './App.css';
import EmployeeTeamManagement from './pages/EmployeeTeamManagement';
import { ReactNotifications } from 'react-notifications-component';

function App() {
  return (
    <>
      <ReactNotifications />
      <EmployeeTeamManagement />
    </>
  );
}

export default App;
