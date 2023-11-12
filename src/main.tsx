import ReactDOM from 'react-dom/client'
import container, { InjectContext } from '@/container'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <InjectContext.Provider value={{ container }}>
    <App />
  </InjectContext.Provider>
)
