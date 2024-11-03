import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import Routes from"./Pages/Routes"
import Loader from './components/Loader';
import { useAuthContext } from './Context/AuthContext';
import { ConfigProvider } from 'antd';

function App() {
  const {isAppLoading}=useAuthContext()
  if(isAppLoading)return<Loader/>
  return (
    <>
    <ConfigProvider theme={{ token: { colorPrimary: '#131118',borderRadius:2 } }}>
   {
     !isAppLoading?
     <Routes/>   
     :
     <Loader/>
   }
  </ConfigProvider>
    </>
  );
}

export default App;
