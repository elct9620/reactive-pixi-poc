import ReactDOM from 'react-dom/client'
import container, { InjectContext } from '@/container'
import App from './App.tsx'
import { Subscribe } from '@react-rxjs/core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <InjectContext.Provider value={{ container }}>
    <Subscribe>
      <App />
    </Subscribe>
  </InjectContext.Provider>
)
